# React + Xano Frontend Boilerplate

This is a frontend boilerplate built with React, Vite, and Tailwind CSS, designed to connect to a Xano backend. It includes pre-built features for user authentication (login/signup) and a responsive dashboard layout.

## Features

-   **Frontend Framework:** React with Vite for fast development and builds.
-   **Styling:** Tailwind CSS for utility-first styling.
-   **Routing:** React Router DOM for page navigation.
-   **Backend Integration:** Configured to work with a Xano backend via Axios (`src/services/xano.ts`).
-   **Authentication:** Login (`src/pages/LoginPage.tsx`) and Signup (`src/pages/SignupPage.tsx`) pages ready to connect to Xano auth endpoints.
-   **Dashboard:** A responsive main page (`src/pages/MainPage.tsx`) displayed after login, featuring:
    -   Responsive Sidebar (`src/components/Sidebar.tsx`)
    -   Dashboard Cards (`src/components/DashboardCard.tsx`)
    -   Bar Chart (`src/components/SimpleBarChart.tsx` using Recharts)
    -   Activity Feed (`src/components/ActivityFeed.tsx`)
-   **TypeScript:** Type safety throughout the project.
-   **Path Aliases:** Configured `components/*`, `pages/*`, `services/*`, `data/*` aliases for easier imports (`tsconfig.json`, `vite.config.js`).

## Getting Started

1.  **Configure Xano Backend:**
    *   In your project settings, add an environment variable named `VITE_XANO_API_URL` and set its value to your Xano API Group Base URL.
    *   Open the `src/services/xano.ts` file. Update the placeholder endpoint paths (e.g., `/auth/login`, `/auth/signup`) to match the actual endpoints in your Xano backend API group.

2.  **Deploy:**
    *   Use the "Deploy Project" button in the interface. This will install dependencies, build the project, and deploy it. You will need to redeploy after setting the environment variable or changing backend endpoints.

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Image or other static assets used in components
│   ├── components/      # Reusable UI components (Sidebar, DashboardCard, etc.)
│   ├── data/            # Mock data (e.g., dashboardData.ts)
│   ├── pages/           # Page-level components (LoginPage, SignupPage, MainPage)
│   ├── services/        # Backend communication logic (xano.ts)
│   ├── App.tsx          # Main application component with routing setup
│   ├── index.css        # Global styles and Tailwind CSS directives
│   └── main.tsx         # Application entry point
├── .eslintrc.cjs        # ESLint configuration (if present)
├── .gitignore           # Git ignore rules
├── index.html           # Main HTML entry point
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration (for Tailwind)
├── README.md            # This file
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript configuration for Node.js environment (e.g., Vite config)
└── vite.config.js       # Vite configuration (build tool)
```

## Available Scripts

The following scripts are defined in `package.json` and are typically run automatically by the deployment environment:

-   `dev`: Runs the app in development mode with hot-reloading.
-   `build`: Compiles TypeScript and builds the app for production.
-   `lint`: Lints the codebase using ESLint.
-   `preview`: Serves the production build locally for preview.
-   `start`: Runs the app in development mode, exposing it on the local network.
