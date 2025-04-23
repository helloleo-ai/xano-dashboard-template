import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define aliases to map paths starting from 'src'
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'services': path.resolve(__dirname, 'src/services'),
      'data': path.resolve(__dirname, 'src/data'),
      // Add other top-level directories in src if needed
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Allows access from network
    allowedHosts: true // Important for Codesphere preview
  }
})
