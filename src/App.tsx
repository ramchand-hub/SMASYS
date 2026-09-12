
import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './pages/Nav/Layout';
import Dashboard from './components/dashboard/Dashboard';
import Student_summary from './components/students/Student_summary';
import Student_Add from './components/students/Student_Add';
import Register from './pages/Register';
import AddTeacher from './components/teachers/Teacher_Add';
import TeacherList from './components/teachers/Teacher_summary';
function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Register />} />
      <Route element={<Layout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Teachers" element={<TeacherList />} />
          <Route path="/students" element={<Student_summary />} />
          <Route path="/student-add" element={<Student_Add />} />
          <Route path="/teachers-add" element={< AddTeacher/>} />
      </Route>

      </Routes>
      

    </BrowserRouter>

  )
}


export default App
