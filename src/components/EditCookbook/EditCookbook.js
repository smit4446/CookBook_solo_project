import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import { connect } from 'react-redux';
// import { timingSafeEqual } from 'crypto';

const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state.cookbookReducer.cookbook
});

class EditCookbook extends React.Component {
  constructor(){
    super();
    this.state = {
      updatedCookbook: {
        cookbook_name: ''
      }
    }
  }  

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUpdate = (event) => {
    console.log('event happended', event.target.value)
    this.setState({
      updatedCookbook: {
          ...this.props.book,
          cookbook_name: event.target.value,
      }
    })
    console.log(this.state.updatedCookbook);
  }

  updateCookbook = () => {
    console.log('in updateCookbook', this.state.updatedCookbook);
    const action = ({
      type: COOKBOOK_ACTIONS.UPDATE_COOKBOOK,
      payload: this.state.updatedCookbook
    })
    this.props.dispatch(action); 
    this.handleClose();
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
              onChange={this.handleUpdate}
              value={this.state.cookbook_name}
              defaultValue={this.props.book.cookbook_name}
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
            <Button  onClick={this.updateCookbook} color="primary">
              Edit Cookbook
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditCookbook);