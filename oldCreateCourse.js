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
import jQuery, { type } from 'jquery';
import { Accordion, AccordionDetails, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, Stack, AccordionSummary, Grid, Tab, TableBody, TableCell, TableRow, BottomNavigation, AppBar, Tabs } from '@mui/material';
import { sizing } from '@mui/system';
import GradebookTable from './GradebookTable';
import {Courses} from '../Entities/courses'
import TextField from '@mui/material/TextField';
import {Course} from "../Entities/course";
import {DeleteCourse} from './DeleteCourse';
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


 function CreateCourse(courseData) {

  //get course information
  const courses = new Courses(courseData);

  
  // -------------------  CREATE COURSE --------------------------------------------------

  //dialogue add assestments
  const [addAssestmentsButton, setAddAssestmentsButton] = React.useState(false)
  const [assestmentsType, setAssestmentsType] = React.useState('assignments');

  const handleAddAssestmentsButtonOpen = (event, text) => {
    setAssestmentsType(text)
    setAddAssestmentsButton(true)
  }
  const handleAddAssestmentsButtonClose = () => {
    setNumOfAssestment(1)
    setAddAssestmentsButton(false)
  }

  const [numOfAssestment, setNumOfAssestment] = React.useState(1)


  //DIALOGUE
  const [addButtonOpen, setAddButtonOpen] = React.useState(false)
  const [assestmentType, setAssestmentType] = React.useState('assignment');

  const handleAddAssestmentOpen = (text, event) => {
    handleAddAssestmentsButtonClose()
    setAssestmentType(text)
    setAddButtonOpen(true)
  }
  const handleAddAssestmentClose = () => {
    setAddButtonOpen(false)
  }

  //TRACKING WEIGHTS
  const[assignmentTotalWeight, setAssignmentTotalWeight] = React.useState(0)
  const[quizTotalWeight, setQuizTotalWeight] = React.useState(0)
  const[labTotalWeight, setLabTotalWeight] = React.useState(0);
  const[examTotalWeight, setExamTotalWeight] = React.useState(0);

  const [assetmentName, setAssestmentName] = React.useState('')
  const [gradeName, setGradeName] = React.useState(0)
  const [weightName, setWeightName] = React.useState(0.1)
  const [dueName, setDueName] = React.useState('')
  const [submissionName, setSubmissionName] = React.useState('')

  const [assestmentNameText, setAssestmentNameText] = React.useState("")
  const [assestmentNameError, setAssestmentNameError] = React.useState(false)

  const [gradeText, setGradeText] = React.useState("")
  const [gradeError, setGradeError] = React.useState(false)

  const [weightText, setWeightText] = React.useState("")
  const [weightError, setWeightError] = React.useState(false)

  const [dueText, setDueText] = React.useState("")
  const [dueError, setDueError] = React.useState(false)

  const [submissionText, setSubmissionText] = React.useState("")
  const [submissionError, setSubmissionError] = React.useState(false)

  const handleAddAssestmentAdd = () => {
    
    let nameValid = false;
    if(assetmentName != "") nameValid = true;

    let gradeValid = false;
    if(gradeName != "" && (0 <= parseInt(gradeName) && parseInt(gradeName) <= 100)) gradeValid = true;

    let weightValid = false;
    if(weightName != "" && (0 <= parseFloat(weightName) && parseFloat(weightName) <= 1)) weightValid = true;

    let dueValid = false;
    if(dueName != "") dueValid = true;
    
    let submissionValid = false;
    if(submissionName != "") submissionValid = true;

    if(nameValid && gradeValid && weightValid && dueValid && submissionValid)
      createNewAssestment(assetmentName, gradeName, weightName, dueName, submissionName, assestmentType)
    else{
      if(!nameValid){setAssestmentNameText("Please enter valid name"); setAssestmentNameError(true)}
      if(!gradeValid){setGradeText("Enter valid grade (0-100)"); setGradeError(true)}
      if(!weightValid){setWeightText("Enter valid weight (0.00-1.00)"); setWeightError(true)}
      if(!dueValid){setDueText("Enter valid date"); setDueError(true)}
      if(!submissionValid){setSubmissionText("Enter valid date"); setSubmissionError(true)}
    }
  }

  const [userAssignments, setUserAssignments] = React.useState([])
  const [userQuizzes, setUserQuizzes] = React.useState([])
  const [userLabs, setUserLabs] = React.useState([])
  const [userExams, setUserExams] = React.useState([])

  const createNewAssestment = (name, grade, weight, due, submission, type) => {
    
    switch(type){
      case 'assignments':
        const assignment = new Assignment(name,grade,weight,due,submission)
        userAssignments.push(assignment)
        setUserAssignments(userAssignments)
        break;
      case 'quizzes':
        const quiz = new Quiz(name,grade,weight,due,submission)
        userQuizzes.push(quiz)
        setUserQuizzes(userQuizzes)
        break;
      case 'labs':
        const lab = new Lab(name,grade,weight,due,submission)
        userLabs.push(lab)
        setUserLabs(userLabs)
        break;
      case 'exams':
        const exam = new Exam(name,grade,weight,due,submission)
        userExams.push(exam)
        setUserExams(userExams)
        break;   
    }

    setAssestmentName('')
    setGradeName(0)
    setWeightName(0.1)
    setDueName('')
    setSubmissionName('')



    handleAddAssestmentClose()

    // let val = numOfAssestment-1
    // setNumOfAssestment(val)

    // if(numOfAssestment != 0){
      
    //   handleAddAssestmentOpen(type)
    // }

    

  }

  const createNewCourse = () => {

    handleThisCancel()

    let cCode = document.getElementById('createNewCourseCode').value
    const course = new Course(cCode)

    let cName = document.getElementById('createNewCourseName').value
    course.setName(cName)

    let termName = document.getElementById('createNewCourseTerm').value
    course.setTerm(termName)

    let numOfSections = document.getElementById('createNewCourseSections').value
    course.setSections(numOfSections)

    let numOfTutorials = document.getElementById('createNewCourseTutorials').value
    course.setTutorialGroups(numOfTutorials)

    let numOfLabs = document.getElementById('createNewCourseLabs').value
    course.setLabGroups(numOfLabs)

    for(let a in userAssignments){

      course.addAssignment(userAssignments[a])
    }

    for(let q in userQuizzes){
      course.addQuiz(userQuizzes[q])
    }

    for(let l in userLabs){
      course.addLab(userLabs[l])
    }

    for(let e in userExams){
      course.addExam(userExams[e])
    }

    courses.addCourse(course)
    console.log(courses.getCourseList())

    let newData = JSON.stringify(courses.getCourseList())

      const addCourse = async () => {
        const request = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: newData
        }
    
        return new Promise((resolve, reject) => {
            fetch(`/updateCOURSESJSON`, request)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
      }

      addCourse()




  }

  const [addThisConfirmationOpen, setThisConfirmationOpen] = React.useState(false)

  // ----- HelperText / Error Codes ------
  const [codeHelperText, setCodeHelperText] = React.useState("")
  const [codeError, setCodeError] = React.useState(false)

  const [nameHelperText, setNameHelperText] = React.useState("")
  const [nameError, setNameError] = React.useState(false)

  const [termHelperText, setTermHelperText] = React.useState("")
  const [termError, setTermError] = React.useState(false)

  const [numSHelperText, setNumSHelperText] = React.useState("")
  const [numSError, setNumSError] = React.useState(false)

  const [numTHelperText, setNumTHelperText] = React.useState("")
  const [numTError, setNumTError] = React.useState(false)

  const [numLHelperText, setNumLHelperText] = React.useState("")
  const [numLError, setNumLError] = React.useState(false)


  const handleThisOpen = () => {

    let cCode = document.getElementById('createNewCourseCode').value
    let cCodes = courses.getCourseCodes()
    let codeHelpText = "Please enter valid code"
    let codeValid = false;
    if(cCode != ""){ 
      codeValid = true;
      for(let c in cCodes){
        if(cCode == cCodes[c])
          codeValid = false;
          codeHelpText = "Course code already exists"
      }
    }

    let cName = document.getElementById('createNewCourseName').value
    let nameValid = false;
    if(cName != "") nameValid = true; 

    let termName = document.getElementById('createNewCourseTerm').value
    let termValid = false;
    if(termName != "") termValid = true; 

    let numOfSections = document.getElementById('createNewCourseSections').value
    let numOfSectionsValid = false;
    if(numOfSections != "" && (parseInt(numOfSections) >= 0)) numOfSectionsValid = true;

    let numOfTutorials = document.getElementById('createNewCourseTutorials').value
    let numOfTutorialsValid = false;
    if(numOfTutorials != "" && (parseInt(numOfTutorials) >= 0)) numOfTutorialsValid = true; 

    let numOfLabs = document.getElementById('createNewCourseLabs').value
    let numOfLabsValid = false;
    if(numOfLabs != "" && (parseInt(numOfLabs) >= 0)) numOfLabsValid = true; 
    
    if(codeValid && nameValid && termValid && numOfSectionsValid && numOfTutorialsValid && numOfLabs)
      setThisConfirmationOpen(true)
    else{
      if(!codeValid){setCodeHelperText(codeHelpText); setCodeError(true)}
      if(!nameValid){setNameHelperText("Please enter valid name"); setNameError(true)}
      if(!termValid){setTermHelperText("Please enter valid term"); setTermError(true)}
      if(!numOfSectionsValid){setNumSHelperText("Please enter valid num of sections"); setNumSError(true)}
      if(!numOfTutorialsValid){setNumTHelperText("Please enter valid num of tutorials"); setNumTError(true)}
      if(!numOfLabsValid){setNumLHelperText("Please enter valid num of labs"); setNumLError(true)}
    }

  }

  const handleThisCancel = () => {
    setThisConfirmationOpen(false)
  }



  return (
    <React.Fragment>
        

        
        

        <List sx={caches}>

        

          <ListItem>
              <Typography variant = "h4" >Create Course</Typography>
          </ListItem>

        <Grid container xs={12} sx={{height:'100%'}}>

        <Grid item xs={6}>

        <ListItem>
              <Typography align='center' variant = "h8" >Choose course info</Typography>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Code: </Typography>
                  <TextField  
                    error={codeError} 
                    id="createNewCourseCode" 
                    label='Course Code' 
                    size="small"
                    helperText={codeHelperText}
                    onChange={(event, newValue) => {
                      setCodeError(false)
                      setCodeHelperText("")
                    }}
                  />
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Name: </Typography>
                  <TextField 
                    error={nameError} 
                    id="createNewCourseName" 
                    label='Course Name' 
                    size="small"
                    helperText={nameHelperText}
                    onChange={(event, newValue) => {
                      setNameError(false)
                      setNameHelperText("")
                    }}
                  />
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Term: </Typography>
                  <TextField 
                    error={termError} 
                    id="createNewCourseTerm" 
                    label='Course Term' 
                    size="small"
                    helperText={termHelperText}
                    onChange={(event, newValue) => {
                      setTermError(false)
                      setTermHelperText("")
                    }}
                  />
              </Stack>
          </ListItem>

         

          </Grid>


          <Grid item xs={6}>



          <ListItem>
              <Typography align='center' variant = "h8" >Choose section info</Typography>
          </ListItem>
          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Number of Sections: </Typography>
                  <TextField 
                    error={numSError} 
                    helperText={numSHelperText}
                    onChange={(event, newValue) => {
                      setNumSError(false)
                      setNumSHelperText("")
                    }}
                    id="createNewCourseSections" 
                    label='Course Sections' size="small" 
                    type="number"
                    defaultValue={0}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Number of Tutorials: </Typography>
                  <TextField 
                  error={numTError} 
                  helperText={numTHelperText}
                  onChange={(event, newValue) => {
                      setNumTError(false)
                      setNumTHelperText("")
                    }}
                  id="createNewCourseTutorials" 
                  label='Course Tutorials' size="small" 
                  type="number"
                  defaultValue={0}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
              </Stack>
          </ListItem>

          <ListItem>
              <Stack direction='row' spacing={4}>
                  <Typography>Number of Labs: </Typography>
                  <TextField 
                  error={numLError}
                  helperText={numLHelperText} 
                  onChange={(event, newValue) => {
                      setNumLError(false)
                      setNumLHelperText("")
                    }}
                  id="createNewCourseLabs" 
                  label='Course Labs' size="small" 
                  type="number"
                  defaultValue={0}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
              </Stack>
          </ListItem>


          {/* <ListItem>
                  <Typography>Add an Assignment </Typography>
                  <IconButton color="primary" onClick={(e) => handleAddAssestmentsButtonOpen(e, 'assignments')}>
                      <AddIcon/>
                  </IconButton>
          </ListItem>

          <Grid container direction='column' justifyContent='space-evenly' alignItems='flex-start' height='100%'>
            {userAssignments.map((item, index) => {
                return (
                  <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.name}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
                    </TableRow>
                    
                )
            })}
        </Grid>


          <ListItem>
                  <Typography>Add an Quiz </Typography>
                  <IconButton color="primary" onClick={(e) => handleAddAssestmentsButtonOpen(e, 'quizzes')}>
                      <AddIcon />
                  </IconButton>
          </ListItem>

          <Grid container direction='column' justifyContent='space-evenly' alignItems='flex-start' height='100%'>
            {userQuizzes.map((item, index) => {
                return (
                  <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.name}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
                    </TableRow>
                    
                )
            })}
        </Grid>


          <ListItem>
                  <Typography>Add an Lab </Typography>
                  <IconButton color="primary" onClick={(e) => handleAddAssestmentsButtonOpen(e, 'labs')}>
                      <AddIcon />
                  </IconButton>
          </ListItem>

          <Grid container direction='column' justifyContent='space-evenly' alignItems='flex-start' height='100%'>
            {userLabs.map((item, index) => {
                return (
                  <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.name}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
                    </TableRow>
                    
                )
            })}
        </Grid>


          <ListItem>
                  <Typography>Add an Exam </Typography>
                  <IconButton color="primary" onClick={(e) => handleAddAssestmentsButtonOpen(e, 'exams')}>
                      <AddIcon />
                  </IconButton>
          </ListItem>

          <Grid container direction='column' justifyContent='space-evenly' alignItems='flex-start' height='100%'>
            {userExams.map((item, index) => {
                return (
                  <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.name}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
                    </TableRow>
                    
                )
            })}
        </Grid> */}

          {/* <Dialog open={addAssestmentsButton} onClose={handleAddAssestmentsButtonClose}>
        <DialogTitle>Add {assestmentsType}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Number of Assignments"
            type="number"
            fullWidth
            defaultValue={1}
            variant="standard"
            onChange={(e) => {
                              setNumOfAssestment(e.target.value-1)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Total Weight of Assignments"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setAssignmentTotalWeight(e.target.value)
                              setWeightName(Math.round((e.target.value) / (numOfAssestment) * 100) / 100)
                            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleAddAssestmentsButtonClose}>Cancel</Button>
          <Button color='secondary' onClick={(e) => handleAddAssestmentOpen(assestmentsType, e)}>Add</Button>
        </DialogActions>
        </Dialog>


          {/* Assestment window */}
          <Dialog open={addButtonOpen} onClose={handleAddAssestmentClose}>
        <DialogTitle>Add {assestmentType}:{numOfAssestment} remaining</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            error={assestmentNameError}
            helperText={assestmentNameText}
            defaultValue={""}
            onChange={(e) => {
                              setAssestmentName(e.target.value)
                              setAssestmentNameText("")
                              setAssestmentNameError(false)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Grade"
            type="number"
            fullWidth
            variant="standard"
            error={gradeError}
            helperText={gradeText}
            onChange={(e) => {
                              setGradeName(e.target.value)
                              setGradeText("")
                              setGradeError(false)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            label="Weight"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={weightName}
            error={weightError}
            helperText={weightText}
            onChange={(e) => {
                              setWeightName(e.target.value)
                              setWeightText("")
                              setWeightError(false)
                            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            type="date"
            fullWidth
            variant="standard"
            error={dueError}
            helperText={dueText}
            onChange={(e) => {
                              setDueName(e.target.value)
                              setDueText("")
                              setDueError(false)
                            }}
          /> Due Date
          <TextField
            autoFocus
            margin="dense"
            id="Name"
            type="date"
            fullWidth
            variant="standard"
            error={submissionError}
            helperText={submissionText}
            onChange={(e) => {
                              setSubmissionName(e.target.value)
                              setSubmissionText("")
                              setSubmissionError(false)
                            }}
          /> Submission Date
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleAddAssestmentClose}>Cancel</Button>
          <Button color='secondary' onClick={handleAddAssestmentAdd}>Add</Button>
        </DialogActions>
        </Dialog>
{/*  */}
          </Grid>

          <ListItem>
              <Button onClick={handleThisOpen}>Submit</Button>
          </ListItem>
          </Grid>


          </List> 


          <Confirmation 
            addConfirmationOpen={addThisConfirmationOpen} 
            handleCancel={handleThisCancel} 
            handleConfirm={createNewCourse}  
          />


          
          </React.Fragment>
        
  );
} export default CreateCourse
