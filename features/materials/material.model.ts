import mongoose, { Document } from "mongoose";

export interface IMaterial extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const materialSchema = new mongoose.Schema<IMaterial>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Material =
  mongoose.models.Material ||
  mongoose.model<IMaterial>("Material", materialSchema);

export default Material;
