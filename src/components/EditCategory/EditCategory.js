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
  categories: state.cookbookReducer.category,
  activeCookbook: state.cookbookReducer.activeCookbook
});

class EditCategory extends React.Component {
  constructor(){
    super();
    this.state = {
      updatedCategory: {
        category_name: ''
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
    console.log('event happened', event.target.value)
    this.setState({
      updatedCategory: {
          ...this.props.category,
          category_name: event.target.value,
      }
    })
    console.log(this.state.updatedCategory);
  }

  updateCategory = () => {
    console.log('in updateCategory', this.state.updatedCategory);
    const action = ({
      type: COOKBOOK_ACTIONS.UPDATE_CATEGORY,
      payload: this.state.updatedCategory
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
          <DialogTitle id="form-dialog-title">Edit the name of your category!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit the name of your category, please enter a new name below.
            </DialogContentText>
            <TextField
              onChange={this.handleUpdate}
              value={this.state.category_name}
              defaultValue={this.props.category.category_name}
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button  onClick={this.updateCategory} color="primary">
              Edit Category
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditCategory);