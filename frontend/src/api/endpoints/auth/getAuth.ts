import { useQuery } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface GetAuthResponse {
  userId: string;
}

const getAuth = async (): Promise<GetAuthResponse> => {
  const response = await client.get<GetAuthResponse>("/auth");

  return response.data;
};

const useGetAuth = () => {
  const { data, isPending, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuth,
    enabled: true,
    retry: false,
  });

  return {
    data,
    isPending,
    isLoading,
    error,
  };
};

export default useGetAuth;
