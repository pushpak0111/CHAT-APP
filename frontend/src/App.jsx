import React, { use, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import axios from 'axios'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("authUser");

  if (isCheckingAuth && !authUser) return(
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={authUser ?  <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage /> } />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

    </div>
  )
}
export default App;
