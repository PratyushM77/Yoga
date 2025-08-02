const mongoose = require("mongoose");
const DraftSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: true,
    },
    json_file_url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefit: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft"],
      default: "draft",
    },
    creator:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);
const DraftSession = mongoose.model("DraftSession", DraftSchema);
module.exports = DraftSession
