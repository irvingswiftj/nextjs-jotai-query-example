import database from "@/lib/mongodb";

export interface UserProps {
  email: string;
  emailVerified: boolean;
  name: string;
  nickname: string;
  contactList: [];
}

export async function findOrCreateUser(user: any): Promise<UserProps> {
  const client = await database;
  const collection = client.collection("users");

  let result = await collection.findOne({ email: user.email });

  if (!result && user.email) {
    await collection.insertOne({
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      emailVerified: user.email_verified || false,
      contactList: [],
    });
    result = await collection.findOne({ email: user.email });
  }

  if (!result) {
    throw new Error("User not found nor could be created");
  }

  return {
    email: result.email,
    name: result.name,
    nickname: result.nickname,
    emailVerified: result.emailVerified,
    contactList: result.contactList,
  };
}

export async function updateUser(
  user: any,
  contactList: []
): Promise<UserProps> {
  const client = await database;
  const collection = client.collection("users");

  const result = await collection.findOneAndUpdate(
    { email: user.email },
    { $set: { contactList } },
    { returnDocument: "after" }
  );

  if (!result) {
    throw new Error("User not found");
  }

  return {
    email: result.email,
    name: result.name,
    nickname: result.nickname,
    emailVerified: result.emailVerified,
    contactList: result.contactList,
  };
}
