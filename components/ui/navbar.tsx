"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">MeritLink</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="md:flex hidden items-center space-x-4 ml-auto">
          <Link 
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard" ? "text-black dark:text-white" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="mr-2"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
              >
                <Image
                  src="/placeholder-avatar.svg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button 
                  className="w-full text-left"
                  onClick={() => {
                    // Add your logout logic here
                    console.log("Logout clicked");
                  }}
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden ml-auto">
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
              >
                <Image
                  src="/placeholder-avatar.svg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link 
                  href="/dashboard"
                  className={pathname === "/dashboard" ? "text-black dark:text-white" : "text-muted-foreground"}
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <button 
                  className="w-full text-left"
                  onClick={() => {
                    // Add your logout logic here
                    console.log("Logout clicked");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <button 
                  className="w-full text-left flex items-center"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="ml-2">Toggle theme</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}