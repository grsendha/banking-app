"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (e) {}
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  const name = `${firstName} ${lastName}`;
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (e) {}
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");
    await account.deleteSession("current");
    return true;
  } catch (error) {}
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log("USER IN ACTIONS", user);
    return parseStringify(user);
  } catch (error) {
    console.log("ERROR IN ACTIONS", error);
    return null;
  }
}
