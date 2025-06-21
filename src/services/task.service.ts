import { TaskStatus } from '../enums';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/task.entity';

export async function createTask(
  title: string,
  description: string | null,
  status: TaskStatus | null,
  userId: number
) {
  const taskRepository = AppDataSource.getRepository(Task);
  const task = taskRepository.create({
    title,
    description,
    status: status || TaskStatus.PENDING,
    user: { id: userId },
  });

  try {
    return await taskRepository.save(task);
  } catch (error) {
    throw Object.assign(new Error('Failed to create task'), { httpStatusCode: 500 });
  }
}

export async function getTasksByUser(userId: number) {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    return await taskRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      select: {
        user: { id: true, email: true },
      },
    });
  } catch (error) {
    throw Object.assign(new Error('Failed to retrieve tasks'), { httpStatusCode: 500 });
  }
}

export async function getTaskById(id: number, userId: number): Promise<Task> {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const task = await taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
      select: {
        user: { id: true, email: true },
      },
    });
    if (!task) {
      throw Object.assign(new Error('Task not found'), { httpStatusCode: 404 });
    }
    return task;
  } catch (error: any) {
    throw error.httpStatusCode
      ? error
      : Object.assign(new Error('Failed to retrieve task'), { httpStatusCode: 500 });
  }
}

export async function updateTask(
  id: number,
  userId: number,
  updates: {
    title?: string;
    description?: string | null;
    status?: TaskStatus | null;
  }
) {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const task = await taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
      select: {
        user: { id: true, email: true },
      },
    });
    if (!task) {
      throw Object.assign(new Error('Task not found'), { httpStatusCode: 404 });
    }
    Object.assign(task, updates);
    return await taskRepository.save(task);
  } catch (error: any) {
    throw error.httpStatusCode
      ? error
      : Object.assign(new Error('Failed to update task'), { httpStatusCode: 500 });
  }
}

export async function deleteTask(id: number, userId: number) {
  const taskRepository = AppDataSource.getRepository(Task);
  try {
    const task = await taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!task) {
      throw Object.assign(new Error('Task not found'), { httpStatusCode: 404 });
    }
    await taskRepository.remove(task);
  } catch (error: any) {
    throw error.httpStatusCode
      ? error
      : Object.assign(new Error('Failed to delete task'), { httpStatusCode: 500 });
  }
}

export const taskService = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
};