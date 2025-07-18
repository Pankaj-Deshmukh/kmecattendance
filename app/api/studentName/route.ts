// app/api/studentName/route.ts

import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { rollNumber } = await req.json();

    // Validate the roll number
    if (!rollNumber || rollNumber.length !== 12) {
      return NextResponse.json(
        { error: "Please provide a valid 12-digit roll number." },
        { status: 400 }
      );
    }

    const targetUrl = process.env.OU_URI;
    const formBody = new URLSearchParams();
    formBody.append("htno", rollNumber);
    formBody.append("mbstatus", "SEARCH");

    // Make the POST request to the external service
    const response = await axios.post(`${targetUrl}`, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const htmlResponse = response.data;
    const $ = cheerio.load(htmlResponse);

    // Parse the HTML to find the name
    const nameCell = $("td").filter(function () {
      return $(this).text().trim() === "Name";
    });
    let studentName = null;

    if (nameCell.length > 0) {
      studentName = nameCell.next().find("b").text().trim();
    }

    if (studentName) {
      return NextResponse.json({ name: studentName });
    } else {
      return NextResponse.json(
        {
          error:
            "Could not find the student's name. The roll number might be invalid.",
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
