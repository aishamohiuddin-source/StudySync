import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";

import Home from "./pages/home";
import Planner from "./pages/planner";
import Dashboard from "./pages/dashboard";
import Calendar from "./pages/calendar";
import Login from "./pages/login";

import { AuthProvider, useAuth } from "./context/authcontext";


// Protected Route
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Jab tak saved login check ho raha hai
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading StudySync...</p>
      </div>
    );
  }

  // Login nahi hai to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// Main App Routes
function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/planner"
          element={
            <ProtectedRoute>
              <Planner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Temporary About route
            Later Calendar will replace this */}
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}


// App with Authentication Provider
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;