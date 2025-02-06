"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import ClientOnlyModal from "@/components/Modals/ClientOnlyModals";
import queryClient from "@/libs/reactQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 relative">
          <Toaster />
          {children}
        </main>
        <Footer />
        <ClientOnlyModal />
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;