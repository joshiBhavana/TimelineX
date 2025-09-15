// Interests.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Palette,
  Atom,
  TrendingUp,
  Users,
  BookOpen,
  Zap,
  Flag,
  Award,
} from "lucide-react";

const Interests = ({ onSubmit }) => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const interestsList = [
    { name: "Politics & Wars", icon: Flag },
    { name: "Culture & Arts", icon: Palette },
    { name: "Science & Technology", icon: Atom },
    { name: "Economy & Trade", icon: TrendingUp },
    { name: "Social Movements", icon: Users },
    { name: "Religion & Philosophy", icon: BookOpen },
    { name: "Natural Events & Disasters", icon: Zap },
    { name: "Modern & Contemporary India", icon: Globe },
    { name: "Sports & Games", icon: Award },
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
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-200 animate-fadeIn p-4">
      <h2 className="text-4xl font-bold text-[#b95c50] mb-8">
        Choose Your Interests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {interestsList.map((interestObj, index) => {
          const { name, icon: Icon } = interestObj;
          return (
            <button
              key={name}
              onClick={() => toggleInterest(name)}
              className={`flex flex-col items-center justify-center rounded-lg border shadow-lg px-4 py-6 cursor-pointer transform transition-all duration-300 hover:scale-105
              ${selected.includes(name)
                ? "bg-[#cf6856] text-white border-[#9c5a40]"
                : "bg-white text-[#5C3A21] border-[#d0b49f] hover:bg-[#b95c50] hover:text-white"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon className="w-6 h-6 mb-2" />
              <span className="font-semibold text-center">{name}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="mt-8 px-8 py-3 bg-[#cf6856] text-white rounded-lg hover:bg-[#cf6856]"
        style={{ animationDelay: `${interestsList.length * 0.1}s` }}
      >
        Continue
      </button>
    </div>
  );
};

export default Interests;
