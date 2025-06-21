import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validators/auth.validator';
import { validateRequest } from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/register', validateRegister, validateRequest, register);
router.post('/login', validateLogin, validateRequest, login);

export default router;