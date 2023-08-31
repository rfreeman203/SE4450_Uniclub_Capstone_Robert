//Import all dependenceis (modules, components, functions) from different libraries

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {
  Link
} from 'react-router-dom';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import GradebookTable from './GradebookTable';
import { Courses } from '../Entities/courses';
import { useEffect } from 'react';
import NavbarNewFinal from '../NavBars/NavBarNewFinal';
import {
  getRequiredCourses
} from './GradeBookEventSystem';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Gradebook() {

  // States for gradebook averages
  const [averages, setAverages] = React.useState([0]);
  const [totalAverage, setTotalAvg] = React.useState(0);

  // State to store course data
  const [courseData, setCourseData] = React.useState();

  // Fetch course data using useEffect
  useEffect(() => {
    getRequiredCourses().then((data) => {
      setCourseData(data);
    });
  }, []);

  // Create a Courses instance with the fetched course data
  const courses = new Courses(courseData);
  const JSON_INFO = courses.getCourseList();

  // Function to test something (placeholder)
  const tests = () => {
    var collapse = document.getElementsByClassName('row1');
    console.log(collapse);
  }

  // Callback function to handle averaging and updating state
  const callbackHandlerFunction = (val) => {
    // Append the new value to averages
    setAverages([...averages, val]);

    // Filter unique values
    const uniqueAverages = [...new Set(averages)];

    // Calculate total average
    const totalVal = uniqueAverages.reduce((sum, value) => sum + parseFloat(value), 0);
    const count = uniqueAverages.length;
    const avg = count === 0 ? 0 : totalVal / count;

    // Update total average state
    setTotalAvg(avg.toFixed(2));
  };

  return (
    <Box sx={{ display: 'flex' }}>
  <CssBaseline />

  {/* Render your navigation bar */}
  <NavbarNewFinal />

  {/* Create a grid container */}
  <Grid container xs={12} sx={{ height: '100%' }}>
    {/* Main content */}
    <Grid item xs={8}>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {/* Header */}
        <DrawerHeader />

        {/* List of items */}
        <List>
          <ListItem>
            <Typography variant="h4">
              Gradebook
            </Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h3">
              View Your Grades:
            </Typography>

            {/* Display the total average */}
            <Typography variant="h3">
              {totalAverage}%
            </Typography>
          </ListItem>

          {/* Map through course data and render GradebookTable for each course */}
          {JSON_INFO.map((rows, i) => (
            <ListItem key={i}>
              <GradebookTable courseName={JSON_INFO[i].courseCode} grades={JSON_INFO[i].sections[0]} handleAvgInParent={callbackHandlerFunction} />
            </ListItem>
          ))}

        </List>
      </Box>
    </Grid>

    {/* Sidebar */}
    <Grid item xs={4}>
      {/* Sidebar header */}
      <DrawerHeader />

      {/* Sidebar content */}
      <Box sx={{ height: '100vh', borderLeft: 0.05, borderColor: 'primary.main', p: 1 }}>

        <List>

          {/* Some spacing */}
          <ListItem>
            <Box sx={{ height: '1vh' }} />
          </ListItem>

          {/* Sidebar header */}
          <ListItem>
            <Typography variant="h4">
              Course gradebook
            </Typography>
          </ListItem>

          <Divider />

          {/* Sub-header */}
          <ListItem>
            <Typography variant="h7">
              View a specific course's gradebook
            </Typography>
          </ListItem>

          {/* Map through course data and render buttons for each course */}
          {JSON_INFO.map((rows, i) => (
            <ListItem key={i}>
              <Button component={Link} to={`/Courses/${JSON_INFO[i].courseCode.replace(/\s/g, "")}`} variant="contained" sx={{ width: '100%' }}>{JSON_INFO[i].courseCode}</Button>
              {tests}
            </ListItem>
          ))}

        </List>
      </Box>
    </Grid>

  </Grid>
</Box>

  );
}
