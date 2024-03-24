import useGetAuth from "@/api/endpoints/auth/getAuth";
import Chat from "@/views/chat/Chat";
import Hero from "@/views/landing/Hero";
import Loading from "@/views/loading/loading";

import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { data, isPending, isLoading, error } = useGetAuth();

  if (isPending && isLoading) {
    return <Loading />;
  }

  if (error || !data?.userId) {
    return <Navigate to="/" />;
  }

  return children;
};

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Hero />} />
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
