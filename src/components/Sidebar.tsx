import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder icons
const DashboardIcon = () => <span>📊</span>;
const SettingsIcon = () => <span>⚙️</span>;
const UsersIcon = () => <span>👥</span>;
const CloseIcon = () => <span>✕</span>; // Simple close icon

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Function to close the sidebar
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    // Sidebar container: Fixed position, transitions for smooth open/close, hidden below lg, always visible lg and up
    <div
      className={`
        fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white flex flex-col z-30
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-auto
      `}
    >
      {/* Header with Logo and Close Button (visible only below lg) */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="text-2xl font-semibold">Your App</span>
        <button
          onClick={onClose}
          className="text-white p-1 rounded hover:bg-gray-700 lg:hidden" // Hide close button on large screens
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
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
