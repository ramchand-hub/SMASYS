
import React, { Suspense, lazy } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Layout from './pages/Nav/Layout';

// Lazy-loaded pages
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

const Student_summary = lazy(() => import('./components/students/Student_summary'));
const Student_Add = lazy(() => import('./components/students/Student_Add'));

const Register = lazy(() => import('./pages/Register'));

const AddTeacher = lazy(() => import('./components/teachers/Teacher_Add'));
const TeacherList = lazy(() => import('./components/teachers/Teacher_summary'));

const ClassList = lazy(() => import('./components/classes/Class_summary'));
const AddClass = lazy(() => import('./components/classes/Class_add'));

const AddTimetable = lazy(() => import('./components/timetable/Timetable_add'));
const TimetableList = lazy(() => import('./components/timetable/Timetable_summary'));

const AttendanceList = lazy(() => import('./components/attendance/Attendance_summary'));
const AddAttendance = lazy(() => import('./components/attendance/Attendance_add'));

function App() {
  return (
    <BrowserRouter>

      <Suspense fallback={<div>Loading page...</div>}>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Register" element={<Register />} />

          <Route element={<Layout />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Teachers" element={<TeacherList />} />
            <Route path="/students" element={<Student_summary />} />
            <Route path="/classes" element={<ClassList />} />
            <Route path="/timetable" element={<TimetableList />} />
            <Route path="/attendance" element={<AttendanceList />} />
            <Route path="/student-add" element={<Student_Add />} />
            <Route path="/teachers-add" element={<AddTeacher />} />
            <Route path="/classes-add" element={<AddClass />} />
            <Route path="/timetable-add" element={<AddTimetable />} />
            <Route path="/attendance-add" element={<AddAttendance />} />
          </Route>

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}

export default App;
