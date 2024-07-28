import { NextResponse } from "next/server";
import { findOrCreateUser, updateUser } from "@/models/Users";

const MOCK_USER = {
  email: "james@irving-swift.com",
  name: "James Irving-Swift",
};

export const GET = async function contacts(req) {
  const user = MOCK_USER;

  if (!user || !user.email) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const { contactList } = await findOrCreateUser(user);

  return NextResponse.json(contactList);
};

export const POST = async function contacts(req) {
  const user = MOCK_USER;

  if (!user || !user.email) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const result = await updateUser(user, body);

  return NextResponse.json(result.contactList);
};
