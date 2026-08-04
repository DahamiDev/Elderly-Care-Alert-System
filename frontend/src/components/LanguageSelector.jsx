import React from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex items-center space-x-1">
      <Globe className="h-4 w-4 text-purple-600 dark:text-purple-300 mr-1" />
      <div className="flex border border-purple-200 dark:border-purple-800 rounded-md overflow-hidden text-xs">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-2 py-1 transition-colors ${
            currentLanguage === "en"
              ? "bg-purple-600 text-white font-semibold"
              : "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("si")}
          className={`px-2 py-1 transition-colors ${
            currentLanguage === "si"
              ? "bg-purple-600 text-white font-semibold"
              : "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800"
          }`}
        >
          SI
        </button>
        <button
          onClick={() => changeLanguage("ta")}
          className={`px-2 py-1 transition-colors ${
            currentLanguage === "ta"
              ? "bg-purple-600 text-white font-semibold"
              : "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800"
          }`}
        >
          TA
        </button>
      </div>
    </div>
  );
}

// react-i18next library
