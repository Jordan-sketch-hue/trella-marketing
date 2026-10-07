import { PORTAL_CLIENT_ID, clientContent } from "@/lib/data";
import ContentBoard from "./ContentBoard";

export const metadata = { title: "Content & Approvals · Client Portal" };

export default function ContentPage() {
  const items = clientContent(PORTAL_CLIENT_ID);
  return <ContentBoard items={items} />;
}
