//Import all dependenceis (modules, components, functions) from different libraries
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Component } from 'react';
import { Table, TableBody, TableHead } from '@mui/material';
import {
  Link
} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Input from '@mui/material/Input';

const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

export class CourseAssestmentTable extends Component {

  // Constructor
  constructor(props) {
    super(props);

    // Invoking the parent's function with total weight
    this.props.handleWeightInParent(this.totalWeight());
  }

  // Calculate total weight of selected course items
  totalWeight = () => {
    let weight = 0;

    // Summing weights based on selected criteria
    if (this.props.wanted === "all" || this.props.wanted === "a")
      weight += this.calcWeight('assignments') * 100;
    if (this.props.wanted === "all" || this.props.wanted === "e")
      weight += this.calcWeight('quizzes') * 100;
    if (this.props.wanted === "all" || this.props.wanted === "l")
      weight += this.calcWeight('labs') * 100;
    if (this.props.wanted === "all" || this.props.wanted === "e")
      weight += this.calcWeight('exams') * 100;

    return weight;
  }

  // Calculate weight for a specific course item category
  calcWeight = (courseItem) => {
    let val = 0;

    // Summing weights for each item in the given category
    switch (courseItem) {
      case 'assignments':
        for (let a in this.props.grades.assignments) {
          val += this.props.grades.assignments[a].weight;
        }
        break;
      case 'quizzes':
        for (let q in this.props.grades.quizzes) {
          val += this.props.grades.quizzes[q].weight;
        }
        break;
      case 'labs':
        for (let l in this.props.grades.labs) {
          val += this.props.grades.labs[l].weight;
        }
        break;
      case 'exams':
        for (let e in this.props.grades.exams) {
          val += this.props.grades.exams[e].weight;
        }
        break;
    }

    return val.toFixed(2);
  }

  // Hide or show specific table rows
  hideRow = (rowNum) => {
    var collapse;
    switch (rowNum) {
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

    for (var i = 0; i < collapse.length; i++) {
      collapse[i].classList.toggle("hide-me");
    }
  }

  // Create a table header for a specific category
  createTableHeader = (category) => {
    let headerName;
    let rowNum;
    switch (category) {
      case 'Assignments':
        headerName = "Assignments";
        rowNum = 1;
        break;
      case 'Quizzes':
        headerName = "Quizzes";
        rowNum = 2;
        break;
      case 'Labs':
        headerName = "Labs";
        rowNum = 3;
        break;
      case 'Exams':
        headerName = "Exams";
        rowNum = 4;
        break;
    }

    for (let c in this.props.grades) {
      {
        return (
          // Creating a header row with label and checkbox
          <TableRow>
            <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>
              <label for="accounting" onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>{headerName}</label>
              <Input type="checkbox" name="accounting" id="accounting" data-toggle="toggle"/>
            </TableCell>
            <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>
              <label for="accounting" onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}>{this.calcWeight(category) * 100}%</label>
              <Input type="checkbox" name="accounting" id="accounting" data-toggle="toggle"/>
            </TableCell>
            <TableCell sx={{border:1, borderColor: 'black'}} onClick={() => this.hideRow(rowNum)} style={{cursor: 'pointer'}}/>
          </TableRow>
        )
      }
    }
  }

  // Create rows for a specific type of assessment
  createAssestment = (type) => {
    console.log(this.props.wanted);

    let aType;
    switch (type) {
      case 'Assignments':
        if (this.props.wanted === "all" || this.props.wanted === "a")
          aType = this.props.grades.assignments;
        break;
      case 'Quizzes':
        if (this.props.wanted === "all" || this.props.wanted === "e")
          aType = this.props.grades.quizzes;
        break;
      case 'Labs':
        if (this.props.wanted === "all" || this.props.wanted === "l")
          aType = this.props.grades.labs;
        break;
      case 'Exams':
        if (this.props.wanted === "all" || this.props.wanted === "e")
          aType = this.props.grades.exams;
        break;
    }

    if (aType === undefined) return <></>;
    else {
      return (
        <>
          <TableBody class="labels">
            {this.createTableHeader(type)}
          </TableBody>

          <TableBody className="row1">
            {aType.map((item, index) => {
              return (
                <TableRow>
                  <TableCell sx={{border:1, borderColor: 'black'}}>
                    <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/${type}/${this.props.courseCode}`}>{item.name}</Button>
                  </TableCell>
                  <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight * 100}%</TableCell>
                  <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </>
      )
    }
  }

  // Render method
  render() {
    return (
      <Table sx={{border:1, margin: 2 }}>
        <TableHead>
          <TableRow>
            <LabelCells>Grade Items</LabelCells>
            <LabelCells>Weight</LabelCells>
            <LabelCells>Due Date</LabelCells>
          </TableRow>
        </TableHead>

        {/* Creating rows for different assessment types */}
        {this.createAssestment("Assignments")}
        {this.createAssestment("Quizzes")}
        {this.createAssestment("Labs")}
        {this.createAssestment("Exams")}

        <TableBody class="labels">
          <TableRow>
            <TableCell sx={{border:1, borderColor: 'black'}}>
              <label for="management">Total</label>
              <Input type="checkbox" name="management" id="management" data-toggle="toggle"/>
            </TableCell>
            <TableCell sx={{border:1, borderColor: 'black'}}>
              <label for="management">{this.totalWeight()}%</label>
              <Input type="checkbox" name="management" id="management" data-toggle="toggle"/>
            </TableCell>
            <TableCell sx={{border:1, borderColor: 'black'}}/>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default CourseAssestmentTable;

