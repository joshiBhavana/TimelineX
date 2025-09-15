import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const startCheck = /^[A-Za-z0-9]/.test(password); // should not start with special char

    return {
      lengthCheck,
      upperCheck,
      lowerCheck,
      numberCheck,
      specialCheck,
      startCheck,
      isValid: lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck && startCheck
    };
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Validate password
    const pwdValidation = validatePassword(password);
    if (!pwdValidation.isValid) {
      setPasswordError("Password must be at least 8 characters, include uppercase, lowercase, number, special character, and not start with a special character.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userData = { email };
      onSignup(userData);
      setLoading(false);
      navigate("/interests", { replace: true });
    }, 1500);
  };

  const handleGoogleSignup = async () => {
    try {
      const user = await signInWithGoogle();
      onSignup(user);
      navigate("/interests", { replace: true });
    } catch (error) {
      alert("Google Sign-up failed. Try again!");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden bg-[#fbe5e0]">
      <div className="relative z-10 w-full max-w-md px-8 py-10 bg-[#ab6b51] shadow-2xl rounded-xl border border-[#9c5a40] hover:scale-105 hover:shadow-3xl transition-all duration-500 ease-in-out animate-fadeIn text-white">
        <h2 className="title-font text-4xl font-bold text-center text-white mb-3 animate-slideDown">
          Create Account
        </h2>
        <p className="text-center text-sm text-white mb-3 mb-6 font-[Lato] animate-slideUp">
          Join <span className="font-semibold title-font text-[#2f435a] mb-3">TimelineX</span> and start exploring
        </p>

        <form onSubmit={handleSignup} className="space-y-4 text-sm font-[Lato]">
          <div className="relative animate-slideLeft">
            <User className="absolute left-3 top-3 w-4 h-4" style={{ color: "#9c5a40" }} />
            <input
              type="text"
              placeholder="First Name"
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-[#5C3A21] focus:ring-1 focus:ring-[#c89870] focus:outline-none bg-white/60 text-black caret-black"
            />
          </div>

          <div className="relative animate-slideLeft">
            <User className="absolute left-3 top-3 w-4 h-4" style={{ color: "#9c5a40" }} />
            <input
              type="text"
              placeholder="Last Name"
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-[#5C3A21] focus:ring-1 focus:ring-[#c89870] focus:outline-none bg-white/60 text-black caret-black"
            />
          </div>

          <div className="relative animate-slideLeft">
            <Mail className="absolute left-3 top-3 w-4 h-4" style={{ color: "#9c5a40" }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2 rounded-md border border-[#5C3A21] focus:ring-1 focus:ring-[#c89870] focus:outline-none bg-white/60 text-black caret-black"
            />
            {emailError && <p className="text-xs text-white mt-1">{emailError}</p>}
          </div>

          <div className="relative animate-slideRight">
            <Lock className="absolute left-3 top-3 w-4 h-4" style={{ color: "#9c5a40" }} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pr-10 pl-9 py-2 rounded-md border border-[#5C3A21] focus:ring-1 focus:ring-[#c89870] focus:outline-none bg-white/60 text-black caret-black"
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-[#2f435a]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
            {passwordError && (
              <p className="text-xs text-white mt-1">
                {passwordError}
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md font-semibold text-white text-lg bg-[#523a28] shadow-md hover:shadow-lg hover:opacity-95"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center my-4 animate-fadeIn">
          <hr className="flex-grow border-[#654321]" />
          <span className="px-2 text-xs text-white">OR</span>
          <hr className="flex-grow border-[#654321]" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full py-3 bg-white flex items-center justify-center gap-2 rounded-xl bg-white/80 hover:bg-amber-50 transition font-medium text-black"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="mt-4 text-center animate-fadeIn">
          <p className="text-xs text-white font-[Lato]">
            Already have an account?{' '}
            <button
              onClick={() => navigate("/login")}
              className="text-[#2f435a] font-semibold hover:underline bg-transparent p-0 m-0 align-baseline"
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
