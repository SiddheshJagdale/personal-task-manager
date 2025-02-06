// src/types/authTypes.ts

export type RegisterUserData = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  user?: { id: string; name: string; email: string };
  error?: string;
};
