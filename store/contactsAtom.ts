import { atomWithMutation, atomWithQuery } from "jotai-tanstack-query";
import { useQueryClient } from "@tanstack/react-query";

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
  onSuccess: (data, variables, context) => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
  },
}));

export default contactsAtom;
