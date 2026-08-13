import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AdminPropertiesManager } from "./properties-manager";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "admin") {
    redirect("/auth/signin?callbackUrl=/admin/imoveis");
  }

  return <AdminPropertiesManager />;
}
