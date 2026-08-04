import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

import logoImg from "../assets/logo.png";

export default function Navbar() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer animate-float"
            onClick={() => navigate("/")}
          >
            <img
              src={logoImg}
              alt="Elderly Care Logo"
              className="h-8 w-8 object-contain mr-2"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
              {t("nav.brand")}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => handleScroll("about")}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => handleScroll("how")}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors"
            >
              {t("nav.howItWorks")}
            </button>
            <button
              onClick={() => handleScroll("reviews")}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors"
            >
              {t("nav.reviews")}
            </button>
            <button
              onClick={() => handleScroll("faq")}
              className="text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-colors"
            >
              {t("nav.faq")}
            </button>
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            <Link
              to="/login"
              className="text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-md shadow-purple-600/15 hover:shadow-purple-600/25 transition-all duration-200"
            >
              {t("nav.register")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/");
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {t("nav.home")}
          </button>
          <button
            onClick={() => handleScroll("about")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {t("nav.about")}
          </button>
          <button
            onClick={() => handleScroll("how")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {t("nav.howItWorks")}
          </button>
          <button
            onClick={() => handleScroll("reviews")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {t("nav.reviews")}
          </button>
          <button
            onClick={() => handleScroll("faq")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {t("nav.faq")}
          </button>
          <div className="pt-2 border-t border-purple-50 dark:border-purple-950 flex flex-col space-y-2">
            <div className="px-3 py-1 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Language:
              </span>
              <LanguageSelector />
            </div>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50"
            >
              {t("nav.login")}
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
            >
              {t("nav.register")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
