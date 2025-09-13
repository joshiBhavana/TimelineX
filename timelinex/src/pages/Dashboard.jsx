import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  Globe,
  Gamepad2,
  TrendingUp,
  Bookmark,
  User,
} from "lucide-react";
import Typewriter from "typewriter-effect";

const Dashboard = ({ user, onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedSubTheme, setSelectedSubTheme] = useState(null);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  const quotes = [
    "History is not a burden on the memory but an illumination of the soul.",
    "The more you know about the past, the better prepared you are for the future.",
    "Study the past if you would define the future.",
    "History repeats itself, first as tragedy, second as farce.",
  ];

  const images = [
    "/images/image-1.png",
    "/images/image-2.png",
    "/images/image-3.png",
    "/images/image-4.png",
    "/images/image-5.png",
    "/images/image-6.png",
  ];

  const [dailyQuote, setDailyQuote] = useState("");
  const [dailyImage, setDailyImage] = useState("");

  useEffect(() => {
    const today = new Date();
    const index = today.getDate() % quotes.length;
    setDailyQuote(quotes[index]);
    setDailyImage(images[index]);
  }, []);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "explore", label: "Explore History", icon: Globe },
    { id: "streak", label: "Streak Tracker", icon: TrendingUp },
    // { id: "saved", label: "Saved Events", icon: Bookmark },
  ];

  const themes = [
    {
      name: "Politics and Wars",
      image: "/images/theme1.png",
      subThemes: [
        { name: "Ancient Kingdoms and Empires", image: "/images/subtheme1.png" },
        { name: "Medieval Conflicts", image: "/images/subtheme2.png" },
        { name: "Colonial Period and Resistance", image: "/images/theme3.png" },
        { name: "Independence Movement", image: "/images/theme4.png" },
        { name: "Post Independence Movement", image: "/images/theme5.png" },
        { name: "Modern Political Movements", image: "/images/theme6.png" },
      ],
    },
    {
      name: "Culture & Arts",
      image: "/images/theme2.png",
      subThemes: [
        { name: "Architecture & Monuments", image: "/images/theme1.png" },
        { name: "Music & Dance", image: "/images/theme2.png" },
        { name: "Literature & Poetry", image: "/images/theme3.png" },
        { name: "Painting & Sculpture", image: "/images/theme4.png" },
        { name: "Festivals & Traditions", image: "/images/theme5.png" },
      ],
    },
    {
      name: "Science & Technology",
      image: "/images/theme3.png",
      subThemes: [
        { name: "Ancient Science & Knowledge", image: "/images/theme1.png" },
        { name: "Medieval Science & Innovations", image: "/images/theme2.png" },
        { name: "Modern Scientific Achievements", image: "/images/theme3.png" },
        { name: "Space & Technology", image: "/images/theme4.png" },
        { name: "Engineering & Industrial Advances", image: "/images/theme4.png" },
      ],
    },
    {
      name: "Economy & Trade",
      image: "/images/theme5.png",
      subThemes: [
        { name: "Ancient Trade & Economy", image: "/images/theme1.png" },
        { name: "Medieval Trade & Markets", image: "/images/theme2.png" },
        { name: "Colonial Economy & Exploitation", image: "/images/theme3.png" },
        { name: "Post-Independence Economic Development", image: "/images/theme4.png" },
        { name: "Currency & Banking", image: "/images/theme5.png" },
      ],
    },
    {
      name: "Social Movements",
      image: "/images/theme6.png",
      subThemes: [
        { name: "Social Reform Movements", image: "/images/theme1.png" },
        { name: "Independence & Freedom Movements", image: "/images/theme2.png" },
        { name: "Dalit & Marginalized Movements", image: "/images/theme3.png" },
        { name: "Women’s Rights Movements", image: "/images/theme4.png" },
        { name: "Environmental & Regional Movements", image: "/images/theme5.png" },
      ],
    },
    {
      name: "Religion & Philosophy",
      image: "/images/theme7.png",
      subThemes: [
        { name: "Ancient Religious & Spiritual Traditions", image: "/images/theme1.png" },
        { name: "Spread of Religions", image: "/images/theme2.png" },
        { name: "Philosophical Movements", image: "/images/theme3.png" },
        { name: "Gurus & Spiritual Leaders", image: "/images/theme4.png" },
        { name: "Temples, Monasteries & Religious Architecture", image: "/images/theme5.png" },
      ],
    },
    {
      name: "Natural Events & Disasters",
      image: "/images/theme8.png",
      subThemes: [
        { name: "Earthquakes", image: "/images/theme1.png" },
        { name: "Floods & Droughts", image: "/images/theme2.png" },
        { name: "Famines", image: "/images/theme3.png" },
        { name: "Epidemics and Pandemics", image: "/images/theme4.png" },
      ],
    },
    {
      name: "Modern & Contemporary India",
      image: "/images/theme9.png",
      subThemes: [
        { name: "Political Milestones", image: "/images/theme1.png" },
        { name: "Science & Technology", image: "/images/theme2.png" },
        { name: "Cultural & Sports Achievements", image: "/images/theme3.png" },
        { name: "Economic Milestones", image: "/images/theme4.png" },
        { name: "Social Change and Movements", image: "/images/theme5.png" },
      ],
    },
    {
      name: "Sports & Games",
      image: "/images/theme4.png",
      subThemes: [
        { name: "Ancient & Traditional Sports", image: "/images/theme1.png" },
        { name: "Classical & Modern Sports Achievements", image: "/images/theme2.png" },
        { name: "Cricket & Popular Sports", image: "/images/theme3.png" },
        { name: "Sports Institutions & Development", image: "/images/theme4.png" },
        { name: "Inspirational Athletes & Legends", image: "/images/theme5.png" },
      ],
    },
  ];

  const events = [
    { name: "Event 1", image: "/images/theme1.png" },
    { name: "Event 2", image: "/images/theme2.png" },
    { name: "Event 3", image: "/images/theme3.png" },
    { name: "Event 4", image: "/images/theme4.png" },
    { name: "Event 5", image: "/images/theme5.png" },
  ];

  const renderHomeContent = () => (
    <div className="animate-fadeIn space-y-8 px-6">
      {showWelcome && (
        <div className="mb-4 text-2xl font-bold text-[#b95c50]">
          <Typewriter
            options={{
              strings: ["Welcome to TimelineX!"],
              autoStart: true,
              loop: true,
              delay: 75,
            }}
          />
        </div>
      )}

      <div className="flex justify-center w-full mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl w-full">
          <div>
            <h3 className="text-6xl font-extrabold mb-4 text-[#b95c50]">
              History at Your Fingertips
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Step into the past with TimelineX — where history comes alive
              through interactive timelines, fascinating events, and unforgettable stories.
            </p>
            <button
              onClick={() => setActiveSection("explore")}
              className="px-6 py-3 bg-[#b95c50] text-white font-semibold rounded-xl shadow-md hover:bg-[#a24d42] transition"
            >
              Explore History
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/img-1.png"
              alt="Journey Through Time"
              className="max-w-full max-h-96 object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderExploreThemes = () => (
  <div className="flex flex-col items-center py-8">
    <h2 className="text-4xl font-bold text-[#b95c50] mb-8 text-center">
      Explore Historical Themes
    </h2>
    <p className="text-gray-600 text-center max-w-2xl mb-8">
      Choose a theme to explore fascinating stories, events, and milestones from history.
      Click on a card below to dive deeper and learn more about the past.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
      {themes.map((theme, idx) => (
        <div
          key={idx}
          className="p-6 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition"
          onClick={() => setSelectedTheme(theme)}
        >
          <img
            src={theme.image}
            alt={theme.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-bold text-[#b95c50] text-center">{theme.name}</h3>
        </div>
      ))}
    </div>
  </div>
);

  const renderSubThemes = () => {
    if (!selectedTheme) return null;

    return (
      <div>
        <div className="p-4 flex justify-start">
          <button
            onClick={() => setSelectedTheme(null)}
            className="px-4 py-2 text-[#b95c50] hover:underline font-medium bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Themes
          </button>
        </div>
        <h2 className="text-3xl font-bold text-[#b95c50] mb-6 text-center">
          {selectedTheme.name} - SubThemes
        </h2>
        <p className="text-gray-600 text-center mx-auto max-w-2xl mb-8">
          Select a sub-theme to explore detailed events and stories related to this topic.
          Click on a card below to learn more and uncover the rich history behind it.
        </p>
        <div className="flex justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {selectedTheme.subThemes.map((sub, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition"
                onClick={() => setSelectedSubTheme(sub)}
              >
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{sub.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEvents = () => {
    if (!selectedSubTheme) return null;

    return (
      <div>
        <div className="p-4 flex justify-start">
          <button
            onClick={() => setSelectedSubTheme(null)}
            className="px-4 py-2 text-[#b95c50] hover:underline font-medium bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Sub-Themes
          </button>
          <button
            onClick={() => {
              setSelectedSubTheme(null);
              setSelectedTheme(null);
            }}
            className="px-4 py-2 text-[#b95c50] hover:underline font-medium ml-4 bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Themes
          </button>
        </div>
        <h2 className="text-3xl font-bold text-[#b95c50] mb-6 text-center">
          {selectedSubTheme.name} - Events
        </h2>
        <p className="text-gray-600 text-center mx-auto max-w-2xl mb-8">
          Explore the events related to this sub-theme to uncover fascinating stories, important milestones, and historical insights.
          Click on an event card below to learn more and dive into the details.
        </p>

        <div className="flex justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{event.name}</h3>
                <p className="text-gray-600 mt-2 text-center">
                  Description of {event.name} in {selectedSubTheme.name}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeSection === "explore") {
      if (selectedSubTheme) return renderEvents();
      if (selectedTheme) return renderSubThemes();
      return renderExploreThemes();
    }
    if (activeSection === "streak") return <div>Streak Section UI here</div>;
    // if (activeSection === "saved") return <div>Saved Section UI here</div>;
    return renderHomeContent();
  };

  return (
    <div
      className="w-screen min-h-screen relative overflow-auto transition-colors duration-300"
      style={{
        background: darkMode ? "#1f2937" : "#fbe5e0",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {/* Navbar */}
      <header
        className="flex items-center justify-between px-6 py-4 shadow-md"
        style={{ background: darkMode ? "#374151" : "#fbe5e0" }}
      >
        <div className="flex items-center space-x-4 max-w-2xl">
          <h1
            className="text-xl font-bold"
            style={{ color: darkMode ? "#fff" : "#3b0404" }}
          >
            TimelineX
          </h1>
          <div
            className="flex items-center px-4 py-2 rounded-xl shadow-md flex-1"
            style={{ background: "#de847b" }}
          >
            <Search className="w-4 h-4 mr-3 text-white" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder-white"
              style={{ color: "#fff", caretColor: "#fff" }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="flex space-x-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSelectedTheme(null);
                  setSelectedSubTheme(null);
                }}
                className={`px-2 py-1 font-medium transition-colors duration-200 border-b-2 ${
                  activeSection === item.id
                    ? "border-[#b95c50] text-[#b95c50]"
                    : darkMode
                    ? "border-transparent text-gray-300 hover:text-white hover:border-[#b95c50]"
                    : "border-transparent text-black hover:text-[#b95c50] hover:border-[#b95c50]"
                }`}
                style={{ background: "transparent" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div
            className="p-2 rounded-full cursor-pointer transition-colors"
            style={{ backgroundColor: darkMode ? "#deb3ad" : "#de847b" }}
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <User className="w-6 h-6" style={{ color: darkMode ? "#000" : "#fff" }} />
          </div>

          {profileOpen && (
            <div
              className="absolute top-16 right-6 w-40 rounded-xl shadow-lg p-3 z-50"
              style={{
                backgroundColor: darkMode ? "#deb3ad" : "#de847b",
                color: darkMode ? "#000" : "#fff",
              }}
            >
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 rounded-md transition hover:opacity-90 bg-transparent"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition"
            style={{
              backgroundColor: darkMode ? "#deb3ad" : "#de847b",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 transition-all duration-500 ease-in-out">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
