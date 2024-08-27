import mongoose, { Document, Schema } from "mongoose";

interface ISession extends Document {
  user_id: Schema.Types.ObjectId;
  expires_at: Date;
}

const sessionSchema = new Schema<ISession>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  expires_at: {
    type: Date,
    required: true,
  },
});

const Session =
  mongoose.models.session || mongoose.model<ISession>("Session", sessionSchema);
export default Session;
