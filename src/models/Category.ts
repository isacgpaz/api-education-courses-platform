import { model, Schema } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {timestamps: true});

export default model<ICategory>('Category', categorySchema);