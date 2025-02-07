import axios from "axios";

interface UpdateUserParams {
  userId: string;
  name: string;
  email: string;
  profileImage?: string;
}

export const updateUser = async ({
  userId,
  name,
  email,
  profileImage,
}: UpdateUserParams) => {
  const response = await axios.put(`/api/updateuser/${userId}`, {
    name,
    email,
    profileImage,
  });

  return response.data;
};
