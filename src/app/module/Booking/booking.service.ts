import httpStatus from 'http-status';
import { Facility } from '../Facility/facility.model';
import { T_Booking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import {
  findAvailableTimeSlotForBooking,
  getTotalTimeInHour,
  hasTimeConflict,
} from './booking.utils';
import { initiatePayment } from '../Payment/payment.utils';
import { Customer } from '../Customers/customer.model';

//create booking
const createBookingIntoDb = async (data: T_Booking) => {
  //check if facility exixt
  const isFacilityExist = await Facility.findById(data.facility);
  if (!isFacilityExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  //check if facility deleted
  if (isFacilityExist.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility deleted');
  }

  //get already booked time slot
  const getAllBookingTimeForProvidedDate = await Booking.find({
    facility: data.facility,
    date: data.date,
  }).select(['startTime', 'endTime', '_id']);
  //check time conflict
  if (
    hasTimeConflict(getAllBookingTimeForProvidedDate, {
      startTime: data.startTime,
      endTime: data.endTime,
    })
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Seleted Time Not Available');
  }

  //calculate payable  ammount for booking
  const totalTime = getTotalTimeInHour(data.startTime, data.endTime);
  data.payableAmount = totalTime * isFacilityExist.pricePerHour;

  const customer = await Customer.findOne({ user: data.user });
  console.log(customer);
  const customerData = {
    name: `${customer?.name.firstName} ${customer?.name.middleName} ${customer?.name.lastName}`,
    email: customer?.email,
    address: customer?.address,
    phone: customer?.phone,
  };
  const bookingData = data;

  const txn = `TXN-${Date.now()}`;

  //create booking
  const result = (
    await (await Booking.create({ ...data, txnID: txn })).populate('facility')
  ).populate('user');

  const paymentInfo = await initiatePayment({
    bookingData,
    txn,
    customerData,
    bookingId: (await result)._id,
  });
  console.log(data, paymentInfo.data);
  return { ...result, payLink: paymentInfo.data.payment_url };
};

//get all booking by admin
const getAllBookingFromDb = async () => {
  const result = await Booking.find().populate('user').populate('facility');
  return result;
};
//get all booking by user
const getAllBookingByUserFromDb = async (id: string) => {
  const result = await Booking.find({
    user: id,
  })
    .populate('facility')
    .populate({
      path: 'user',
      select: 'email', // Specify the fields you want to include
    });

  return result;
};
//get single booking by user
const getSingleBookingByUserFromDb = async (id: string, bID: string) => {
  const result = await Booking.findOne({
    user: id,
    _id: bID,
  })
    .populate('facility')
    .populate({
      path: 'user',
      select: 'email', // Specify the fields you want to include
    });

  return result;
};

//cencel booking
const deleteBookingByUserFromDb = async (userID: string, bookingID: string) => {
  const isBookingExist = await Booking.findOne({
    _id: bookingID,
    user: userID,
  });

  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const result = await Booking.findByIdAndUpdate(
    bookingID,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility');
  return result;
};
//get available time
const getAvailableTimeSlotsFromBooking = async (
  givenDate: string,
  id: string,
) => {
  const date = givenDate;

  const bookings = await Booking.find({ date: date, facility: id }).select([
    'date',
    'startTime',
    'endTime',
  ]);

  const availableTimeSlots = findAvailableTimeSlotForBooking(bookings);

  return availableTimeSlots;
};

export const BookingService = {
  createBookingIntoDb,
  getAllBookingFromDb,
  getAllBookingByUserFromDb,
  deleteBookingByUserFromDb,
  getAvailableTimeSlotsFromBooking,
  getSingleBookingByUserFromDb,
};
