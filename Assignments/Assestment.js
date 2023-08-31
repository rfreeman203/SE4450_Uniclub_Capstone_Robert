//Import all dependenceis (modules, components, functions) from different libraries

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
  Link
} from "react-router-dom";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import { IconButton, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import {
  getRequiredCourse
} from "../BackendCalls/CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function CourseAssignments( {match} ) {
  // Destructuring assignment to extract parameters from match object
  const {
    params: {assestmentID, courseID}
  } = match;

  // Logging the values of match, assestmentID, and courseID
  console.log(match)
  console.log(assestmentID)
  console.log(courseID)

  // State variables for course data, loading status, and image URL
  const [courseData, setCourseData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState()

  // useEffect to fetch required course data when courseID changes
  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false)
    });
  },[courseID])


  let assestment;

  for(let c in courseData){
    for(let a in courseData.sections[0].assignments)
        if(courseData.sections[0].assignments[a].name.replace(/\s+/g, '') == assestmentID)
            assestment = courseData.sections[0].assignments[a]

    for(let q in courseData.sections[0].quizzes)
        if(courseData.sections[0].quizzes[q].name.replace(/\s+/g, '') == assestmentID)
            assestment = courseData.sections[0].quizzes[q]

    for(let a in courseData.sections[0].labs)
        if(courseData.sections[0].labs[a].name.replace(/\s+/g, '') == assestmentID)
            assestment = courseData.sections[0].labs[a]

    for(let a in courseData.sections[0].exams)
        if(courseData.sections[0].exams[a].name.replace(/\s+/g, '') == assestmentID)
            assestment = courseData.sections[0].exams[a]
  }

  // State variables and functions for file handling
  const [f, setFile] = React.useState(null)
  const [fType, setFileType] = React.useState(null)
  const [fileUrl, setFileUrl] = React.useState(null);
 
  // Event handler for selecting a file, removing file, uploading file
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file)
    setFileType(file.type);
  };

  const removeF = () => {
    setFile(null)
    setFileType(null)
    setImageUrl(null)
    setFileUrl(null)
    document.getElementById("file-input").value = "";
  }

  const uploadFile = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (fType === 'application/pdf') {
        setFileUrl(event.target.result);
      } else if (fType === 'text/plain') {
        setFileUrl(event.target.result);
      } else {
        setImageUrl(event.target.result);
      }
    };
    if(fType !== 'text/plain')
      reader.readAsDataURL(f)
    else reader.readAsText(f)
  }

  // State variables and functions for resource handling
  const [r, setResource] = React.useState(null)
  const [rType, setResourceType] = React.useState(null)
  const [resourceUrl, setResourceUrl] = React.useState(null);

  // Event handler for selecting a resource file, removing resource, uploading resource
  const handleResourceSelect = (event) => {
    const resource = event.target.files[0];
    setResource(resource)
    setResourceType(resource.type);
  };

  const removeResource = () => {
    setResource(null)
    setResourceType(null)
    setResourceUrl(null)
    document.getElementById("resource-input").value = "";
  }

  const uploadResource = () => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (rType === 'application/pdf') {
        setResourceUrl(event.target.result);
      } else if (rType === 'text/plain') {
        setResourceUrl(event.target.result);
      } 
    };
    if(rType !== 'text/plain')
      reader.readAsDataURL(r)
    else reader.readAsText(r)
  }

  // State variable and function for tracking publication status
  const [published, setPublished] = React.useState(false)

  // Event handler for toggling publication status and updating assignment data
  const handlePublication = () =>{
    if(!published){
      let desc = document.getElementById("AssignmentDescription").value;
      assestment.description = desc;
      let due = document.getElementById("AssignmentDue").value
      assestment.due = due;
      let name = document.getElementById("AssignmentName").value
      assestment.name = name;
    }
    setPublished(!published)
  }

  return (
    <React.Fragment>
      {/* Conditional rendering based on isLoading */}
      {!isLoading && (
        <>
          <Box sx={{ display: 'flex'}}>
            <CssBaseline />

            {/* Conditional rendering based on isLoading */}
            <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>

            <Box component="main" sx={{ flexGrow: 1, p: 1}}>
            <DrawerHeader />

            <List>

                {/* Display course code and section */}
                <ListItem>
                    <Typography variant = "h4" >
                    {courseData.courseCode} : Section - 001
                    </Typography>
                </ListItem>

                <Divider/>

                {/* Assestment name */}
                <ListItem>
                  {/* Conditionally render based on publication status */}
                  {published?
                  <Typography variant = "h3" >
                    {assestment.name}
                  </Typography>
                    :
                  <>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Assestment name"
                    id="AssignmentName"
                    type="name"
                    fullWidth
                    variant="standard"
                    defaultValue={assestment.name}
                  />
                  </>
                  }
                </ListItem>

                {/* Due date */}
                <ListItem>
                  {/* Conditionally render due date */}
                  {published?
                  <Typography variant = "h7" >
                    Due date: {assestment.due}
                  </Typography>
                  :
                  <>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Due date"
                    id="AssignmentDue"
                    type="name"
                    fullWidth
                    variant="standard"
                    defaultValue={assestment.due}
                  />
                  </>
                  }
                </ListItem>

                {/* Description */}
                <ListItem>
                  {/* Conditionally render description */}
                  {published?
                  <Typography variant = "h6" >
                    {assestment.description}
                  </Typography>
                  :
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Description"
                    id="AssignmentDescription"
                    type="name"
                    fullWidth
                    variant="standard"
                    defaultValue={assestment.description}
                  />
                  }
                </ListItem>
                  
                {/* Uploaded Files or Image URLs */}
                <ListItem>
                  {imageUrl && <img src={imageUrl} alt="uploaded file"/>}
                  {fType === 'application/pdf' && fileUrl && (
                    <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
                  )}
                  {fType === 'text/plain' && fileUrl && (
                    <pre>{fileUrl}</pre>
                  )}
                </ListItem>
                  
                {/* Link to Resource */} 
                <ListItem>
                  {imageUrl && <Link to={"/Resource/" + imageUrl} target="_blank">{f.name}</Link>}
                </ListItem>
                  
                {/* File Upload section */}
                {!published &&
                <ListItem>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Input
                      id="file-input"
                      type="file"
                      onChange={handleFileSelect}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-input">
                      <Button variant="contained" component="span">
                        Upload Assestment
                      </Button>
                    </label>

                    {f && <p>{f.name}</p>}
                    {f && (
                      <Button onClick={uploadFile}>
                        Confirm
                      </Button>
                    )}
                    {f && (
                      <IconButton onClick={removeF}>
                        <DeleteIcon/>
                      </IconButton>
                    )}
                  </Stack> 
                </ListItem>
                }
                  
                {/* File Upload format information */}
                {!published &&
                <ListItem>
                  <Typography>The following upload must be in the format of .png, .pdf, .jpg, or .txt</Typography>
                </ListItem>
                }

                {/* Publication Buttons */}
                <ListItem>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button onClick={handlePublication} disabled={published}>
                    Publish
                  </Button>
                  <Button onClick={handlePublication} disabled={!published}>
                    Unpublish
                  </Button>
                </Stack>
                </ListItem>   

              </List>

            </Box>
          </Box>

            
        </>
      )}
      
    </React.Fragment>
  );
}