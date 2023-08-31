import React, { useState, useEffect } from 'react'

import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import jQuery from 'jquery';
import { Accordion, AccordionDetails, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, Stack, AccordionSummary, Grid, Tab, TableBody, TableCell, TableRow, BottomNavigation, AppBar, Tabs } from '@mui/material';
import { sizing } from '@mui/system';
import GradebookTable from './GradebookTable';
import {Courses} from '../Entities/courses'
import TextField from '@mui/material/TextField';
import {Course} from "../Entities/courses";
import CreateCourse  from './CreateCourse';
import DeleteCourse from './DeleteCourse';
import EditCourse from './EditCourse';
import NavbarNewFinal from '../NavBars/NavBarNewFinal';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Assignment } from '../Entities/assignment';
import { Quiz } from '../Entities/quiz';
import { Lab } from '../Entities/lab';
import { Exam } from '../Entities/exam';
import EditIcon from '@mui/icons-material/Edit';
import CourseList from './coureList';
import oldCreateCourse from './oldCreateCourse'
import {
  getRequiredCourses,
  getAllProfessors
} from "./GradeBookEventSystem";


const options = ['Option 1', 'Option 2'];

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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


 function Gradebook2() {

  const [courseData, setCourseData] = React.useState()
  const [professorData, setProfessorData] = React.useState()

  const [createCourseOn, setCreateCourseOn] = React.useState(false);
  const [deleteCourseOn, setDeleteCourseOn] = React.useState(false);


  useEffect(() => {
    
    getRequiredCourses().then((data) => {
      setCourseData(data);
    });

    getAllProfessors().then((data) => {
      setProfessorData(data);
    });

  }, []);

  const courses = new Courses(courseData);
  let JSON_INFO = courses.getCourseList();
  console.log(JSON_INFO);

  // console.log(instructorsData)



  const [value, setValue] = React.useState(0);


  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <React.Fragment>

    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      <NavbarNewFinal/>      
      
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
      <DrawerHeader />

      <List>
      <ListItem>
          <Typography variant = "h4" >
        Courses
          </Typography>
      </ListItem>
      <Divider/>
      <ListItem >
          <Typography variant = "h3" >
         View Your Courses
          </Typography>
      </ListItem>
      <ListItem>
      </ListItem>

      <ListItem>
        
      </ListItem>

      <ListItem>
        <Tabs value={value} onChange={handleTabsChange}>
          <Tab label="Create Course" /*onClick={handleCreate}*//>
          {/* <Tab label="Edit Course"/>  */}
          <Tab label="Delete Course"/>
        </Tabs>
      </ListItem>

      
        <ListItem>
          <CourseList grades={JSON_INFO}/>
        </ListItem> 

             
      
        <ListItem>
          <TabPanel value={value} index={0}>

          {CreateCourse(courseData, professorData)}
          {/* {oldCreateCourse(courseData)} */}
          
          </TabPanel>
        
        {/* <TabPanel value={value} index={1}>

          {EditCourse(courseData)}
        
        </TabPanel> */}

          <TabPanel value={value} index={1} width='100%'>

          {DeleteCourse(courseData)}
          
          </TabPanel>
        </ListItem>

      

    
      

      </List>
     
          
      </Box>
      
    </Box>
    </React.Fragment>

  );
} export default Gradebook2
