import { UsersManager } from "./users-manager";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  return <UsersManager currentUserEmail={session?.user?.email ?? undefined} />;
}
