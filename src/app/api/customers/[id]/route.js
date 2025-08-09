import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const TENANT_ID = "D425F85C-D0DD-4524-BF12-A1AC57E07C4D";
const userId = "9ba54f0b-b936-4716-a03c-9e8a86b213c2";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/customer/${id}`, {
      headers: {
        "X-Tenant-Id": TENANT_ID,
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
  const customerData = await request.json();

  const dataToSend = {
    ...customerData,
    userId,
  };
  try {
    const { id } = await params;

    // Backend'e DELETE isteği gönder
    const response = await axios.delete(
      `${process.env.BACKEND_BASE_URL}/api/customer/${id}`,
      dataToSend,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": TENANT_ID,
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

export async function PUT(request, { params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const customerData = await request.json();
    const dataToSend = {
      ...customerData,
      userId,
    };
    const response = await axios.put(
      `${BACKEND_BASE_URL}/api/customer/${id}`,
      dataToSend,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": TENANT_ID,
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
