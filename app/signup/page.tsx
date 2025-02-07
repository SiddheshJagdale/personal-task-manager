"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { registerUser } from "@/ReactQuery/mutations/registerUser"; // Import the registerUser function
import { RegisterUserData } from "@/ReactQuery/types/registerUser"; // Import the data types

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const id = uuidv4();
  const router = useRouter();

  const handleSubmit = useCallback(async () => {
    // Input validation
    if (!name) return toast.error("Name cannot be empty");
    if (!email) return toast.error("Email cannot be empty");
    if (!password) return toast.error("Password cannot be empty");
    if (password.length < 6) return toast.error("Password is too short");
    if (!confirmPassword)
      return toast.error("Confirm password cannot be empty");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    const userData: RegisterUserData = {
      id,
      name,
      email,
      password,
    };

    try {
      setIsLoading(true);
      const response = await registerUser(userData); // Use the imported registerUser function

      if (response?.user) {
        toast.success("User created successfully!");
        router.push("/signin");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("User already exists!");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [name, email, password, confirmPassword, router, id]);

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-600 text-white">
        <h2 className="text-3xl font-bold">Join Us!</h2>
        <p className="mt-4 text-center">
          Create an account to start managing your tasks efficiently.
        </p>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <h2 className="text-2xl font-bold text-blue-600">Sign Up</h2>
        <form
          className="w-full max-w-sm mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Name Field */}
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-md bg-white text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password Field */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md bg-white text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-600"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md bg-white text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-600"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-black">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
