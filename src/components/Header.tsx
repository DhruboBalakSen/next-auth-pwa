"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import SignOutButton from "./SignOut";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  const menuLinks = [
    { label: "Home", href: "/home" },
    { label: "Blogs", href: "/blogs" },
    { label: "Trips", href: "/trips" },
  ];

  const guestLinks = [{ label: "Login", href: "/login" }];
  const handleClose = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 125);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-4 px-6">
      <div className="max-w-full mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href={isLoggedIn ? "/home" : "/"}>
          <div className="text-xl font-semibold text-gray-800">
            ThrottleTribe
          </div>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex space-x-4 absolute left-1/2 -translate-x-1/2">
          {isLoggedIn
            ? menuLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant="ghost">{link.label}</Button>
                </Link>
              ))
            : null}
        </nav>

        {/* Right: Avatar + Logout */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={session.user?.image || "/default.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {session.user?.name?.[0]?.toUpperCase() ??
                      session.user?.email?.[0]?.toUpperCase() ??
                      "TT"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <SignOutButton label={<LogOut />} />
            </>
          ) : (
            guestLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost">{link.label}</Button>
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="w-full pb-10 rounded-t-4xl">
              <SheetHeader>
                <SheetTitle className="text-center text-lg font-bold">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-2 mt-4">
                {menuLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="w-full"
                    onClick={() => handleClose(link.href)}
                  >
                    {link.label}
                  </Button>
                ))}

                <div className="border-t my-3" />

                {isLoggedIn ? (
                  <div className="flex items-center justify-between gap-3 px-2">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => handleClose("/profile")}
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={session.user?.image || "/default.png"}
                          alt="User Avatar"
                        />
                        <AvatarFallback>
                          {session.user?.name?.[0]?.toUpperCase() ??
                            session.user?.email?.[0]?.toUpperCase() ??
                            "TT"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        Hi, {session.user?.name || session?.user?.email}
                      </span>
                    </div>
                    <SignOutButton label="Logout" />
                  </div>
                ) : (
                  guestLinks.map((link) => (
                    <Button
                      variant="ghost"
                      className="w-full"
                      key={link.href}
                      onClick={() => handleClose(link.href)}
                    >
                      {link.label}
                    </Button>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
