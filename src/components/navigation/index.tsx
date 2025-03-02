import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Login from '../login';
import Home from '../home';

function AppNavigation() {
  const { isSignedIn } = useUser();



  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            isSignedIn ? <Home /> : <Navigate to="/" replace />
          }
        />

        {/* Catch-all route:  Handles unknown paths. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppNavigation;