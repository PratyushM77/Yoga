import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PoseModal({ show, onClose, pose }) {
  const modalRef = useRef();
// Never used modal/framer motion before. Vibecoded all the framer motion thing for smooth/delicate ui.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 backdrop-blur-[4px] bg-white/30 flex justify-center items-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-xl relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>


          <img
            src={pose?.url_png || pose?.json_file_url}

            alt={pose?.english_name || pose?.title}
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{pose?.sanskrit_name || pose?.title}</h2>
          <p className="text-gray-600 mb-2 italic">{pose?.english_name || pose?.tags}</p>
          <p className="text-gray-600 text-sm mb-2 "><strong>Benefit</strong> : {pose?.pose_benefits || pose?.benefit}</p>
          <p className="text-sm text-gray-700">
            {pose?.pose_description  || pose?.description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PoseModal;
