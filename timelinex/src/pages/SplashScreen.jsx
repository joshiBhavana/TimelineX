import React, { useState, useEffect } from "react";
import { Clock, History, Globe, Star } from "lucide-react";

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowFeatures(true), 1500);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete && onComplete(), 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-100">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, #f59e0b, #eab308)`,
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${10 + i * 12}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="text-center z-10 px-8">
        {/* Logo */}
        <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 shadow-2xl animate-bounce">
          <Clock className="w-16 h-16 text-white animate-pulse" />
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h1 className="text-6xl font-bold mb-2 tracking-tight text-amber-900">
            Timeline<span className="text-orange-600">X</span>
          </h1>
          <p className="text-xl text-amber-700 font-medium">
            Historical Timeline Explorer
          </p>
        </div>

        {/* Features */}
        <div
          className={`mt-6 flex justify-center space-x-4 transition-all duration-1000 ${
            showFeatures ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {[{ icon: History, text: "Interactive" }, { icon: Globe, text: "Global" }, { icon: Star, text: "Personalized" }].map(
            ({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center bg-white bg-opacity-70 rounded-full px-4 py-2 shadow-md hover:scale-105 transform transition duration-300"
              >
                <Icon className="w-5 h-5 mr-2 text-amber-700" />
                <span className="text-amber-800 font-medium">{text}</span>
              </div>
            )
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mt-10">
          <div className="h-4 bg-amber-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-amber-800 font-medium">
            {progress < 30
              ? "Loading data..."
              : progress < 60
              ? "Fetching history..."
              : progress < 90
              ? "Almost ready..."
              : "Done!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
