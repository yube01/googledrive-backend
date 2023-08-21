import mongoose from "mongoose";

const deletedFolder = new mongoose.Schema({
  folderName: String,
  owner: String,
  deletedAt: { type: Date, default: Date.now },
});

export const Delete = mongoose.model("Deleted", deletedFolder);
