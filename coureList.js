import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { Class, Grade } from '@mui/icons-material';
import { Component } from 'react';
import { Accordion, AccordionSummary, Grid, Table, TableBody, TableHead } from '@mui/material';
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

export class CourseList extends Component {

  

  render(){


  return (

    
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
            {this.props.grades.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} ><Button component={Link} to= {`/Courses/${item.courseCode.replace(/\s/g, "")}`}>{item.courseCode}</Button></TableCell>
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
 } export default CourseList
