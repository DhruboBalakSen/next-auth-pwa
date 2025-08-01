// app/dashboard/page.tsx
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md space-y-4">
        <p>
          <strong>ID:</strong> {session.user.id}
        </p>
        <p>
          <strong>Name:</strong> {session.user.name}
        </p>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <Image
          src={session.user.image || "/default.png"}
          alt="User profile image"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    </div>
  );
}
