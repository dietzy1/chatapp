import useGetAuth from "@/api/endpoints/auth/getAuth";
import Authentication from "@/views/authentication/Authentication";
import Login from "@/views/authentication/Login";
import Register from "@/views/authentication/Register";
import Chat from "@/views/chat/Chat";
import Landing from "@/views/landing/Landing";

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
  return (
    <RouterRoutes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<Navigate to="/chat" />} />
    </RouterRoutes>
  );
}

export default Routes;
