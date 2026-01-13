import axiosInstance from './axiosInstance';
import type { Task } from '../types';
export type TaskCreatePayload = Omit<Task, 'id' | 'is_risk' | 'risk_message' | 'ai_suggestion'> & {

};


export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosInstance.get('/tasks/');
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await axiosInstance.get(`/tasks/${id}`);
    return response.data;
};

export const createTask = async (taskData: TaskCreatePayload): Promise<Task> => {
  const response = await axiosInstance.post('/tasks/', taskData);
  return response.data;
};

export const updateTask = async (id: number, taskData: Partial<TaskCreatePayload>): Promise<Task> => {
  const response = await axiosInstance.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/tasks/${id}`);
};
