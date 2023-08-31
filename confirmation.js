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
import { Accordion, AccordionDetails, Dialog, DialogContent, DialogTitle, DialogActions, Autocomplete, Stack, AccordionSummary, Grid, Tab, TableBody, TableCell, TableRow, BottomNavigation, AppBar, Tabs } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Input from '@mui/material/Input';
import { render } from '@testing-library/react';

const drawerWidth = 240;


export class Confirmation extends Component {

constructor(props){
    super(props);
}

render(){

  return (

    <Dialog open={this.props.addConfirmationOpen} onClose={this.props.handleCancel}>
    <DialogContent>
      <Typography>Are you sure you want to do this?</Typography>
    </DialogContent>
    <DialogActions>
      <Button color='secondary' onClick={this.props.handleCancel}>Cancel</Button>
      <Button color='secondary' onClick={this.props.handleConfirm}>Submit</Button>
    </DialogActions>
    </Dialog>
    
  );
} }export default Confirmation
