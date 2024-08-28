import React, {Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItem from './components/VideoItem'
import SavedVideos from './components/SavedVideos'


import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
    } />
    <Route path="/trending" element={
      <ProtectedRoute>
        <Trending/>
      </ProtectedRoute>
    } />
    <Route path="/gaming" element={
      <ProtectedRoute>
        <Gaming/>
      </ProtectedRoute>
    } />
    <Route path="/videos/:id" element={
      <ProtectedRoute>
        <VideoItem/>
      </ProtectedRoute>
    } />
    <Route path="/saved-videos" element={
      <ProtectedRoute>
        <SavedVideos/>
      </ProtectedRoute>
    } />
  </Routes>
)

export default App

