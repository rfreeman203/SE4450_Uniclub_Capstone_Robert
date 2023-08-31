//Import all dependenceis (modules, components, functions) from different libraries
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Component } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import {
  Link
} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

//Styling table cells
const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

export class CourseAssestmentTable extends Component {

  // Constructor of a class-based component, called when the component is initialized
constructor(props){
  super(props);
  
  // Call a function from parent component and pass the total weight value
  this.props.handleWeightInParent(this.totalWeight())
}

// Calculate the total weight based on the given criteria
totalWeight = () => {
  let weight = 0;

  // Check if the 'wanted' prop is set to 'all', 'a', 'e', or 'l' and calculate accordingly
  if(this.props.wanted == "all" || this.props.wanted == "a")
    weight += this.calcWeight('assignments') * 100
  if(this.props.wanted == "all" || this.props.wanted == "e")
    weight += this.calcWeight('quizzes') * 100
  if(this.props.wanted == "all" || this.props.wanted == "l")
    weight += this.calcWeight('labs') * 100
  if(this.props.wanted == "all" || this.props.wanted == "e")
    weight += this.calcWeight('exams') * 100

  return weight;
}

// Calculate the weight of a specific course item (assignments, quizzes, labs, exams)
calcWeight = (courseItem) => {
  let val = 0;

  // Based on the given course item, iterate through the corresponding grades and calculate total weight
  switch(courseItem){
    case 'assignments':
      for(let a in this.props.grades.assignments){
        val += this.props.grades.assignments[a].weight;
      }
      break;
    case 'quizzes':
      for(let q in this.props.grades.quizzes){
        val += this.props.grades.quizzes[q].weight;
      }
      break;
    case 'labs':
      for(let l in this.props.grades.labs){
        val += this.props.grades.labs[l].weight;
      }
      break;
    case 'exams':
      for(let e in this.props.grades.exams){
        val += this.props.grades.exams[e].weight;
      }
      break;
  }
   
  return val.toFixed(2); // Return the total weight rounded to 2 decimal places
}

// Function to toggle visibility of rows based on the provided 'rowNum'
hideRow = (rowNum) => {
  var collapse;

  // Determine which elements to collapse based on the 'rowNum' parameter
  switch(rowNum){
    case 1:
      collapse = document.getElementsByClassName("row1");
      break;
    case 2:
      collapse = document.getElementsByClassName("row2");
      break;
    case 3:
      collapse = document.getElementsByClassName("row3");
      break;
    case 4:
      collapse = document.getElementsByClassName("row4");
      break;
  }

  // Toggle the 'hide-me' class on the selected elements to show/hide them
  for (var i = 0; i < collapse.length; i++) {
    collapse[i].classList.toggle("hide-me");
  }
}

// Placeholder function that seems to return 0
changeGradeItem = () => {
  return 0;
}

// Function to create a table body for a specific type of assessment (assignments, quizzes, labs, exams)
createAssestment = (type) => {
  console.log(this.props.wanted);
  
  let aType;

  // Determine the specific type of assessment and conditionally set 'aType' based on 'wanted' prop
  switch(type){
    case 'Assignments':
      if(this.props.wanted == "all" || this.props.wanted == "a")
        aType = this.props.grades.assignments;
      break;
    case 'Quizzes':
      if(this.props.wanted == "all" || this.props.wanted == "e")
        aType = this.props.grades.quizzes;
      type = "Examinations"; // Update the type if it's quizzes (changed to examinations)
      break;
    case 'Labs':
      if(this.props.wanted == "all" || this.props.wanted == "l")
        aType = this.props.grades.labs;
      break;
    case 'Exams':
      if(this.props.wanted == "all" || this.props.wanted == "e")
        aType = this.props.grades.exams;
      type = "Examinations"; // Update the type if it's exams (changed to examinations)
      break;
  }

  // If 'aType' is not defined, return an empty fragment
  if(aType == undefined) return <></>;
  else {
    // If 'aType' is defined, create and return the table body
    return (
      <>
        <TableBody className="row1">
        {aType.map((item, index) => {
          {
            return (
              <TableRow>
                <TableCell sx={{border:1, borderColor: 'black'}}>
                  <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/${type}/${this.props.courseCode}`}>{item.name}</Button>
                </TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
              </TableRow>
            )} 
        })}
        </TableBody>
      </>
    );
  }
}

  render(){


  return (
    
    
    <Table sx={{border:1, margin: 2 }}>
    <TableHead>
      <TableRow >
        <LabelCells>Grade Items</LabelCells>
        <LabelCells>Weight</LabelCells>
        <LabelCells>Due Date</LabelCells>
      </TableRow>
    </TableHead>
  
    {/* Create table bodies for different assessment types */}
    {this.createAssestment("Assignments")} {/* Table body for assignments */}
    {this.createAssestment("Quizzes")}     {/* Table body for quizzes */}
    {this.createAssestment("Labs")}        {/* Table body for labs */}
    {this.createAssestment("Exams")}       {/* Table body for exams */}
            
  </Table>
  
    
    
  );
}
 } export default CourseAssestmentTable
