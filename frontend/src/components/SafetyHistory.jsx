import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Filter, User } from "lucide-react";

export default function SafetyHistory({ history }) {
  const { t } = useTranslation();

  // Filter states
  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Extract unique names / relationship options for filtering
  const relationshipOptions = useMemo(() => {
    const names = history.map((item) => item.name);
    return [...new Set(names)];
  }, [history]);

  // Extract unique dates for filtering
  const dateOptions = useMemo(() => {
    const dates = history.map((item) => item.date);
    return [...new Set(dates)];
  }, [history]);

  // Filtered logs
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchRelationship =
        !selectedRelationship || item.name === selectedRelationship;
      const matchDate = !selectedDate || item.date === selectedDate;
      return matchRelationship && matchDate;
    });
  }, [history, selectedRelationship, selectedDate]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {t("dashboard.safetyHistory")}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Review log of all verified check-ins and emergency dispatches
        </p>
      </div>

      {/* Filter Dropdowns (Screenshot 4) */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-purple-100 dark:border-purple-950 shadow-sm">
        {/* Name / Relationship Filter */}
        <div className="flex-1 space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center space-x-1">
            <User className="h-3.5 w-3.5 text-purple-600" />
            <span>Relationship (Name)</span>
          </label>
          <select
            value={selectedRelationship}
            onChange={(e) => setSelectedRelationship(e.target.value)}
            className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
          >
            <option value="">All Registered Parents</option>
            {relationshipOptions.map((name, i) => (
              <option key={i} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex-1 space-y-1">
          <label className="text-xs font-bold text-slate-500 flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5 text-purple-600" />
            <span>Date</span>
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-purple-100 dark:border-purple-950 dark:bg-slate-950 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 text-slate-800 dark:text-white"
          >
            <option value="">All Logged Dates</option>
            {dateOptions.map((date, i) => (
              <option key={i} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* History Logs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                <th className="py-4 px-4">{t("dashboard.name")}</th>
                <th className="py-4 px-4">{t("dashboard.date")}</th>
                <th className="py-4 px-4">{t("dashboard.time")}</th>
                <th className="py-4 px-4">{t("dashboard.status")}</th>
                <th className="py-4 px-4">{t("dashboard.source")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-slate-400 dark:text-slate-500"
                  >
                    No safety history logs matching these filters found.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-purple-50/10 dark:hover:bg-slate-800/10"
                  >
                    <td className="py-4 px-4 font-semibold text-slate-950 dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                      {item.date}
                    </td>
                    <td className="py-4 px-4 text-slate-500 dark:text-slate-400">
                      {item.time}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                          item.status === "Safe"
                            ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                        }`}
                      >
                        {item.status === "Safe"
                          ? t("dashboard.safe")
                          : t("dashboard.pending")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                      {item.source}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
