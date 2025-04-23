import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Placeholder icons (replace with actual icons later if needed)
const DashboardIcon = () => <span>📊</span>;
const SettingsIcon = () => <span>⚙️</span>;
const UsersIcon = () => <span>👥</span>;

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0"> {/* Fixed sidebar */}
      {/* Logo or Title */}
      <div className="p-4 text-2xl font-semibold border-b border-gray-700">
        Your App
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        <Link
          to="/" // Link to the main dashboard page
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <DashboardIcon />
          <span className="ml-3">Dashboard</span>
        </Link>
        <Link
          to="/users" // Placeholder link
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <UsersIcon />
          <span className="ml-3">Users</span>
        </Link>
        <Link
          to="/settings" // Placeholder link
          className="flex items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          <SettingsIcon />
          <span className="ml-3">Settings</span>
        </Link>
      </nav>

      {/* Footer or User Info (Optional) */}
      <div className="p-4 border-t border-gray-700 text-sm">
        User Info / Logout Area
      </div>
    </div>
  );
};

export default Sidebar;
