import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email: "demo@user.com" }); 
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#f4e1c1] via-[#fbe9d7] to-[#f9f3ea]">
      {/* Glassy Box */}
      <div
        className="relative z-10 w-full max-w-sm px-6 py-8 
                   bg-white/25 backdrop-blur-md shadow-xl 
                   rounded-lg border border-amber-300/40 
                   hover:scale-105 transition-transform 
                   duration-300 ease-in-out"
      >
        <h2 className="title-font text-3xl font-bold text-center text-amber-900 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-amber-700 mb-6 font-[Lato]">
          Login to continue exploring{" "}
          <span className="font-semibold title-font text-amber-900">
            TimelineX
          </span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-sm font-[Lato]">
          {/* Email */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-amber-700" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-amber-300 
                         focus:ring-1 focus:ring-amber-400 focus:outline-none 
                         bg-white/60"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-amber-700" />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-amber-300 
                         focus:ring-1 focus:ring-amber-400 focus:outline-none 
                         bg-white/60"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-semibold text-white text-sm 
                       bg-gradient-to-r from-amber-600 to-orange-500 shadow-md 
                       hover:shadow-lg hover:opacity-95 transition duration-300 
                       disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-amber-700 font-[Lato]">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
