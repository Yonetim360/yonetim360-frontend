import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { firstName, lastName, email, password } = await request.json();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Müşteri oluşturulamadı" },
      { status: 500 }
    );
  }
}
