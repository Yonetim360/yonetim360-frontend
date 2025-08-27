import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function GET(request, { params }) {
  const { id } = await params;

  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/customer/${id}`, {
      headers: {
        "Content-Type": "application/json",
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

export async function DELETE(request, { params }) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");
  try {
    const { id } = await params;

    // Backend'e DELETE isteği gönder
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/api/customer/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Customer deletion failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
