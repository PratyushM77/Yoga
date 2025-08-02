const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
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
      enum: ["draft", "published"],
      default: "draft",
    },
    creator:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session
