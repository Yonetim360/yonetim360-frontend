import axios from "axios";
import { NextResponse } from "next/server";

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
