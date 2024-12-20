import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IFeedback extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const FeedbackSchema: Schema<IFeedback> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Feedback as Model<IFeedback>) ||
  mongoose.model<IFeedback>('Feedback', FeedbackSchema);
