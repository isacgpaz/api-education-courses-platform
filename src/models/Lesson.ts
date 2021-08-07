import { model, Schema } from 'mongoose';
import { ILesson } from '../interfaces/ILesson';

const lessonSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: Object,
    default: 'Vazio.'
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  index: {
    type: Number,
    required: true
  }
}, {timestamps: true});

export default model<ILesson>('Lesson', lessonSchema);