import React, { useEffect, useState } from 'react';

// import HomePage from './pages/HomePage';  // Assuming you have these pages created
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SideNavbar from './components/SideNavbar';
import VideosPlayer from './pages/VideosPlayer';
import { Route,Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import VideoUploadPage from './pages/VideoUploadPage';
import SignUpPage from './pages/SignUpPage';
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); 
  return (
    <div className="flex h-screen flex-1">
    
      <Navbar toggleSidebar={toggleSidebar}/>
      <SideNavbar isOpen={sidebarOpen} />
      <Routes>
        <Route path="/" element={<HomePage isOpen={sidebarOpen}/>}/>
        <Route path="/video/:id" element={<VideosPlayer toggleSidebar={toggleSidebar}/>} />
        <Route path="/profile/:id" element={<Profile isOpen={sidebarOpen} />} />
        <Route path="/videoUpload" element={<VideoUploadPage toggleSidebar={toggleSidebar} />} />
        <Route path="/SignUp" element={<SignUpPage toggleSidebar={toggleSidebar}/>} />

      </Routes>
      
    </div>
  );
}

export default App;

