import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface CreateChannelRequest {
  /*  name: string;
  ownerId: string; */
}

export interface CreateChatroomResponse {
  channelId: string;
}

const createChannel = async (
  req: CreateChannelRequest,
): Promise<CreateChatroomResponse> => {
  const response = await client.post<CreateChatroomResponse>(`/channel`, req);

  console.log(response.data);

  return response.data;
};

const useCreateChatroom = () => {
  return useMutation({
    mutationKey: ["channel"],
    mutationFn: (req: CreateChannelRequest) => createChannel(req),
     
  });
};

export default useCreateChatroom;
