"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface HeroProps {
  name?: string; // Changed `String` to `string` here
}

const Hero: React.FC<HeroProps> = ({ name }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the desired page (e.g., "/signup")
    if (name) {
      router.push("/main");
    } else {
      router.push("/signup");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-full w-full gap-2 text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h2 className="text-5xl font-bold mb-4">
        {name ? `Welcome back, ${name}!` : "Organize Your Work, Your Way"}
      </h2>
      <p className="text-lg max-w-2xl mx-auto">
        {name
          ? "Go to your dashboard to maintain your tasks and stay on top of your work."
          : "Task Flow helps you manage tasks efficiently with a seamless workflow and an intuitive dashboard."}
      </p>
      <Button variant="secondary" size="large" onClick={handleClick}>
        {name ? "Go to Dashboard" : "Get Started"}{" "}
        {/* Nested the button text inside the Button component */}
      </Button>
    </section>
  );
};

export default Hero;
