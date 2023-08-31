//Import all dependenceis (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react'
import { Course } from '../Entities/course';
import { List, ListItem, Typography } from '@mui/material';
import {
  getRequiredCourse
} from "./CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function CourseAnnouncements({ match }) {
  const {
    params: { courseID }
  } = match;

  // Logging the match object and courseID for debugging
  console.log(match);
  console.log(courseID);

  // State to store course data and loading status
  const [courseData, setCourseData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch course data when courseID changes
  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false);
    });
  }, [courseID]);

  // If course data has been fetched
  if (!isLoading) {
    console.log(courseData.courseCode);
    let course = new Course(courseData);

    // Extracting course details using Course object methods
    let name = course.getCode().courseCode;
    let prof = course.getCode().prof;
    let lectures = course.getCode().sectionProfs;
    let tutorials = course.getCode().tutorialProfs;
    let labs = course.getCode().labProfs;
  }

  // List of pages related to the course
  let pages = ["Announcements", "Assignments", "Examination", "Gradebook", "Sylabus", "Resources"];

  return (
    <React.Fragment>
      {!isLoading && (
        <>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Rendering the course-related Navbar */}
            <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages} />

            <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
              <DrawerHeader />

              <List>

                {/* Displaying course details */}
                <ListItem>
                  <Typography variant="h4">
                    {courseData.courseCode}
                  </Typography>
                </ListItem>

                <Divider />

                <ListItem>
                  <Typography variant="h3">
                    Announcements
                  </Typography>
                </ListItem>

                {/* Additional content related to the announcements page can be added here */}
                
              </List>
            </Box>
          </Box>
        </>
      )}
    </React.Fragment>
  );
}
