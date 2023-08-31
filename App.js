// Import necessary styles and libraries
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import various components
import Home from "./Home.js"
import Forums from "./Forums"
import Tutors from "./Tutors"
import EventAdmin from './EventAdminFolder/AnnouncementFolder/EventsAdminPage';
import Register from "./page/Register"
import Login from "./page/Login"
import Chat from "./page/Chat"
import SetAvatar from './chatBox/SetAvatar';
import CourseHome from './Course/CourseHome';
import CourseConfig from './Course/CourseConfig';
import CourseLectures from './Course/CourseLectures';
import CourseLabs from './Course/CourseLabs';
import CourseTutorials from './Course/CourseTutorials';
import CourseAnnouncements from './Course/CourseAnnouncements';
import CourseAssignments from './Course/CourseAssignments';
import CourseExamination from './Course/CourseExamination';
import CourseGradebook from './Course/CourseGradebook';
import CourseSylabus from './Course/CourseSylabus';
import CourseResources from './Course/CourseResources'
import Gradebook from './Gradebook/Gradebook';
import Gradebook2 from './Gradebook/GradebookAdmin';
import Assignments from './Assignments';
import Profile from "./Profile"
import Account from "./Account"
import Dashboard from "./Dashboard"
import Assestment from './Assignments/Assestment'
import UploadedResource from './Assignments/UploadedResource'
import Testing from "./Testing"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Define routes for different components */}
          {/* Redirect from root URL to the Home component */}
          <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/EventAdmin" element={<EventAdmin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
            <Route path="/DrawerButton0" element={<Home />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Courses/:courseID" element={<CourseHome />} />
            <Route path="/CourseConfig/:courseID" element={<CourseConfig />} />
            <Route path="/Lectures/:courseID" element={<CourseLectures />} />
            <Route path="/Tutorials/:courseID" element={<CourseTutorials />} />
            <Route path="/Labs/:courseID" element={<CourseLabs />} />
            <Route path="/Resource/:url" element={<UploadedResource />} />
            <Route path="/Announcement/:courseID" element={<CourseAnnouncements />} />
            <Route path="/Assignments/:courseID" element={<CourseAssignments />} />
            <Route path="/Examination/:courseID" element={<CourseExamination />} />
            <Route path="/Gradebook/:courseID" element={<CourseGradebook />} />
            <Route path="/Sylabus/:courseID" element={<CourseSylabus />} />
            <Route path="/Resources/:courseID" element={<CourseResources />} />
            <Route path="/:assestmentID/Assignments/:courseID" element={<Assestment />} />
            <Route path="/:assestmentID/Examinations/:courseID" element={<Assestment />} />
            <Route path="/:assestmentID/Labs/:courseID" element={<Assestment />} />
            <Route path="/Assignments" element={<Assignments />} />
            <Route path="/Forums" element={<Forums />} />
            <Route path="/Tutors" element={<Tutors />} />
            <Route path="/Gradebook" element={<Gradebook />} />
            <Route path="/Gradebook2" element={<Gradebook2 />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Testing" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}




export default App;
