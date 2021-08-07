import { model, Schema } from "mongoose";
import { ICourse } from "../interfaces/ICourse";

const courseSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  lessons: [{
    type: Schema.Types.ObjectId,
    ref: 'Lesson'
  }]
}, { timestamps: true });

export default model<ICourse>('Course', courseSchema);