import { NextRequest, NextResponse } from "next/server";

let contactList: [] = [];

export const GET = async function contacts() {
  return NextResponse.json(contactList);
};

export const POST = async function contacts(req: NextRequest) {
  const body = await req.json();

  contactList = body;

  return NextResponse.json(contactList);
};
