import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";


//We simply provide the ID of the chatroom and then the service should ask the chatroom service for the users
interface GetUsersRequest {
  chatroomId: string;
}

interface GetUsersResponse {}

const getUsers = async (
  request: GetUsersRequest,
): Promise<GetUsersResponse> => {
  const response = await client.get<GetUsersResponse>(
    `/users/${request.chatroomId}`,
    {
      params: request,
    },
  );

  return response.data;
};

const useGetUsers = (chatroomId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ chatroomId }),
    enabled: !!chatroomId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUsers;
