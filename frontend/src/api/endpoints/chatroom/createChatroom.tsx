import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface CreateChatroomRequest {
  name: string;
  ownerId: string;
}

export interface CreateChatroomResponse {
  chatroomId: string;
}

const createChatroom = async (
  req: CreateChatroomRequest,
): Promise<CreateChatroomResponse> => {
  const response = await client.post<CreateChatroomResponse>(`/chatroom`, req);

  console.log(response.data);

  return response.data;
};

const useCreateChatroom = () => {
  return useMutation({
    mutationKey: ["chatroom"],
    mutationFn: (req: CreateChatroomRequest) => createChatroom(req),
  });
};

export default useCreateChatroom;
