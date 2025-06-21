import express from 'express';
import { createTask, getTasks, getTask, updateTask, deleteTask } from '../controllers/task.controller';
import { validateCreateTask, validateUpdateTask, validateTaskId } from '../validators/task.validator';
import { authenticateToken } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/', authenticateToken, validateCreateTask, validateRequest, createTask);
router.get('/', authenticateToken, getTasks);
router.get('/:id', authenticateToken, validateTaskId, validateRequest, getTask);
router.patch('/:id', authenticateToken, validateUpdateTask, validateRequest, updateTask);
router.delete('/:id', authenticateToken, validateTaskId, validateRequest, deleteTask);

export default router;