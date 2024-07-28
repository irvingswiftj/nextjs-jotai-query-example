"use client";

import contactsAtom, { contactsMutation } from "@/store/contactsAtom";
import { useAtom } from "jotai";

export default function Home() {
  const [{ data: contacts = [], isPending, isError }] = useAtom(contactsAtom);
  const [{ mutate, status }] = useAtom(contactsMutation);

  const handleAddContact = () => {
    mutate([
      ...contacts,
      {
        name: `test name ${new Date()}`,
        birthday: [1, 1, 2000],
        anniversary: [1, 2, 2000],
      },
    ]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span>Contacts: {contacts.length}</span>
      <a href="#" onClick={handleAddContact}>
        Add contact
      </a>
    </main>
  );
}
