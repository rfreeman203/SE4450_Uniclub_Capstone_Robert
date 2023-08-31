// Import all dependencies (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import { Course } from '../Entities/course';
import { List, ListItem, Typography } from '@mui/material';
import {
  getRequiredCourse
} from "./CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';

// Define a styled component for the header of the drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Define the CourseLectures component
export default function CourseLectures( {match} ) {
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
 

  // Return the JSX for rendering the component
  return (
    <Box>

      {/* Only render the content if the data is not loading */}
      {!isLoading && (
        <>

          {/* Render the navbar */}
          <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>

          {/* Render the main content */}
          <Box component="main" sx={{ flexGrow: 1, p: 10}}>
          <DrawerHeader />
          {/* Render a list of information about the course */}
          <List>
            {/* Render a heading with the course code and "Lectures" */}
            <ListItem>
              <Typography>{courseData.courseCode}: Lectures</Typography>
            </ListItem>
            {/* Render a placeholder for a CourseInstructorTable component */}
            <ListItem>
            {/* <CourseInstructorTable lectures={courseData.sectionProfs} tutorials={[]} labs={[]}/> */}
            </ListItem>
          </List>
          </Box>    
        </>
      )}
      
    </Box>
  );
}
