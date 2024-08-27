import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { T_Facility } from './facility.interface';
import { Facility } from './facility.model';

const getAllFacilityFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
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

const createFacilityIntoDB = async (data: T_Facility) => {
  const result = await Facility.create(data);
  return result;
};

const updateFacilityIntoDB = async (id: string, data: Partial<T_Facility>) => {
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
};
