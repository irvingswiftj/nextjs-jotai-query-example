import ContactCounter from "@/components/ContactCounter";
import { Suspense } from "react";
import { getQueryClient } from "./get-query-client";
import { contactCounterOptions } from "@/store/contacts";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(contactCounterOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ContactCounter />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}
