import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { handleError } from './middlewares/errorHandler';
import authRouter from './routes/auth.routes';
import taskRouter from './routes/task.routes';
import { AppDataSource } from './data-source';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/task', taskRouter);

AppDataSource.initialize()
    .then(() => {
        console.log('Database connected Successfully');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });

app.use((req, res) => {
  const method = req.method;
  res.status(404).json({
    status: "error",
    message: "Route Not Found",
    error: `Cannot ${method} ${req.url?.split(`api/`)[1] || ""}`,
  });
});

const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});