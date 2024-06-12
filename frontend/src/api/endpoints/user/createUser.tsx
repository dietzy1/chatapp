import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface CreateUserRequest {
  username: string;
  iconSrc: string;
}

export interface CreateUserResponse {
  userId: string;
}

const createUser = async (
  req: CreateUserRequest,
): Promise<CreateUserResponse> => {
  const response = await client.post<CreateUserResponse>(`/user`, req);

  console.log(response.data);

  return response.data;
};

const useCreateUser = () => {
  return useMutation({
    mutationKey: ["user"],
    mutationFn: (req: CreateUserRequest) => createUser(req),
  });
};

export default useCreateUser;
