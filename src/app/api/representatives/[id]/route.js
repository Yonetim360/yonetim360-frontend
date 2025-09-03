import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/representative/${id}`,
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

export async function DELETE(request, { params }) {
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  try {
    const { id } = await params;

    // Backend'e DELETE istegi gonder
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/representative/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Representative deletion failed" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      message: "Representative deleted successfully",
    });
  } catch (error) {
    console.error("Delete representative error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
