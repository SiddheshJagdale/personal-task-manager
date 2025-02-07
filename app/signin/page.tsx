"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { loginUser } from "@/ReactQuery/mutations/loginUser"; // Import the loginUser function

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Use React Query's useMutation to handle the login request
  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser, // Use the imported loginUser function
    onSuccess: async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Logged in successfully");
      router.push("/"); // Redirect after success
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Login failed");
    },
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent form submission from refreshing the page

      if (!email) return toast.error("Email cannot be empty");
      if (!password) return toast.error("Password cannot be empty");

      const loadingToast = toast.loading("Signing in..."); // Show loading state

      try {
        await mutateAsync({ email, password }); // Trigger the mutation with user data
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Some error occured while loggin in.");
        }
      } finally {
        toast.dismiss(loadingToast); // Dismiss loading state regardless of success or failure
      }
    },
    [email, password, mutateAsync]
  );

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Blue background */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600">
        <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
        <p className="mt-4 text-white text-center">
          Sign in to continue managing your tasks efficiently.
        </p>
      </div>

      {/* Right Section - White background */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-2xl font-bold text-black">Sign In</h2>
        <form
          className="w-full max-w-sm mt-6 space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isPending}
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-black">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
