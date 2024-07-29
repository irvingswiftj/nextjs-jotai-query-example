"use client";

import { contactsAtom, contactsMutation } from "@/app/providers";
import { useAtom } from "jotai";

export default function ContactCounter() {
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
    <>
      <span>Contacts: {contacts.length}</span>
      <a href="#" onClick={handleAddContact}>
        Add contact
      </a>
    </>
  );
}
