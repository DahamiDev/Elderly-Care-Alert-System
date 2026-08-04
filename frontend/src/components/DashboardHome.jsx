import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, UserCheck, BellRing, UserPlus, AlertTriangle, CheckCircle2, RefreshCw 
} from 'lucide-react';

export default function DashboardHome({ stats, loading, error, onRefresh, onAddParent, onAddNeighbor }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex-1 flex justify-center items-center h-96">
        <RefreshCw className="h-8 w-8 text-purple-600 animate-spin" />
      </div>
    );
  }

  const counts = stats?.counts || { parents: 0, neighbors: 0, totalCheckins: 0, pendingAlerts: 0 };
  const todayCheckins = stats?.todayCheckins || [];
  const recentAlerts = stats?.recentAlerts || [];

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Greeting and Refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {t('dashboard.greeting')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time status updates from Telegram and Web check-ins
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-800 text-purple-600 dark:text-purple-400 transition-colors"
          title="Refresh Stats"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Parents Card */}
        <div className="bg-purple-200 dark:bg-purple-950/60 p-6 rounded-2xl shadow-sm border border-purple-300/30 dark:border-purple-800/30 flex flex-col justify-between min-h-36">
          <div className="flex justify-between items-start">
            <span className="text-4xl font-extrabold text-purple-900 dark:text-purple-200">{counts.parents}</span>
            <Users className="h-6 w-6 text-purple-700 dark:text-purple-400" />
          </div>
          <span className="font-bold text-sm text-purple-800 dark:text-purple-300 mt-4">{t('dashboard.parents')}</span>
        </div>

        {/* Neighbors Card */}
        <div className="bg-purple-200 dark:bg-purple-950/60 p-6 rounded-2xl shadow-sm border border-purple-300/30 dark:border-purple-800/30 flex flex-col justify-between min-h-36">
          <div className="flex justify-between items-start">
            <span className="text-4xl font-extrabold text-purple-900 dark:text-purple-200">{counts.neighbors}</span>
            <UserPlus className="h-6 w-6 text-purple-700 dark:text-purple-400" />
          </div>
          <span className="font-bold text-sm text-purple-800 dark:text-purple-300 mt-4">{t('dashboard.neighbors')}</span>
        </div>

        {/* Total Check-ins Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-purple-100 dark:border-purple-950 flex flex-col justify-between min-h-36">
          <div className="flex justify-between items-start">
            <span className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">{counts.totalCheckins}</span>
            <UserCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="font-bold text-sm text-slate-500 dark:text-slate-400 mt-4">{t('dashboard.totalCheckins')}</span>
        </div>

        {/* Pending Alerts Card */}
        <div className="bg-purple-200 dark:bg-purple-950/60 p-6 rounded-2xl shadow-sm border border-purple-300/30 dark:border-purple-800/30 flex flex-col justify-between min-h-36">
          <div className="flex justify-between items-start">
            <span className="text-4xl font-extrabold text-purple-900 dark:text-purple-200">{counts.pendingAlerts}</span>
            <BellRing className="h-6 w-6 text-purple-700 dark:text-purple-400" />
          </div>
          <span className="font-bold text-sm text-purple-800 dark:text-purple-300 mt-4">{t('dashboard.pendingAlerts')}</span>
        </div>
      </div>

      {/* Main Content Split Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Check-ins (Left Panel) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('dashboard.todaysCheckins')}
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {todayCheckins.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
                No parents registered. Register a parent in Quick Actions to start tracking!
              </div>
            ) : (
              todayCheckins.map((parent) => (
                <div 
                  key={parent.id} 
                  className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/60 last:border-0 hover:bg-purple-50/20 dark:hover:bg-slate-800/20 rounded-xl transition-colors"
                >
                  {/* Parent Profile */}
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center font-extrabold text-purple-700 dark:text-purple-300">
                      {parent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{parent.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{parent.relationship}</p>
                    </div>
                  </div>

                  {/* Verification Status & Time */}
                  <div className="flex items-center space-x-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                      parent.status === 'Safe'
                        ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                        : parent.status === 'Escalated'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400'
                    }`}>
                      {parent.status === 'Safe' ? t('dashboard.safe') : parent.status === 'Escalated' ? t('dashboard.escalated') : t('dashboard.pending')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-16 text-right">
                      {parent.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Alerts & Quick Actions (Right Panel) */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          {/* Recent Alerts */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 space-y-4 flex-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('dashboard.recentAlerts')}
            </h2>
            <div className="space-y-4 overflow-y-auto max-h-[180px] pr-1">
              {recentAlerts.length === 0 ? (
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-950/20 rounded-2xl text-xs font-semibold">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>All parents checked in safe!</span>
                </div>
              ) : (
                recentAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-950/50 rounded-2xl"
                  >
                    <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{alert.name}</h4>
                      <p className="text-3xs text-red-600 dark:text-red-400 font-semibold mt-0.5">{alert.message}</p>
                    </div>
                    <span className="text-3xs font-semibold text-slate-400 dark:text-slate-500 shrink-0">{alert.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-purple-100 dark:border-purple-950 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {t('dashboard.quickActions')}
            </h2>
            <div className="flex flex-col space-y-3">
              <button
                onClick={onAddParent}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>+ {t('dashboard.addParent')}</span>
              </button>
              <button
                onClick={onAddNeighbor}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>+ {t('dashboard.addNeighbor')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
