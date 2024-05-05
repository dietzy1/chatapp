import useGetAuth from "@/api/endpoints/auth/getAuth";
import Authentication from "@/views/authentication/Authentication";
import Chat from "@/views/chat/Chat";

import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, isLoading, error } = useGetAuth();

  if (isPending && isLoading) {
    return <Authentication />;
  }

  if (error || !data?.userId) {
    return <Navigate to="/register" />;
  }

  return children;
};

function Routes() {
  const { data, isPending, isLoading, error } = useGetAuth();

  return (
    <RouterRoutes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
}

export default Routes;
