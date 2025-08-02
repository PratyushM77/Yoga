// YogaCard.jsx
import React from "react";
import { motion } from "framer-motion";

function YogaCard({ pose, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 hover:shadow-2xl transition duration-300 cursor-pointer"
    >
      <div className="flex h-cover">
        <div className="w-full h-40 bg-white flex justify-center items-center overflow-hidden rounded-t-xl">
          <img
            src={
              pose?.url_png ||
              "https://cdn.prod.website-files.com/65302a23c6b1d938427b07fe/666c4a49e519be9e21c75d64_yoga%20blog%20photo.jpg"
            }
            alt={pose?.english_name || "Yoga Pose"}
            className="h-full w-auto"
          />
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {pose?.sanskrit_name || "Sanskrit Name"}
        </h2>
        <p className="text-gray-500 text-sm mb-3">
          {pose?.english_name || "English Name"}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
            Level: {pose?.difficulty_level || "Beginner"}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
            Category: Pose
          </span>
          <div className="text-xs text-c px-2 py-1 rounded-full font-semibold">
            By: {pose.creator || "Anonymous"}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default YogaCard;
