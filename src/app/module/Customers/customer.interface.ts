import { Model, Types } from 'mongoose';

interface Iname {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface ICustomer {
  name: Iname;
  email: string;
  phone: number;
  address: string;
  user: Types.ObjectId;
  photo: string;
}

export interface ICustomerUpdate {
  phone: number;
  address: string;
  name: Iname;
}

export interface CustomerModel extends Model<ICustomer> {
  isCustomerExist(email: string): Promise<ICustomer | null>;
}
