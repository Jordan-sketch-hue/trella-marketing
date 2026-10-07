import { PORTAL_CLIENT_ID, getClient } from "@/lib/data";
import SettingsForm from "./SettingsForm";

export const metadata = { title: "Settings · Client Portal" };

export default function SettingsPage() {
  const client = getClient(PORTAL_CLIENT_ID)!;
  return <SettingsForm client={client} />;
}
