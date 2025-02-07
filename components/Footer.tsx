"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <footer className="w-full p-6 bg-white text-blue-600 text-center">
          <p>&copy; 2025 Task Flow. All rights reserved.</p>
        </footer>
      )}
    </>
  );
};

export default Footer;
