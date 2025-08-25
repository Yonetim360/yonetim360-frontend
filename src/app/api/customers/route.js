import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function GET(request) {
  try {
    const accessToken = request.headers
      .get("Authorization")
      ?.replace("Bearer ", "");
    const response = await axios.get(`${BACKEND_BASE_URL}/api/customer`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // axios zaten hata fırlatır response 200 değilse
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Müşteri verileri alınamadı" },
      { status: 500 }
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
    return NextResponse.json(
      { error: "Müşteri oluşturulamadı" },
      { status: 500 }
    );
  }
}
