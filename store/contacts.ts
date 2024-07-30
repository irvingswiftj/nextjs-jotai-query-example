import { atomWithMutation } from "jotai-tanstack-query";

const mutationKey = ["contacts"];

export const contactsMutation = atomWithMutation(() => ({
  queryKey: mutationKey,
  queryFn: async () => {
    const res = await fetch(`/api/contacts`);
    return res.json();
  },
  mutationKey,
  mutationFn: async (contact: Contact) => {
    const res = await fetch(`/api/contacts`, {
      method: "POST",
      body: JSON.stringify(contact),
    });
    const data = await res.json();
    return data;
  },
}));
