import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const TENANT_ID = "D425F85C-D0DD-4524-BF12-A1AC57E07C4D";
const userId = "9ba54f0b-b936-4716-a03c-9e8a86b213c2";

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/offer`, {
      headers: {
        "X-Tenant-Id": TENANT_ID,
      },
    });

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
