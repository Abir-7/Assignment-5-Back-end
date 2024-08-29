import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { T_Facility } from './facility.interface';
import { Facility } from './facility.model';
import QueryBuilder from '../../builder/queryBuilder';
import { Testimonial } from '../Testimonial/testimonial.model';

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  const facilityQuery = new QueryBuilder(
    Facility.find({ isDeleted: false }),
    query,
  ).paginate();

  const meta = await facilityQuery.countTotal();

  const result = await facilityQuery.modelQuery;

  return { meta, result };
};

const getSingleFacilityFromDB = async (id: string) => {
  const result = await Facility.findOne({ _id: id });
  if (result?.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not see Details. Facility is deleted',
    );
  } else {
    return result;
  }
};
const getTopFacilityFromDB = async () => {
  const topFacilities = await Testimonial.aggregate([
    {
      $lookup: {
        from: 'bookings', // Reference the Booking collection
        localField: 'bookingId', // Field from Testimonial
        foreignField: '_id', // Field in Booking
        as: 'booking',
      },
    },
    {
      $unwind: '$booking', // Unwind the booking array to get individual documents
    },
    {
      $group: {
        _id: '$booking.facility', // Group by facility field from the Booking
        averageRating: { $avg: '$rating' }, // Calculate average rating
      },
    },
    {
      $sort: { averageRating: -1 }, // Sort by average rating
    },
    {
      $limit: 4, // Limit to top 4
    },
    {
      $lookup: {
        from: 'facilities', // Collection name for Facility
        localField: '_id', // Group _id corresponds to Facility _id
        foreignField: '_id',
        as: 'facility',
      },
    },
    {
      $unwind: '$facility', // Unwind facility array to get the document
    },
    {
      $project: {
        _id: '$facility._id',
        name: '$facility.name',
        description: '$facility.description',
        pricePerHour: '$facility.pricePerHour',
        photo: '$facility.photo',
        location: '$facility.location',
        averageRating: 1, // Include average rating in the output
      },
    },
  ]);
  return topFacilities;
};

const createFacilityIntoDB = async (data: T_Facility) => {
  const result = await Facility.create(data);
  return result;
};

const updateFacilityIntoDB = async (id: string, data: Partial<T_Facility>) => {
  console.log(data);
  if (!(await Facility.isFacitityExist(id))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Facility not found! update failed.',
    );
  }
  if (data?.name) {
    const isNameSame = await Facility.findOne({ name: data.name });
    if (isNameSame) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Same Facility Name Already Exist',
      );
    }
  }
  const result = await Facility.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  console.log(result);
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  console.log(id);
  if (!(await Facility.isFacitityExist(id))) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Facility not found! delete failed.',
    );
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
  getSingleFacilityFromDB,
  getTopFacilityFromDB,
};
