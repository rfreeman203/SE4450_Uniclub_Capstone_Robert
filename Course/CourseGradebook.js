// Import all dependencies (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import { Course } from '../Entities/course';
import { List, ListItem, Typography } from '@mui/material';
import {
  getRequiredCourse
} from "../BackendCalls/CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import GradebookTable from './GradebookPageTable';

// Define a styled component for the header of the drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Define the CourseGradebook component
export default function CourseGradebook( {match} ) {
  // Destructure the courseID from the match object
  const {
    params: {courseID}
  } = match;

  // Log the match object and courseID to the console for debugging purposes
  console.log(match)
  console.log(courseID)

  // Define state variables for course data and loading status
  const [courseData, setCourseData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true);

  // Use the useEffect hook to fetch the required course data when the component mounts
  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false)
    });
  },[courseID])

  // Define variables for course information
  let name;
  let prof;
  let lectures;
  let tutorials;
  let labs;

  // Define a state variable for the grade value
  const [grade, setGrade] = React.useState(0);

  // Define a callback function to handle changes in grade values
  const callbackHandlerFunction = (val) => {
    setGrade(val);
  }

  // If the data is not loading, extract the course information from the course data
  if(!isLoading){
    console.log(courseData.courseCode)
    let course = new Course(courseData);
    console.log(course.getCode())
    
    let name = course.getCode().courseCode
    let prof = course.getCode().prof;
    let lectures = course.getCode().sectionProfs
    let tutorials = course.getCode().tutorialProfs  
    let labs = course.getCode().labProfs
  }

  // Define an array of pages for the course
  let pages = ["Announcements", "Assignments", "Examination", "Gradebook", "Sylabus", "Resources"]
 
  // Return the JSX for rendering the component
  return (
    <React.Fragment>

      {/* Only render the content if the data is not loading */}
      {!isLoading && (
        <>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />

          {/* Render the navbar */}
          <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>

            {/* Render the main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 1}}>
              <DrawerHeader />

              {/* Render a list of information about the course */}
              <List>

                {/* Render the course code */}
                <ListItem>
                    <Typography variant = "h4" >
                  {courseData.courseCode}
                    </Typography>
                </ListItem>

                {/* Render a divider */}
                <Divider/>

                {/* Render the gradebook heading with the current grade value */}
                <ListItem >
                    <Typography variant = "h3" >
                  Gradebook - {grade}%
                    </Typography>
                </ListItem>

                {/* Render the gradebook table */}
                <ListItem>
                <GradebookTable courseName={courseData.courseCode} grades={courseData.sections[0]} handleAvgInParent={callbackHandlerFunction}/>  
                </ListItem>
                
            </List>
            
            </Box>
          </Box>    
        </>
      )}
      
    </React.Fragment>
  );
}
