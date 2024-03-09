import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const Router = express.Router()

Router.post('/sign-up', signup);
Router.post('/sign-in', signin);

export default Router;