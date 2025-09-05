import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  Globe,
  Gamepad2,
  TrendingUp,
  Bookmark,
  User,
  ChevronRight,
} from "lucide-react";
import RotatingText from "../components/RotatingText";

const Dashboard = ({ user, userInterests, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [streakCount] = useState(7);

  // ------------------ Daily Quote ------------------
  const quotes = [
    "History is not a burden on the memory but an illumination of the soul.",
    "The more you know about the past, the better prepared you are for the future.",
    "Study the past if you would define the future.",
    "History repeats itself, first as tragedy, second as farce.",
  ];
  const [dailyQuote, setDailyQuote] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = localStorage.getItem("quoteDate");

    if (saved === today) {
      setDailyQuote(localStorage.getItem("dailyQuote"));
    } else {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setDailyQuote(randomQuote);
      localStorage.setItem("dailyQuote", randomQuote);
      localStorage.setItem("quoteDate", today);
    }
  }, []);

  const images = [
    "/images/image-1.png",
    "/images/image-2.png",
    "/images/image-3.png",
    "/images/image-4.png",
    "/images/image-5.png",
    "/images/image-6.png",
  ];

  const [dailyImage, setDailyImage] = useState("");

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % quotes.length;
    setDailyQuote(quotes[index]);
    setDailyImage(images[index]);
  }, []);

  // ------------------ Menu Items ------------------
  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore History", icon: Globe },
    { id: "games", label: "Fun Games", icon: Gamepad2 },
    { id: "streak", label: "Streak Tracker", icon: TrendingUp },
    { id: "saved", label: "Saved Events", icon: Bookmark },
  ];

  const featuredTimelines = [
    { title: "Ancient Civilizations", period: "3000 BCE - 500 CE", events: 150, image: "🏛" },
    { title: "Medieval Period", period: "500 - 1500 CE", events: 200, image: "🏰" },
    { title: "Renaissance", period: "1400 - 1600 CE", events: 120, image: "🎨" },
    { title: "Industrial Revolution", period: "1760 - 1840", events: 180, image: "⚙" },
    { title: "Modern Era", period: "1900 - Present", events: 300, image: "🌍" },
    { title: "Space Exploration", period: "1957 - Present", events: 90, image: "🚀" },
  ];

  // ------------------ Section Renderers ------------------
  const renderHomeContent = () => (
    <div className="animate-fadeIn space-y-8">
      {/* Quote + Image Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 bg-white text-black rounded-2xl shadow-xl">
        {/* Left Side: Quote */}
        <div className="flex flex-col justify-center px-6">
          <RotatingText
            texts={["📜 Quote of the Day", "🌟 Stay Positive", "🧠 Keep Learning"]}
            mainClassName="rotating-heading"
            rotationInterval={2500}
          />
          <p className="mt-4 text-base sm:text-lg md:text-xl text-left italic text-gray-800 leading-relaxed">
            “{dailyQuote}”
          </p>
        </div>

        {/* Right Component (Image Section) */}
        <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src={dailyImage}
            alt="Daily Inspiration"
            className="rounded-2xl shadow-lg w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] object-cover animate-fadeIn"
          />
        </div>
      </div>

      {/* Featured Timelines */}
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white/80 backdrop-blur"
        } p-8 rounded-2xl shadow-xl`}
      >
        <h3 className="text-2xl font-bold mb-6">Featured Timelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTimelines.map((timeline, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              }`}
            >
              <div className="text-4xl mb-4">{timeline.image}</div>
              <h4 className="font-semibold mb-2">{timeline.title}</h4>
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-gray-400" : "text-amber-700"
                }`}
              >
                {timeline.period}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    darkMode
                      ? "bg-gray-600 text-gray-300"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {timeline.events} events
                </span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "explore":
        return <div className="animate-fadeIn">Explore Section UI here</div>;
      case "games":
        return <div className="animate-fadeIn">Games Section UI here</div>;
      case "streak":
        return <div className="animate-fadeIn">Streak Section UI here</div>;
      case "saved":
        return <div className="animate-fadeIn">Saved Section UI here</div>;
      default:
        return renderHomeContent();
    }
  };

  return (
    <div
      className={`w-screen h-screen relative overflow-hidden transition-colors ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <header
        className={`flex items-center justify-between px-6 py-4 shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white/80 backdrop-blur"
        }`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-amber-600">🕰</div>
          <span className="text-lg font-medium">
            Hi! Welcome <span className="font-bold">{user.name}</span>
          </span>
        </div>

        {/* Middle Section (Search Bar) */}
        <div className="flex-1 px-10 max-w-sm">
          <div
            className={`flex items-center px-4 py-2 rounded-xl shadow-md ${
              darkMode ? "bg-gray-700" : "bg-amber-50"
            }`}
          >
            <Search className="w-5 h-5 mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent outline-none ${
                darkMode
                  ? "text-white placeholder-gray-400"
                  : "text-gray-800 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Right Section (Profile + Dark Mode) */}
        <div className="relative flex items-center space-x-4">
          {/* Profile dropdown */}
          <div
            className={`p-2 rounded-full cursor-pointer ${
              darkMode ? "bg-gray-700" : "bg-amber-100"
            }`}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <User className="w-6 h-6" />
          </div>

          {profileOpen && (
            <div
              className={`absolute top-12 right-20 w-40 rounded-xl shadow-lg p-3 z-50 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-red-100 hover:text-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition ${
              darkMode
                ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Foreground Content */}
      <div className="relative z-10 flex h-[calc(100%-64px)]">
        {/* Sidebar */}
        <nav
          className={`w-64 min-h-full border-r shadow-xl ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white/70 border-amber-200 backdrop-blur"
          }`}
        >
          <div className="p-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                    : darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-amber-800 hover:bg-amber-50"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
