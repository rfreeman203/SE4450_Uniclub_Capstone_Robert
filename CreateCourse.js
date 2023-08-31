import React, { useState } from 'react'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import ListItem from '@mui/material/ListItem';

import Button from '@mui/material/Button';
import { Autocomplete, Stack, Grid } from '@mui/material';
import {Courses} from '../Entities/courses'
import TextField from '@mui/material/TextField';
import {Course} from "../Entities/course";
import PropTypes from 'prop-types';
import Confirmation from './confirmation';
import {
  updateCourse
} from "./GradeBookEventSystem";

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


 function CreateCourse(courseData, professorData) {

  //get course information
  const courses = new Courses(courseData);

  let profs = [];
  for(let i in professorData){
    for(let p in professorData[i].profs){
        profs.push(professorData[i].profs[p].name);
    }
  }

  // -------------------  CREATE COURSE --------------------------------------------------

  //DIALOGUE

  const [refresh, setRefresh] = React.useState(false);

  const createNewCourse = () => {

    handleThisCancel()

    let cCode = document.getElementById('createNewCourseCode').value
    const course = new Course(cCode)

    let cName = document.getElementById('createNewCourseName').value
    course.setName(cName)

    let termName = document.getElementById('createNewCourseTerm').value
    course.setTerm(termName)

    let numOfSections = document.getElementById('createNewCourseSections').value

    for(let i=0 ; i < parseInt(numOfSections) ; i ++){
      let sectionProf = document.getElementById(`profNamessection${i}`);
      course.setSections(sectionProf.value);
    }

    let numOfTutorials = document.getElementById('createNewCourseTutorials').value

    for(let i=0 ; i < parseInt(numOfTutorials) ; i ++){
      let tutorialProf = document.getElementById(`profNamestutorial${i}`);
      course.setTutorials(tutorialProf.value);
    }

    let numOfLabs = document.getElementById('createNewCourseLabs').value

    for(let i=0 ; i < parseInt(numOfLabs) ; i ++){
      let labProf = document.getElementById(`profNameslab${i}`);
      course.setLabs(labProf.value);
    }

    course.setProf(profValues);

    course.setActivePages([]);
    course.setUnactivePages(["Announcement", "Assignments", "Examination",  "Gradebook", "Sylabus", "Resources", "Labs"])

    courses.addCourse(course)
    console.log(courses.getCourseList())

    let newData = JSON.stringify(courses.getCourseList())

    setRefresh(updateCourse(newData));

  }

  if(refresh){
    window.location.reload();
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

    let pNames = profValues;
    let profNamesValid = false;
    if(pNames != ""){
      profNamesValid = true;
    }

    let numOfSections = document.getElementById('createNewCourseSections').value
    let numOfSectionsValid = false;
    let numOfSectionsHelperText = "Invalid number of sections"
    if(numOfSections != "" && (parseInt(numOfSections) > 0)) numOfSectionsValid = true;

    for(let i=0 ; i < parseInt(numOfSections) ; i ++){
      let sectionProf = document.getElementById(`profNamessection${i}`);
      if(sectionProf.value == "") {numOfSectionsValid = false; numOfSectionsHelperText="1 or more sections are missing professor"}
    }

    let numOfTutorials = document.getElementById('createNewCourseTutorials').value
    let numOfTutorialsValid = false;
    let numOfTutorialsHelperText = "Invalid number of tutorials"
    if(numOfTutorials != "" && (parseInt(numOfTutorials) >= 0)) numOfTutorialsValid = true; 

    for(let i=0 ; i < parseInt(numOfTutorials) ; i ++){
      let tutorialProf = document.getElementById(`profNamestutorial${i}`);
      if(tutorialProf.value == "") {numOfTutorialsValid = false; numOfTutorialsHelperText="1 or more sections are missing professor"}
    }

    let numOfLabs = document.getElementById('createNewCourseLabs').value
    let numOfLabsValid = false;
    let numOfLabsHelperText = "Invalid number of labs"
    if(numOfLabs != "" && (parseInt(numOfLabs) >= 0)) numOfLabsValid = true; 

    for(let i=0 ; i < parseInt(numOfLabs) ; i ++){
      let labProf = document.getElementById(`profNameslab${i}`);
      if(labProf.value == "") {numOfLabsValid = false; numOfLabsHelperText="1 or more sections are missing professor"}
    }
    
    if(codeValid && nameValid && termValid && profNamesValid && numOfSectionsValid && numOfTutorialsValid && numOfLabs)
      setThisConfirmationOpen(true)
    else{
      if(!codeValid){setCodeHelperText(codeHelpText); setCodeError(true)}
      if(!nameValid){setNameHelperText("Please enter valid name"); setNameError(true)}
      if(!termValid){setTermHelperText("Please enter valid term"); setTermError(true)}
      if(!profNamesValid){setProfHelperText("Course must have a valid prof"); setProfLabel(true)}
      if(!numOfSectionsValid){setNumSHelperText(numOfSectionsHelperText); setNumSError(true)}
      if(!numOfTutorialsValid){setNumTHelperText(numOfTutorialsHelperText); setNumTError(true)}
      if(!numOfLabsValid){setNumLHelperText(numOfLabsHelperText); setNumLError(true)}
    }

  }

  const handleThisCancel = () => {
    setThisConfirmationOpen(false)
  }

  const[profValues, setProfValues] = useState([]);
  const[profHelperText, setProfHelperText] = React.useState('');
  const[profLabel, setProfLabel] = React.useState(false);

  const[numSection, setNumSection] = React.useState(1)
  const[numTutorial, setNumTutorial] = React.useState(0)
  const[numLab, setNumLab] = React.useState(0)


  const getNum = (type) => {
    if(type == "section"){
      let numOfSections = document.getElementById('createNewCourseSections').value
      setNumSection(parseInt(numOfSections));
    }
    if(type == "tutorial"){
      let numOfTutorials = document.getElementById('createNewCourseTutorials').value
      setNumTutorial(parseInt(numOfTutorials));
    }
    if(type == "lab"){
      let numOfLabs = document.getElementById('createNewCourseLabs').value
      setNumLab(parseInt(numOfLabs));
    }
  }

  const getProfessor = (type) => {
    const box = [];

    let max = 0;
    if(type == "section"){max = numSection}
    if(type == "tutorial"){max = numTutorial}
    if(type == "lab"){max = numLab}

    for(let i = 0; i < max; i++){

      box.push(
        <ListItem>
            <Stack direction='row' spacing={4}>
              <Typography>Choose professor: </Typography>
              <Autocomplete
                  id={"profNames" + type + "" + i}
                  size="small"
                  options={profs}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label={"Professors: section - " + ("000" + (i+1)).slice(-3)} />}
              />
            </Stack>
        </ListItem>
      )
    }

    return(
      <Grid container spacing={1}>
        {box}
      </Grid>
    )
    
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

          <ListItem>
            <Stack direction='row' spacing={4}>
                    <Typography>Choose Professor: </Typography>
                    
                    <Autocomplete
                        id="profNames"
                        size="small"
                        options={profs}
                        value={profValues}
                        onChange={(event, newValue) => {
                          setProfHelperText("")
                          setProfLabel(false)
                          setProfValues(newValue);
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} error={profLabel} label="Professors" 
                                                                        helperText={profHelperText}/>}
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
                      getNum("section");
                    }}
                    id="createNewCourseSections" 
                    label='Course Sections' size="small" 
                    type="number"
                    defaultValue={1}
                      
                    />

              </Stack>
          </ListItem>

          <ListItem>
                    {getProfessor("section")}
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
                      getNum("tutorial");
                    }}
                  id="createNewCourseTutorials" 
                  label='Course Tutorials' size="small" 
                  type="number"
                  defaultValue={0}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>
                  

                </Stack>
          </ListItem>

          <ListItem>
                    {getProfessor("tutorial")}
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
                      getNum("lab");
                    }}
                  id="createNewCourseLabs" 
                  label='Course Labs' size="small" 
                  type="number"
                  defaultValue={0}
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/>

                  
              </Stack>
          </ListItem>

          <ListItem>
                    {getProfessor("lab")}
          </ListItem>

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
