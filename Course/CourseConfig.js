//Import all dependenceis (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Autocomplete, List, ListItem, Stack, TextField, Typography, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  setDrawerPages,
  getRequiredCourse
} from "../BackendCalls/CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Confirmation from '../Gradebook/confirmation';
import PropTypes from 'prop-types';
import RemoveIcon from '@mui/icons-material/Remove';
import CourseAssestmentTable from './CourseAssestmentTable';

// React component for rendering a tab panel
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
          {/* Display the content of the tab panel */}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// Define PropTypes for TabPanel component to specify the expected props types
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Styling for the drawer header
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function CourseConfig( {match} ) {
  // Extract the 'courseID' parameter from the 'match' object
const {
  params: { courseID }
} = match;

// State to hold course data and loading status
const [courseData, setCourseData] = React.useState();
const [isLoading, setIsLoading] = React.useState(true);

// Fetch course data based on the 'courseID' using useEffect
useEffect(() => {
  // Fetch the required course data asynchronously
  getRequiredCourse(courseID).then((data) => {
    // Set the fetched course data and update loading status
    setCourseData(data);
    setIsLoading(false);
  });
}, [courseID]);

// State to manage the active tab value
const [value, setValue] = React.useState(0);

// Handle tab changes
const handleTabsChange = (event, newValue) => {
  setValue(newValue);
};

// State for holding section values and input values
const [sectionValues, setSectionValues] = React.useState([]);
const [sVals, setSVals] = React.useState([]);
const [sectionInputValues, setSectionInputValues] = React.useState(['']);

// Function to get a list of available sections
const getSections = () => {
  let maxLoop = Math.max(
    courseData.sections.length,
    courseData.tutorials.length,
    courseData.labs.length
  );

  let lecArray = [];
  let tutArray = [];
  let labArray = [];

  for (let i = 0; i < maxLoop; i++) {
    if (i < courseData.sections.length) {
      lecArray.push("Lec - " + ("000" + (i + 1)).slice(-3));
    }
    if (i < courseData.tutorials.length) {
      tutArray.push("Tut - " + ("000" + (i + 1)).slice(-3));
    }
    if (i < courseData.labs.length) {
      labArray.push("Lab - " + ("000" + (i + 1)).slice(-3));
    }
  }

  // Concatenate arrays of sections
  return lecArray.concat(tutArray, labArray);
};

  // Function to select all sections
const selectAll = () => {
  let sVal = getSections();
  setSectionValues(sVal);
}

// Submit button and confirmation window

// State to control opening and closing of the confirmation window
const [sectionsConfirmationOpen, setSectionsConfirmationOpen] = React.useState(false);

// Helper and error states for section values
const [sectionValsHelper, setSectionValsHelper] = React.useState("");
const [sectionValsError, setSectionValsError] = React.useState(false);

// Function to confirm selected sections
const confirmSections = () => {
  let sVals = document.getElementById('SelectCourseSections').value;
  if (sectionValues[0]) {
    setSectionsConfirmationOpen(true);
  } else {
    setSectionValsError(true);
    setSectionValsHelper("Please enter valid sections");
  }
}

// Function to handle cancellation of confirmation
const handleThisCancel = () => {
  setSectionsConfirmationOpen(false);
  setDeleteConfirmationOpen(false);
  setCreateConfirmationOpen(false);
  setEditConfirmationOpen(false);
}

// Function to apply the confirmed sections
const changeToConfirmedSections = () => {
  setSectionsConfirmationOpen(false);
  alert("You are now changing to sections - " + sectionValues);
}

// Function to handle adding a new page/site
const handleAddPageOpen = () => {
  let newPage = document.getElementById('addSite').value;
  console.log(newPage);

  document.getElementById('addSite').value = "";

  // Remove the page from unactivePages and add it to activePages
  courseData.unactivePages.splice(courseData.unactivePages.indexOf(newPage), 1);
  courseData.activePages.push(newPage);

  setDrawerPages(courseData.courseCode, courseData.activePages, courseData.unactivePages);
}

// Function to handle deleting a page/site
const handleDeletePageOpen = () => {
  let newPage = document.getElementById('removeSite').value;
  document.getElementById('removeSite').value = "";

  // Remove the page from activePages and add it to unactivePages
  courseData.activePages.splice(courseData.activePages.indexOf(newPage), 1);
  courseData.unactivePages.push(newPage);

  setDrawerPages(courseData.courseCode, courseData.activePages, courseData.unactivePages);
}

  //----- CREATE ASSESTMENTS -------------------------------

  // State to control opening and closing of the create confirmation window
const [createConfirmationOpen, setCreateConfirmationOpen] = React.useState(false);

// State variables for number of each assessment type
const [aVal, setAVal] = React.useState(0); // Assignments
const [qVal, setQVal] = React.useState(0); // Quizzes
const [lVal, setLVal] = React.useState(0); // Labs
const [eVal, setEVal] = React.useState(0); // Exams

// Function to change the value of assessment count (positive or negative)
const changeVal = (e, type, dir) => {
  setAError(false);
  setAHelperText("");

  let change = 1;
  if (dir === "neg") {
    change *= -1;
  }

  switch (type) {
    case 'A': { setAVal(prevVal => prevVal + change); break; }
    case 'Q': { setQVal(prevVal => prevVal + change); break; }
    case 'L': { setLVal(prevVal => prevVal + change); break; }
    case 'E': { setEVal(prevVal => prevVal + change); break; }
  }
}

// State variables for input errors and helper text
const [assestmentNameError, setAssestmentNameError] = React.useState(false);
const [assestmentNameText, setAssestmentNameText] = React.useState("");
const [weightError, setWeightError] = React.useState(false);
const [weightText, setWeightText] = React.useState("");
const [dueError, setDueError] = React.useState(false);
const [dueText, setDueText] = React.useState("");

// Function to create multiple assessment input fields
const CreateAssestment = (type) => {
  // Determine the maximum number of assessments based on the type
  let max = 0;
  switch (type) {
    case 'Assignment': { max = aVal; break; }
    case 'Quiz': { max = qVal; break; }
    case 'Lab': { max = lVal; break; }
    case 'Exam': { max = eVal; break; }
  }

  // Create an array to hold the input fields
  const box = [];
  for (let i = 0; i < max; i++) {
    box.push(
      <ListItem>
        <Stack direction='row' spacing={1}>
          <List>
            <ListItem>
              {/* Input field for assessment name */}
              <TextField
                autoFocus
                margin="dense"
                id={type + "Name" + i}
                label={type + " " + (i + 1) + " Name"}
                type="name"
                fullWidth
                variant="standard"
                error={assestmentNameError}
                helperText={assestmentNameText}
                defaultValue={""}
                onChange={(e) => {
                  setAssestmentNameText("");
                  setAssestmentNameError(false);
                }}
              />
            </ListItem>
            <ListItem>
              {/* Input field for assessment weight */}
              <TextField
                autoFocus
                margin="dense"
                id={type + "Weight" + i}
                label="Weight"
                type="number"
                fullWidth
                variant="standard"
                error={weightError}
                helperText={weightText}
                onChange={(e) => {
                  setWeightText("");
                  setWeightError(false);
                }}
              />
            </ListItem>
            <ListItem>
              {/* Input field for assessment due date */}
              <TextField
                autoFocus
                margin="dense"
                id={type + "DueDate" + i}
                type="date"
                fullWidth
                variant="standard"
                error={dueError}
                helperText={dueText}
                onChange={(e) => {
                  setDueText("");
                  setDueError(false);
                }}
              />
            </ListItem>
          </List>
        </Stack>
      </ListItem>
    );
  }

  // Return the array of assessment input fields wrapped in a Grid container
  return <Grid container spacing={1}>{box}</Grid>;
}
// Function to validate and create assessments
const createAssestments = () => {
  let submit = true;
  let totalWeight = 0;

  // Validate assessment counts
  if (aVal === 0 && qVal === 0 && lVal === 0 && eVal === 0) {
    setAError(true);
    setAHelperText("Need at least one assessment");
    submit = false;
  }

  // Validate and calculate assessment weights
  let [weight1, check1] = checkAssestments('Assignment');
  let [weight2, check2] = checkAssestments('Quiz');
  let [weight3, check3] = checkAssestments('Lab');
  let [weight4, check4] = checkAssestments('Exam');

  totalWeight = weight1 + weight2 + weight3 + weight4;

  // Check total weight constraints and show confirmation
  if (parseInt(courseTotalWeight) === 100) {
    alert("Delete assignments! Course already at 100!");
    submit = false;
  }
  if ((totalWeight > 100) || ((parseInt(courseTotalWeight) + totalWeight) > 100)) {
    alert("The total weight is over 100!");
    submit = false;
  }
  if (submit && check1 && check2 && check3 && check4) {
    setCourseTotalWeight(courseTotalWeight + totalWeight);
    setCreateConfirmationOpen(true);
  }
}

// Function to validate assessments and calculate their total weight
const checkAssestments = (type) => {
  let max = 0;
  let weight = 0;
  let check = true;

  switch (type) {
    case 'Assignment': { max = aVal; break; }
    case 'Quiz': { max = qVal; break; }
    case 'Lab': { max = lVal; break; }
    case 'Exam': { max = eVal; break; }
  }

  // Validate each assessment's inputs
  for (let i = 0; i < max; i++) {
    let aName = document.getElementById(`${type}Name${i}`);
    if (aName.value === "") {
      check = false;
      setAssestmentNameError(true);
      setAssestmentNameText("Please ensure all assessments have names");
    }

    let aWeight = document.getElementById(`${type}Weight${i}`);
    if (aWeight.value === "" || (0 > parseInt(aWeight.value) || parseInt(aWeight.value) > 100)) {
      setWeightError(true);
      setWeightText("Please ensure all weights are in range [0..100]");
      check = false;
    } else {
      weight += parseInt(aWeight.value);
    }

    let aDue = document.getElementById(`${type}DueDate${i}`);
    if (aDue.value === "") {
      setDueError(true);
      setDueText("Please ensure all assessments have a due date");
      check = false;
    }
  }

  return [weight, check];
}

// Function to apply confirmed assessments
const changeToCreatedAssestments = () => {
  confirmedAssestments('Assignment');
  confirmedAssestments('Quiz');
  confirmedAssestments('Lab');
  confirmedAssestments('Exam');
  setCreateConfirmationOpen(false);
}

// Function to finalize and store confirmed assessments
const confirmedAssestments = (type) => {
  let max = 0;

  switch (type) {
    case 'Assignment': { max = aVal; break; }
    case 'Quiz': { max = qVal; break; }
    case 'Lab': { max = lVal; break; }
    case 'Exam': { max = eVal; break; }
  }

  // Create and store assessment objects based on type
  for (let i = 0; i < max; i++) {
    let aName = document.getElementById(`${type}Name${i}`);
    let aWeight = document.getElementById(`${type}Weight${i}`);
    let aDue = document.getElementById(`${type}DueDate${i}`);
    let a = {
      "name": aName.value,
      "grade": "",
      "weight": (parseInt(aWeight.value) / 100),
      "due": aDue.value,
      "submitted": ""
    };

    if (type === 'Assignment') courseData.sections[0].assignments.push(a);
    if (type === 'Quiz') courseData.sections[0].quizzes.push(a);
    if (type === 'Lab') courseData.sections[0].labs.push(a);
    if (type === 'Exam') courseData.sections[0].exams.push(a);
  }

  console.log(courseData);
}

//--------------------- Course Assessment Table ---------------------

// State to store the total weight of course assessments
const [courseTotalWeight, setCourseTotalWeight] = React.useState(0);

// Callback function to update the total weight when assessments change
const callbackHandlerFunction = (val) => {
  setCourseTotalWeight(val);
}

//--------------------- Assessment Delete ----------------------------

// State variables related to assessment deletion
const [deleteHelperText, setDeleteHelperText] = React.useState("");
const [deleteLabel, setDeleteLabel] = React.useState(false);
const [deleteValue, setDeleteValue] = React.useState('');
const [deleteInputValue, setDeleteInputValue] = React.useState('');

// State variable to control the deletion confirmation dialog
const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);

// Function to retrieve assessment names from course data
const getAssessments = () => {
  let assessmentNames = [];

  console.log(courseData);
  for (let i = 0; i < courseData.sections[0].assignments.length; i++) {
    assessmentNames.push(courseData.sections[0].assignments[i].name);
  }
  for (let i = 0; i < courseData.sections[0].quizzes.length; i++) {
    assessmentNames.push(courseData.sections[0].quizzes[i].name);
  }
  for (let i = 0; i < courseData.sections[0].labs.length; i++) {
    assessmentNames.push(courseData.sections[0].labs[i].name);
  }
  for (let i = 0; i < courseData.sections[0].exams.length; i++) {
    assessmentNames.push(courseData.sections[0].exams[i].name);
  }

  return assessmentNames;
}

// Function to handle assessment deletion
const handleDelete = () => {
  let assessmentToBeDeleted = document.getElementById('deleteAssessment').value;

  let valid = false;
  for (let i = 0; i < courseData.sections[0].assignments.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].assignments[i].name) valid = true;
  }
  for (let i = 0; i < courseData.sections[0].quizzes.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].quizzes[i].name) valid = true;
  }
  for (let i = 0; i < courseData.sections[0].labs.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].labs[i].name) valid = true;
  }
  for (let i = 0; i < courseData.sections[0].exams.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].exams[i].name) valid = true;
  }

  if (valid) {
    setDeleteConfirmationOpen(true);
  } else {
    setDeleteLabel(true);
    setDeleteHelperText("Please enter a valid assessment");
  }
}

// Function to perform the actual deletion of an assessment
const changeToDeletedAssessment = () => {
  let assessmentToBeDeleted = document.getElementById('deleteAssessment').value;

  for (let i = 0; i < courseData.sections[0].assignments.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].assignments[i].name) {
      setCourseTotalWeight(courseTotalWeight - courseData.sections[0].assignments[i].weight);
      let ind = courseData.sections[0].assignments.indexOf(courseData.sections[0].assignments[i]);
      courseData.sections[0].assignments.splice(ind, 1);
    }
  }
  for (let i = 0; i < courseData.sections[0].quizzes.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].quizzes[i].name) {
      setCourseTotalWeight(courseTotalWeight - courseData.sections[0].quizzes[i].weight);
      let ind = courseData.sections[0].quizzes.indexOf(courseData.sections[0].quizzes[i]);
      courseData.sections[0].quizzes.splice(ind, 1);
    }
  }
  for (let i = 0; i < courseData.sections[0].labs.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].labs[i].name) {
      setCourseTotalWeight(courseTotalWeight - courseData.sections[0].labs[i].weight);
      let ind = courseData.sections[0].labs.indexOf(courseData.sections[0].labs[i]);
      courseData.sections[0].labs.splice(ind, 1);
    }
  }
  for (let i = 0; i < courseData.sections[0].exams.length; i++) {
    if (assessmentToBeDeleted == courseData.sections[0].exams[i].name) {
      setCourseTotalWeight(courseTotalWeight - courseData.sections[0].exams[i].weight);
      let ind = courseData.sections[0].exams.indexOf(courseData.sections[0].exams[i]);
      courseData.sections[0].exams.splice(ind, 1);
    }
  }

  setDeleteConfirmationOpen(false);
}

  //----------------------- ASSESTMENT EDIT ----------------------------------------------------

  // State variables related to assessment editing
  const [editConfirmationOpen, setEditConfirmationOpen] = React.useState(false);
  const [editHelperText, setEditHelperText] = React.useState("");
  const [editLabel, setEditLabel] = React.useState(false);
  const [editValue, setEditValue] = React.useState('')
  const [editInputValue, setEditInputValue] = React.useState('');

  // State variables for handling errors and helper texts for the new name and weight
  const [newNameError, setnewNameError] = React.useState(false);
  const [newNameHelperText, setnewNameHelperText] = React.useState("")
  const [newWeightError, setnewWeightError] = React.useState(false);
  const [newWeightHelperText, setnewWeightHelperText] = React.useState("")

  // Function to display edit fields for assessment
  const editAssestment = () => {

    console.log(editValue)

    let oldName = "";
    let oldWeight = "";
    let oldDate = "";

    // Find the details of the assessment to be edited
    for(let i=0; i<courseData.sections[0].assignments.length; i++){
      if(editValue == courseData.sections[0].assignments[i].name)
        {oldName = courseData.sections[0].assignments[i].name; 
         oldWeight = courseData.sections[0].assignments[i].weight;
         oldDate = courseData.sections[0].assignments[i].due}
    }for(let i=0; i<courseData.sections[0].quizzes.length; i++){
      if(editValue == courseData.sections[0].quizzes[i].name) 
        {oldName = courseData.sections[0].quizzes[i].name; 
         oldWeight = courseData.sections[0].quizzes[i].weight;
         oldDate = courseData.sections[0].quizzes[i].due}
    }for(let i=0; i<courseData.sections[0].labs.length; i++){
      if(editValue == courseData.sections[0].labs[i].name) 
        {oldName = courseData.sections[0].labs[i].name; 
         oldWeight = courseData.sections[0].labs[i].weight;
         oldDate = courseData.sections[0].labs[i].due}
    }for(let i=0; i<courseData.sections[0].exams.length; i++){
      if(editValue == courseData.sections[0].exams[i].name) 
        {oldName = courseData.sections[0].exams[i].name; 
         oldWeight = courseData.sections[0].exams[i].weight;
         oldDate = courseData.sections[0].exams[i].due}
    }

    console.log(oldName)

    // If an assessment was found, display edit fields
    if(oldName != ""){

      return (
        <List>
          {/* Edit assessment name */}
          <ListItem>
            <Grid container justify="flex-start" alignItems="center" spacing={1} sx={{p:2}}>
              <Grid item xs={8}>
                    <Typography>Replace assestment name ({oldName}): </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField  
                  fullWidth
                  error={newNameError} 
                  id="newAssestmentName" 
                  label='New Name' 
                  size="small"
                  helperText={newNameHelperText}
                  onChange={(event, newValue) => {
                    setnewNameError(false)
                    setnewNameHelperText("")
                  }}
                />
              </Grid>
            </Grid>
          </ListItem>
          {/* Edit assessment weight */}
          <ListItem>
            <Grid container justify="flex-start" alignItems="center" spacing={1} sx={{p:2}}>
              <Grid item xs={8}>
                <Typography>Replace assestment weight ({oldWeight*100}): </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField  
                  fullWidth
                  error={newWeightError} 
                  id="newAssestmentWeight" 
                  type="number"
                  label='New Weight' 
                  size="small"
                  helperText={newWeightHelperText}
                  onChange={(event, newValue) => {
                    setnewWeightError(false)
                    setnewWeightHelperText("")
                  }}
                />
              </Grid>
            </Grid>
          </ListItem>
          {/* Edit assessment date */}
          <ListItem>
            <Grid container justify="flex-start" alignItems="center" spacing={1} sx={{p:2}}>
              <Grid item xs={8}>
                <Typography>Replace assestment date ({oldDate}): </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField  
                  fullWidth
                  id="newAssestmentDate" 
                  size="small"
                  type="date"
                />
              </Grid>
            </Grid> 
          </ListItem>
        </List> 
      )
    }else return <></>
  }

  // Function to handle the edit action
  const handleEdit = () => {
    // Get values from input fields
    let newName = document.getElementById('newAssestmentName').value
    let newWeight = document.getElementById('newAssestmentWeight').value
    let newDate = document.getElementById('newAssestmentDate').value
    
    // Check if the new weight is valid (either empty or within [0, 100])
    let wValid = false
    if(newWeight == "" || ((0 < parseInt(newWeight)) && (parseInt(newWeight) <= 100)))
    {wValid=true;}
    
    // Store the old weight for comparison
    let oldWeight = null;

    // Find the old details of the assessment to be edited
    for(let i=0; i<courseData.sections[0].assignments.length; i++){
      if(editValue == courseData.sections[0].assignments[i].name) 
      { oldWeight=courseData.sections[0].assignments[i].weight;
        if(newDate == ""){newDate = courseData.sections[0].assignments[i].due}}
        if(newName == ""){newName = courseData.sections[0].assignments[i].name}
    }for(let i=0; i<courseData.sections[0].quizzes.length; i++){
      if(editValue == courseData.sections[0].quizzes[i].name) 
      { oldWeight=courseData.sections[0].quizzes[i].weight; 
        if(newDate == ""){newDate = courseData.sections[0].quizzes[i].due}
        if(newName == ""){newName = courseData.sections[0].quizzes[i].name}}
    }for(let i=0; i<courseData.sections[0].labs.length; i++){
      if(editValue == courseData.sections[0].labs[i].name) 
      { oldWeight=courseData.sections[0].labs[i].weight; 
        if(newDate == ""){newDate = courseData.sections[0].labs[i].due}
        if(newName == ""){newName = courseData.sections[0].labs[i].name}}
    }for(let i=0; i<courseData.sections[0].exams.length; i++){
      if(editValue == courseData.sections[0].exams[i].name) 
      { oldWeight=courseData.sections[0].exams[i].weight;  
        if(newDate == ""){newDate = courseData.sections[0].exams[i].due}
        if(newName == ""){newName = courseData.sections[0].exams[i].name}}
    }

    // If newWeight is empty, retain the old weight
    if(newWeight == ""){newWeight = oldWeight}

    console.log(courseTotalWeight)

    let tWValid = true;
    // Check if the total course weight after editing is greater than 100
    if((parseInt(courseTotalWeight)+parseInt(newWeight)-oldWeight*100) > 100) {tWValid=false; alert("Course Weight > 100!")}

    // If both weight validation checks pass, update the course total weight and open the edit confirmation
    if(wValid && tWValid){
        setCourseTotalWeight(parseInt(courseTotalWeight)+parseInt(newWeight)-oldWeight*100)
        setEditConfirmationOpen(true)
    }else{
      // If weight validation fails, display an error
      if(!wValid){setnewWeightError(true); setnewWeightHelperText("Enter valid weight [0..100]")}
    }
  }

  // Function to apply the edited changes to the assessment
  const changeToEditedAssestment = () => {
    setEditConfirmationOpen(false)

    // Get values from input fields
    let newName = document.getElementById('newAssestmentName').value
    let newWeight = document.getElementById('newAssestmentWeight').value
    let newDate = document.getElementById('newAssestmentDate').value

    // Update the assessment details in the courseData based on the editValue
    for(let i=0; i<courseData.sections[0].assignments.length; i++){
      if(editValue == courseData.sections[0].assignments[i].name) 
      { if(newWeight != "") courseData.sections[0].assignments[i].weight = newWeight/100;
        if(newDate != "") courseData.sections[0].assignments[i].due = newDate
        if(newName != "") courseData.sections[0].assignments[i].name = newName }
    }for(let i=0; i<courseData.sections[0].quizzes.length; i++){
      if(editValue == courseData.sections[0].quizzes[i].name) 
      { if(newWeight != "") courseData.sections[0].quizzes[i].weight = newWeight/100
        if(newDate != "") courseData.sections[0].quizzes[i].due = newDate
        if(newName != "") courseData.sections[0].quizzes[i].name = newName }
    }for(let i=0; i<courseData.sections[0].labs.length; i++){
      if(editValue == courseData.sections[0].labs[i].name) 
      { if(newWeight != "") courseData.sections[0].labs[i].weight = newWeight/100
        if(newDate != "") courseData.sections[0].labs[i].due = newDate
        if(newName != "") courseData.sections[0].labs[i].name = newName }
    }for(let i=0; i<courseData.sections[0].exams.length; i++){
      if(editValue == courseData.sections[0].exams[i].name) 
      { if(newWeight != "") courseData.sections[0].exams[i].weight = newWeight/100
        if(newDate != "") courseData.sections[0].exams[i].due = newDate
        if(newName != "") courseData.sections[0].exams[i].name = newName }
    }
  }

  return (
    <React.Fragment>
      {!isLoading && (
        <>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />
          <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>
          <Box component="main" sx={{ flexGrow: 1, p: 1}}>
            <DrawerHeader />
              <List>
                <ListItem>
                  {/* Display course code and section values */}
                  <Typography variant="h4">
                    {courseData.courseCode} : {sectionValues}
                  </Typography>
                </ListItem>
                <Divider/>

{/** ----------------------- CHOOSE SECTIONS -------------------------------------------- */}

                {/* Section: Choose Course Section Title */}
                <ListItem>
                  {/* Display the title for choosing course sections */}
                  <Typography variant="h3">
                    Choose Your Course Section(s)
                  </Typography>
                </ListItem>

                {/* Section: Choose Section(s) */}
                <ListItem>
                  <Stack direction="row" spacing={4}>
                    {/* Display label for choosing sections */}
                    <Typography>Choose section(s): </Typography>
                    
                    {/* Autocomplete input for selecting sections */}
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      value={sectionValues}
                      size="small"
                      onChange={(event, newValues) => {
                        // Update selected section values
                        setSectionValues(newValues);
                      }}
                      inputValue={sectionInputValues}
                      onInputChange={(event, newInputValues) => {
                        // Update input value for section selection
                        setSectionInputValues(newInputValues);
                      }}
                      id="SelectCourseSections"
                      options={getSections()} // Options for the Autocomplete dropdown
                      
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Sections" />}
                    />

                    {/* Button to select all sections */}
                    <Button onClick={selectAll}>All</Button>
                    
                    {/* Button to confirm selected sections */}
                    <Button onClick={confirmSections}>Submit</Button>
                  </Stack>
                </ListItem>

                {/* Section: Divider */}
                <Divider />

{/** ---------------------------- SECTION SITES ------------------------------------------- */}

                {/* Section: Choose Course Section Title */}
                <ListItem>
                  {/* Display the title for choosing course sections */}
                  <Typography variant="h3">
                    Choose Your Course Section(s)
                  </Typography>
                </ListItem>

                {/* Section: Choose Section(s) */}
                <ListItem>
                  <Stack direction="row" spacing={4}>
                    {/* Display label for choosing sections */}
                    <Typography>Choose section(s): </Typography>
                    
                    {/* Autocomplete input for selecting sections */}
                    <Autocomplete
                      multiple
                      disableCloseOnSelect
                      value={sectionValues}
                      size="small"
                      onChange={(event, newValues) => {
                        // Update selected section values
                        setSectionValues(newValues);
                      }}
                      inputValue={sectionInputValues}
                      onInputChange={(event, newInputValues) => {
                        // Update input value for section selection
                        setSectionInputValues(newInputValues);
                      }}
                      id="SelectCourseSections"
                      options={getSections()} // Options for the Autocomplete dropdown
                      
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label="Sections" />}
                    />

                    {/* Button to select all sections */}
                    <Button onClick={selectAll}>All</Button>
                    
                    {/* Button to confirm selected sections */}
                    <Button onClick={confirmSections}>Submit</Button>
                  </Stack>
                </ListItem>

                {/* Section: Divider */}
                <Divider />

{/** ---------------------------- SECTION ASSESTMENTS -------------------------------------- */}

                {/* Section: Section Assestments Title */}
                <ListItem>
                  {/* Display the title for section assessments */}
                  <Typography variant="h3">
                    Section(s) Assessments
                  </Typography>
                </ListItem>

                {/* Section: Empty Placeholder */}
                <ListItem>
                  {/* This is an empty placeholder */}
                </ListItem>

                {/* Display assessments for each selected section */}
                {sectionValues.map((rows, i) => (
                  <ListItem key={i}>
                    {/* Accordion for each section */}
                    <Accordion sx={{ width: '100%', border: 0.05, borderColor: 'primary.main' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ bgcolor: '#bbdefb', borderBottom: 0 }}
                      >
                        {/* Display the section name */}
                        <Typography variant="h6">
                          {sectionValues[i]}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ mt: 0 }}>
                        {/* Display assessment table for the section */}
                        <CourseAssestmentTable
                          grades={courseData.sections[0]}
                          courseCode={courseData.courseCode.replace(/\s/g, "")}
                          wanted={"all"}
                          handleWeightInParent={callbackHandlerFunction}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                ))}

                {/* Section: Empty Placeholder */}
                <ListItem>
                  {/* This is an empty placeholder */}
                </ListItem>

                {/* Section: Tabs for Create, Edit, Delete Assessments */}
                <ListItem>
                  {/* Display tabs for Create, Edit, Delete Assessments */}
                  <Tabs value={value} onChange={handleTabsChange}>
                    <Tab label="Create Assessments" />
                    <Tab label="Edit Assessments" />
                    <Tab label="Delete Assessments" />
                  </Tabs>
                </ListItem>

                {/* Section: Create Assessments */}
                <ListItem>
                  {/* Display content for Create Assessments */}
                  <TabPanel value={value} index={0} width='100%'>
              
                  <Grid container xs={12} sx={{ height: '100%' }}>
                  {/* Left column */}
                  <Grid item xs={6}>
                    {/* List item for adding assignments */}
                    <ListItem>
                      {/* Grid container for adding assignments */}
                      <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={4}>
                          {/* Display label for adding an assignment */}
                          <Typography>Add an Assignment</Typography>
                        </Grid>
                        <Grid item xs={5}>
                          {/* Text field for entering the number of assignments */}
                          <TextField
                            fullWidth
                            value={aVal}
                            error={aError}
                            helperText={aHelperText}
                            onChange={(e) => {
                              // Clear error and helper text when input changes
                              setAError(false);
                              setAHelperText("");
                              setAVal(e.target.value);
                            }}
                            id="createAssignments"
                            label="Num Assignments"
                            size="small"
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={3}>
                          {/* Buttons for incrementing and decrementing assignment value */}
                          <IconButton color="primary" onClick={(e) => changeVal(e, 'A', "pos")}>
                            <AddIcon />
                          </IconButton>
                          <IconButton color="primary" onClick={(e) => changeVal(e, 'A', "neg")}>
                            <RemoveIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Grid>

                  {/* Right column */}
                  <Grid item xs={6}>
                    {/* List item for CreateAssestment */}
                    <ListItem>
                      {/* Call CreateAssestment function with "Assignment" parameter */}
                      {CreateAssestment("Assignment")}
                    </ListItem>

                  </Grid>

                  <Divider/>
                  <Grid item xs={6}>
                  {/* List item for adding quizzes */}
                  <ListItem>
                    {/* Grid container for adding quizzes */}
                    <Grid container spacing={2} sx={{ p: 2 }}>
                      <Grid item xs={4}>
                        {/* Display label for adding a quiz */}
                        <Typography>Add a Quiz</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        {/* Text field for entering the number of quizzes */}
                        <TextField
                          fullWidth
                          value={qVal}
                          error={aError}
                          helperText={aHelperText}
                          onChange={(event, newValue) => {
                            // Clear error and helper text when input changes
                            setAError(false);
                            setAHelperText("");
                            setQVal(newValue);
                          }}
                          id="createQuizzes"
                          label="Num Quizzes"
                          size="small"
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {/* Buttons for incrementing and decrementing quiz value */}
                        <IconButton color="primary" onClick={(e) => changeVal(e, 'Q', "pos")}>
                          <AddIcon />
                        </IconButton>
                        <IconButton color="primary" onClick={(e) => changeVal(e, 'Q', "neg")}>
                          <RemoveIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>

                <Grid item xs={6}>
                  {/* List item for CreateAssestment */}
                  <ListItem>
                    {/* Call CreateAssestment function with "Quiz" parameter */}
                    {CreateAssestment("Quiz")}
                  </ListItem>
                </Grid>

                {/* Divider */}
                <Divider />
                <Grid item xs={6}>
                {/* List item for adding labs */}
                <ListItem>
                  {/* Grid container for adding labs */}
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                      {/* Display label for adding a lab */}
                      <Typography>Add a Lab</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      {/* Text field for entering the number of labs */}
                      <TextField
                        fullWidth
                        value={lVal}
                        error={aError}
                        helperText={aHelperText}
                        onChange={(event, newValue) => {
                          // Clear error and helper text when input changes
                          setAError(false);
                          setAHelperText("");
                          setLVal(newValue);
                        }}
                        id="createLabs"
                        label="Num Labs"
                        size="small"
                        type="number"
                        defaultValue={0}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      {/* Buttons for incrementing and decrementing lab value */}
                      <IconButton color="primary" onClick={(e) => changeVal(e, 'L', "pos")}>
                        <AddIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={(e) => changeVal(e, 'L', "neg")}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>

              <Grid item xs={6}>
                {/* List item for CreateAssestment */}
                <ListItem>
                  {/* Call CreateAssestment function with "Lab" parameter */}
                  {CreateAssestment("Lab")}
                </ListItem>
              </Grid>

              {/* Divider */}
              <Divider />

              <Grid item xs={6}>
                {/* List item for adding exams */}
                <ListItem>
                  {/* Grid container for adding exams */}
                  <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                      {/* Display label for adding an exam */}
                      <Typography>Add an Exam</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      {/* Text field for entering the number of exams */}
                      <TextField
                        fullWidth
                        value={eVal}
                        error={aError}
                        helperText={aHelperText}
                        onChange={(event, newValue) => {
                          // Clear error and helper text when input changes
                          setAError(false);
                          setAHelperText("");
                          setEVal(newValue);
                        }}
                        id="createExams"
                        label="Num Exams"
                        size="small"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      {/* Buttons for incrementing and decrementing exam value */}
                      <IconButton color="primary" onClick={(e) => changeVal(e, 'E', "pos")}>
                        <AddIcon />
                      </IconButton>
                      <IconButton color="primary" onClick={(e) => changeVal(e, 'E', "neg")}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>
              </Grid>
              <Grid item xs={6}>
              {/* List item for CreateAssestment */}
              <ListItem>
                  {/* Call CreateAssestment function with "Exam" parameter */}
                  {CreateAssestment("Exam")}
              </ListItem>

              </Grid>
              {/* List item for the "Submit" buttom */}
              <ListItem>
                <Button onClick={createAssestments}>SUBMIT</Button>
              </ListItem>

              </Grid>

              </TabPanel>

{/** --------------------------- EDIT ----------------------------------------------------- */}
              <TabPanel value={value} index={1} width="100%">
                {/* List item for choosing assessment to edit */}
                <ListItem>
                  {/* Stack for displaying choose assessment to edit */}
                  <Stack direction="row" spacing={4}>
                    <Typography>Choose assessment to edit: </Typography>
                    {/* Autocomplete for selecting assessment to edit */}
                    <Autocomplete
                      size="small"
                      value={editValue}
                      onChange={(event, newValue) => {
                        // Clear edit helper text and label, and set edit value
                        setEditHelperText("");
                        setEditLabel(false);
                        setEditValue(newValue);
                      }}
                      inputValue={editInputValue}
                      onInputChange={(event, newInputValue) => {
                        setEditInputValue(newInputValue);
                      }}
                      id="editAssestment"
                      options={getAssestments()}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={editLabel}
                          label="Assessments"
                          helperText={editHelperText}
                        />
                      )}
                    />
                  </Stack>
                </ListItem>

                {/* List item for displaying edited assessment */}
                <ListItem>{editAssestment()}</ListItem>

                {/* List item for the "Submit" button */}
                <ListItem>
                  <Button onClick={handleEdit}>Submit</Button>
                </ListItem>
              </TabPanel>


{/** -------------------------- DELETE ----------------------------------------------------- */}

              <TabPanel value={value} index={2} width="100%">
                {/* List item for choosing assessment to delete */}
                <ListItem>
                  {/* Stack for displaying choose assessment to delete */}
                  <Stack direction="row" spacing={4}>
                    <Typography>Choose assessment to delete: </Typography>
                    {/* Autocomplete for selecting assessment to delete */}
                    <Autocomplete
                      size="small"
                      value={deleteValue}
                      onChange={(event, newValue) => {
                        // Clear delete helper text and label, and set delete value
                        setDeleteHelperText("");
                        setDeleteLabel(false);
                        setDeleteValue(newValue);
                      }}
                      inputValue={deleteInputValue}
                      onInputChange={(event, newInputValue) => {
                        setDeleteInputValue(newInputValue);
                      }}
                      id="deleteAssestment"
                      options={getAssestments()}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={deleteLabel}
                          label="Assessments"
                          helperText={deleteHelperText}
                        />
                      )}
                    />
                  </Stack>
                </ListItem>

                {/* List item for the "Delete" button */}
                <ListItem>
                  <Button onClick={handleDelete}>Delete</Button>
                </ListItem>
              </TabPanel>
              </ListItem>
              </List>

{/** ----------------------------- CONFIRMATIONS ------------------------------------------- */}

                {/* Confirmation dialog for confirming selected sections */}
                <Confirmation addConfirmationOpen={sectionsConfirmationOpen} handleCancel={handleThisCancel} handleConfirm={changeToConfirmedSections}/>
                {/* Confirmation dialog for confirming created assessments */}
                <Confirmation addConfirmationOpen={createConfirmationOpen} handleCancel={handleThisCancel} handleConfirm={changeToCreatedAssestments}/>
                {/* Confirmation dialog for confirming deleted assessment */}
                <Confirmation addConfirmationOpen={deleteConfirmationOpen} handleCancel={handleThisCancel} handleConfirm={changeToDeletedAssestment}/>
                {/* Confirmation dialog for confirming edited assessment */}
                <Confirmation addConfirmationOpen={editConfirmationOpen} handleCancel={handleThisCancel} handleConfirm={changeToEditedAssestment}/>

            </Box>
          </Box>

            
        </>
      )}
      
    </React.Fragment>
  );
}


