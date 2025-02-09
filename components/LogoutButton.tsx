"use client";

import { useCallback } from "react";
import { signOut } from "next-auth/react";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleClick = useCallback(async () => {
    try {
      await signOut({ redirect: false });
      toast.success("Logged out");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  }, [router]);

  return (
    <Button variant="primary" size="large" onClick={handleClick}>
      Logout
    </Button>
  );
};

export default LogoutButton;
