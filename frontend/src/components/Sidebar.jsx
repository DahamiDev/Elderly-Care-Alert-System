import React from "react";
import { useTranslation } from "react-i18next";
import {
  Home,
  Users,
  ShieldAlert,
  History,
  LogOut,
  UserPlus,
  HelpCircle,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function Sidebar({ currentTab, setCurrentTab, handleLogout }) {
  const { t } = useTranslation();

  const menuItems = [
    { id: "home", icon: <Home className="h-6 w-6" />, label: t("nav.home") },
    {
      id: "parents",
      icon: <Users className="h-6 w-6" />,
      label: t("dashboard.parents"),
    },
    {
      id: "neighbors",
      icon: <UserPlus className="h-6 w-6" />,
      label: t("dashboard.neighbors"),
    },
    {
      id: "history",
      icon: <History className="h-6 w-6" />,
      label: t("dashboard.safetyHistory"),
    },
  ];

  return (
    <aside className="w-20 md:w-64 bg-slate-100 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between items-center md:items-stretch p-4 transition-all duration-300 min-h-screen">
      {/* Top Brand Logo */}
      <div className="flex items-center space-x-3 py-4 border-b border-slate-200 dark:border-slate-800 w-full justify-center md:justify-start">
        <img
          src="/logo.png"
          alt="Elderly Care Logo"
          className="w-12 h-12 object-contain"
        />
        <span className="hidden md:block font-extrabold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
          {t("nav.brand")}
        </span>
      </div>

      {/* Menu Options */}
      <nav className="flex-1 w-full space-y-2 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-200 ${
              currentTab === item.id
                ? "bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/10"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            {item.icon}
            <span className="hidden md:block text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Controls */}
      <div className="w-full space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center md:items-stretch">
        <div className="hidden md:flex flex-col space-y-2 px-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t("dashboard.status")}:</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-500">Language:</span>
            <LanguageSelector />
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center space-y-2">
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut className="h-6 w-6" />
          <span className="hidden md:block text-sm font-semibold">
            {t("dashboard.logout")}
          </span>
        </button>
      </div>
    </aside>
  );
}
