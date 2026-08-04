import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import ParentsManagement from './ParentsManagement';
import NeighborsManagement from './NeighborsManagement';
import SafetyHistory from './SafetyHistory';

const BASE_URL = 'http://localhost:5000/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('home');
  
  // Modals trigger
  const [openAddParentModal, setOpenAddParentModal] = useState(false);
  const [openAddNeighborModal, setOpenAddNeighborModal] = useState(false);

  // States
  const [stats, setStats] = useState(null);
  const [parents, setParents] = useState([]);
  const [neighbors, setNeighbors] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Stats and checkins overview
      const statsRes = await fetch(`${BASE_URL}/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      // 2. Parents details
      const parentsRes = await fetch(`${BASE_URL}/parents`);
      const parentsData = await parentsRes.json();
      setParents(parentsData);

      // 3. Neighbors details
      const neighborsRes = await fetch(`${BASE_URL}/neighbors`);
      const neighborsData = await neighborsRes.json();
      setNeighbors(neighborsData);

      // 4. Safety check-in history
      const historyRes = await fetch(`${BASE_URL}/history`);
      const historyData = await historyRes.json();
      setHistory(historyData);

      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  // PARENT CRUD DISPATCHES
  const handleAddParent = async (parentData) => {
    try {
      const res = await fetch(`${BASE_URL}/parents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parentData)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error adding parent:', err);
    }
  };

  const handleUpdateParent = async (id, updatedData) => {
    try {
      const res = await fetch(`${BASE_URL}/parents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating parent:', err);
    }
  };

  const handleDeleteParent = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/parents/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting parent:', err);
    }
  };

  // NEIGHBOR CRUD DISPATCHES
  const handleAddNeighbor = async (neighborData) => {
    try {
      const res = await fetch(`${BASE_URL}/neighbors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(neighborData)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error adding neighbor:', err);
    }
  };

  const handleUpdateNeighbor = async (id, updatedData) => {
    try {
      const res = await fetch(`${BASE_URL}/neighbors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error updating neighbor:', err);
    }
  };

  const handleDeleteNeighbor = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/neighbors/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting neighbor:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">
      {/* Left Sidebar */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950/60 p-4 sm:p-8">
        {error && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-100 border border-red-200 dark:bg-red-950/40 dark:border-red-950 text-red-700 dark:text-red-400 p-4 rounded-xl text-sm flex items-center justify-between">
            <span>⚠️ {error} Please verify your Express backend server is running on port 5000.</span>
            <button onClick={fetchData} className="underline font-bold text-xs">Retry</button>
          </div>
        )}

        {/* View Routing Switch */}
        {currentTab === 'home' && (
          <DashboardHome 
            stats={stats} 
            loading={loading} 
            error={error} 
            onRefresh={fetchData} 
            onAddParent={() => { setCurrentTab('parents'); setOpenAddParentModal(true); }}
            onAddNeighbor={() => { setCurrentTab('neighbors'); setOpenAddNeighborModal(true); }}
          />
        )}

        {currentTab === 'parents' && (
          <ParentsManagement 
            parents={parents} 
            onAdd={handleAddParent} 
            onUpdate={handleUpdateParent} 
            onDelete={handleDeleteParent}
            openAddModal={openAddParentModal}
            setOpenAddModal={setOpenAddParentModal}
          />
        )}

        {currentTab === 'neighbors' && (
          <NeighborsManagement 
            neighbors={neighbors} 
            onAdd={handleAddNeighbor} 
            onUpdate={handleUpdateNeighbor} 
            onDelete={handleDeleteNeighbor}
            openAddModal={openAddNeighborModal}
            setOpenAddModal={setOpenAddNeighborModal}
          />
        )}

        {currentTab === 'history' && (
          <SafetyHistory 
            history={history} 
          />
        )}
      </main>
    </div>
  );
}
