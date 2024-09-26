import mongoose, { Document } from "mongoose";

interface IColor extends Document {
  name: string;
  hexValue: string;
}

const colorSchema = new mongoose.Schema<IColor>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    hexValue: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Color =
  mongoose.models.Color || mongoose.model<IColor>("Color", colorSchema);
export default Color;
