import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from "../models/User";
import { IUser } from "../interfaces/IUser";

export default async function authMiddleware(request: Request, response: Response, next: NextFunction){
  const { authorization } = request.headers;  
  
  if(!authorization){
    return response.status(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  if(!token){
    return response.status(401).send({ message: 'Access denied.' });
  }

  try{
    const userToken = jwt.verify(String(token), String(process.env.TOKEN_SECRET)) as IUser;
    const user = await User.findById(userToken.id);
    
    if(!user){
      return response.status(400).send({ message: 'User not exists.' });
    }

  }catch(error){
    return response.status(401).send({ message: 'Invalid token.' });
  }

  return next();
}