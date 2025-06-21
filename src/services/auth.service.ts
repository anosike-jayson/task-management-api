import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source.js';
import { User } from '../entities/user.entity.js';

export async function registerUser (email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword });
    await userRepository.save(user);
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export async function loginUser (email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export const authService = {
    registerUser,
    loginUser
}