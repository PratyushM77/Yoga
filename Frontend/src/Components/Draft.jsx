import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
function Draft() {
  const navigate = useNavigate();
  const [draftData, setdraftData] = useState([]);
  const [draftdeleted, setDraftdeleted] = useState(false);
  const user_id = localStorage.getItem("user_id");
  const getdraft = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-sessions/draft/${user_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const result = await response.json();
      if (response.ok) {
        setdraftData(result.draft);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const editDraft = (draftItem) => {
    navigate("/draft/Draftedit", { state: draftItem });
  };

  useEffect(() => {
    getdraft();
  }, [draftdeleted]);
  console.log(draftData);

  const takemeThere = () => {
    navigate("/publishsession");
  };

  const Deletedraft = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/deletedraft/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        handleSuccess("Draft Deleted");
        console.log(result.message);
        setDraftdeleted(true);
      } else {
        const text = await response.text();
        console.error("Not OK:", text);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {draftData.length > 0 ? (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Your Drafts
            </h1>
          </div>
          <div>
            {draftData.map((draft, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden w-80 hover:shadow-2xl transition duration-300 cursor-pointer"
              >
                <div className="flex h-cover">
                  <div className="w-full h-40 bg-white flex justify-center items-center overflow-hidden rounded-t-xl">
                    <img
                      src={
                        draft?.json_file_url ||
                        "https://cdn.prod.website-files.com/65302a23c6b1d938427b07fe/666c4a49e519be9e21c75d64_yoga%20blog%20photo.jpg"
                      }
                      alt={draft?.title || "Title"}
                      className="h-full w-auto"
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {draft?.title || "Sanskrit Name"}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">
                    {draft?.tags || "English Name"}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
                      Level: {draft?.difficulty_level || "Custom"}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                      Category: Pose
                    </span>
                    <div className="text-xs text-c px-2 py-1 rounded-full font-semibold">
                      By: {"Anonymous"}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => editDraft(draft)}
                      className="text-white cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => Deletedraft(draft._id)}
                      className="text-white cursor-pointer bg-red-600 hover:bg-red-800 active:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="text-gray-700 text-3xl"> Create First </div>
          <div className="ml-3">
            <button
              onClick={takemeThere}
              className="text-white cursor-pointer bg-blue-600 hover:bg-blue-800 active:bg-blue-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600"
            >
              Take me there
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Draft;
