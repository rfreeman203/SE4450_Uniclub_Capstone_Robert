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
import {DeleteCourse} from './DeleteCourse';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Assignment } from '../Entities/assignment';
import { Quiz } from '../Entities/quiz';
import { Lab } from '../Entities/lab';
import { Exam } from '../Entities/exam';
import EditIcon from '@mui/icons-material/Edit';


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


 function EditCourse(courseData) {

  const courses = new Courses(courseData);

  

  //DIALOGUE
  const [addButtonOpen, setAddButtonOpen] = React.useState(false)
  const [assestmentType, setAssestmentType] = React.useState('assignment');

  const [assetmentName, setAssestmentName] = React.useState('')
  const [gradeName, setGradeName] = React.useState('')
  const [weightName, setWeightName] = React.useState('')
  const [dueName, setDueName] = React.useState('')
  const [submissionName, setSubmissionName] = React.useState('')



// ------ EDIT COURSES ----------------------

const [editButtonOpen, setEditButtonOpen] = React.useState(false)
  const [assestmentEditType, setAssestmentEditType] = React.useState('assignment');

  const handleEditAssestmentOpen = (event, text) => {
    setAssestmentEditType(text)
    setEditButtonOpen(true)
  }
  const handleEditAssestmentClose = () => {
    setEditButtonOpen(false)
  }

  const [editAssetmentName, setEditAssestmentName] = React.useState('')
  const [editGradeName, setEditGradeName] = React.useState('')
  const [editWeightName, setEditWeightName] = React.useState('')
  const [editDueName, setEditDueName] = React.useState('')
  const [editSubmissionName, setEditSubmissionName] = React.useState('')

  const handleEditAssestmentAdd = () => {
    editNewAssestment(assetmentName, gradeName, weightName, dueName, submissionName, assestmentType)
  }

  const editNewAssestment = () => {

  }

const[editValue, setEditValue] = React.useState('')
const[editInputValue, setEditInputValue] = React.useState('');
const[selectedCourse, setSelectedCourse] = React.useState('');

const[editAssignmentValue, setAssignmentValue] = React.useState('')
const[editAssignmentInputValue, setEditAssignmentInputValue] = React.useState('');

const[editQuizValue, setQuizValue] = React.useState('')
const[editQuizInputValue, setEditQuizInputValue] = React.useState('');

const[editLabValue, setLabValue] = React.useState('')
const[editLabInputValue, setEditLabInputValue] = React.useState('');

const[editExamValue, setExamValue] = React.useState('')
const[editExamInputValue, setEditExamInputValue] = React.useState('');


  const getCourseCodes = () => {
    return courses.getCourseCodes()
  }

  const getCourseAssestment = (assesment) => {

    const course = courses.getCourse(selectedCourse)
    let options = []
    
    if(course != undefined){

      switch(assesment){
        case 'Assignment':
          for(let a in course.assignments){
            options.push(course.assignments[a].name)
          }
          break
        case 'Quiz':
          for(let q in course.quizzes){
            options.push(course.quizzes[q].name)
          }
          break
          case 'Lab':
        for(let l in course.labs){
          options.push(course.labs[l].name)
        }
        break
        case 'Exam':
        for(let e in course.exams){
          options.push(course.exams[e].name)
        }
        break
      }
      
    }

    

    

    return options
}

const editCourse = () => {

    console.log(courses.getCourseList());

    if(editValue != null){
      console.log("test")
    }

    console.log(courses.getCourseList());


}

    

      


  return (
    <React.Fragment>
      <List>

          <ListItem>
              <Typography variant = "h4" >Edit Course</Typography>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Choose course: </Typography>
                  <Autocomplete
                    value={editValue}
                    onChange={(event, newValue) => {
                      setEditValue(newValue);
                      setSelectedCourse(newValue)
                    }}
                    inputValue={editInputValue}
                    onInputChange={(event, newInputValue) => {
                      setEditInputValue(newInputValue);
                    }}
                    id="editCourseName"
                    options={getCourseCodes()}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Courses" />}
                />
              </Stack>
          </ListItem>

          <ListItem> 
              <Stack direction='row' spacing={4}>
                  <Typography>Name: </Typography>
                  <TextField required id="newCourseName" label='Course name' size="small"/>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Choose Assignment: </Typography>
                  <Autocomplete
                      value={editAssignmentValue}
                      onChange={(event, newValue) => {
                        setAssignmentValue(newValue);
                      }}
                      inputValue={editAssignmentInputValue}
                      onInputChange={(event, newInputValue) => {
                        setEditAssignmentInputValue(newInputValue);
                      }}  
                      id="controllable-states-demo"
                      options={getCourseAssestment('Assignment')}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Controllable" />}
                  />
                  <IconButton color="primary" onClick={(e) => handleEditAssestmentOpen(e, 'assignment')}>
                      <EditIcon/>
                  </IconButton>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Choose Quiz: </Typography>
                  <Autocomplete
                      value={editQuizValue}
                      onChange={(event, newValue) => {
                        setQuizValue(newValue);
                      }}
                      inputValue={editQuizInputValue}
                      onInputChange={(event, newInputValue) => {
                        setEditQuizInputValue(newInputValue);
                      }}  
                      id="controllable-states-demo"
                      options={getCourseAssestment('Quiz')}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Controllable" />}
                  />
                  <IconButton color="primary" onClick={(e) => handleEditAssestmentOpen(e, 'assignment')}>
                      <EditIcon/>
                  </IconButton>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Choose Lab: </Typography>
                  <Autocomplete
                      value={editLabValue}
                      onChange={(event, newValue) => {
                        setLabValue(newValue);
                      }}
                      inputValue={editLabInputValue}
                      onInputChange={(event, newInputValue) => {
                        setEditLabInputValue(newInputValue);
                      }}  
                      id="controllable-states-demo"
                      options={getCourseAssestment('Lab')}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Controllable" />}
                  />
                  <IconButton color="primary" onClick={(e) => handleEditAssestmentOpen(e, 'assignment')}>
                      <EditIcon/>
                  </IconButton>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Choose Exam: </Typography>
                  <Autocomplete
                      value={editExamValue}
                      onChange={(event, newValue) => {
                        setExamValue(newValue);
                      }}
                      inputValue={editExamInputValue}
                      onInputChange={(event, newInputValue) => {
                        setEditExamInputValue(newInputValue);
                      }}  
                      id="controllable-states-demo"
                      options={getCourseAssestment('Exam')}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Controllable" />}
                  />
                  <IconButton color="primary" onClick={(e) => handleEditAssestmentOpen(e, 'assignment')}>
                      <EditIcon/>
                  </IconButton>
              </Stack>
          </ListItem>

          <ListItem>
              <Button onClick={editCourse}>Submit</Button>
          </ListItem> 

          {/* Assestment window */}
          <Dialog open={editButtonOpen} onClose={handleEditAssestmentClose}>
        <DialogTitle>Edit a {assestmentEditType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setAssestmentName(e.target.value)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Grade"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setGradeName(e.target.value)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Weight"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setWeightName(e.target.value)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Due Date"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setDueName(e.target.value)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Submission"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setSubmissionName(e.target.value)
                            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleEditAssestmentClose}>Cancel</Button>
          <Button color='secondary' onClick={handleEditAssestmentAdd}>Add</Button>
        </DialogActions>
        </Dialog>

          </List>  
    </React.Fragment>

  );
} export default EditCourse
