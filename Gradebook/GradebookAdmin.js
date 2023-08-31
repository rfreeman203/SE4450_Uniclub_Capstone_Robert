//Import all dependenceis (modules, components, functions) from different libraries
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Tab, Tabs } from '@mui/material';
import {Courses} from '../Entities/courses'
import CreateCourse  from './CreateCourse';
import DeleteCourse from './DeleteCourse';
import NavbarNewFinal from '../NavBars/NavBarNewFinal';
import PropTypes from 'prop-types';
import CourseList from './coureList';
import {
  getRequiredCourses,
  getAllProfessors
} from "./GradeBookEventSystem";

// Styled component for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Function to render tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

 function GradebookAdmin() {

  // State to hold course and professor data
  const [courseData, setCourseData] = useState();
  const [professorData, setProfessorData] = useState();

  // Fetch course and professor data when the component mounts
  useEffect(() => {
    // Fetch required course data and update the state
    getRequiredCourses().then((data) => {
      setCourseData(data);
    });

    // Fetch all professor data and update the state
    getAllProfessors().then((data) => {
      setProfessorData(data);
    });
  }, []);

  // Create a Courses instance using the fetched course data
  const courses = new Courses(courseData);

  // Get the list of courses from the Courses instance
  let JSON_INFO = courses.getCourseList();
  console.log(JSON_INFO);

  // State to manage the currently selected tab index
  const [value, setValue] = useState(0);

  // Function to handle tab changes
  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <React.Fragment>
  {/* Top-level container */}
  <Box sx={{ display: 'flex'}}>
    <CssBaseline />
    
    {/* Navbar */}
    <NavbarNewFinal/>      
    
    {/* Main content */}
    <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
      {/* Drawer Header */}
      <DrawerHeader />

      {/* List */}
      <List>
        {/* Header */}
        <ListItem>
          <Typography variant="h4">
            Courses
          </Typography>
        </ListItem>
        <Divider />

        {/* View Your Courses */}
        <ListItem >
          <Typography variant="h3">
            View Your Courses
          </Typography>
        </ListItem>

        {/* Tabs */}
        <ListItem>
          <Tabs value={value} onChange={handleTabsChange}>
            <Tab label="Create Course" />
            <Tab label="Delete Course" />
          </Tabs>
        </ListItem>

        {/* Course List */}
        <ListItem>
          <CourseList grades={JSON_INFO} />
        </ListItem> 

        {/* Tab content */}
        <ListItem>
          <TabPanel value={value} index={0}>
            {/* Render the content for the "Create Course" tab */}
            {CreateCourse(courseData, professorData)}
          </TabPanel>
          
          <TabPanel value={value} index={1} width='100%'>
            {/* Render the content for the "Delete Course" tab */}
            {DeleteCourse(courseData)}
          </TabPanel>
        </ListItem>
      </List>
    </Box>
  </Box>
</React.Fragment>


  );
} export default GradebookAdmin
