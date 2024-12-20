import Feedback from '@/app/models/Feedback';
import dbConnect from '@/app/utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, email, message }: FeedbackData = req.body;
      const feedback = await Feedback.create({ name, email, message });
      res.status(201).json({ success: true, data: feedback });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
