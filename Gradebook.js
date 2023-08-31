import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import Button from '@mui/material/Button';

import { Grid, Tab, TableBody, TableCell, TableRow } from '@mui/material';

import GradebookTable from './GradebookTable';
import NavbarHome from '../NavBars/NavbarHome';
import {Courses} from '../Entities/courses'
import TextField from '@mui/material/TextField';
import {Course} from "../Entities/courses";
import { SkipNext } from '@mui/icons-material';
import { useEffect } from 'react';
import NavbarNewFinal from '../NavBars/NavBarNewFinal';
import {
  getRequiredCourses
} from "./GradeBookEventSystem";



const drawerWidth = 240;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Gradebook() {

  const [averages, setAverages] = React.useState([0]);
  const [totalAverage, setTotalAvg] = React.useState(0);
  const [courseData, setCourseData] = React.useState()

  useEffect(() => {
    getRequiredCourses().then((data) => {
      setCourseData(data);
    });
  })

    const courses = new Courses(courseData)
    let JSON_INFO = courses.getCourseList();
  
  
  const tests = () => {
      var collapse = document.getElementsByClassName("row1");

      console.log(collapse);
  }

  const callbackHandlerFunction = (val) => {
    setAverages(averages.push(val));

    let avgs = []
    for(let a in averages){
      if(a != 0){
        if(!avgs.includes(averages[a])){
          avgs.push(averages[a]);
        }
      }
    }


    let totalVal = 0
    let count = 0
    for(let a in avgs){
      totalVal += parseFloat(avgs[a])
      count++
    }

    setTotalAvg((totalVal/count).toFixed(2))


}
  


  return (

    <Box sx={{ display: 'flex'}}>
      <CssBaseline />

      <NavbarNewFinal/>      
      
      <Grid container xs={12} sx={{height:'100%'}}>
      <Grid item xs={8}>
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
      <DrawerHeader />
      
     
     
        <List>
      
        <ListItem>
        </ListItem>
      <ListItem>
          <Typography variant = "h4" >
        Gradebook
          </Typography>
      </ListItem>
      <Divider/>
      <ListItem >
          <Typography variant = "h3" >
         View Your Grades:
          </Typography>
          
          <Typography variant = "h3">
            {totalAverage}%
          </Typography>
      </ListItem>

      
        {JSON_INFO.map((rows,i)=>(
          <ListItem key={i}>
            <GradebookTable courseName={JSON_INFO[i].courseCode} grades={JSON_INFO[i].sections[0]} handleAvgInParent={callbackHandlerFunction} />
          </ListItem>
        ))}

      </List>

      


      </Box>
      </Grid>


    
      
      <Grid item xs={4}>
      <DrawerHeader />


      <Box sx={{  height: '100vh', borderLeft: 0.05, borderColor: 'primary.main', p:1}} >




        <List >
          
          <ListItem>
            <Box sx={{height: '1vh'}}/>
          </ListItem>

          <ListItem>
            <Typography variant = "h4" >
              Course gradebook
            </Typography>
          </ListItem>
          

          <Divider/>

          <ListItem >
            <Typography variant = "h7" >
              View a specific courses gradebook
            </Typography>
          </ListItem>


          

          {JSON_INFO.map((rows,i)=>(
            <ListItem key={i} >
            <Button component={Link} to= {`/Courses/${JSON_INFO[i].courseCode.replace(/\s/g, "")}`} variant="contained" sx={{width: '100%'}}>{JSON_INFO[i].courseCode}</Button>
            {tests}          
            </ListItem>
            
          ))}          

          
        </List>
      </Box>
      </Grid>

      </Grid>
    </Box>
  );
} 