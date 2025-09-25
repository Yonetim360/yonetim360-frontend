import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/logout`,
      { refreshToken: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    cookieStore.delete("refreshToken", { path: "/" });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
