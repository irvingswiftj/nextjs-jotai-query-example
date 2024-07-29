import { atomWithMutation } from "jotai-tanstack-query";

export const contactsMutation = atomWithMutation(() => ({
  queryKey: ["contacts"],
  queryFn: async () => {
    const res = await fetch(`/api/contacts`);
    return res.json();
  },
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
