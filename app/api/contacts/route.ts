import { NextRequest, NextResponse } from "next/server";

let contactList: Contact[] = [];

export const GET = async function contacts() {
  return NextResponse.json(contactList);
};

export const POST = async function contacts(req: NextRequest) {
  const body = await req.json();

  contactList = [
    ...contactList,
    {
      name: body.name,
      email: body.email,
    },
  ];

  return NextResponse.json(contactList);
};
