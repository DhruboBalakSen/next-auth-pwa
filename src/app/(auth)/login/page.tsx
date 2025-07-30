"use client";

import GoogleSVG from "@/components/GoogleSVG";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const redirectTo = searchParams.get("callbackUrl") || "/home";

  useEffect(() => {
    if (error === "OAuthCallback") {
      toast.error("Google login failed. Please try again.");
    } else if (error === "CredentialsSignin") {
      toast.error("Invalid email or password.");
    } else if (error === "AccessDenied") {
      toast.error("Access denied.");
    } else if (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [error]);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  };

  return (
    <div className="min-h-[calc(80vh)] flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleCredentialsLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div>
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-end text-xs text-muted-foreground">
                <Link href="/forgot-password">Forgot Password?</Link>
              </div>
            </div>

            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              type="submit"
            >
              Login with Email
            </Button>
          </CardContent>
        </form>

        <CardFooter className="flex flex-col space-y-2">
          <div className="w-full flex items-center justify-center">
            <span className="text-sm text-muted-foreground">OR</span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <GoogleSVG />
            Sign in with Google
          </Button>
          <div className="text-sm text-muted-foreground">
            Don&apos;t have an account? <Link href="/register">Sign up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
