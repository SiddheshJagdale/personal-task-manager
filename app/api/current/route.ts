// app/api/current/route.ts

import serverAuth from "@/libs/serverauth"; // Import your serverAuth function
import { NextResponse } from "next/server"; // Next.js App Router's response handling

export async function GET() {
  try {
    const currentUser = await serverAuth();

    return NextResponse.json(currentUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
