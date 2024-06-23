/* 



message LogoutRequest {
    string user_id = 1;
  }
  
  message LogoutResponse {
  } */
/*   rpc Logout(LogoutRequest) returns (LogoutResponse) {
    option (google.api.http) = {delete: "/v1/auth/logout"};
  } */

import { useMutation } from "@tanstack/react-query";

import client from "@/api/client/axios";

export interface LogoutRequest {
  userId: string;
}

const logout = async ({ userId }: LogoutRequest) => {
  const response = await client.delete(`/auth/logout/${userId}`);

  return response.data;
};

const useLogout = () => {
  //use mutate
  return useMutation({
    mutationKey: ["user"],
    mutationFn: (userId: string) => logout({ userId }),
  });
};

export default useLogout;
