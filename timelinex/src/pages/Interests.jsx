// Interests.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Interests = ({ onSubmit }) => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const interestsList = [
    "History",
    "Science",
    "Technology",
    "Art",
    "Culture",
    "Politics",
  ];

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit(selected);

      // ✅ go to dashboard after selecting
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">
          Choose Your Interests
        </h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {interestsList.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-lg border ${
                selected.includes(interest)
                  ? "bg-amber-500 text-white border-amber-600"
                  : "bg-gray-100 text-gray-800 border-gray-300"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Interests;
