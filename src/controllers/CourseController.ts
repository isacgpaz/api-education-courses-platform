import { Request, Response } from "express"
import { ILesson } from "../interfaces/ILesson";
import Course from "../models/Course";
import Lesson from "../models/Lesson";

const createCourse = async (request: Request, response: Response) => {
  try{

    const { title, description, thumbnail, category, lessons, workload, isCompleted } = request.body;
  
    const course = await Course.create({ title, description, thumbnail, category, lessons, workload, isCompleted });
  
    await Promise.all(lessons.map(async (lesson: ILesson) => {
        const courseLesson = new Lesson({ ...lesson, courseId: course._id});
  
        await courseLesson.save();
  
        course.lessons.push();
    }));
  
    course.save();
  
    return response.send({ course });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getAllCourses = async (request: Request, response: Response) => {
  try{
    const courses = await Course.find().populate('lessons');

    return response.send({ courses: courses });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const getCourse = async (request: Request, response: Response) => {
  try {
    const course = await Course.findById(request.params.courseId).populate('lessons');
    
    return response.send({ course });
  }catch(error){
    return response.status(400).send({ error: 'Error loading course.' });
  }
}

const updateCourse = async (request: Request, response: Response) => {
  try{
    const { title, description, thumbnail, workload, lessons, completed, category } = request.body;
    
    const course = await Course.findByIdAndUpdate(request.params.courseId, {
      title, 
      description,
      thumbnail, 
      completed,
      workload,
      category
    }, { new: true }).populate('lessons');

    if(!course){
      return response.status(400).send({ message: 'Course not found.' });
    }
    
    course.lessons = [];

    await Lesson.remove({ courseId: course._id });

    await Promise.all(lessons.map(async (lesson: ILesson) => {
      const courseLesson = new Lesson({ ...lesson, courseId: course._id });

      await courseLesson.save();

      course.lessons.push(courseLesson);
    }));

    await course.save();

    return response.send({ course });
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

const removeCourse = async (request: Request, response: Response) => {
  try {
    await Course.findByIdAndRemove(request.params.courseId);
    
    return response.send();
  }catch(error){
    return response.status(400).send({ error: error.message });
  }
}

export default { createCourse, getAllCourses, getCourse, updateCourse, removeCourse }