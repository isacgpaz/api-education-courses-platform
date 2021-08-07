import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

import bcrypt from 'bcryptjs';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  level: {
    type: Number
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
    default: []
  }]
}, { timestamps: true });

userSchema.pre<IUser>('save', async function(next) {
  if(this.isModified('password') && !this.isNew) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

export default model<IUser>('User', userSchema);