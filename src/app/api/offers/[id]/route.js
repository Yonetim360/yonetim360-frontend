import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Yetkisiz Giriş" }, { status: 401 });
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/offer/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // axios zaten hata fırlatır response 200 değilse
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Teklif verileri alınamadı" },
      { status: 500 }
    );
  }
}
