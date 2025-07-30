"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (status === "loading") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      const { url } = await res.json();

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Profile updated");

      // Optionally refetch session
      await update({ image: url, name: name });
    } catch {
      toast.error("There was a problem updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(80vh)] flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : session?.user?.image || ""
                  }
                  alt="Profile"
                />
                <AvatarFallback>
                  {session?.user?.name?.[0]?.toUpperCase() ??
                    session?.user?.email?.[0]?.toUpperCase() ??
                    "TT"}
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {loading ? "Saving..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
