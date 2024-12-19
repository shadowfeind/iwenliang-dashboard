import mongoose, { Document, Schema } from "mongoose";

interface ISubscriber extends Document {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Subscriber =
  mongoose.models?.Subscriber ||
  mongoose.model<ISubscriber>("Subscriber", subscriberSchema);

export default Subscriber;
