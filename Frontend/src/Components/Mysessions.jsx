import React from "react";
import { motion } from "framer-motion";
import { handleError, handleSuccess } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PoseModal from "./PoseModal";
import Loader from "./Loader";
function Mysessions() {
  const [getData, setgetData] = useState([]);
  const [selectedPose, setSelectedPose] = useState(null);
  const user_id = localStorage.getItem("user_id");
  const [toggleSession, settoggleSession] = useState(false);
  const navigate = useNavigate();
  const fetchsession = async () => {
    try {
      const response = await fetch(
        !toggleSession
          ? `https://yoga-backend-53u6.onrender.com/my-sessions/${user_id}`
          : "https://yoga-backend-53u6.onrender.com/my-sessions",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();

      if (response.ok && result.session) {
        handleSuccess("Getting your data");

        setgetData(result.session);
      } else {
        localStorage.clear();
        navigate("/login");
        handleError("Kindly Login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchsession();
  }, [toggleSession]);
  const otherSession = () => {
    settoggleSession(!toggleSession);
  };
  useEffect(() => {
  if (getData.length === 0) {
    const timeout = setTimeout(() => {
      const ask = window.confirm("Create your session first");
      if (ask || !ask) {
        navigate("/publishsession");
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }
}, [getData]);


  return (
    <>
      {!getData.length == 0 ? (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Your Session
            </h1>

            <label className="inline-flex items-center cursor-pointer">
              <input
                onClick={otherSession}
                type="checkbox"
                value=""
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-500">
                Get Everyone's Session
              </span>
            </label>
          </div>{" "}
          <div className="flex flex-wrap justify-center gap-6">
            {getData.map((pose, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  setSelectedPose(pose);
                }}
                pose={pose}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 hover:shadow-2xl transition duration-300 cursor-pointer"
              >
                <div className="flex h-cover">
                  <div className="w-full h-40 bg-white flex justify-center items-center overflow-hidden rounded-t-xl">
                    <img
                      src={
                        pose?.json_file_url ||
                        "https://cdn.prod.website-files.com/65302a23c6b1d938427b07fe/666c4a49e519be9e21c75d64_yoga%20blog%20photo.jpg"
                      }
                      alt={pose?.english_name || "Yoga Pose"}
                      className="h-full w-auto"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {pose?.title || "Sanskrit Name"}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    Tags: {pose?.tags || "English Name"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      Level: {pose?.difficulty_level || "Custom"}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      Category: Pose
                    </span>
                  </div>
                  <div className="text-xs mt-2 text-c px-2 py-1 rounded-full font-semibold">
                    Creator: {pose.creator || "Anonymous"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <PoseModal
            show={!!selectedPose}
            pose={selectedPose}
            onClose={() => setSelectedPose(null)}
          />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      
    </>
  );
  
}

export default Mysessions;
