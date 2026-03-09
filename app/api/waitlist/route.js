import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const scriptURL = process.env.GOOGLE_SCRIPT_URL;

    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({ email }),
      redirect: "follow"
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Google Script failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error("API error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}