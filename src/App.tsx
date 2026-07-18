
import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Nav/Layout';
import Teacher from "./pages/Teacher"
import Student from "./pages/Student"
function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Teachers" element={<Teacher />} />
        <Route path="/students" element={<Student />} />
      </Routes>
    </Layout>
      
    </BrowserRouter>
    
  )
}


export default App
