import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import YogaCard from "./YogaCard";
import PoseModal from "./PoseModal";
import Loader from "./Loader";
function Home() {
  const [YogaData, setYogaData] = useState([]);
  const [selectedPose, setSelectedPose] = useState(null);
  const [level, setLevel] = useState("beginner");
  // const navigate = useNavigate();

  const fetchapi = async (selectedLevel = level) => {
    // this api is publicly available -> https://github.com/alexcumplido/yoga-api 
    const response = await fetch(
      `https://yoga-api-nzy4.onrender.com/v1/poses?level=${selectedLevel}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    if (response.ok) {
      console.log(result.poses);
      setYogaData(result.poses);
      handleSuccess("Fetching data from an api");
    } else {
      handleError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchapi("beginner");
  }, []);

  return (
    <>
      {!YogaData.length == 0 ? (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Yoga Poses
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              Explore yoga poses based on your experience level
            </p>

            <div className="inline-block relative">
              <label htmlFor="level" className="sr-only">
                Select Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => {
                  const newLevel = e.target.value;
                  setLevel(newLevel);
                  fetchapi(newLevel);
                }}
                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-6 pr-10 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Advanced</option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {YogaData.map((pose, index) => (
              <YogaCard
                key={index}
                onClick={() => {
                  setSelectedPose(pose);
                  console.log("clicked on pose", pose.id);
                }}
                pose={pose}
              />
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

export default Home;
