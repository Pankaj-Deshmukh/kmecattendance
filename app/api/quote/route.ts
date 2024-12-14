import axios from "axios";
import { NextResponse } from "next/server";

interface Quote {
    q: string,
    a: string,
    h: string
  }
export async function GET(res:Quote){
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        return NextResponse.json(response.data); // Send the quote data to the frontend
      } catch (error) {
        return NextResponse.json({status:500},{statusText:'Error fetching quote'});
      }
}
