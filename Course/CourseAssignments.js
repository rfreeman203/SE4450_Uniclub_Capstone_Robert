//Import all dependenceis (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography } from '@mui/material';
import {
  getRequiredCourse
} from "./CourseEventSystem";
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AssestmentPageTable from './AssestmentPageTable';

// Styling for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Component for handling Course Assignments
export default function CourseAssignments( {match} ) {
  const {
    params: {courseID}
  } = match;

  console.log(match);
  console.log(courseID);

  const [courseData, setCourseData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetching course data based on the course ID
  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false);
    });
  }, [courseID]);

  // Callback function to handle data from child component
  const callbackHandlerFunction = (val) => {
    // Handle the received value
  }

  return (
    <React.Fragment>
      {!isLoading && (
        <>
          <Box sx={{ display: 'flex'}}>
            <CssBaseline />

            {/* Rendering the navigation bar */}
            <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>

            <Box component="main" sx={{ flexGrow: 1, p: 1}}>
              <DrawerHeader />

              <List>

                <ListItem>
                  {/* Displaying the course code and section */}
                  <Typography variant = "h4" >
                    {courseData.courseCode} : Section - 001
                  </Typography>
                </ListItem>

                <Divider/>

                <ListItem >
                  {/* Displaying the "Assignments" heading */}
                  <Typography variant = "h3" >
                    Assignments
                  </Typography>
                </ListItem>

                <ListItem>
                  {/* Rendering the table for assignments using the AssestmentPageTable component */}
                  <AssestmentPageTable grades={courseData.sections[0]} courseCode={courseData.courseCode.replace(/\s/g, "")} wanted={"a"} handleWeightInParent={callbackHandlerFunction}/>
                </ListItem>

            </List>

            </Box>
          </Box>
        </>
      )}
    </React.Fragment>
  );
}
