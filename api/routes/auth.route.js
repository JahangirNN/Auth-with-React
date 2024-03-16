import express from 'express';
import { signin, signup, google, signout } from '../controllers/auth.controller.js';

const Router = express.Router()

Router.post('/sign-up', signup);
Router.post('/sign-in', signin);
Router.post('/google', google);
Router.get('/sign-out', signout);
export default Router;