"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-white/30 backdrop-blur-lg shadow-md border-gray-200/50 mt-4 rounded-xl w-[95%] md:w-[100rem]"
            : "bg-white/0 backdrop-blur-lg rounded-b-lg w-full"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href={isLoggedIn ? "/home" : "/"}>
            <div className="text-xl font-semibold text-gray-800">
              ThrottleTribe
            </div>
          </Link>

          {/* Center: Nav links */}
          <nav className="hidden md:flex space-x-4 absolute left-1/2 -translate-x-1/2">
            {isLoggedIn ? (
              menuLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant="ghost">{link.label}</Button>
                </Link>
              ))
            ) : (
              <div className="flex gap-10">
                <Link
                  href="/#features"
                  className={`${
                    isScrolled ? "hover:underline" : "hover:text-white"
                  }`}
                >
                  Features
                </Link>
                <Link
                  href="/#testimonials"
                  className={`${
                    isScrolled ? "hover:underline" : "hover:text-white"
                  }`}
                >
                  Testimonials
                </Link>
                <Link
                  href="/#faq"
                  className={`${
                    isScrolled ? "hover:underline" : "hover:text-white"
                  }`}
                >
                  FAQ
                </Link>
              </div>
            )}
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
              <>
                <Link href="/login">
                  <Button className="bg-orange-500  hover:bg-white hover:text-orange-500">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="ml-4 bg-orange-500 text-white hover:bg-white hover:text-orange-500">
                    Sign Up
                  </Button>
                </Link>
              </>
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
              <SheetContent
                side="bottom"
                className="w-full pb-10 rounded-t-4xl"
              >
                <SheetHeader>
                  <SheetTitle className="text-center text-lg font-bold">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2 mt-4">
                  {isLoggedIn ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => handleClose("#features")}
                      >
                        Features
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => handleClose("#testimonials")}
                      >
                        Testimonials
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => handleClose("#faq")}
                      >
                        FAQ
                      </Button>
                      <div className="border-t my-3" />
                      {guestLinks.map((link) => (
                        <Button
                          variant="ghost"
                          className="w-full"
                          key={link.href}
                          onClick={() => handleClose(link.href)}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
