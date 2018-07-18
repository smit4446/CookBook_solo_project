import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeNav from '../../components/HomeNav/HomeNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import EditCookbook from '../EditCookbook/EditCookbook';
import ButtonBases from '../ComplexButtons/ComplexButtons';
import DeleteIcon from '@material-ui/icons/Delete';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state.cookbookReducer.cookbook

});

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      newCookbook: {
        cookbook_name: '',
        image: '',
        user_id: 1
      }
    }
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_COOKBOOKS})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  handleClick = (book) => {
    console.log('book is', book);
    const action = ({
      type: 'SET_ACTIVE_BOOK',
      payload: book
    })
    this.props.dispatch(action);
    this.props.history.push('cookbook');
  }

  handleCookbook = () => (event) => {
    console.log('event happended')
    this.setState({
      newCookbook: {
          ...this.state.newCookbook,
          cookbook_name: event.target.value,
      }
    })
    console.log(this.state);
  }

  addCookbook = (cookbook) => {
    console.log('new book is', cookbook);
    const action = ({
      type: COOKBOOK_ACTIONS.POST_COOKBOOK,
      payload: cookbook
    })
    this.props.dispatch(action);
    this.handleClose();
  }

  // updateCookbook = (id) => {
  //   console.log('in updateCookbook');
  //   // const action = ({
  //   //   type: COOKBOOK_ACTIONS.UPDATE_COOKBOOK,
  //   //   payload: id
  //   // })
  //   // this.props.dispatch(action); 
  // }

  deleteCookbook = (id) => {
    console.log('in deleteCookbook');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_COOKBOOK,
      payload: id
    })
    this.props.dispatch(action);
  }

  handleAddClickOpen = () => {
    this.setState({ open: true });
  };

  handleEditClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  
    
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <Button onClick={this.logout}>
            Log Out
          </Button>
        </div>
      );
    }
    
    return (
      <div>
        <HomeNav />
          {this.props.cookbooks.map((book) => {
            return (
              <div className="CookbookDiv" >
                 <Card key={book.id}>
                    <CardMedia
                      image="food--1200x600.jpg"
                      title="food--1200x600"
                    />
                    <CardContent onClick={() => this.handleClick(book)}>
                      <Typography gutterBottom variant="headline" component="h2">
                        {book.cookbook_name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button onClick={() => this.updateCookbook(book.id)} size="small" color="primary" >
                        Update
                      </Button> */}
                      <EditCookbook book={book}/>
                      <Button onClick={() => this.deleteCookbook(book.id)} size="small" color="primary">
                        Delete <DeleteIcon className="rightIcon" />
                      </Button>
                    </CardActions>
                  </Card>
              </div>)}
        )}

        <Button onClick={this.handleAddClickOpen}>+ Add Cookbook</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add A New Cookbook To Your Collection!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new cookbook, please enter the name below.
            </DialogContentText>
            <TextField 
              value={this.state.cookbook_name} 
              onChange={this.handleCookbook('cookbook_name')}
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
            <Button onClick={()=>this.addCookbook(this.state.newCookbook)} color="primary">
              Add Cookbook
            </Button>
          </DialogActions>
        </Dialog>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);