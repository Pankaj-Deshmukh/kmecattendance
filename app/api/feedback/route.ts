import Feedback from '@/app/models/Feedback';
import dbConnect from '@/app/utils/dbConnect';
import { NextRequest, NextResponse } from 'next/server';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const { name, email, message }: FeedbackData = data;
    const feedback = await Feedback.create({ name, email, message });
    return NextResponse.json({ success: true, data: feedback }, {status:200});
  } catch {
    return NextResponse.json({ success: false, error: "error posting the feedback" }, {status:400});
  }
}
