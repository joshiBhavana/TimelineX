import React, { useState, useEffect } from "react";
import {
  Search,
  Home,
  Globe,
  TrendingUp,
  Bookmark,
  User,
  Calendar,
  Trophy,
  Flame,
  Target,
  Shield,
  Star,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Scroll,
  Crown,
  Settings,
  LogOut
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
  const [showSettings, setShowSettings] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [message, setMessage] = useState("");
  const [showSearchMessage, setShowSearchMessage] = useState(false);

  // Streak Tracker State
  const [currentStreak, setCurrentStreak] = useState(12);
  const [longestStreak, setLongestStreak] = useState(23);
  const [streakFreezes, setStreakFreezes] = useState(2);
  const [totalPoints, setTotalPoints] = useState(340);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [streakGoal, setStreakGoal] = useState(30);
  const [unlockedEras, setUnlockedEras] = useState(['ancient', 'medieval']);
  const [dailyChallenge, setDailyChallenge] = useState({
    completed: false,
    fact: "The Indus Valley Civilization had one of the world's first urban sanitation systems!",
    question: "Which ancient civilization is known for its advanced drainage systems?",
    options: ["Egyptian", "Mesopotamian", "Indus Valley", "Chinese"],
    correct: 2
  });

    // User profile settings state
  const [userSettings, setUserSettings] = useState({
    name: user?.name || "Historical Explorer",
    email: user?.email || "explorer@timelinex.com",
    preferredTheme: "auto",
    language: "en",
    password: "" // Add this line for password
  });

  // Mock streak data for calendar
  const [streakData, setStreakData] = useState(() => {
    const data = {};
    const today = new Date();
    
    // Generate some mock streak data for the current month
    for (let i = 1; i <= today.getDate(); i++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      if (i <= today.getDate() - 2) {
        data[date] = Math.random() > 0.3 ? 'completed' : 'missed';
      } else if (i === today.getDate() - 1) {
        data[date] = 'completed';
      } else if (i === today.getDate()) {
        data[date] = Math.random() > 0.5 ? 'completed' : 'today';
      }
    }
    return data;
  });

  const badges = [
    { id: 1, name: "Explorer", description: "Started your journey", icon: MapPin, unlocked: true, streak: 1, date: "2024-01-15" },
    { id: 2, name: "Time Traveler", description: "3 days of exploration", icon: Clock, unlocked: true, streak: 3, date: "2024-01-18" },
    { id: 3, name: "History Scholar", description: "7 days of continuous learning", icon: Scroll, unlocked: true, streak: 7, date: "2024-01-22" },
    { id: 4, name: "Ancient Wisdom", description: "15 days of dedication", icon: Star, unlocked: false, streak: 15 },
    { id: 5, name: "Chronicle Master", description: "30 days of exploration", icon: Crown, unlocked: false, streak: 30 },
    { id: 6, name: "Eternal Scholar", description: "100 days of learning", icon: Trophy, unlocked: false, streak: 100 }
  ];

  const historicalEras = [
    {
      id: 'ancient',
      name: 'Ancient Civilizations',
      period: '3000 BCE - 500 CE',
      unlocked: true,
      streakRequired: 1,
      color: '#8B4513',
      image: '/images/era-ancient.png',
      description: 'Discover the cradles of civilization'
    },
    {
      id: 'medieval',
      name: 'Medieval Period',
      period: '500 - 1500 CE',
      unlocked: true,
      streakRequired: 7,
      color: '#4A5D23',
      image: '/images/era-medieval.png',
      description: 'Explore the age of kingdoms and knights'
    },
    {
      id: 'renaissance',
      name: 'Renaissance',
      period: '1400 - 1700 CE',
      unlocked: false,
      streakRequired: 15,
      color: '#8B0000',
      image: '/images/era-renaissance.png',
      description: 'Witness the rebirth of knowledge and art'
    },
    {
      id: 'modern',
      name: 'Modern Era',
      period: '1700 - 1900 CE',
      unlocked: false,
      streakRequired: 25,
      color: '#191970',
      image: '/images/era-modern.png',
      description: 'Experience the age of revolution'
    },
    {
      id: 'contemporary',
      name: 'Contemporary',
      period: '1900 - Present',
      unlocked: false,
      streakRequired: 50,
      color: '#4B0082',
      image: '/images/era-contemporary.png',
      description: 'Explore recent history and current events'
    }
  ];

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
  ];

  const themes = [
    {
      name: "Politics and Wars",
      image: "/images/theme1.png",
      subThemes: [
        { name: "Ancient Kingdoms and Empires", image: "/images/subtheme1(1).png" },
        { name: "Medieval Conflicts", image: "/images/subtheme1(2).png" },
        { name: "Colonial Period and Resistance", image: "/images/subtheme1(3).png" },
        { name: "Independence Movement", image: "/images/subtheme1(4).png" },
        { name: "Post Independence Movement", image: "/images/subtheme1(5).png" },
        { name: "Modern Political Movements", image: "/images/subtheme1(6).png" },
      ],
    },
    {
      name: "Culture & Arts",
      image: "/images/theme2.png",
      subThemes: [
        { name: "Architecture & Monuments", image: "/images/subtheme2(1).png" },
        { name: "Music & Dance", image: "/images/subtheme2(2).png" },
        { name: "Literature & Poetry", image: "/images/subtheme2(3).png" },
        { name: "Painting & Sculpture", image: "/images/subtheme2(4).png" },
        { name: "Festivals & Traditions", image: "/images/subtheme2(5).png" },
      ],
    },
    {
      name: "Science & Technology",
      image: "/images/theme3.png",
      subThemes: [
        { name: "Ancient Science & Knowledge", image: "/images/subtheme3(1).png" },
        { name: "Medieval Science & Innovations", image: "/images/subtheme3(2).png" },
        { name: "Modern Scientific Achievements", image: "/images/subtheme3(3).png" },
        { name: "Space & Technology", image: "/images/subtheme3(4).png" },
        { name: "Engineering & Industrial Advances", image: "/images/subtheme3(5).png" },
      ],
    },
    {
      name: "Economy & Trade",
      image: "/images/theme4.png",
      subThemes: [
        { name: "Ancient Trade & Economy", image: "/images/subtheme4(1).png" },
        { name: "Medieval Trade & Markets", image: "/images/subtheme4(2).png" },
        { name: "Colonial Economy & Exploitation", image: "/images/subtheme4(3).png" },
        { name: "Post-Independence Economic Development", image: "/images/subtheme4(4).png" },
        { name: "Currency & Banking", image: "/images/subtheme4(5).png" },
      ],
    },
    {
      name: "Social Movements",
      image: "/images/theme5.png",
      subThemes: [
        { name: "Social Reform Movements", image: "/images/subtheme5(1).png" },
        { name: "Independence & Freedom Movements", image: "/images/subtheme5(2).png" },
        { name: "Dalit & Marginalized Movements", image: "/images/subtheme5(3).png" },
        { name: "Women's Rights Movements", image: "/images/subtheme5(4).png" },
        { name: "Environmental & Regional Movements", image: "/images/subtheme5(5).png" },
      ],
    },
    {
      name: "Religion & Philosophy",
      image: "/images/theme6.png",
      subThemes: [
        { name: "Ancient Religious & Spiritual Traditions", image: "/images/subtheme6(1).png" },
        { name: "Spread of Religions", image: "/images/subtheme6(2).png" },
        { name: "Philosophical Movements", image: "/images/subtheme6(3).png" },
        { name: "Gurus & Spiritual Leaders", image: "/images/subtheme6(4).png" },
        { name: "Temples, Monasteries & Religious Architecture", image: "/images/subtheme6(5).png" },
      ],
    },
    {
      name: "Natural Events & Disasters",
      image: "/images/theme7.png",
      subThemes: [
        { name: "Earthquakes", image: "/images/subtheme7(1).png" },
        { name: "Floods & Droughts", image: "/images/subtheme7(2).png" },
        { name: "Famines", image: "/images/subtheme7(3).png" },
        { name: "Epidemics and Pandemics", image: "/images/subtheme7(4).png" },
      ],
    },
    {
      name: "Modern & Contemporary India",
      image: "/images/theme8.png",
      subThemes: [
        { name: "Political Milestones", image: "/images/subtheme8(1).png" },
        { name: "Science & Technology", image: "/images/subtheme8(2).png" },
        { name: "Cultural & Sports Achievements", image: "/images/subtheme8(3).png" },
        { name: "Economic Milestones", image: "/images/subtheme8(4).png" },
        { name: "Social Change and Movements", image: "/images/subtheme8(5).png" },
      ],
    },
    {
      name: "Sports & Games",
      image: "/images/theme9.png",
      subThemes: [
        { name: "Ancient & Traditional Sports", image: "/images/subtheme9(1).png" },
        { name: "Classical & Modern Sports Achievements", image: "/images/subtheme9(2).png" },
        { name: "Cricket & Popular Sports", image: "/images/subtheme9(3).png" },
        { name: "Sports Institutions & Development", image: "/images/subtheme9(4).png" },
        { name: "Inspirational Athletes & Legends", image: "/images/subtheme9(5).png" },
      ],
    },
  ];

  const events = [
    { name: "Event 1", image: "/images/events.png" },
    { name: "Event 2", image: "/images/events.png" },
    { name: "Event 3", image: "/images/events.png" },
    { name: "Event 4", image: "/images/events.png" },
    { name: "Event 5", image: "/images/events.png" },
  ];

  // Settings Modal Component
  const renderSettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`max-w-md w-full mx-4 rounded-xl shadow-xl p-6 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#b95c50]">Profile Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="text-lg text-gray-500 hover:text-gray-700 bg-transparent"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-[#3d5b59] font-medium mb-2">First Name</label>
            <input
              type="text"
              value={userSettings.name}
              onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full text-sm px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-black'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#3d5b59] font-medium mb-2">Last Name</label>
            <input
              type="text"
              value={userSettings.name}
              onChange={(e) => setUserSettings(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full text-sm px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-black'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#3d5b59] font-medium mb-2">Email</label>
            <input
              type="email"
              value={userSettings.email}
              onChange={(e) => setUserSettings(prev => ({ ...prev, email: e.target.value }))}
              className={`w-full text-sm px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-black'
              }`}
            />
          </div>

          <div>
            <label className="block text-sm text-[#3d5b59] font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={userSettings.password || ""} // optional, won't break if undefined
              onChange={(e) => setUserSettings(prev => ({ ...prev, password: e.target.value }))}
              className={`w-full text-sm px-3 py-2 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border-gray-300 text-black'
              }`}
            />
          </div>


          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowSettings(false)}
              className="px-4 py-2 bg-[#b95c50] text-sm text-white rounded-lg hover:bg-[#a24d42] transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Save settings logic here
                setShowSettings(false);
              }}
              className="px-4 py-2 bg-[#b95c50] text-sm text-white rounded-lg hover:bg-[#a24d42] transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Achievements Modal Component
  const renderAchievementsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`max-w-2xl w-full mx-4 rounded-xl shadow-xl p-6 max-h-[80vh] overflow-y-auto ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#b95c50]">Your Achievements</h2>
          <button
            onClick={() => setShowAchievements(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map(badge => {
            const IconComponent = badge.icon;
            const unlocked = currentStreak >= badge.streak;
            
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  unlocked 
                    ? 'border-[#b95c50] bg-[#fbe5e0] dark:bg-gray-700' 
                    : 'border-gray-200 bg-gray-50 dark:bg-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    unlocked ? 'bg-[#b95c50]' : 'bg-gray-300'
                  }`}>
                    <IconComponent 
                      className={`w-6 h-6 ${unlocked ? 'text-white' : 'text-gray-500'}`} 
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className={`font-semibold ${unlocked ? 'text-[#b95c50]' : 'text-gray-500'}`}>
                      {badge.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {badge.streak} day streak required
                    </p>
                    {unlocked && badge.date && (
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Unlocked: {badge.date}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-[#b95c50] to-[#de847b] rounded-lg text-white text-center">
          <h3 className="text-lg font-bold mb-2">Achievement Progress</h3>
          <p>
            {badges.filter(b => currentStreak >= b.streak).length} of {badges.length} badges unlocked
          </p>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${(badges.filter(b => currentStreak >= b.streak).length / badges.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Calendar functions
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getStreakStatus = (date) => {
    return streakData[date] || 'empty';
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };
  
  const handleDailyCheckIn = () => {
    const today = new Date();
    const todayKey = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
    
    setStreakData(prev => ({
      ...prev,
      [todayKey]: 'completed'
    }));
    
    setCurrentStreak(prev => prev + 1);
    setTotalPoints(prev => prev + 10);
    
    // Check for new badges/eras
    const newStreak = currentStreak + 1;
    if (newStreak === 15) {
      setUnlockedEras(prev => [...prev, 'renaissance']);
    } else if (newStreak === 25) {
      setUnlockedEras(prev => [...prev, 'modern']);
    } else if (newStreak === 50) {
      setUnlockedEras(prev => [...prev, 'contemporary']);
    }
  };

  const completeDailyChallenge = (selectedOption) => {
    if (selectedOption === dailyChallenge.correct) {
      setDailyChallenge(prev => ({ ...prev, completed: true }));
      setTotalPoints(prev => prev + 20);
      handleDailyCheckIn();
    }
  };

  const useStreakFreeze = () => {
    if (streakFreezes > 0) {
      setStreakFreezes(prev => prev - 1);
      // Logic to protect current streak
    }
  };

  const getMotivationalMessage = () => {
    if (currentStreak >= 30) return "You're a true Chronicle Master!";
    if (currentStreak >= 15) return "Ancient wisdom flows through you!";
    if (currentStreak >= 7) return "You're becoming a History Scholar!";
    if (currentStreak >= 3) return "Time traveling like a pro!";
    return "Every explorer starts with a single step!";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim() !== "") {
        setMessage(`We will add data for "${searchQuery}" soon!`);
        setSearchQuery("");
        setShowSearchMessage(true);
      }
    }
  };

  const renderSearchMessage = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fadeIn">
      <h2 className="text-4xl font-bold text-[#b95c50] mb-4">
        Oops! No results found.
      </h2>
      <p className="text-gray-600 text-lg max-w-xl mb-8">
        {message} Thank you for your suggestion! We are constantly expanding our historical database.
      </p>
      <button
        onClick={() => {
          setActiveSection("home");
          setShowSearchMessage(false);
          setMessage("");
        }}
        className="px-6 py-3 bg-[#b95c50] text-white font-semibold rounded-xl shadow-md hover:bg-[#a24d42] transition"
      >
        Return to Home
      </button>
    </div>
  );

  const renderStreakTracker = () => (
    <div className="animate-fadeIn space-y-8 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-[#b95c50] mb-4">
          Historical Explorer Streak
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl mx-auto">
          Track your journey through time and unlock new historical eras as you explore daily!
        </p>
      </div>

      {/* Current Streak Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Flame className="w-8 h-8 text-[#e56997] mr-2" />
            <span className="text-3xl font-bold text-[#b95c50]">{currentStreak}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Current Streak</h3>
          <p className="text-sm text-gray-500">Days in a row</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8 text-[#bd97cb] mr-2" />
            <span className="text-3xl font-bold text-[#b95c50]">{longestStreak}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Longest Streak</h3>
          <p className="text-sm text-gray-500">Personal best</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Shield className="w-8 h-8 text-[#fbc740] mr-2" />
            <span className="text-3xl font-bold text-[#b95c50]">{streakFreezes}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Streak Freezes</h3>
          <p className="text-sm text-gray-500">Protection available</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Star className="w-8 h-8 text-[#66d2d6] mr-2" />
            <span className="text-3xl font-bold text-[#b95c50]">{totalPoints}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">Explorer Points</h3>
          <p className="text-sm text-gray-500">Total earned</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-[#b95c50] to-[#de847b] text-white rounded-xl p-6 text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{getMotivationalMessage()}</h3>
        <p className="text-lg opacity-90">
          {currentStreak < streakGoal 
            ? `${streakGoal - currentStreak} more days to reach your goal!` 
            : "Goal achieved! Set a new challenge!"}
        </p>
      </div>

      {/* Daily Challenge */}
      {!dailyChallenge.completed && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8" data-challenge>
          <h3 className="text-2xl font-bold text-[#b95c50] mb-4 flex items-center">
            <Scroll className="w-6 h-6 mr-2" />
            Today's Historical Challenge
          </h3>
          
          <div className="bg-[#fbe5e0] rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Historical Fact:</h4>
            <p className="text-gray-600 mb-4">{dailyChallenge.fact}</p>
            
            <h4 className="font-semibold text-gray-700 mb-3">Challenge Question:</h4>
            <p className="text-gray-700 mb-4">{dailyChallenge.question}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dailyChallenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => completeDailyChallenge(index)}
                  className="p-3 bg-white border-2 border-[#de847b] rounded-lg hover:bg-[#de847b] hover:text-white transition-colors text-left"
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {dailyChallenge.completed && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-green-500">
          <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
            <Trophy className="w-6 h-6 mr-2" />
            Daily Challenge Completed!
          </h3>
          <p className="text-gray-600">Great job! You've earned 20 explorer points and maintained your streak!</p>
          <p className="text-sm text-gray-500 mt-2">Come back tomorrow for a new historical challenge.</p>
        </div>
      )}

      {/* Progress Towards Goal */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-[#b95c50] flex items-center">
            <Target className="w-6 h-6 mr-2" />
            Streak Goal Progress
          </h3>
          <button 
            onClick={() => {
              const newGoal = prompt("Set new goal (days):", streakGoal);
              if (newGoal && !isNaN(newGoal) && newGoal > 0) {
                setStreakGoal(parseInt(newGoal));
              }
            }}
            className="px-4 py-2 text-sm bg-[#b95c50] text-white font-medium rounded-xl hover:bg-[#a24d42] transition"
          >
            Change Goal
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{currentStreak} days</span>
            <span>{streakGoal} days goal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-[#b95c50] to-[#de847b] h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((currentStreak / streakGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          Progress: {Math.min((currentStreak / streakGoal) * 100, 100).toFixed(1)}% complete
        </p>
      </div>

      {/* Calendar Heatmap */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[#b95c50] flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Exploration Calendar
          </h3>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigateMonth('prev')}
              className="p-2 text-[#b95c50] bg-white hover:bg-[#fbe5e0] rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="font-semibold text-gray-700 min-w-[140px] text-center">
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
            
            <button 
              onClick={() => navigateMonth('next')}
              className="p-2 bg-white text-[#b95c50] hover:bg-[#fbe5e0] rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days before month starts */}
          {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, index) => (
            <div key={`empty-${index}`} className="p-2"></div>
          ))}
          
          {/* Days of the month */}
          {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, index) => {
            const day = index + 1;
            const dateKey = formatDate(currentYear, currentMonth, day);
            const status = getStreakStatus(dateKey);
            
            let bgColor = 'bg-gray-100';
            let textColor = 'text-gray-500';
            let icon = null;
            
            switch (status) {
              case 'completed':
                bgColor = 'bg-green-500';
                textColor = 'text-white';
                icon = <Flame className="w-3 h-3" />;
                break;
              case 'today':
                bgColor = 'bg-[#b95c50]';
                textColor = 'text-white';
                icon = <Star className="w-3 h-3" />;
                break;
              case 'missed':
                bgColor = 'bg-red-300';
                textColor = 'text-white';
                break;
            }
            
            return (
              <div
                key={day}
                className={`${bgColor} ${textColor} p-2 rounded-lg text-center text-sm font-medium flex flex-col items-center justify-center h-10 relative`}
              >
                {icon && <div className="absolute top-0 right-0">{icon}</div>}
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-100 rounded mr-2"></div>
            <span className="text-gray-600">No activity</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-600">Explored</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-300 rounded mr-2"></div>
            <span className="text-gray-600">Missed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#b95c50] rounded mr-2"></div>
            <span className="text-gray-600">Today</span>
          </div>
        </div>
      </div>

      {/* Badges/Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-[#b95c50] mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2" />
          Explorer Badges
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {badges.map(badge => {
            const IconComponent = badge.icon;
            const unlocked = currentStreak >= badge.streak;
            
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  unlocked 
                    ? 'border-[#b95c50] bg-[#fbe5e0]' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex justify-center mb-3">
                  <IconComponent 
                    className={`w-8 h-8 ${unlocked ? 'text-[#b95c50]' : 'text-gray-400'}`} 
                  />
                </div>
                <h4 className={`font-semibold mb-2 ${unlocked ? 'text-[#b95c50]' : 'text-gray-500'}`}>
                  {badge.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                <p className="text-xs text-gray-500">
                  {badge.streak} day streak required
                </p>
                {unlocked && (
                  <div className="mt-2">
                    <span className="inline-block bg-[#b95c50] text-white px-2 py-1 rounded-full text-xs">
                      Unlocked
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Eras Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-[#b95c50] mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Timeline of Discovery
        </h3>
        
        <p className="text-gray-600 mb-6 text-center">
          Unlock new historical eras as you maintain your exploration streak!
        </p>

        <div className="space-y-6">
          {historicalEras.map((era, index) => {
            const unlocked = currentStreak >= era.streakRequired;
            const canUnlock = currentStreak >= era.streakRequired - 3; // Show upcoming eras
            
            if (!unlocked && !canUnlock) return null;
            
            return (
              <div
                key={era.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                  unlocked 
                    ? 'border-[#b95c50] bg-[#fbe5e0]' 
                    : 'border-gray-200 bg-gray-50 opacity-70'
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  <div 
                    className={`w-16 h-16 rounded-lg flex items-center justify-center ${
                      unlocked ? 'bg-[#b95c50]' : 'bg-gray-300'
                    }`}
                    style={{ backgroundColor: unlocked ? era.color : '#9CA3AF' }}
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-lg font-semibold ${
                      unlocked ? 'text-[#b95c50]' : 'text-gray-500'
                    }`}>
                      {era.name}
                    </h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      unlocked 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {unlocked ? 'Unlocked' : `${era.streakRequired} days needed`}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{era.period}</p>
                  <p className="text-sm text-gray-500">{era.description}</p>
                  
                  {!unlocked && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#b95c50] h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((currentStreak / era.streakRequired) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {era.streakRequired - currentStreak} more days to unlock
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Eras Preview */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-3 text-center">
            Future Discoveries Await
          </h4>
          <p className="text-sm text-gray-600 text-center">
            Continue your streak to unlock {historicalEras.filter(era => currentStreak < era.streakRequired).length} more historical eras!
            The next era unlocks at {historicalEras.find(era => currentStreak < era.streakRequired)?.streakRequired || 'max'} days.
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-[#b95c50] mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2" />
          Top Explorers This Week
        </h3>
        
        <div className="space-y-3">
          {[
            { name: "HistoryMaster", streak: 45, points: 1250 },
            { name: "TimeExplorer", streak: 32, points: 890 },
            { name: "You", streak: currentStreak, points: totalPoints },
            { name: "ChronicleSeeker", streak: 18, points: 520 },
            { name: "AncientWisdom", streak: 15, points: 450 }
          ].sort((a, b) => b.points - a.points).map((user, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg ${
                user.name === "You" ? 'bg-[#fbe5e0] border-2 border-[#b95c50]' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-gray-300'
                } text-white font-bold text-sm`}>
                  {index + 1}
                </div>
                <div>
                  <p className={`font-semibold ${user.name === "You" ? 'text-[#b95c50]' : 'text-gray-700'}`}>
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.streak} day streak</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#b95c50]">{user.points} pts</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Keep exploring to climb the leaderboard!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {!dailyChallenge.completed && (
          <button
            onClick={() => {
              // Scroll to challenge section
              const challengeSection = document.querySelector('[data-challenge]');
              if (challengeSection) {
                challengeSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 bg-[#b95c50] text-white font-semibold rounded-xl shadow-md hover:bg-[#a24d42] transition flex items-center"
          >
            <Scroll className="w-5 h-5 mr-2" />
            Complete Daily Challenge
          </button>
        )}
        
        <button
          onClick={() => setActiveSection("explore")}
          className="px-6 py-3 bg-[#de847b] text-white font-semibold rounded-xl shadow-md hover:bg-[#c97569] transition flex items-center"
        >
          <Globe className="w-5 h-5 mr-2" />
          Explore History
        </button>
        
        {streakFreezes > 0 && (
          <button
            onClick={useStreakFreeze}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition flex items-center"
          >
            <Shield className="w-5 h-5 mr-2" />
            Use Streak Freeze ({streakFreezes})
          </button>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-r from-[#b95c50] to-[#de847b] rounded-xl p-6 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Your Historical Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-3xl font-bold">{currentStreak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{unlockedEras.length}</div>
            <div className="text-sm opacity-90">Eras Unlocked</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{badges.filter(b => currentStreak >= b.streak).length}</div>
            <div className="text-sm opacity-90">Badges Earned</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHomeContent = () => (
    <div className="animate-fadeIn space-y-8 px-6">
      {showWelcome && (
        <div className="mb-4 text-xl font-bold text-[#b95c50]">
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
            <h3 className="text-6xl font-bold mb-4 text-[#b95c50]">
              History at Your Fingertips
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Step into the past with TimelineX — where history comes alive
              through interactive timelines, fascinating events, and unforgettable stories.
            </p>
            <button
              onClick={() => setActiveSection("explore")}
              className="px-6 py-3 bg-[#b95c50] text-white font-smibold rounded-xl shadow-md hover:bg-[#a24d42] transition"
            >
              Explore History
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src="/images/img-3.png"
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
      <p className="text-gray-600 text-center text-sm max-w-2xl mb-8">
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
            <h3 className="text-lg font-bold text-[#b95c50] text-center">{theme.name}</h3>
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
            className="px-4 py-2 text-sm text-[#b95c50] hover:underline font-medium bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Themes
          </button>
        </div>
        <h2 className="text-4xl font-bold text-[#b95c50] mb-6 text-center">
          {selectedTheme.name} - SubThemes
        </h2>
        <p className="text-gray-600 text-sm text-center mx-auto max-w-2xl mb-8">
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
                <h3 className="text-sm text-[#b95c50] font-semibold text-center">{sub.name}</h3>
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
            className="px-4 py-2 text-sm text-[#b95c50] hover:underline font-medium bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Sub-Themes
          </button>
          <button
            onClick={() => {
              setSelectedSubTheme(null);
              setSelectedTheme(null);
            }}
            className="px-4 py-2 text-sm text-[#b95c50] hover:underline font-medium ml-4 bg-transparent text-sm outline-none focus:outline-none ring-0"
          >
            ← Back to Themes
          </button>
        </div>
        <h2 className="text-4xl font-bold text-[#b95c50] mb-6 text-center">
          {selectedSubTheme.name} - Events
        </h2>
        <p className="text-gray-600 text-sm text-center mx-auto max-w-2xl mb-8">
          Explore the events related to this sub-theme to uncover fascinating stories, important milestones, and historical insights.
          Click on an event card below to learn more and dive into the details.
        </p>

        <div className="flex justify-center py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition"
                onClick={() => {
                  // Add event interaction logic here
                  setCurrentStreak(prev => prev + 1);
                  setTotalPoints(prev => prev + 5);
                }}
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg text-[#b95c50] font-semibold text-center">{event.name}</h3>
                <p className="text-gray-600 text-sm text-[#3d5b59] mt-2 text-center">
                  Description of {event.name} in {selectedSubTheme.name}.
                </p>
                <div className="text-center mt-3">
                  <span className="inline-block bg-[#b95c50] text-white px-3 py-1 rounded-full text-xs">
                    +5 Explorer Points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (showSearchMessage) {
        return renderSearchMessage();
    }
    if (activeSection === "explore") {
      if (selectedSubTheme) return renderEvents();
      if (selectedTheme) return renderSubThemes();
      return renderExploreThemes();
    }
    if (activeSection === "streak") return renderStreakTracker();
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
            className="text-lg font-bold"
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
                onKeyPress={handleKeyPress}
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
                  setShowSearchMessage(false);
                }}
                className={`px-2 py-1 text-sm font-medium transition-colors duration-200 border-b-2 focus:outline-none ${
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

          <div className="relative profile-dropdown">
            <div
              className="p-2 rounded-full cursor-pointer transition-colors"
              style={{ backgroundColor: darkMode ? "#deb3ad" : "#de847b" }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <User className="w-6 h-6" style={{ color: darkMode ? "#000" : "#fff" }} />
            </div>

            {profileOpen && (
              <div
                className="absolute top-16 right-0 w-80 rounded-xl shadow-lg p-6 z-50"
                style={{
                  backgroundColor: darkMode ? "#374151" : "#ffffff",
                  color: darkMode ? "#ffffff" : "#000000",
                  border: darkMode ? "1px solid #4B5563" : "1px solid #E5E7EB"
                }}
              >
                {/* Profile Header */}
                <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-600">
                  <div className="w-16 h-16 bg-gradient-to-br bg-[#3d5b59] rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{userSettings.name}</h3>
                    <p className="text-sm opacity-70">{userSettings.email}</p>
                    <div className="flex items-center mt-1">
                      <Flame className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="text-sm font-medium">{currentStreak} day streak</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-[#b5e5cf] rounded-lg bg-gray-50">
                    <div className="flex justify-center bg-transaparent mb-2">
                      <Star className="w-5 h-5 text-[#b95c50]" />
                    </div>
                    <div className="text-lg bg-transaparent font-bold text-[#b95c50]">{totalPoints}</div>
                    <div className="text-xs opacity-70">Total Points</div>
                  </div>
                  <div className="text-center p-3 bg-[#b5e5cf] rounded-lg bg-gray-50">
                    <div className="flex justify-center mb-2">
                      <Award className="w-5 h-5 text-[#b95c50]" />
                    </div>
                    <div className="text-lg font-bold text-[#b95c50]">
                      {badges.filter(b => currentStreak >= b.streak).length}
                    </div>
                    <div className="text-xs opacity-70">Badges</div>
                  </div>
                </div>

                {/* Profile Options */}
                <div className="space-y-2 mb-4 ">
                  <button
                    onClick={() => {
                      setActiveSection("streak");
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center bg-[#fcb5ac] px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <TrendingUp className="w-4 h-4 mr-3" />
                    <span>View Streak Details</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowAchievements(true);
                      setProfileOpen(false);
                    }}
                    className="w-full flex bg-[#fcb5ac] items-center px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Trophy className="w-4 h-4 mr-3" />
                    <span>Achievements</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setProfileOpen(false);
                    }}
                    className="w-full flex bg-[#fcb5ac] items-center px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    <span>Profile Settings</span>
                  </button>
                </div>

                {/* Logout Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center bg-[#b5e5cf] justify-center px-4 py-2 bg-red-500 text-black rounded-lg transition hover:bg-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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

      {/* Modals */}
      {showSettings && renderSettingsModal()}
      {showAchievements && renderAchievementsModal()}
    </div>
  );
};

export default Dashboard;