import axios from 'axios';

// Retrieve the Xano API URL from environment variables
const XANO_API_URL = import.meta.env.VITE_XANO_API_URL;

if (!XANO_API_URL) {
  console.warn(
    'Xano API URL is not configured. Please set VITE_XANO_API_URL in your project settings.'
  );
}

const xanoClient = axios.create({
  baseURL: XANO_API_URL,
});

// --- Authentication ---

export const login = async (email, password) => {
  if (!XANO_API_URL) throw new Error('Xano API URL not configured');
  try {
    // Replace '/auth/login' with your actual Xano login endpoint
    const response = await xanoClient.post('/auth/login', { email, password });
    // Assuming Xano returns a token upon successful login
    if (response.data.authToken) {
      localStorage.setItem('authToken', response.data.authToken);
      // Optionally set the token for subsequent requests
      xanoClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.authToken}`;
    }
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};

export const signup = async (name, email, password) => {
    if (!XANO_API_URL) throw new Error('Xano API URL not configured');
    try {
      // Replace '/auth/signup' with your actual Xano signup endpoint
      const response = await xanoClient.post('/auth/signup', { name, email, password });
      // Assuming Xano might return a token or user data upon successful signup
      // Handle response as needed, maybe auto-login or redirect
      return response.data;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

export const logout = () => {
  localStorage.removeItem('authToken');
  delete xanoClient.defaults.headers.common['Authorization'];
  // Add any Xano-specific logout logic if needed (e.g., invalidating token server-side)
};

// --- Example Data Fetching (Protected Route) ---

export const getProtectedData = async () => {
    if (!XANO_API_URL) throw new Error('Xano API URL not configured');
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('No authentication token found.');
    }
    try {
        // Replace '/items' with your actual protected Xano endpoint
        const response = await xanoClient.get('/items', {
            headers: { Authorization: `Bearer ${token}` } // Ensure token is sent
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch protected data:', error);
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            logout(); // Clear invalid token
        }
        throw error;
    }
};

// --- Check Authentication Status ---
export const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        xanoClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return true;
    }
    return false;
};
