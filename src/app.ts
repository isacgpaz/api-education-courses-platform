import express from 'express';
import cors from 'cors';

import { basicRouter, usersRouter, coursesRouter, lessonsRouter, categoriesRouter } from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', basicRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/lessons', lessonsRouter);
app.use('/categories', categoriesRouter);

export { app }