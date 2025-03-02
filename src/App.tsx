
import { useNavigate } from "react-router-dom";
import { useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react';  
import AppNavigation from "./components/navigation";
import { ToastContainer } from 'react-toastify';

function App() {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  // Add a loading state to handle the initial load
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user information is loaded from Clerk.
    if (isLoaded) {
      setIsLoading(false); // Set loading to false once Clerk data is loaded

      // If the user is not signed in, redirect to the root route ('/').
      if (!isSignedIn) {
        navigate('/');
      } else {
        // If the user is signed in, redirect to the '/home' route.
        navigate('/home');
      }
    }
    // Dependency array
  }, [isSignedIn, isLoaded, navigate]);


  // Display a loading indicator while Clerk data is being fetched
  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
   
      </div>
    );
  }

  return (
    // Main container with flex layout for vertical centering and full viewport height.
    <div className="flex h-screen bg-white text-gray-900 overflow-hidden">
      {/* Fixed positioning for the ToastContainer and AppNavigation, ensuring they stay in place during scrolling. */}
      <div className="fixed inset-0 z-0">
        {/* ToastContainer from react-toastify for displaying notifications. */}
        <ToastContainer/>
        {/* AppNavigation component to manage navigation within the application. */}
        <AppNavigation/>
    </div>
    </div>
  );
}

export default App;
