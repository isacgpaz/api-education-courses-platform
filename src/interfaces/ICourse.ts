import { Document } from 'mongoose';
import { ILesson } from './ILesson';

export interface ICourse extends Document{
  title: string,
  description: string,
  thumbnail: string,
  lesson: Array<ILesson>,
  workload: number,
  isCompleted: boolean,
}