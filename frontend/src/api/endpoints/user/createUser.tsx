import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";
import { User } from "@/types/user";

export interface CreateUserResponse {
  user: User;
}

const createUser = async (): Promise<CreateUserResponse> => {
  const response = await client.post<CreateUserResponse>(`/user`);

  console.log(response.data);

  return response.data;
};

const useCreateUser = () => {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: () => createUser(),
  });
};

export default useCreateUser;
