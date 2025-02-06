import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Task Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MainLayout> {children}</MainLayout>
      </body>
    </html>
  );
}
