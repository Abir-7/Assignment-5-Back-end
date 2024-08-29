import { model, Schema } from 'mongoose';
import { T_Facility, T_Facility_Find_Methods } from './facility.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const facilitySchema = new Schema<T_Facility, T_Facility_Find_Methods>({
  name: {
    type: String,
    required: [true, 'Facility name is required'],
    unique: true,
  },
  description: { type: String, required: [true, 'Description is required'] },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
  },
  photo: {
    type: String,
    default:
      'https://i.ibb.co/BnhCZc5/sport-club-sports-equipment-pink-background-vector-21104652.webp',
  },
  location: { type: String, required: [true, 'Location is required'] },
  isDeleted: { type: Boolean, default: false },
});

facilitySchema.pre('save', async function (next) {
  const isFaciExist = await Facility.findOne({ name: this.name });
  if (isFaciExist) {
    throw new AppError(httpStatus.CONFLICT, 'Facility already exist');
  }
  next();
});

facilitySchema.statics.isFacitityExist = async (id) => {
  const isFaciExist = await Facility.findById(id);
  if (isFaciExist) {
    return true;
  } else {
    return false;
  }
};

export const Facility = model<T_Facility, T_Facility_Find_Methods>(
  'Facility',
  facilitySchema,
);
