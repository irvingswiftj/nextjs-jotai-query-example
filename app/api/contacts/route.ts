import { NextResponse } from "next/server";

let contactList: [] = [];

export const GET = async function contacts(req) {
  return NextResponse.json(contactList);
};

export const POST = async function contacts(req) {
  const body = await req.json();

  contactList = body;

  return NextResponse.json(contactList);
};
