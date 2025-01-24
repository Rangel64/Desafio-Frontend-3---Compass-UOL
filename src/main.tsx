import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './Login.tsx'
import Signup from './Signup.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import AuthRoute from './AuthRoute.tsx'

const firebaseConfig = {
  apiKey: "AIzaSyCar3tCDpiRLXp6-vjne8_pCd4yNNIHHJs",
  authDomain: "desafio-03-compass-uol.firebaseapp.com",
  projectId: "desafio-03-compass-uol",
  storageBucket: "desafio-03-compass-uol.firebasestorage.app",
  messagingSenderId: "687434699571",
  appId: "1:687434699571:web:ab5cbe977b77405d9ea446",
  measurementId: "G-YQ4JJH66DX"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthRoute><App /></AuthRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
