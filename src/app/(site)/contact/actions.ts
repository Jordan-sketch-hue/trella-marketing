"use server";
import { saveContactSubmission } from "@/lib/queries";
import { randomUUID } from "crypto";

export async function submitContactForm(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = (formData.get("business") as string) || "";
    const message = (formData.get("message") as string) || "";

    if (!name || !email) {
      return { ok: false, error: "Name and email are required." };
    }

    await saveContactSubmission({
      id: randomUUID(),
      name,
      email,
      company,
      message,
    });

    return { ok: true };
  } catch (err) {
    console.error("submitContactForm error:", err);
    return { ok: false, error: "Failed to save your message. Please try again." };
  }
}
