import React, { useState } from "react";
import { motion } from "framer-motion";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";

function SessionForm() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    title: "",
    tags: "",
    json_file_url: "",
    description: "",
    benefit: "",
    status: "published",
    creator: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://yoga-backend-53u6.onrender.com/my-session/publish",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    if (response.ok) {
      handleSuccess(result.message);

      setformData({
        title: "",
        tags: "",
        json_file_url: "",
        description: "",
        benefit: "",
        status: "published",
        creator: "",
      });
    } else {
      handleError(result.message);
      if (response.status == 401) {
        navigate("/login");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create a Yoga Session
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Session Title"
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <input
            name="tags"
            value={formData.tags}
            type="text"
            onChange={handleChange}
            placeholder="relaxation, breathing"
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            JSON File URL
          </label>
          <input
            name="json_file_url"
            value={formData.json_file_url}
            onChange={handleChange}
            type="text"
            placeholder="https://..."
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Session description..."
            className="input resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Benefit</label>
          <textarea
            name="benefit"
            value={formData.benefit}
            onChange={handleChange}
            rows="2"
            placeholder="What are the benefits?"
            className="input resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              name="status"
              onChange={handleChange}
              className="input"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">
            Created By
          </label>
          <input
            name="creator"
            value={formData.creator}
            onChange={handleChange}
            type="text"
            placeholder="Your name here"
            className="input"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Session
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default SessionForm;
