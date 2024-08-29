import { model, Schema } from 'mongoose';
import { CustomerModel, ICustomer } from './customer.interface';

export const customerSchema = new Schema<ICustomer, CustomerModel>({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
  },
  name: {
    firstName: {
      type: String,
      required: [true, 'First name is required.'],
      trim: true,
    },
    middleName: {
      type: String,
      trim: true, // Optional field
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required.'],
      trim: true,
    },
  },
  phone: {
    type: Number,
    required: [true, 'Contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Address is required.'],
    trim: true,
  },
  photo: {
    type: String,

    default:
      'https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150503804.jpg?t=st=1724927284~exp=1724930884~hmac=a42764fe18cff7567042535bfb6aec564591400f29408485d5cc8eed46b42d9a&w=740',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required.'],
  },
});

customerSchema.statics.isCustomerExist = async function (email: string) {
  const iscustomerExist = await Customer.findOne({ email });
  return iscustomerExist;
};

export const Customer = model<ICustomer, CustomerModel>(
  'Customer',
  customerSchema,
);
