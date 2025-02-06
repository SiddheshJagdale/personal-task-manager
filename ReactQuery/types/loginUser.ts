// src/ReactQuery/types/loginUser.ts

export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user?: { id: string; name: string; email: string };
  error?: string;
};
