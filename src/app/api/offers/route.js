import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Yetkisiz Giriş" }, { status: 401 });
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/offer`,
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

export async function POST(request) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "Yetkisiz Giriş" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/offer`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Teklif verileri alınamadı" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");
  if (!accessToken) {
    return NextResponse.json({ error: "Yetkisiz Giriş" }, { status: 401 });
  }
  try {
    const data = await request.json();
    console.log("data:", data);

    const dataToSend = {
      offerDto: {
        ...data,
      },
    };
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/offer/`,
      dataToSend,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Teklif verileri güncellenemedi" },
      { status: 500 }
    );
  }
}
