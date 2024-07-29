"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryRewind from "react-query-rewind";
import { Provider } from "jotai/react";
import { PropsWithChildren } from "react";
import { getQueryClient } from "./get-query-client";

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {children}
        <ReactQueryDevtools />
        <ReactQueryRewind />
      </Provider>
    </QueryClientProvider>
  );
}
