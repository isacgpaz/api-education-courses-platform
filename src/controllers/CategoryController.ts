import { Request, Response } from 'express';
import Category from '../models/Category';

const createCategory = async (request: Request, response: Response) => {
  try{
    const { name } = request.body;

    const category = await Category.create({ name });

    category.save();  

    return response.send({ category });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAllCategories = async (request: Request, response: Response) => {
  try {
    const categories = await Category.find();

    return response.send({ 
      categories: categories,
      count: categories.length
    });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getCategory = async (request: Request, response: Response) => {
  console.log(request.params)

  try {
    const category = await Category.findById(request.params.categoryId);
    
    console.log(category);
    return response.send({ category });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const updateCategory = async (request: Request, response: Response) => {
  try{
    const { name } = request.body;
    
    const category = await Category.findByIdAndUpdate(request.params.categoryId, {
      name
    }, { new: true });

    if(!category){
      return response.status(400).send({ error: 'Category not found.' });
    }

    await category.save();

    return response.send({ category });
  }catch(error){
    return response.send({ error: error.message })
  }
}

const removeCategory = async (request: Request, response: Response) => {
  try {
    await Category.findByIdAndRemove(request.params.categoryId);
    
    return response.send();
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

export default { createCategory, getAllCategories, getCategory, updateCategory, removeCategory }