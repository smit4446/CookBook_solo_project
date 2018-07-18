import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';

export default class EditCookbook extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateCookbook = (id) => {
    console.log('in updateCookbook');
    const action = ({
      type: COOKBOOK_ACTIONS.UPDATE_COOKBOOK,
      payload: id
    })
    this.props.dispatch(action); 
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Edit</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit the name of your cookbook!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit the name of your cookbook, please enter a new name below.
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
              Edit Cookbook
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}