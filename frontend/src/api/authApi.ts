import axiosInstance from './axiosInstance';
import type { UserLogin, UserCreate, UserResponse, Token } from '../types/auth';

export const registerUser = async (userData: UserCreate): Promise<UserResponse> => {
  const response = await axiosInstance.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials: UserLogin): Promise<Token> => {
  const params = new URLSearchParams();
  params.append('username', credentials.email);
  params.append('password', credentials.password);

  const response = await axiosInstance.post('/auth/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const getUser = async (): Promise<UserResponse> => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
}