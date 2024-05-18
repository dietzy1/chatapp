import Chat from "@/views/chat/Chat";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
}

export default Routes;
