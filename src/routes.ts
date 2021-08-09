import { Router } from 'express';
import CategoryController from './controllers/CategoryController';
import CourseController from './controllers/CourseController';
import UserController from './controllers/UserController';
import authMiddleware from './middleware/auth';

const basicRouter = Router();
const usersRouter = Router();
const coursesRouter = Router();
const lessonsRouter = Router();
const categoriesRouter = Router();

/*
  * User routes
*/

usersRouter.post('/auth', UserController.auth);
usersRouter.post('/', authMiddleware, UserController.createUser);
usersRouter.get('/', authMiddleware, UserController.getAllUsers);
usersRouter.get('/:userId', authMiddleware, UserController.getUser);
usersRouter.put('/:userId', authMiddleware, UserController.updateUser);
usersRouter.delete('/:userId', authMiddleware, UserController.removeUser);

/*
  * Course routes
*/

coursesRouter.post('/', CourseController.createCourse);
coursesRouter.get('/', CourseController.getAllCourses);
coursesRouter.get('/:courseId', authMiddleware, CourseController.getCourse);
coursesRouter.put('/:courseId', authMiddleware, CourseController.updateCourse);
coursesRouter.delete('/:courseId', authMiddleware, CourseController.removeCourse);

/*
  * Category routes
*/ 

categoriesRouter.post('/', authMiddleware, CategoryController.createCategory);
categoriesRouter.get('/', authMiddleware, CategoryController.getAllCategories);
categoriesRouter.get('/:categoryId', authMiddleware, CategoryController.getCategory);
categoriesRouter.put('/:categoryId', authMiddleware, CategoryController.updateCategory);
categoriesRouter.delete('/:categoryId', authMiddleware, CategoryController.removeCategory);

export { basicRouter, usersRouter, coursesRouter, lessonsRouter, categoriesRouter }
