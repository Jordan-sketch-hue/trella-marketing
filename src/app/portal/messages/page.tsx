import { PORTAL_CLIENT_ID, clientThreads } from "@/lib/data";
import Messenger from "./Messenger";

export const metadata = { title: "Messages · Client Portal" };

export default function MessagesPage() {
  const threads = clientThreads(PORTAL_CLIENT_ID);
  return <Messenger threads={threads} />;
}
