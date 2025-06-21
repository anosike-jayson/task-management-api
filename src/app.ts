import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/auth', authRouter);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});