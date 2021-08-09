import { Document } from 'mongoose';
import { ILesson } from './ILesson';

export interface ICourse extends Document{
  title: string,
  description: string,
  thumbnail: string,
  lessons: Array<ILesson>,
  workload: number,
  isCompleted: boolean,
  category: string,
}