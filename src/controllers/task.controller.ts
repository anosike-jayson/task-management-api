import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { taskService } from '../services/task.service';

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ...data } = matchedData(req);
    const { title, description, status } = data;
    const userId = req.user?.id;
    if (!userId) {
      throw Object.assign(new Error('Unauthorized'), { httpStatusCode: 401 });
    }
    const task = await taskService.createTask(title, description, status, userId);

    res.status(201).json({
      status: 201,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error: any) {
    res.status(error.httpStatusCode || 500).json({
      status: error.httpStatusCode || 500,
      message: error.message || 'Error creating task',
      data: null,
    });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw Object.assign(new Error('Unauthorized'), { httpStatusCode: 401 });
    }
    const tasks = await taskService.getTasksByUser(userId);

    res.status(200).json({
      status: 200,
      message: 'Tasks retrieved successfully',
      data: tasks,
    });
  } catch (error: any) {
    res.status(error.httpStatusCode || 500).json({
      status: error.httpStatusCode || 500,
      message: error.message || 'Error retrieving tasks',
      data: null,
    });
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = matchedData(req);
    const userId = req.user?.id;
    if (!userId) {
      throw Object.assign(new Error('Unauthorized'), { httpStatusCode: 401 });
    }
    const task = await taskService.getTaskById(id, userId);

    res.status(200).json({
      status: 200,
      message: 'Task retrieved successfully',
      data: task,
    });
  } catch (error: any) {
    res.status(error.httpStatusCode || 500).json({
      status: error.httpStatusCode || 500,
      message: error.message || 'Error retrieving task',
      data: null,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id, ...data } = matchedData(req);
    const { title, description, status } = data;
    const userId = req.user?.id;
    if (!userId) {
      throw Object.assign(new Error('Unauthorized'), { httpStatusCode: 401 });
    }
    const task = await taskService.updateTask(id, userId, { title, description, status });

    res.status(200).json({
      status: 200,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error: any) {
    const status = error.httpStatusCode || 500;
    res.status(status).json({
      status,
      message: error.message || 'Error updating task',
      data: null,
    });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = matchedData(req);
    const userId = req.user?.id;
    if (!userId) {
      throw Object.assign(new Error('Unauthorized'), { httpStatusCode: 401 });
    }
    await taskService.deleteTask(id, userId);

    res.status(200).json({
      status: 200,
      message: 'Task deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(error.httpStatusCode || 500).json({
      status: error.httpStatusCode || 500,
      message: error.message || 'Error deleting task',
      data: null,
    });
  }
};