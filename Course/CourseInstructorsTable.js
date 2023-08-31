// Import all dependencies (modules, components, functions) from different libraries
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Component } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Define a styled component for the label cells in the table
const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

// Define the CourseInstructorTable component
export class CourseInstructorTable extends Component {

  // Define a function to get the table header for a given category
  getTableHeader = (category) => {
    
    let headerName;
    let exists = false;
    switch(category){
      case 'Lectures':
        headerName = category;
        if(this.props.lectures.length > 0){exists = true}
        break;
      case 'Tutorials':
        headerName = category;
        if(this.props.tutorials.length > 0){exists = true}
        break;
      case 'Labs':
        headerName = category;
        if(this.props.labs.length > 0){exists = true}
        break;
    }

    // If the category exists, return the table header with the header name
    if(exists){
      return(
        <TableHead>
            <TableRow >
                <LabelCells>{headerName}</LabelCells>
                
            </TableRow>
        </TableHead>
      )
    }else return(<></>)
  } 

  // Define the render function for the component
  render(){

  // Return the JSX for rendering the component
  return (
      
         <Table sx={{border:1, margin: 2 }}>

            {/* Render the table header for lectures */}
            {this.getTableHeader("Lectures")}

            {/* Render the table body for lectures */}
            <TableBody> 
            {this.props.lectures.map((item, index) => {
                {
                return (
                    <TableRow>
                      {/* Render the section and instructor name for each lecture */}
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>

            {/* Render the table header for tutorials */}
            {this.getTableHeader("Tutorials")}

            {/* Render the table body for tutorials */}
            <TableBody> 
            {this.props.tutorials.map((item, index) => {
                {
                return (
                    <TableRow>
                      {/* Render the section and instructor name for each tutorial */}
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>

            {/* Render the table header for labs */}
            {this.getTableHeader("Labs")}

            {/* Render the table body for labs */}
            <TableBody> 
            {this.props.labs.map((item, index) => {
                {
                return (
                    <TableRow>
                      {/* Render the section and instructor name for each lab */}
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>
                
        </Table>    
  );
}
 } export default CourseInstructorTable
