import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, checkAuth } from 'services/xano'; // Use absolute path from src
import DashboardCard from 'components/DashboardCard'; // Use absolute path from src
import SimpleBarChart from 'components/SimpleBarChart'; // Use absolute path from src
import ActivityFeed from 'components/ActivityFeed';
import { statsData, chartData, activityFeedData } from 'data/dashboardData';
import Sidebar from 'components/Sidebar';

// Placeholder Hamburger Icon
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);


const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  // Display main content (Dashboard) with Sidebar
  return (
    <div className="flex min-h-screen bg-gray-100 relative"> {/* Added relative for overlay positioning */}
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" // Only show overlay on smaller screens
          onClick={toggleSidebar} // Close sidebar on overlay click
        ></div>
      )}

      {/* Main Content Area */}
      {/* Adjust margin-left based on screen size: 0 on small screens, ml-64 on large screens */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          {/* Hamburger Menu Button - visible only below lg */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 p-2 rounded hover:bg-gray-200 lg:hidden" // Hide on large screens
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>
          {/* Ensure title doesn't overlap button on small screens */}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 ml-2 lg:ml-0">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base" // Adjusted padding/text size
            >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6">
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6"> {/* Adjusted grid for potentially smaller space */}
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
            <ActivityFeed data={activityFeedData} /> {/* Changed prop name from items to data */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-600 text-center p-4 mt-auto border-t border-gray-200">
            © 2025 Your Company
        </footer>
      </div> {/* End Main Content Area */}
    </div>
  );
};

export default MainPage;
