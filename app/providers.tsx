"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryRewind from "react-query-rewind";
import { Provider } from "jotai/react";
import { PropsWithChildren, Suspense } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export const contactsAtom = atomWithQuery(() => ({
  queryKey: ["contacts"],
  queryFn: async () => {
    const res = await fetch(`/api/contacts`);
    return res.json();
  },
}));

export const contactsMutation = atomWithMutation(() => ({
  mutationKey: ["contacts"],
  mutationFn: async (contacts) => {
    const res = await fetch(`/api/contacts`, {
      method: "POST",
      body: JSON.stringify(contacts),
    });
    const data = await res.json();
    return data;
  },
}));

export default function Providers({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Suspense fallback="loading...">{children}</Suspense>
        <ReactQueryDevtools />
        <ReactQueryRewind />
      </Provider>
    </QueryClientProvider>
  );
}
