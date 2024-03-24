import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";
import { Chatroom } from "@/types/user";

import useGetUser from "../user/getUser";
//import "../mocks/getUser";

export interface GetChatroomsResponse {
  chatrooms: Chatroom[];
}

const getChatrooms = async (userId: string) => {
  const response = await client.get<GetChatroomsResponse>(
    `/chatroom/${userId}`,
  );

  return response.data;
};

const useGetChatrooms = (/* userId: string */) => {
  const user = useGetUser();

  const userId = user?.data?.user.userId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["chatrooms", userId],
    queryFn: () => getChatrooms(userId!),
    enabled: !!userId,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetChatrooms;
