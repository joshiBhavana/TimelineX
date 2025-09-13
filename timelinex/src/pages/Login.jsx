import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff } from "lucide-react"; // 👀 added Eye icons
import { signInWithGoogle } from "../firebase";

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      onLogin(user);
      navigate("/dashboard");
    } catch (error) {
      alert("Google Sign-in failed. Try again!");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-[#fbe5e0]">
      <div
        className="relative z-10 w-full max-w-md px-8 py-10
             bg-[#c89870] 
             shadow-2xl 
             rounded-xl border border-[#9c5a40] 
             hover:scale-105 hover:shadow-3xl 
             transition-all duration-500 ease-in-out animate-fadeIn
             text-white"
      >
        <h2 className="title-font text-4xl font-bold text-center text-white mb-3 animate-slideDown">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-white mb-3 mb-6 font-[Lato] animate-slideUp">
          Login to continue exploring{" "}
          <span className="font-semibold title-font text-red-600 mb-3">
            TimelineX
          </span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-sm font-[Lato]">
          {/* Email input */}
          <div className="relative animate-slideLeft">
            <User
              className="absolute left-3 top-3 w-4 h-4"
              style={{ color: "#9c5a40" }}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-[#5C3A21] 
                        focus:ring-1 focus:ring-[#c89870] focus:outline-none 
                        bg-white/60 text-black caret-black"
            />
          </div>

          {/* Password input with eye icon */}
          <div className="relative animate-slideRight">
            <Lock
              className="absolute left-3 top-3 w-4 h-4"
              style={{ color: "#9c5a40" }}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full pr-10 pl-9 py-2 rounded-md border border-[#5C3A21] 
                        focus:ring-1 focus:ring-[#c89870] focus:outline-none 
                        bg-white/60 text-black caret-black"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-[#9c5a40]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-semibold text-white text-lg
           bg-[#9c5a40] shadow-md 
           hover:shadow-lg hover:opacity-95 transition duration-300 
           disabled:opacity-60 animate-pulse"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-4 animate-fadeIn">
          <hr className="flex-grow border-[#654321]" />
          <span className="px-2 text-xs text-white">OR</span>
          <hr className="flex-grow border-[#654321]" />
        </div>

        {/* Google login button */}
        <button
  onClick={handleGoogleLogin}
  className="w-full py-2 flex items-center justify-center gap-2 rounded-md border border-amber-300 bg-white/80 hover:bg-amber-50 transition font-medium text-black"
>
  <img
    src="https://www.svgrepo.com/show/355037/google.svg"
    alt="Google"
    className="w-5 h-5"
  />
  Continue with Google
</button>


        {/* Signup link */}
        <div className="mt-4 text-center animate-fadeIn">
          <p className="text-xs text-white font-[Lato]">
            Don’t have an account?
            <button
              onClick={() => navigate("/signup")}
              className="text-white font-semibold hover:underline bg-transparent"
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