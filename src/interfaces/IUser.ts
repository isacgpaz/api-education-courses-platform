import { Document } from 'mongoose';
import { ICourse } from './ICourse';

export interface IUser extends Document{
  name: string,
  cpf: string,
  email: string,
  password: string,
  courses: Array<ICourse>,
  level: number
}