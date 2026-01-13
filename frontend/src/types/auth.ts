export type EmailStr = string;

export interface UserCreate {
  full_name: string;
  email: EmailStr;
  password: string;
}

export interface UserLogin {
  email: EmailStr;
  password: string;
}

export interface UserResponse {
  id: number;
  full_name: string;
  email: EmailStr;
}

export interface Token {
    access_token: string;
    token_type: string;
}

export interface TokenData {
    email?: string;
}
