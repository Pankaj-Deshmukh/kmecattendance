import Feedback from '@/app/models/Feedback';
import dbConnect from '@/app/utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    const { name, email, message }: FeedbackData = req.body;
    const feedback = await Feedback.create({ name, email, message });
    return NextResponse.json({ success: true, data: feedback }, {status:200});
  } catch {
    return NextResponse.json({ success: false, error: "error posting the feedback" }, {status:400});
  }
}
