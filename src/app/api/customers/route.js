import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function GET(request) {
  try {
    const accessToken = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token gerekli" },
        { status: 401 }
      );
    }

    const response = await axios.get(`${BACKEND_BASE_URL}/api/customer`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // axios zaten hata fırlatır response 200 değilse
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Müşteri verileri alınamadı" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request) {
  try {
    const customerData = await request.json();
    console.log("Customer Data:", customerData);

    const accessToken = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token gerekli" },
        { status: 401 }
      );
    }

    const response = await axios.post(
      `${BACKEND_BASE_URL}/api/customer`,
      customerData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Create Error:", error);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Müşteri oluşturulamadı" },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(request) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token gerekli" },
      { status: 401 }
    );
  }

  try {
    const customerData = await request.json();

    const sendToData = {
      customerDto: {
        ...customerData,
      },
    };

    const response = await axios.put(
      `${BACKEND_BASE_URL}/api/customer`,
      sendToData,
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
      { error: "Müşteri verileri güncellenemedi" },
      {
        status: 500,
      }
    );
  }
}
