import { Router } from 'express';
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



export { basicRouter, usersRouter, coursesRouter, lessonsRouter, categoriesRouter }
