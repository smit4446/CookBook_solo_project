import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class EditCategory extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit the name of your category!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit the name of your category, please enter a new name below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogTitle id="form-dialog-title">Move this category to a different cookbook!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a new Cookbook below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cookbook Name"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Edit Category
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}