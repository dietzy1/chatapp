import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface CreateUserRequest {
  username: string;
  description: string;
  iconId: string;
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
  const username = "bob";
  const description = "bob is a cool guy";
  const iconId = "a2b3314b-c20e-4148-9eaf-28dd2e142bad";

  const req: CreateUserRequest = {
    username,
    description,
    iconId,
  };

  return useMutation({
    mutationKey: ["user"],
    mutationFn: () => createUser(req),
  });
};

export default useCreateUser;
