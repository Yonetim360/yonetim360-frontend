import { NextResponse } from "next/server";
import axios from "axios";
import useAuthStore from "@/stores/crm/shared/AuthStore";

export async function POST(request) {
  try {
    const { accessToken } = useAuthStore.setState();
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (refreshToken) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/logout`,
          { refreshToken },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        console.error("Backend logout error:", error);
      }
    }
    const nextResponse = NextResponse.json({
      success: true,
      message: "Çıkış yapıldı",
    });

    accessToken.set(null);
    nextResponse.cookies.delete("refresh-token");

    return nextResponse;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 });
  }
}
