// src/ReactQuery/mutations/loginUser.ts

import axios from "axios";
import { LoginUserData } from "../types/loginUser"; // Adjust path as needed

export const loginUser = async (userData: LoginUserData) => {
  try {
    const response = await axios.post("/api/login", userData);
    return response.data; // Assuming the response contains the user data
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Login failed");
  }
};
