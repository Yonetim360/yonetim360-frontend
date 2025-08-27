import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "Refresh token yok" }, { status: 401 });
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/access-token`,
      { refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const nextResponse = NextResponse.json({
      user: {
        userId: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email,
      },
      accessToken: response.data.accessToken,
    });

    // Önceki refresh token'ı sil
    nextResponse.cookies.set({
      name: "refresh-token",
      value: "",
      expires: new Date(0),
    });

    // 1 saniye delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Yeni refresh token'ı cookie'ye kaydet (eğer backend gönderdiyse)
    if (response.data.refreshToken) {
      nextResponse.cookies.set({
        name: "refresh-token",
        value: response.data.refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 gün
      });
    }

    return nextResponse;
  } catch (error) {
    // Axios error handling
    if (error.response) {
      // 401 durumunda refresh token cookie'sini temizle
      if (error.response.status === 401) {
        const errorResponse = NextResponse.json(
          {
            error: "Invalid refresh token",
            details: error.response.data,
            shouldLogout: true,
          },
          { status: 401 }
        );

        errorResponse.cookies.set({
          name: "refresh-token",
          value: "",
          expires: new Date(0),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        return errorResponse;
      }

      return NextResponse.json(
        {
          error: "Backend error",
          details: error.response.data,
          status: error.response.status,
        },
        { status: error.response.status }
      );
    }

    // Network error
    if (error.request) {
      return NextResponse.json(
        { error: "Network error - backend unreachable" },
        { status: 503 }
      );
    }

    // Other errors
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
