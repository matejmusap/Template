import express from 'express';
import {register, login} from '../controllers/auth';
import { validate } from '../middleware';
import { LoginSchema } from '../middleware/validationSchemas/loginSchema';
import { RegisterGuestSchema } from '../middleware/validationSchemas/registerGuestSchema';

const authRouter = express.Router();

authRouter.post('/register',validate(RegisterGuestSchema), register);
authRouter.post('/login', validate(LoginSchema), login);

export default authRouter;
