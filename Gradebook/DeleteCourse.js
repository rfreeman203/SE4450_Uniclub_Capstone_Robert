//Import all dependenceis (modules, components, functions) from different libraries
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { Autocomplete, Stack } from '@mui/material';
import {Courses} from '../Entities/courses'
import TextField from '@mui/material/TextField';
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


 function DeleteCourse(courseData) {

  {/* Instantiate Courses */}
  const courses = new Courses(courseData);

  // Function to get course codes
  const getCourseCodes = () => {
    return courses.getCourseCodes()
  }

  // Confirmation Dialog State and Handlers
  const [addThisConfirmationOpen, setThisConfirmationOpen] = React.useState(false);
  const [deleteHelperText, setDeleteHelperText] = React.useState("");
  const [deleteLabel, setDeleteLabel] = React.useState(false);

  // State for Refreshing
  const [refresh, setRefresh] = React.useState(false);

  // Open Confirmation Dialog
  const handleThisOpen = () => {
    let cName = document.getElementById('deleteCourseName').value

    // Get course codes
    let courseCodes = getCourseCodes();

    // Check if entered course code is valid
    let valid = false;
    for(let c in courseCodes){
      if(cName == courseCodes[c])
        valid = true;
    }
    
    if(valid) setThisConfirmationOpen(true);
    else {
      setDeleteLabel(true);
      setDeleteHelperText("Please enter a valid course");
    }
  }

  // Close Confirmation Dialog
  const handleThisCancel = () => {
    setThisConfirmationOpen(false);
  }

  // State for Deleting
  const [deleteValue, setDeleteValue] = React.useState('');
  const [deleteInputValue, setDeleteInputValue] = React.useState('');

  // Function to delete a course
  const deleteCourse = () => {
    // Close the confirmation dialog
    handleThisCancel();

    // Logging the current course list before deletion
    console.log(courses.getCourseList());

    // Get the course name to delete from the input element
    let cName = document.getElementById('deleteCourseName').value;

    // Delete the course using the deleteCourse method from the instantiated courses object
    courses.deleteCourse(cName);

    // Logging the updated course list after deletion
    console.log(courses.getCourseList());

    // Prepare updated data for courses and set the refresh state to trigger a reload
    let newData = JSON.stringify(courses.getCourseList());
    setRefresh(updateCourse(newData));
  }

  // Check if the refresh state is true
  if(refresh){
    // If refresh is true, reload the page
    window.location.reload();
  }


  return (
    <React.Fragment>
    <List>
        {/* Choose course Autocomplete */}
        <ListItem>
            <Stack direction='row' spacing={4}>
                <Typography>Choose course: </Typography>
                <Autocomplete
                    value={deleteValue}
                    onChange={(event, newValue) => {
                        setDeleteHelperText("");
                        setDeleteLabel(false);
                        setDeleteValue(newValue);
                    }}
                    inputValue={deleteInputValue}
                    onInputChange={(event, newInputValue) => {
                        setDeleteInputValue(newInputValue);
                    }}
                    id="deleteCourseName"
                    options={getCourseCodes()} // Options for autocomplete are fetched using getCourseCodes function
                    
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={deleteLabel}
                            label="Courses"
                            helperText={deleteHelperText}
                        />
                    )}
                />
            </Stack>
        </ListItem>

        {/* Delete button */}
        <ListItem>
            <Button onClick={handleThisOpen}>Delete</Button>
        </ListItem>

        {/* Confirmation dialog for delete */}
        <Confirmation
            addConfirmationOpen={addThisConfirmationOpen}
            handleCancel={handleThisCancel}
            handleConfirm={deleteCourse}
        />
    </List>
</React.Fragment>

        
  );
} export default DeleteCourse
