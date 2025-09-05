import React, { useState } from "react";
import { User, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    // Fake signup delay
    setTimeout(() => {
      const userData = { email: "demo@example.com" };
      onSignup(userData);

      setLoading(false);

      // ✅ navigate to interests right after signup
      navigate("/interests", { replace: true });
    }, 1500);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-100">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, #f59e0b, #eab308)`,
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${(i * 12) % 90}%`,
              top: `${(i * 15) % 90}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md px-8 py-10 bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl border border-amber-200 animate-fadeIn">
        <h2 className="text-4xl font-bold text-center text-amber-900 mb-6">
          Create Account
        </h2>
        <p className="text-center text-amber-700 mb-8">
          Join <span className="font-semibold">TimelineX</span> and start exploring
        </p>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-amber-600" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:scale-105 transform transition duration-300 disabled:opacity-70"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-amber-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
