import mongoose, { Document } from "mongoose";

export interface IBeadSize extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const beadSizeSchema = new mongoose.Schema<IBeadSize>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
  }
);

const BeadSize =
  mongoose.models?.BeadSize ||
  mongoose.model<IBeadSize>("BeadSize", beadSizeSchema);

export default BeadSize;
