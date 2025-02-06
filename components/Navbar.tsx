"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Button from "./Button";
import useCurrentUser from "@/hooks/useCurrentuser";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: currentUser } = useCurrentUser();

  const handleClick = () => {
    if (currentUser) {
      router.push("/main");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div>
      {pathname === "/" && (
        <header className="w-full p-4 flex justify-between items-center bg-white shadow-md">
          {/* Mobile Hamburger Button */}

          <h1 className="text-2xl font-bold text-blue-600">Task Flow</h1>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <Button variant="primary" size="medium" onClick={handleClick}>
              {currentUser ? "Go to Dashboard" : "Get Started"}
            </Button>
          </nav>
        </header>
      )}
    </div>
  );
};

export default Navbar;
