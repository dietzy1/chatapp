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
  const username = "fake bob";
  const description = "bob is a fake guy";
  const iconId = "9124edda-b816-4015-94bc-b163ae519497";

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
