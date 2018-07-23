import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state.cookbookReducer.cookbook

});

class CookbookAlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteCookbook = (id) => {
    console.log('in deleteCookbook');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_COOKBOOK,
      payload: id
    })
    this.props.dispatch(action);
    this.handleClose();
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen} size="small" color="primary">
            <DeleteIcon className="rightIcon" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete {this.props.book.cookbook_name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.deleteCookbook(this.props.book.id)} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CookbookAlertDialog);