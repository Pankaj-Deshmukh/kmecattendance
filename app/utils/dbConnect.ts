import { MongooseModule } from '@nestjs/mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const dbConnect = MongooseModule.forRoot(MONGODB_URI);

export default dbConnect;
