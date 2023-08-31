
//Import all dependenceis (modules, components, functions) from different libraries
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import React from 'react'
import { List, ListItem } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


export default function CourseAssignments( {match} ) {
  // Destructuring assignment to extract the 'url' parameter from match object
  const {
    params: {url}
  } = match;

  // Log the value of 'url' to the console
  console.log(url)


  return (
    <React.Fragment>
        <>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />


            <Box component="main" sx={{ flexGrow: 1, p: 1}}>

              <List>
                   
                {/* List item for rendering uploaded content */}
                <ListItem>
                  {/* Conditionally render based on 'url' presence */}
                  {url && <img src={url} alt="uploaded file"/>}
                  {url && (
                    <embed src={url} type="application/pdf" width="100%" height="600px" />
                  )}
                  {url && (
                    <pre>{url}</pre>
                  )}
                </ListItem>
                
            </List>
            
            </Box>
          </Box>

            
        </>
      
      
    </React.Fragment>
  );
}