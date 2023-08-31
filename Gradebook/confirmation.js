//Import all dependenceis (modules, components, functions) from different libraries
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Component } from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';

// Define a class-based component named Confirmation
export class Confirmation extends Component {

constructor(props){
    super(props);
}

// Render method to display the component's UI
render(){

  return (
    // Render a Dialog component from MUI with provided props
    <Dialog open={this.props.addConfirmationOpen} onClose={this.props.handleCancel}>
      <DialogContent>
        <Typography>Are you sure you want to do this?</Typography>
      </DialogContent>
      <DialogActions>
        {/* Cancel button */}
        <Button color='secondary' onClick={this.props.handleCancel}>Cancel</Button>
        {/* Submit button */}
        <Button color='secondary' onClick={this.props.handleConfirm}>Submit</Button>
      </DialogActions>
    </Dialog>
    
  );

  // Export the Confirmation component as the default export
} }export default Confirmation
