"use client";

import { contactCounterOptions } from "@/store/contacts";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export default function ContactCounter() {
  const { data } = useSuspenseQuery(contactCounterOptions);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (contact: Contact) => {
      const res = await fetch(`http://localhost:3000/api/contacts`, {
        method: "POST",
        body: JSON.stringify(contact),
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: contactCounterOptions.queryKey,
      });
    },
  });

  const handleAddContact = () => {
    mutation.mutate({
      name: `test name ${data.length + 1}`,
      email: "foo@bar.com",
    });
  };

  return (
    <>
      <span>Contacts: {data.length}</span>
      <a href="#" onClick={handleAddContact}>
        Add contact
      </a>
    </>
  );
}
