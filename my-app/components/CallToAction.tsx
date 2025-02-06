"use client";

import React, { useCallback } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push("/signin");
  }, [router]);
  return (
    <section className="py-16 bg-blue-600 text-white text-center w-full">
      <h2 className="text-3xl font-bold">Boost Your Productivity Today</h2>
      <p className="max-w-2xl mx-auto mt-2 mb-2">
        Join thousands of users who rely on Task Flow to streamline their
        workflow.
      </p>
      <Button
        variant="secondary"
        size="large"
        onClick={handleClick}
        children="GetStarted"
      />
    </section>
  );
};

export default CallToAction;
