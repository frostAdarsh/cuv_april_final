import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["Admin", "ProductUser"],
    },
    receiver: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "receiverModel",
      },
    ],
    receiverModel: {
      type: String,
      required: true,
      enum: ["Admin", "ProductUser"],
    },
    text: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["normal", "resolved", "unresolved"],
      default: "normal",
    },
  },
  { timestamps: true }
);
