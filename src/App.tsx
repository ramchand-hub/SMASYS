
import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './pages/Nav/Layout';
import Teacher from "./pages/Teacher"
import Dashboard from './components/dashboard/Dashboard';
import Student_summary from './components/students/Student_summary';
import Student_Add from './components/students/Student_Add';
function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Teachers" element={<Teacher />} />
        <Route path="/students" element={<Student_summary />} />
        <Route path="/student-add" element={<Student_Add />} />
      </Routes>
    </Layout>
      
    </BrowserRouter>
    
  )
}


export default App
