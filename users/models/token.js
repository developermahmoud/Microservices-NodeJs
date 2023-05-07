import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expireAt: {
      type: Date,
      default: new Date(),
      expires: 3600,
    },
  },
  { timestamps: true }
);

export const Token = mongoose.model("Token", tokenSchema);
export const saveToken = async (userId, token) => new Token({ userId, token });
export const getByToken = async (token) => await Token.findOne({ token }).populate("userId");
