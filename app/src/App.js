import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import GoogleLookup from "./pages/books/GoogleLookup";

function App() {
  return (
    <div className="App body">
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/google-lookup"
          element={
            <ProtectedRoute>
              <GoogleLookup />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={"/landing"} />} />
      </Routes>
    </div>
  );
}

export default App;
