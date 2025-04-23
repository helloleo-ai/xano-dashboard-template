import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProtectedData, logout, checkAuth } from '../services/xano'; // Assuming you have a checkAuth function

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null); // State to hold data fetched from Xano
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated on component mount
    if (!checkAuth()) {
      navigate('/login'); // Redirect to login if not authenticated
      return; // Stop execution if not authenticated
    }

    // Fetch protected data from Xano
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getProtectedData(); // Use your Xano service function
        setData(result);
      } catch (err) {
        setError('Failed to fetch data. You might be logged out.');
        console.error(err);
        // Optional: Redirect to login if fetch fails due to auth error
        if (err.message.includes('No authentication token') || (err.response && err.response.status === 401)) {
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // Rerun effect if navigate function changes (though unlikely)

  const handleLogout = () => {
    logout(); // Clear auth token using Xano service
    navigate('/login'); // Redirect to login page
  };

  // Display loading state
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="text-xl font-semibold">Loading your dashboard...</div>
            {/* You can add a spinner here */}
        </div>
    );
  }

  // Display error state
  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
            <div className="text-xl font-semibold text-red-700">Error</div>
            <p className="text-red-600">{error}</p>
            <button
                onClick={() => navigate('/login')} // Go back to login on error
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go to Login
            </button>
        </div>
    );
  }

  // Display main content
  return (
    <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Main Dashboard</h1>
            <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
            Logout
            </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="mb-6">This is your main application page after logging in.</p>

            {/* Display fetched data */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-medium mb-2">Data from Xano:</h3>
                {data ? (
                    <pre className="bg-gray-50 p-3 rounded overflow-x-auto text-sm">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                ) : (
                    <p>No data loaded yet.</p>
                )}
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
            © 2025 Your Company
        </footer>
    </div>
  );
};

export default MainPage;
