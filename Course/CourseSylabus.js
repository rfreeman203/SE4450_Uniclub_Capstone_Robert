// Import all dependencies (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react'
import { List, ListItem, Stack, Typography, IconButton } from '@mui/material';
import {
  getRequiredCourse
} from "./CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';

// Define a styled component for the header of the drawer
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Define the CourseSylabus component
export default function CourseSylabus( {match} ) {
  // Destructure the courseID from the match object
  const {
    params: {courseID}
  } = match;

  // Log the match object and courseID to the console for debugging purposes
  console.log(match)
  console.log(courseID)

  // Define state variables for course data and loading status
  const [courseData, setCourseData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true);

  // Use the useEffect hook to fetch the required course data when the component mounts
  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false)
    });
  },[courseID])

  // Define state variables for file information
  const [f, setFile] = React.useState(null)
  const [fType, setFileType] = React.useState(null)
  const [fileUrl, setFileUrl] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState()

 
  // Define a function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file)
    setFileType(file.type);
  };

  // Define a function to remove the selected file
  const removeF = () => {
    setFile(null)
    setFileType(null)
    setImageUrl(null)
    setFileUrl(null)
    document.getElementById("file-input").value = "";
  }

  // Define a function to upload the selected file
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

  // Define a state variable for publication status
  const [published, setPublished] = React.useState(false)

  // Define a function to handle publication status changes
  const handlePublication = () =>{
    setPublished(!published)
  }

// Return the JSX for rendering the component
return (
  <React.Fragment>

    {/* Only render the content if the data is not loading */}
    {!isLoading && (
      <>
        <Box sx={{ display: 'flex'}}>
        <CssBaseline />

        {/* Render the navbar */}
        <NavbarNewFinalCourses courseData={courseData} activePages={courseData.activePages}/>

          {/* Render the main content */}
          <Box component="main" sx={{ flexGrow: 1, p: 1}}>
            <DrawerHeader />

            {/* Render a list of information about the course */}
            <List>

              {/* Render the course code and section */}
              <ListItem>
                  <Typography variant = "h4" >
                {courseData.courseCode} : Section - 001
                  </Typography>
              </ListItem>

              {/* Render a divider */}
              <Divider/>

              {/* Render the syllabus heading */}
              <ListItem >
                  <Typography variant = "h3" >
                Sylabus
                  </Typography>
              </ListItem>

              {/* Render a file upload input and buttons for uploading, confirming, and removing files */}
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
                      Upload
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

              {/* Render a message about allowed file formats */}
              <ListItem>
                <Typography>The following upload must be in the format of .png, .pdf, .jpg, or .txt</Typography>
              </ListItem>

              {/* Render buttons for publishing and unpublishing the syllabus */}
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

              {/* Render the uploaded file if it exists */}
              <ListItem>
                {imageUrl && <img src={imageUrl} alt="uploaded file"/>}
                {fType === 'application/pdf' && fileUrl && (
                  <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
                )}
                {fType === 'text/plain' && fileUrl && (
                  <pre>{fileUrl}</pre>
                )}
              </ListItem>  
          </List>  
          </Box>
        </Box>    
      </>
    )}  
  </React.Fragment>
);

}