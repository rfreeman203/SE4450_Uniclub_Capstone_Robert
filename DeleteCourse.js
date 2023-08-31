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
import EditCourse from './EditCourse';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Assignment } from '../Entities/assignment';
import { Quiz } from '../Entities/quiz';
import { Lab } from '../Entities/lab';
import { Exam } from '../Entities/exam';
import EditIcon from '@mui/icons-material/Edit';
import CourseList from './coureList';
import Confirmation from './confirmation';
import {
  updateCourse
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


 function DeleteCourse(courseData) {

  const courses = new Courses(courseData);

  const getCourseCodes = () => {
    return courses.getCourseCodes()
  }

  const [addThisConfirmationOpen, setThisConfirmationOpen] = React.useState(false)
  const [deleteHelperText, setDeleteHelperText] = React.useState("");
  const [deleteLabel, setDeleteLabel] = React.useState(false);

  const [refresh, setRefresh] = React.useState(false);

  const handleThisOpen = () => {
    let cName = document.getElementById('deleteCourseName').value

    let courseCodes = getCourseCodes();

    let valid = false;
    for(let c in courseCodes){
      if(cName == courseCodes[c])
        valid = true;
    }
    
    if(valid) setThisConfirmationOpen(true)
    else {
      setDeleteLabel(true)
      setDeleteHelperText("Please enter valid course")
    }
  }
  const handleThisCancel = () => {
    setThisConfirmationOpen(false)
  }

  const[deleteValue, setDeleteValue] = React.useState('')
  const[deleteInputValue, setDeleteInputValue] = React.useState('');

  const deleteCourse = () => {

    handleThisCancel()


        console.log(courses.getCourseList());
    
        let cName = document.getElementById('deleteCourseName').value
    
        courses.deleteCourse(cName);
        console.log(courses.getCourseList());
    
        let newData = JSON.stringify(courses.getCourseList())
    
        // const deleteCourse = async () => {
        //   const request = {
        //       method: 'PUT',
        //       headers: {'Content-Type': 'application/json'},
        //       body: newData
        //   }
      
        //   return new Promise((resolve, reject) => {
        //       fetch(`/updateCOURSESJSON`, request)
        //       .then(res => res.json())
        //       .then(data => resolve(data))
        //       .catch(error => reject(error))
        //   })
        // }
        setRefresh(updateCourse(newData));
        
    
  }

  if(refresh){
    window.location.reload();
  }
  


  return (
    <React.Fragment>
        


            <List>

          

            <ListItem>
                <Stack direction='row' spacing={4}>
                    <Typography>Choose course: </Typography>
                    <Autocomplete
                        value={deleteValue}
                        onChange={(event, newValue) => {
                        setDeleteHelperText("")
                        setDeleteLabel(false)
                        setDeleteValue(newValue);
                        }}
                        inputValue={deleteInputValue}
                        onInputChange={(event, newInputValue) => {
                        setDeleteInputValue(newInputValue);
                        }}
                        id="deleteCourseName"
                        options={getCourseCodes()}
                        
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} error={deleteLabel} label="Courses" 
                                                                        helperText={deleteHelperText}/>}
                    />
                    
                </Stack>
            </ListItem>

            <ListItem>
                <Button onClick={handleThisOpen}>Delete</Button>
            </ListItem>

            <Confirmation addConfirmationOpen={addThisConfirmationOpen} handleCancel={handleThisCancel} handleConfirm={deleteCourse}/>


            </List> 
        
    </React.Fragment>
        
  );
} export default DeleteCourse
