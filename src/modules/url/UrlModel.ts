import { model, Schema, Document } from "mongoose";
import { normalizeUrl } from "../../utils";

const schema = new Schema(
  {
    originalURL: {
      type: String,
      required: true,
      trim: true,
    },
    hash: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

schema.pre<IUrl>("save", async function preSave() {
  if (
    this.isModified("originalURL") &&
    this.originalURL &&
    typeof this.originalURL === "string"
  ) {
    this.originalURL = normalizeUrl(this.originalURL);
  }
});

export interface IUrl extends Document {
  originalURL: string;
  hash: string;
  expiresAt?: Date;
  createdAt: Date;
}

const Url = model<IUrl>("Url", schema);

export default Url;
