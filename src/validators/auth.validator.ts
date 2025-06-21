import { check } from 'express-validator';

export const validateRegister = [
    check('email').notEmpty().withMessage('email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];

export const validateLogin = [
    check('email').notEmpty().withMessage('email is required'),
    check('password').notEmpty().withMessage('Password is required'),
];