//whatthecommit.com/index.txt

import client from "@/api/client/axios";
import { useQuery } from "@tanstack/react-query";

interface GetMemesResponse {
  memes: string[];
}

const getMemes = async () => {
  const response = await client.get<GetMemesResponse>("/auth/meme");

  return response.data;
};

const useGetMemes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["memes"],
    queryFn: () => getMemes(),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetMemes;
