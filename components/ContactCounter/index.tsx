"use client";

import { contactsMutation } from "@/store/contacts";
import { useAtom } from "jotai";

export default function ContactCounter() {
  const [{ data = [], mutate, status }] = useAtom(contactsMutation);

  const handleAddContact = () => {
    mutate({
      name: `test name ${data.length + 1}`,
      email: "foo@bar.com",
    });
  };

  return (
    <>
      {data ? <span>Contacts: {data.length}</span> : null}
      <a href="#" onClick={handleAddContact}>
        Add contact
      </a>
    </>
  );
}
