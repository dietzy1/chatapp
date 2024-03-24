import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";
import { User } from "@/types/user";
import useSelectedChatroomStore from "@/stores/selectedChatroomStore";

//We simply provide the ID of the chatroom and then the service should ask the chatroom service for the users
interface GetUsersRequest {
  chatroomId: string;
}

interface GetUsersResponse {
  users: User[];
}

const getUsers = async (
  request: GetUsersRequest,
): Promise<GetUsersResponse> => {
  const response = await client.get<GetUsersResponse>(
    `/users/${request.chatroomId}`,
  );

  return response.data;
};

const useGetUsers = () => {
  //Get chatroom ID from selected chatroom
  const { selectedChatroom } = useSelectedChatroomStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ chatroomId: selectedChatroom!.chatroomId! }),
    enabled: !!selectedChatroom,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetUsers;
