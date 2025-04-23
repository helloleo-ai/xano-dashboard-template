import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, checkAuth } from '../services/xano';
import DashboardCard from '../components/DashboardCard';
import SimpleBarChart from '../components/SimpleBarChart';
import ActivityFeed from '../components/ActivityFeed';
import { statsData, chartData, activityFeedData } from '../data/dashboardData';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  // Keep loading state for auth check, remove data/error states for Xano fetch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    if (!checkAuth()) {
      navigate('/login'); // Redirect to login if not authenticated
    } else {
      // If authenticated, stop loading
      setLoading(false);
    }
    // No need to fetch data here for the dashboard layout example
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Clear auth token using Xano service
    navigate('/login'); // Redirect to login page
  };

  // Display loading state (only for auth check now)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="text-xl font-semibold text-gray-700">Checking authentication...</div>
        {/* You could add a spinner here */}
      </div>
    );
  }

  // Display main content (Dashboard)
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
            Logout
            </button>
        </header>

      {/* Main Content Area */}
      <main className="flex-grow p-6">
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat) => (
            <DashboardCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType as 'positive' | 'negative' | 'neutral'}
            />
          ))}
        </div>

        {/* Chart and Activity Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart taking 2 columns */}
          <div className="lg:col-span-2">
            <SimpleBarChart data={chartData} />
          </div>

          {/* Activity Feed taking 1 column */}
          <div className="lg:col-span-1">
            <ActivityFeed items={activityFeedData} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-600 text-center p-4 mt-auto border-t border-gray-200">
            © 2025 Your Company
        </footer>
    </div>
  );
};

export default MainPage;
