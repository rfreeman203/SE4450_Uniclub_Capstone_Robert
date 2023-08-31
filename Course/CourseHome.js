// Import all dependencies (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react'
import background from '../cat.webp'
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

// Define the CourseHome component
export default function CourseHome( {match} ) {
  // Destructure the courseID from the match object
  const {
    params: {courseID}
  } = match;

  // Log the courseID to the console for debugging purposes
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
            {/* Render a welcome message with the course code */}
            <ListItem>
              <Typography variant = "h2">Welcome to {courseData.courseCode}</Typography>
            </ListItem>
            {/* Render the main professor's name */}
            <ListItem>
              <Typography>main prof: {courseData.prof}</Typography>
            </ListItem>

            {/* Render a message about future customization */}
            <ListItem>
              <Typography variant="h6">This is the course home preview. The future of our site will allow full customization.</Typography>
            </ListItem>

            {/* Render an image */}
            <ListItem>
            <Grid container component="main" sx={{ height: '50vh' }}>

              <Grid
                item
                xs={false}
                sm={4}
                md={5}
                sx={{
                  backgroundImage: `url(${background})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </Grid>
            </ListItem>
          </List>
          </Box>    
        </>
      )}
      
    </Box>
  );
}
