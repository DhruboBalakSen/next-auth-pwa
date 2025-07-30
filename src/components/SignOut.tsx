"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export default function SignOutButton({
  label,
}: {
  label: string | ReactNode;
}) {
  return (
    <Button
      variant={"destructive"}
      onClick={() => signOut({ redirectTo: "/" })}
    >
      {label}
    </Button>
  );
}
