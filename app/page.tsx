"use client";

import React from "react";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import CallToAction from "@/components/CallToAction";
import useCurrentUser from "@/hooks/useCurrentuser";

export default function LandingPage() {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {currentUser ? (
        <div className="flex flex-col items-center w-full h-screen">
          <Hero name={currentUser?.name} />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-auto ">
          <Hero />
          <Featured />
          <CallToAction />
        </div>
      )}
    </>
  );
}
