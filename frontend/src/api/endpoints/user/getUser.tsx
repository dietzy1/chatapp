import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";
import "../mocks/getUser";

export interface GetUserRequest {
  userId: string;
}

export interface GetUserResponse {
  name: string;
  uuid: string;
  icon: {
    uuid: string;
    link: string;
  };
  description: string;
  joinDate: string;
  chatServers: string[];
}

const getUser = async (request: GetUserRequest): Promise<GetUserResponse> => {
  const response = await client.get<GetUserResponse>(
    `/user/${request.userId}`,
    {
      params: request,
    },
  );

  return response.data;
};

const useGetUser = (userId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser({ userId }),
    enabled: !!userId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUser;
