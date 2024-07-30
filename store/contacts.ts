import { queryOptions } from "@tanstack/react-query";

const mutationKey = ["contacts"];

const getContacts = async () => {
  const res = await fetch(`http://localhost:3000/api/contacts`);
  return await res.json();
};

export const contactCounterOptions = queryOptions({
  queryKey: mutationKey,
  queryFn: async () => {
    return await getContacts();
  },
});
