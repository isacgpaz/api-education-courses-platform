import { Document, Schema } from 'mongoose';

export interface ILesson extends Document{
  title: string,
  body: string,
  courseId: Schema.Types.ObjectId,
  isCompleted: boolean,
}