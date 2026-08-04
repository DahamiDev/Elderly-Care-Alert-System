import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowLeft } from "lucide-react";
import logoImg from "../assets/logo.png";

const BASE_URL = "http://localhost:5000/api";

export default function Register() {
  const navigate = useNavigate();

  // Registration form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Field validations
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // 1. Trigger registration API
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, parentName, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        // drectly not go to the dashboard, first g to the loging page and after go dashboard
        alert("Account created successfully! Please sign in.");
        navigate("/login");
      } else {
        setError(data.error || "Failed to create account.");
      }
    } catch (err) {
      console.error("Registration connection error:", err);
      setError("Cannot connect to backend service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300 font-sans">
      {/* Outer Card container matching the UI mockups */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-[480px] rounded-[2.5rem] shadow-xl p-8 md:p-12 relative border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="absolute top-8 left-8 text-xs text-slate-400 hover:text-purple-600 transition-colors flex items-center space-x-1"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col items-center text-center space-y-6 pt-6">
          {/* Logo */}
          <div className="animate-float">
            <img
              src={logoImg}
              alt="Elderly Care Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Join us to start caring for your patients
            </p>
          </div>

          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 py-3 px-4 rounded-xl text-xs font-semibold text-left">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Full Name */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-400/80 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-400/80 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Enter Your Parent Name */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Enter Your Parent Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Enter Your Parent Name..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-400/80 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-400/80 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Your Confirm Password..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-slate-400/80 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-[#8800FF] hover:bg-[#7700EE] text-white rounded-xl text-xs font-extrabold shadow-md shadow-purple-600/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1"
            >
              <span>{loading ? "Creating Account..." : "Create Account"}</span>
            </button>
          </form>

          {/* Social login divider */}
          <div className="w-full flex items-center justify-between py-2">
            <div className="w-[30%] h-px bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Or continue with
            </span>
            <div className="w-[30%] h-px bg-slate-200 dark:bg-slate-800"></div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              type="button"
              onClick={() =>
                alert("Social authentication features are in development.")
              }
              className="border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() =>
                alert("Social authentication features are in development.")
              }
              className="border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors"
            >
              <svg
                className="h-4 w-4 shrink-0 text-[#1877F2]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Face Book</span>
            </button>
          </div>

          {/* Switch Link */}
          <div className="pt-2 text-center text-xs">
            <span className="text-slate-400 font-medium">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="font-extrabold text-[#8800FF] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
