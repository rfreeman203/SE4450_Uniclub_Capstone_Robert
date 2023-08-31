import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

import { Component } from 'react';
import { Accordion, AccordionSummary, Table, TableBody, TableHead } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Input from '@mui/material/Input';

const drawerWidth = 240;

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .025)',
}));

const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

export class GradebookTable extends Component {

  constructor(props) {
    super(props);
    this.props.handleAvgInParent(this.totalAvg())
} 
  

  calcAvg = (courseItem) => {

    let val = 0
    let count = 0

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
    
    return (val / count).toFixed(2)
  }

  

  totalWeight = () => {
    let weight = 0;

    weight += this.calcWeight('assignments')*100
    weight += this.calcWeight('quizzes')*100
    weight += this.calcWeight('labs')*100
    weight += this.calcWeight('exams')*100

    return weight
  }

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
  
  calcWeight = (courseItem) => {

    let val = 0

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
   
    return val.toFixed(2)
  }


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

  for (var i = 0; i < collapse.length; i++) {
    collapse[i].classList.toggle("hide-me");
  }
}

createTableHeader = (category) => {

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

  changeGradeItem = () => {
    return 0
  }

  render(){


  return (
    
    <Accordion sx={{width: '100%', border: 0.05, borderColor: 'primary.main'}}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
         sx={{bgcolor: '#bbdefb', borderBottom: 0}}
      >
      <Typography variant = "h6">
        {this.props.courseName} : {this.totalAvg()}%
      </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{mt: 0}}>
      <Table sx={{border:1, margin: 2 }}>
      <TableHead>
      <TableRow >
        <LabelCells>Grade Items</LabelCells>
        <LabelCells>Grade</LabelCells>
        <LabelCells>Weight</LabelCells>
        <LabelCells>Due Date</LabelCells>
        <LabelCells>Submitted Date</LabelCells>
      </TableRow>
      
      </TableHead>

{/* Assignments header */}

      <TableBody class="labels">
        {this.createTableHeader('assignments')}
      </TableBody>

  {/* Assignments body */}

      <TableBody className="row1">
      {this.props.grades.assignments.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >
                        <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Assignments/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                      </TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.submitted}</TableCell>
                    </TableRow>
				        
            )} 
            })}
      </TableBody>
  
	  {/* Quiizes header */}

    <TableBody class="labels">
        {this.createTableHeader('quizzes')}
      </TableBody>

      {/* Quizzes body */}

      <TableBody className="row2" >
      {this.props.grades.quizzes.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}}>
                        <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Examinations/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                      </TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.submitted}</TableCell>
                    </TableRow>
				        
            )} })}
      </TableBody>

      {/* Labs header */}
		
      <TableBody class="labels">
        {this.createTableHeader('labs')}
      </TableBody>

      {/* Labs body */}

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

      {/* Exam header */}
		
      <TableBody class="labels">
        {this.createTableHeader('exams')}
      </TableBody>


      {/* Exam body */}

      <TableBody className="row4">
      {this.props.grades.exams.map((item, index) => {
                {return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}}>
                        <Button component={Link} to={`/${item.name.replace(/\s+/g, '')}/Examinations/${this.props.courseName.replace(/\s/g, "")}`}>{item.name}</Button>
                      </TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.grade}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.weight*100}%</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.due}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}}>{item.submitted}</TableCell>
                    </TableRow>
				        
            )} })}
      </TableBody>

      
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

        <TableCell sx={{border:1, borderColor: 'black'}}/>
        <TableCell sx={{border:1, borderColor: 'black'}}/>

            
        </TableRow>
      </TableBody>
      		
</Table>


      </AccordionDetails>
    </Accordion>
    
    
  );
}
 } export default GradebookTable
