import {
  RegisterUserData,
  RegisterResponse,
} from "@/ReactQuery/types/registerUser";
import axios from "axios";

export const registerUser = async (
  userData: RegisterUserData
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post("/api/register", userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Registration failed");
  }
};
