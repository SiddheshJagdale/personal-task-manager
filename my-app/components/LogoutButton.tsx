"use client";

import { useCallback } from "react";
import { signOut } from "next-auth/react";
import Button from "@/components/Button"; // Ensure this path is correct
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleClick = useCallback(async () => {
    await signOut();
    router.push("/");
    toast.success("Logged out");
  }, [router]);

  return (
    <Button variant="primary" size="large" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
