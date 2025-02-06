// app/api/current/route.ts

import serverAuth from "@/libs/serverauth"; // Import your serverAuth function
import { NextResponse } from "next/server"; // Next.js App Router's response handling

export async function GET() {
  try {
    // Fetch the current user using serverAuth
    const currentUser = await serverAuth();

    // Return the current user data as JSON
    return NextResponse.json(currentUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
