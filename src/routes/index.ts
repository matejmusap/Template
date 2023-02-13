import express from 'express';
import {register, login} from '../controllers/auth';
import { validate } from '../middleware';
import { LoginSchema } from '../middleware/validationSchemas/loginSchema';
import { RegisterSchema } from '../middleware/validationSchemas/registerSchema';

const authRouter = express.Router();

authRouter.post('/register',validate(RegisterSchema), register);
authRouter.post('/login', validate(LoginSchema), login);

export default authRouter;
