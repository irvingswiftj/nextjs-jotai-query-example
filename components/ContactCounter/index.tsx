"use client";

import { contactsMutation } from "@/store/contacts";
import { useAtom } from "jotai";

export default function ContactCounter() {
  const [{ data: contacts = [], mutate, status }] = useAtom(contactsMutation);

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
      {["success", "idle"].indexOf(status) >= 0 ? (
        <>
          <span>Contacts: {contacts.length}</span>
          <a href="#" onClick={handleAddContact}>
            Add contact
          </a>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
