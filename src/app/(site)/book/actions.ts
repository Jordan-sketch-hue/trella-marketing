"use server";
import { saveBookingRequest } from "@/lib/queries";
import { randomUUID } from "crypto";

export async function submitBookingForm(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const company = (formData.get("business") as string) || "";
    const service = (formData.get("service") as string) || "";
    const budget = (formData.get("budget") as string) || "";
    const goals = (formData.get("notes") as string) || "";
    const preferredDate = (formData.get("time") as string) || "";

    if (!name || !email) {
      return { ok: false, error: "Name and email are required." };
    }

    await saveBookingRequest({
      id: randomUUID(),
      name,
      email,
      phone,
      company,
      service,
      budget,
      goals,
      preferredDate,
    });

    return { ok: true };
  } catch (err) {
    console.error("submitBookingForm error:", err);
    return { ok: false, error: "Failed to save your booking request. Please try again." };
  }
}
