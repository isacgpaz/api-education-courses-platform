import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";
import { ICourse } from "../interfaces/ICourse";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function generateToken(params = {}){
  return jwt.sign(params, String(process.env.TOKEN_SECRET), {
    expiresIn: 86400 //24h
  });
}

const createUser = async (request: Request, response: Response) => {
  const { name, cpf, email, password, phone, level } = request.body;

  try{
    //Check if user exists

    if(await User.findOne({ email }) || await User.findOne({ cpf })){
      return response.status(400).send({ error: 'User already exists. '});
    }

    const user = await User.create({ name, cpf, email, password, phone, level });

    //Clear password
    user.password = String(undefined);

    return response.send({
      user, token: generateToken({ 'id': user.id })
    });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const auth = async (request: Request, response: Response) => {
  try{
    const { email, password } = request.body;

    const user = await User.findOne({ email: email}).select('+password');

    //Check if user exists
    if(!user){
      return response.status(400).send({ error: 'User not found.' });
    }

    //Compare password input with bcrypted user password
    if(!await bcrypt.compare(password, user.password)){
      return response.status(400).send({ error: 'Invalid password.' });
    }

    //Clear password
    user.password = String(undefined);

    return response.status(201).send({
      user,
      token: generateToken({ 'id': user.id, 'level': user.level })
    });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAllUsers = async (request: Request, response: Response) => {
  try{
    const users = await User.find().populate(['courses', 'lessons']);

    return response.send({ users: users, count: users.length });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getUser = async (request: Request, response: Response) => {
  try{
    const user = await User.findById(request.params.userId).populate(['courses', 'lessons']);

    return response.status(200).send({ user });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const updateUser = async (request: Request, response: Response) => {
  try{
    const { name, cpf, phone, email, courses, password, level } = request.body;

    const user = await User.findByIdAndUpdate(request.params.userId, {
      name,
      cpf,
      phone,
      email,
      password,
      level
    }).populate('courses').populate('lessons');
    
    if(!user){
      return response.status(400).send({ error: 'User not found.' });
    }
    
    user.courses = [];

    await Promise.all(courses.map(async (course: ICourse) => {
      const userCourse = await Course.findById(course.id);
      
      if(userCourse){
        await userCourse.save();
        user.courses.push(userCourse);
      }
    }));

    user.password = password;

    await user.save();

    return response.send({ user });
  }catch(error){
    return response.send({ error: error.message });
  }
}

const removeUser = async (request: Request, response: Response) => {
  try{
    await User.findByIdAndDelete(request.params.userId);
    
    return response.status(200).send('User deleted.');
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

export default { createUser, auth, getAllUsers, getUser, updateUser, removeUser }