// Import all dependencies (modules, components, functions) from different libraries
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Component } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  Link
} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Input from '@mui/material/Input';

// Define a constant for the width of the drawer
const drawerWidth = 240;

// Define a styled component for the details of an accordion
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .025)',
}));

// Define a styled component for the label cells in the table
const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

// Define the GradebookTable component
export class GradebookTable extends Component {

  // Define the constructor for the component
  constructor(props) {
    super(props);
    // Call the handleAvgInParent function with the total average as an argument
    this.props.handleAvgInParent(this.totalAvg())
} 
  

  // Define a function to calculate the average for a given course item (assignments, quizzes, labs, or exams)
  calcAvg = (courseItem) => {

    let val = 0
    let count = 0

    // Calculate the sum and count of grades for the given course item
    switch(courseItem){
      case 'assignments':
        for(let a in this.props.grades.assignments){
          val += this.props.grades.assignments[a].grade
          count++
        }
        break;
      case 'quizzes':
        for(let q in this.props.grades.quizzes){
          val += this.props.grades.quizzes[q].grade
          count++
        }
        break;
      case 'labs':
        for(let l in this.props.grades.labs){
          val += this.props.grades.labs[l].grade
          count++
        }
        break;
      case 'exams':
        for(let e in this.props.grades.exams){
          val += this.props.grades.exams[e].grade
          count++
        }
        break;
    }
    
    // Return the average of grades for the given course item (rounded to two decimal places)
    return (val / count).toFixed(2)
  }

  

  // Define a function to calculate the total weight of all course items
  totalWeight = () => {
    let weight = 0;

    weight += this.calcWeight('assignments')*100
    weight += this.calcWeight('quizzes')*100
    weight += this.calcWeight('labs')*100
    weight += this.calcWeight('exams')*100

    return weight
  }

  // Define a function to calculate the total average of all course items
  totalAvg = () => {
    let val = 0;

    if(!(isNaN(this.calcAvg('assignments')))){
      val += this.calcWeight('assignments')*this.calcAvg('assignments')
    }
    if(!(isNaN(this.calcAvg('quizzes')))){
      val += this.calcWeight('quizzes')*this.calcAvg('quizzes')
    }
    if(!(isNaN(this.calcAvg('labs')))){
      val += this.calcWeight('labs')*this.calcAvg('labs')
    }
    if(!(isNaN(this.calcAvg('exams')))){
      val += this.calcWeight('exams')*this.calcAvg('exams')
    }


    //this.props.handleTotalAvg(val.toFixed(2));

    return val.toFixed(2);
  }

// Define a function to calculate the weight for a given course item (assignments, quizzes, labs, or exams)
calcWeight = (courseItem) => {

  let val = 0

  // Calculate the sum of weights for the given course item
  switch(courseItem){
    case 'assignments':
      for(let a in this.props.grades.assignments){
        val += this.props.grades.assignments[a].weight
      }
      break;
    case 'quizzes':
      for(let q in this.props.grades.quizzes){
        val += this.props.grades.quizzes[q].weight
      }
      break;
    case 'labs':
      for(let l in this.props.grades.labs){
        val += this.props.grades.labs[l].weight
      }
      break;
    case 'exams':
      for(let e in this.props.grades.exams){
        val += this.props.grades.exams[e].weight
      }
      break;
  }

  // Return the sum of weights for the given course item (rounded to two decimal places)
  return val.toFixed(2)
}


// Define a function to hide a row in the table
hideRow = (rowNum) => {
  var collapse;
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

  // Toggle the "hide-me" class on all elements with the given class name
  for (var i = 0; i < collapse.length; i++) {
    collapse[i].classList.toggle("hide-me");
  }
}

// Define a function to create a table header for a given category (assignments, quizzes, labs, or exams)
createTableHeader = (category) => {

  // Return nothing if the average for the given category is not a number
  if(isNaN(this.calcAvg(category))){
    return ;
  }

  let headerName;
  let rowNum;
  switch(category){
    case 'assignments':
      headerName = "Assignments";
      rowNum = 1;
      break;
    case 'quizzes':
      headerName = "Quizzes";
      rowNum = 2;
      break;
    case 'labs':
      headerName = "Labs";
      rowNum = 3;
      break;
    case 'exams':
      headerName = "Exams";
      rowNum = 4;
      break;
  }

  // Return JSX that renders a table row with cells for the category name, average, and weight
  for(let c in this.props.grades){

    {
      return(
        <TableRow >
        <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>
          <label for="accounting" onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>{headerName}</label>
          <Input type="checkbox" name="accounting" id="accounting" data-toggle="toggle"/>
        </TableCell>
        <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>
          <label for="accounting" onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>{this.calcAvg(category)}</label>
          <Input type="checkbox" name="accounting" id="accounting" data-toggle="toggle"/>
        </TableCell>
        <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>
          <label for="accounting" onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>{this.calcWeight(category)*100}%</label>
          <Input type="checkbox" name="accounting" id="accounting" data-toggle="toggle"/>
        </TableCell>

        <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}/>
        <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}/>

            
        </TableRow>
      )
    }
  }
}

// Define a function to change a grade item
changeGradeItem = () => {
  return 0
}

// Define the render function for the component
render(){

  // Return the JSX for rendering the component
  return (
    
    // Render a table with a margin of 2
    <Table sx={{border:1, margin: 2 }}>
      {/* Render the table head */}
      <TableHead>
        {/* Render a row with cells for the grade item, grade, weight, due date, and submitted date */}
        <TableRow >
          <LabelCells>Grade Items</LabelCells>
          <LabelCells>Grade</LabelCells>
          <LabelCells>Weight</LabelCells>
          <LabelCells>Due Date</LabelCells>
          <LabelCells>Submitted Date</LabelCells>
        </TableRow>
      </TableHead>

      {/* Render the assignments header */}
      <TableBody class="labels">
        {this.createTableHeader('assignments')}
      </TableBody>

      {/* Render the assignments body */}
      <TableBody className="row1">
        {/* Map over the assignments and render a row for each assignment with cells for the name, grade, weight, due date, and submitted date */}
        {this.props.grades.assignments.map((item, index) => {
          {
            return (
              <TableRow>
                {/* Render a button that links to the assignment page */}
                <TableCell sx={{border:1, borderColor: 'black'}} >
                  <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Assignments/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                </TableCell>
                {/* Render the grade, weight, due date, and submitted date for the assignment */}
                <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
              </TableRow>  
            )} 
        })}
      </TableBody>

      {/* Render the quizzes header */}
      <TableBody class="labels">
        {this.createTableHeader('quizzes')}
      </TableBody>

      {/* Render the quizzes body */}
      <TableBody className="row2" >
        {/* Map over the quizzes and render a row for each quiz with cells for the name, grade, weight, due date, and submitted date */}
        {this.props.grades.quizzes.map((item, index) => {
          {
            return (
              <TableRow>
                {/* Render a button that links to the quiz page */}
                <TableCell sx={{border:1, borderColor: 'black'}}>
                  <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Examinations/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                </TableCell>
                {/* Render the grade, weight, due date, and submitted date for the quiz */}
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.grade}%</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
                <TableCell sx={{border:1, borderColor: 'black'}}>{item.submitted}</TableCell>
              </TableRow>  
            )} 
        })}
      </TableBody>

      {/* Render the labs header */}
      <TableBody class="labels">
        {this.createTableHeader('labs')}
      </TableBody>

      {/* Render the labs body */}
      <TableBody className="row3">
      {this.props.grades.labs.map((item, index) => {
                {
                  return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}}>
                        <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Labs/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                      </TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.submitted}</TableCell>
                    </TableRow>
				        
            )} })}
      </TableBody>

      {/* Render the exams header */}
      <TableBody class="labels">
        {this.createTableHeader('exams')}
      </TableBody>

      {/* Render the exams body */}
      <TableBody className="row4">
        {/* Map over the exams and render a row for each exam with cells for the name, grade, weight, due date, and submitted date */}
        {this.props.grades.exams.map((item, index) => {
          {return (
            <TableRow>
              {/* Render a button that links to the exam page */}
              <TableCell sx={{border:1, borderColor: 'black'}}>
                <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Examinations/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
              </TableCell>
              {/* Render the grade, weight, due date, and submitted date for the exam */}
              <TableCell sx={{border:1, borderColor: 'black'}}>{item.grade}%</TableCell>
              <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
              <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
              <TableCell sx={{border:1, borderColor: 'black'}}>{item.submitted}</TableCell>
            </TableRow>  
          )} 
        })}
      </TableBody>

      {/* Render a row with cells for the total grade item name ("Total"), total average (as a percentage), total weight (as a percentage), and empty cells for due date and submitted date */}
      <TableBody class="labels">
        <TableRow>
        <TableCell sx={{border:1, borderColor: 'black'}}>
          <label for="management">Total</label>
					<Input type="checkbox" name="management" id="management" data-toggle="toggle"/>
        </TableCell>
        <TableCell sx={{border:1, borderColor: 'black'}}>
          <label for="management">{this.totalAvg()}%</label>
					<Input type="checkbox" name="management" id="management" data-toggle="toggle"/>
        </TableCell>
        <TableCell sx={{border:1, borderColor: 'black'}}>
          <label for="management">{this.totalWeight()}%</label>
					<Input type="checkbox" name="management" id="management" data-toggle="toggle"/>
        </TableCell>

        {/* Render empty cells for due date and submitted date */}
        <TableCell sx={{border:1, borderColor: 'black'}}/>
        <TableCell sx={{border:1, borderColor: 'black'}}/>

            
        </TableRow>
      </TableBody>
      		
</Table>
    
    
  );
}
// Export the GradebookTable component as default
 } export default GradebookTable
