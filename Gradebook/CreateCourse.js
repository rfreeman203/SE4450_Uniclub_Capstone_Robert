//Import all dependenceis (modules, components, functions) from different libraries
import React, { useState } from 'react'
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

// Define a functional component named TabPanel
function TabPanel(props) {
  // Destructure the props to get values of children, value, index, and other props
  const { children, value, index, ...other } = props;
  // Return the JSX structure for the tab panel
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {/* Show the content of the panel if its value is the currently selected index */}
      {value === index && (
        <Box sx={{ p: 3 }}>
          {/* Display the content provided as 'children' prop */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// PropTypes validation for the TabPanel component
TabPanel.propTypes = {
  // Children prop should be a node (React element)
  children: PropTypes.node,
  // Index prop is required and should be a number
  index: PropTypes.number.isRequired,
  // Value prop is required and should be a number
  value: PropTypes.number.isRequired,
};

// Define a function named CreateCourse that takes 'courseData' and 'professorData' as parameters
 function CreateCourse(courseData, professorData) {

  // Create a new instance of the Courses class using 'courseData'
  const courses = new Courses(courseData);

  // Initialize an empty array 'profs' to store professor names
  let profs = [];

  // Iterate over 'professorData' to extract professor names
  for(let i in professorData){
    for(let p in professorData[i].profs){
        // Push each professor's name into the 'profs' array
        profs.push(professorData[i].profs[p].name);
    }
  }

  // -------------------  CREATE COURSE --------------------------------------------------

  // State hook for controlling the refresh state
  const [refresh, setRefresh] = React.useState(false);

  // Function to create a new course and update the state
  const createNewCourse = () => {
  // Call a function to handle the cancellation action
  handleThisCancel();

  // Retrieve input values for course creation
  let cCode = document.getElementById('createNewCourseCode').value;
  const course = new Course(cCode);

  let cName = document.getElementById('createNewCourseName').value;
  course.setName(cName);

  let termName = document.getElementById('createNewCourseTerm').value;
  course.setTerm(termName);

  let numOfSections = document.getElementById('createNewCourseSections').value;

  // Loop to set section professors
  for (let i = 0; i < parseInt(numOfSections); i++) {
    let sectionProf = document.getElementById(`profNamessection${i}`);
    course.setSections(sectionProf.value);
  }

  let numOfTutorials = document.getElementById('createNewCourseTutorials').value;

  // Loop to set tutorial professors
  for (let i = 0; i < parseInt(numOfTutorials); i++) {
    let tutorialProf = document.getElementById(`profNamestutorial${i}`);
    course.setTutorials(tutorialProf.value);
  }

  let numOfLabs = document.getElementById('createNewCourseLabs').value;

  // Loop to set lab professors
  for (let i = 0; i < parseInt(numOfLabs); i++) {
    let labProf = document.getElementById(`profNameslab${i}`);
    course.setLabs(labProf.value);
  }

  // Set other properties for the course
  course.setProf(profValues);
  course.setActivePages([]);
  course.setUnactivePages([
    "Announcement",
    "Assignments",
    "Examination",
    "Gradebook",
    "Sylabus",
    "Resources",
    "Labs",
  ]);

  // Add the created course to the courses instance and log the updated course list
  courses.addCourse(course);
  console.log(courses.getCourseList());

  // Convert the updated course list to JSON and update the refresh state
  let newData = JSON.stringify(courses.getCourseList());
  setRefresh(updateCourse(newData));
};

// Check if refresh is true, and reload the page if it is
if (refresh) {
  window.location.reload();
}

// State hook for controlling the confirmation dialog
const [addThisConfirmationOpen, setThisConfirmationOpen] = React.useState(false);

// HelperText and Error States for Code, Name, Term, and other fields
const [codeHelperText, setCodeHelperText] = React.useState("");
const [codeError, setCodeError] = React.useState(false);

const [nameHelperText, setNameHelperText] = React.useState("");
const [nameError, setNameError] = React.useState(false);

const [termHelperText, setTermHelperText] = React.useState("");
const [termError, setTermError] = React.useState(false);

const [numSHelperText, setNumSHelperText] = React.useState("");
const [numSError, setNumSError] = React.useState(false);

const [numTHelperText, setNumTHelperText] = React.useState("");
const [numTError, setNumTError] = React.useState(false);

const [numLHelperText, setNumLHelperText] = React.useState("");
const [numLError, setNumLError] = React.useState(false);

// Function to handle opening the confirmation dialog
const handleThisOpen = () => {
  // Retrieve and validate input values for course creation
  // Check code validity and uniqueness
  let cCode = document.getElementById('createNewCourseCode').value;
  let cCodes = courses.getCourseCodes();
  let codeHelpText = "Please enter a valid code";
  let codeValid = false;
  if (cCode !== "") {
    codeValid = true;
    for (let c in cCodes) {
      if (cCode === cCodes[c]) {
        codeValid = false;
        codeHelpText = "Course code already exists";
      }
    }
  }

  // Check name and term validity
  let cName = document.getElementById('createNewCourseName').value;
  let nameValid = cName !== "";

  let termName = document.getElementById('createNewCourseTerm').value;
  let termValid = termName !== "";

  // Check professor names validity
  let pNames = profValues;
  let profNamesValid = pNames !== "";

  // Check and validate the number of sections
  let numOfSections = document.getElementById('createNewCourseSections').value;
  let numOfSectionsValid = parseInt(numOfSections) > 0;
  let numOfSectionsHelperText = "Invalid number of sections";
  for (let i = 0; i < parseInt(numOfSections); i++) {
    let sectionProf = document.getElementById(`profNamessection${i}`);
    if (sectionProf.value === "") {
      numOfSectionsValid = false;
      numOfSectionsHelperText = "1 or more sections are missing a professor";
    }
  }

  // Check and validate the number of tutorials
  let numOfTutorials = document.getElementById('createNewCourseTutorials').value;
  let numOfTutorialsValid = parseInt(numOfTutorials) >= 0;
  let numOfTutorialsHelperText = "Invalid number of tutorials";
  for (let i = 0; i < parseInt(numOfTutorials); i++) {
    let tutorialProf = document.getElementById(`profNamestutorial${i}`);
    if (tutorialProf.value === "") {
      numOfTutorialsValid = false;
      numOfTutorialsHelperText = "1 or more tutorials are missing a professor";
    }
  }

  // Check and validate the number of labs
  let numOfLabs = document.getElementById('createNewCourseLabs').value;
  let numOfLabsValid = parseInt(numOfLabs) >= 0;
  let numOfLabsHelperText = "Invalid number of labs";
  for (let i = 0; i < parseInt(numOfLabs); i++) {
    let labProf = document.getElementById(`profNameslab${i}`);
    if (labProf.value === "") {
      numOfLabsValid = false;
      numOfLabsHelperText = "1 or more labs are missing a professor";
    }
  }

  // Check overall validity and set error states accordingly
  if (
    codeValid &&
    nameValid &&
    termValid &&
    profNamesValid &&
    numOfSectionsValid &&
    numOfTutorialsValid &&
    numOfLabsValid
  ) {
    // Open the confirmation dialog
    setThisConfirmationOpen(true);
  } else {
    // Set error messages and error states for each field
    if (!codeValid) {
      setCodeHelperText(codeHelpText);
      setCodeError(true);
    }
    if (!nameValid) {
      setNameHelperText("Please enter a valid name");
      setNameError(true);
    }
    if (!termValid) {
      setTermHelperText("Please enter a valid term");
      setTermError(true);
    }
    if (!profNamesValid) {
      setProfHelperText("Course must have a valid professor");
      setProfLabel(true);
    }
    if (!numOfSectionsValid) {
      setNumSHelperText(numOfSectionsHelperText);
      setNumSError(true);
    }
    if (!numOfTutorialsValid) {
      setNumTHelperText(numOfTutorialsHelperText);
      setNumTError(true);
    }
    if (!numOfLabsValid) {
      setNumLHelperText(numOfLabsHelperText);
      setNumLError(true);
    }
  }
};

 // Function to handle cancellation of the confirmation dialog
const handleThisCancel = () => {
  setThisConfirmationOpen(false);
}

// State variables for professor values, helper text, and label display
const [profValues, setProfValues] = useState([]);
const [profHelperText, setProfHelperText] = React.useState('');
const [profLabel, setProfLabel] = React.useState(false);

// State variables to track the number of sections, tutorials, and labs
const [numSection, setNumSection] = React.useState(1);
const [numTutorial, setNumTutorial] = React.useState(0);
const [numLab, setNumLab] = React.useState(0);

// Function to get the number of sections, tutorials, or labs based on the input type
const getNum = (type) => {
  if (type === "section") {
    let numOfSections = document.getElementById('createNewCourseSections').value;
    setNumSection(parseInt(numOfSections));
  }
  if (type === "tutorial") {
    let numOfTutorials = document.getElementById('createNewCourseTutorials').value;
    setNumTutorial(parseInt(numOfTutorials));
  }
  if (type === "lab") {
    let numOfLabs = document.getElementById('createNewCourseLabs').value;
    setNumLab(parseInt(numOfLabs));
  }
}

// Function to generate a list of professors for sections, tutorials, or labs
const getProfessor = (type) => {
  const box = [];

  // Determine the maximum number of professors based on the input type
  let max = 0;
  if (type === "section") { max = numSection; }
  if (type === "tutorial") { max = numTutorial; }
  if (type === "lab") { max = numLab; }

  // Generate Autocomplete components for each professor input
  for (let i = 0; i < max; i++) {
    box.push(
      <ListItem>
        <Stack direction='row' spacing={4}>
          <Typography>Choose professor: </Typography>
          <Autocomplete
            id={"profNames" + type + "" + i}
            size="small"
            options={profs}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={"Professors: " + type + " - " + ("000" + (i + 1)).slice(-3)} />}
          />
        </Stack>
      </ListItem>
    );
  }

  // Return the list of Autocomplete components wrapped in a Grid container
  return (
    <Grid container spacing={1}>
      {box}
    </Grid>
  );
}


  return (
    <React.Fragment>
        {/* Course Info */}
        <List sx={caches}>
          {/* Title */}
          <ListItem>
              <Typography variant = "h4" >Create Course</Typography>
          </ListItem>

        {/* Container for Course Info */}
        <Grid container xs={12} sx={{ height: '100%' }}>
        <Grid item xs={6}>
          {/* Section: Choose course info */}
          <ListItem>
            <Typography align='center' variant="h8">Choose course info</Typography>
          </ListItem>

          {/* Section: Code input */}
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
                  setCodeError(false);
                  setCodeHelperText("");
                }}
              />
            </Stack>
          </ListItem>

          {/* Section: Name input */}
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
                  setNameError(false);
                  setNameHelperText("");
                }}
              />
            </Stack>
          </ListItem>

          {/* Section: Term input */}
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
                  setTermError(false);
                  setTermHelperText("");
                }}
              />
            </Stack>
          </ListItem>

          {/* Section: Choose Professor */}
          <ListItem>
            <Stack direction='row' spacing={4}>
              <Typography>Choose Professor: </Typography>
              <Autocomplete
                id="profNames"
                size="small"
                options={profs}
                value={profValues}
                onChange={(event, newValue) => {
                  setProfHelperText("");
                  setProfLabel(false);
                  setProfValues(newValue);
                }}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={profLabel}
                    label="Professors"
                    helperText={profHelperText}
                  />
                )}
              />
            </Stack>
          </ListItem>

        </Grid>


        <Grid item xs={6}>



          {/* Section Info: Heading */}
          <ListItem>
            <Typography align='center' variant="h8">Choose section info</Typography>
          </ListItem>

          {/* Section: Number of Sections */}
          <ListItem>
            <Stack direction='row' spacing={4}>
              <Typography>Number of Sections: </Typography>
              <TextField
                error={numSError}
                helperText={numSHelperText}
                onChange={(event, newValue) => {
                  setNumSError(false);
                  setNumSHelperText("");
                  getNum("section"); // Update the number of sections
                }}
                id="createNewCourseSections"
                label='Course Sections' size="small"
                type="number"
                defaultValue={1}
              />
            </Stack>
          </ListItem>

          {/* Section: Professor Selection for Sections */}
          <ListItem>
            {getProfessor("section")} {/* Calls a function to generate professor selection for sections */}
          </ListItem>

          {/* Section: Number of Tutorials */}
          <ListItem>
            <Stack direction='row' spacing={4}>
              <Typography>Number of Tutorials: </Typography>
              <TextField
                error={numTError}
                helperText={numTHelperText}
                onChange={(event, newValue) => {
                  setNumTError(false);
                  setNumTHelperText("");
                  getNum("tutorial"); // Update the number of tutorials
                }}
                id="createNewCourseTutorials"
                label='Course Tutorials' size="small"
                type="number"
                defaultValue={0}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Stack>
          </ListItem>


          {/* Tutorial: Professor Selection for Tutorials */}
          <ListItem>
            {getProfessor("tutorial")} {/* Calls a function to generate professor selection for tutorials */}
          </ListItem>

          {/* Lab: Number of Labs */}
          <ListItem>
            <Stack direction='row' spacing={4}>
              <Typography>Number of Labs: </Typography>
              <TextField
                error={numLError}
                helperText={numLHelperText}
                onChange={(event, newValue) => {
                  setNumLError(false);
                  setNumLHelperText("");
                  getNum("lab"); // Update the number of labs
                }}
                id="createNewCourseLabs"
                label='Course Labs' size="small"
                type="number"
                defaultValue={0}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </Stack>
          </ListItem>

          {/* Lab: Professor Selection for Labs */}
          <ListItem>
            {getProfessor("lab")} {/* Calls a function to generate professor selection for labs */}
          </ListItem>


          </Grid>

          <ListItem>
              {/* Submit Button */}
              <Button onClick={handleThisOpen}>Submit</Button>
          </ListItem>
          </Grid>


          </List> 

          {/* Confirmation Dialog */}
          <Confirmation 
            addConfirmationOpen={addThisConfirmationOpen} 
            handleCancel={handleThisCancel} 
            handleConfirm={createNewCourse}  
          />


          
          </React.Fragment>
        
  );
} export default CreateCourse
