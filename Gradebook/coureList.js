// Import necessary dependencies (modules, components, functions) from different libraries
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Component } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  Link
} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

// Style the TableCell components for table headers
const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

// Define a class-based component named CourseList
export class CourseList extends Component {

  render(){


  return (

      // Render a Table component
      <Table sx={{border:1, margin: 2, width: '60%' }}>
          <TableHead>
              <TableRow >
                  <LabelCells>Courses</LabelCells>
                  <LabelCells>Main Prof</LabelCells>
                  <LabelCells>Name</LabelCells>
                  <LabelCells>Term</LabelCells>
                  <LabelCells>Sections</LabelCells>
                  <LabelCells>Tutorials</LabelCells>
                  <LabelCells>Labs</LabelCells>
              </TableRow>
          </TableHead>


          <TableBody> 
          {/* Map over the 'grades' array provided as a prop */}
          {this.props.grades.map((item, index) => {
              {
              return (
                  <TableRow>
                    {/* Render cells for each item's data */}
                    <TableCell sx={{border:1, borderColor: 'black'}} >
                      {/* Use a Button component as a link to a specific route */}
                      <Button component={Link} to= {`/Courses/${item.courseCode.replace(/\s/g, "")}`}>{item.courseCode}</Button>
                    </TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.prof}</TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.courseName}</TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.term}</TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.sections.length}</TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.tutorials.length}</TableCell>
                    <TableCell sx={{border:1, borderColor: 'black'}} >{item.labs.length}</TableCell>
                  </TableRow>
              
          )}  
          })}
          </TableBody>
              
      </Table>
    );
  }
} 
// Export the CourseList component as the default export
export default CourseList
