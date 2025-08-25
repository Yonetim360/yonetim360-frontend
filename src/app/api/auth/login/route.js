import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/login`,
      {
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

    // Backend'den gelen token'ı al (response.data.token veya response.data.accessToken gibi)
    console.log(response.data);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const userData = {
      id: response.data.id,
      fullName: response.data.fullName,
      email: response.data.email,
    };

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "Token alınamadı" }, { status: 500 });
    }

    // NextResponse oluştur
    const nextResponse = NextResponse.json({
      success: true,
      message: "Giriş başarılı",
      user: userData,
      accessToken: accessToken,
    });

    // HttpOnly cookie ayarla
    nextResponse.cookies.set({
      name: "refresh-token", // Cookie adı
      value: refreshToken,
      httpOnly: true, // XSS saldırılarını önler
      secure: process.env.NODE_ENV === "production", // Production'da HTTPS zorunlu
      sameSite: "strict", // CSRF saldırılarını önler
      maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24,
      path: "/", // Tüm site için geçerli
    });

    return nextResponse;
  } catch (error) {
    console.error("API Error:", error);

    // Hata mesajını daha spesifik yap
    const errorMessage = error.response?.data?.message || "Giriş yapılamadı";
    const statusCode = error.response?.status || 500;

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

// // Logout için de bir route ekleyebilirsin
// export async function DELETE(request) {
//   try {
//     const response = NextResponse.json({
//       success: true,
//       message: "Çıkış yapıldı",
//     });

//     // Cookie'yi sil
//     response.cookies.set({
//       name: "session-token",
//       value: "",
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 0, // Hemen sil
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("Logout Error:", error);
//     return NextResponse.json({ error: "Çıkış yapılamadı" }, { status: 500 });
//   }
// }
