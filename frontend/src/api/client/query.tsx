import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";

// Create react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15, // 15 minutes
      gcTime: 1000 * 60 * 15, // 15 minutes

      notifyOnChangeProps: ["data", "isLoading", "error"],
    },
  },
});

interface ChildrenProps {
  children: ReactNode;
}

function ReactQueryClientProvider({ children }: ChildrenProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryClientProvider;
