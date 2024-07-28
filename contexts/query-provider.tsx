"use client";

import { PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {children}
        {/* <ReactQueryDevtools /> */}
      </Provider>
    </QueryClientProvider>
  );
};
