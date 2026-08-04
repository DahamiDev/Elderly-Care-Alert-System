import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Check, RefreshCw } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

export default function ParentCheckin() {
  const { t } = useTranslation();
  const { token } = useParams();

  const [parentName, setParentName] = useState("");
  const [status, setStatus] = useState("loading"); // loading, ready, success, error
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch parent details on load
  useEffect(() => {
    fetch(`http://192.168.197.224:5000/api/checkin/details/${token}`)
      .then((res) => {
        if (!res.ok)
          throw new Error("This check-in link is invalid or has expired.");
        return res.json();
      })
      .then((data) => {
        setParentName(data.name);
        if (data.checkinStatus === "Safe") {
          setStatus("success");
        } else {
          setStatus("ready");
        }
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage(err.message);
      });
  }, [token]);

  const handleConfirm = () => {
    setStatus("confirming");
    fetch(`http://192.168.197.224:5000/api/checkin/verify/${token}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Could not record response. Please try again.");
        return res.json();
      })
      .then(() => {
        setStatus("success");
      })
      .catch((err) => {
        setStatus("ready");
        alert(err.message);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors duration-300">
      {/* Header controls for easy accessibility */}
      <header className="flex justify-between items-center max-w-md mx-auto w-full py-2">
        <LanguageSelector />
        <ThemeToggle />
      </header>

      {/* Main card box */}
      <main className="flex-1 flex items-center justify-center py-6">
        <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] shadow-xl border border-purple-50 dark:border-purple-950 p-8 text-center relative overflow-hidden flex flex-col justify-between min-h-[460px] transition-colors duration-300">
          {/* Top Heart Hands Logo */}
          <div className="flex justify-center pt-2">
            <div className="bg-purple-100 dark:bg-purple-950/60 p-3 rounded-full text-purple-600 dark:text-purple-400">
              <Heart className="h-8 w-8 fill-current" />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 flex flex-col justify-center items-center my-6 space-y-6">
            {status === "loading" && (
              <div className="space-y-3">
                <RefreshCw className="h-8 w-8 text-purple-600 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">
                  Loading check-in information...
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-3 text-red-500">
                <p className="text-sm font-bold">{errorMessage}</p>
                <p className="text-xs text-slate-400">
                  Please contact your child or support for assistance.
                </p>
              </div>
            )}

            {(status === "ready" || status === "confirming") && (
              <>
                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 leading-tight">
                    {t("checkin.greeting")} {parentName}!
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium px-4">
                    {t("checkin.prompt")}
                  </p>
                </div>

                {/* Big Green Confirm Button */}
                <button
                  onClick={handleConfirm}
                  disabled={status === "confirming"}
                  className="w-40 h-40 rounded-full bg-gradient-to-tr from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-extrabold text-lg flex flex-col items-center justify-center space-y-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/35 transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-200"
                >
                  <Check className="h-10 w-10 stroke-[3]" />
                  <span>{t("checkin.button")}</span>
                </button>
              </>
            )}

            {status === "success" && (
              <div className="space-y-6 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center text-green-500 animate-bounce">
                  <Check className="h-12 w-12 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t("checkin.recorded")}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 px-6">
                    We have updated your status to Safe on the dashboard.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Leaf Decoration SVGs at the bottom */}
          <div className="flex justify-between items-end h-16 w-full px-4 overflow-hidden relative pointer-events-none select-none">
            {/* Left Leaf SVG */}
            <svg
              className="w-16 h-16 text-purple-200 dark:text-slate-600/40 fill-current transform -rotate-12"
              viewBox="0 0 100 100"
            >
              <path d="M10,90 Q40,80 70,50 Q45,55 35,75 M70,50 Q85,25 90,10 Q65,25 50,45" />
            </svg>
            <span className="text-4xs text-slate-400 dark:text-slate-500 z-10 select-none pb-2">
              Elderly Care Alert System
            </span>
            {/* Right Leaf SVG */}
            <svg
              className="w-16 h-16 text-purple-200 dark:text-slate-600/40 fill-current transform rotate-12 scale-x-[-1]"
              viewBox="0 0 100 100"
            >
              <path d="M10,90 Q40,80 70,50 Q45,55 35,75 M70,50 Q85,25 90,10 Q65,25 50,45" />
            </svg>
          </div>
        </div>
      </main>

      <footer className="text-3xs text-slate-400 text-center py-2">
        Powered by Advanced Safety Tech
      </footer>
    </div>
  );
}
