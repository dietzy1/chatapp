import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";
import useGetAuth from "../auth/getAuth";
import { User } from "@/types/user";

export interface GetUserRequest {
  userId: string;
}

export interface GetUserResponse {
  user: User;
}

const getUser = async (request: GetUserRequest): Promise<GetUserResponse> => {
  const response = await client.get<GetUserResponse>(`/user/${request.userId}`);

  return response.data;
};

const useGetUser = () => {
  const auth = useGetAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser({ userId: auth.data!.userId! }),
    enabled: !!auth.data?.userId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUser;
