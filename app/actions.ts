"use server";

import { clearSession } from "@/server/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await clearSession();
  redirect("/");
}
