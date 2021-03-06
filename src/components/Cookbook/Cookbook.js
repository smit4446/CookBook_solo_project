import React, { Component} from 'react';
import { connect } from 'react-redux';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
// import AddCategory from '../AddCategory/AddCategory';
import EditCategory from '../EditCategory/EditCategory';
import DeleteIcon from '@material-ui/icons/Delete';
import CategoryAlert from '../CategoryAlert/CategoryAlert';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { ContentLink } from 'material-ui';

const mapStateToProps = state => ({
  user: state.user,
  categories: state.cookbookReducer.category,
  activeCookbook: state.cookbookReducer.activeCookbook
});

class Cookbook extends Component {
  constructor(props){
    super(props);
    this.state = {
      newCategory: {
        category_name: '',
        cookbook_id: ''
      }
    }
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_CATEGORIES})
    console.log('in component did mount');
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  handleClick = (category) => {
    console.log('category is', category);
    const action = ({
      type: 'SET_ACTIVE_CATEGORY',
      payload: category
    })
    this.props.dispatch(action);
    this.props.history.push('category');
  }

  handleCategory = () => (event) => {
    console.log('event happended', this.props.activeCookbook)
    this.setState({
      newCategory: {
          ...this.state.newCategory,
          category_name: event.target.value,
          cookbook_id: this.props.activeCookbook.id
      }
    })
    console.log(this.state);
  }

  addCategory = (category) => {
    console.log('new category is', category);
    const action = ({
      type: COOKBOOK_ACTIONS.POST_CATEGORY,
      payload: category
    })
    this.props.dispatch(action);
    this.handleClose();
  }

  // deleteCategory = (id) => {
  //   console.log('in deleteCategory');
  //   const action = ({
  //     type: COOKBOOK_ACTIONS.DELETE_CATEGORY,
  //     payload: id
  //   })
  //   this.props.dispatch(action);
  // }

  handleClickOpen = () => {
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
          
          <h2>
          <p>
          <Link to="/main" style={{ textDecoration: 'none', color: "black" }}>
            {this.props.activeCookbook.cookbook_name}
          </Link>
          </p>
          
          </h2>
          
        </div>
      );
    }

    return (
      <div>
        <ProfileNav/>
        { content }
        <Button onClick={this.handleClickOpen} style={{backgroundColor:"#717481"}}>+ Add Category</Button>
        {this.props.categories.filter(category => category.cookbook_id === this.props.activeCookbook.id).map(category => {
            return (
        <div className="cookbook">
          <Card  key={category.id} className="CookbookDiv" style={{backgroundColor: "#DEDEE0"}}>
                    <CardContent onClick={() => this.handleClick(category)}>
                      <Typography gutterBottom variant="headline" component="h2" >
                        <p>{category.category_name}</p>
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <EditCategory category={category}/>
                      <CategoryAlert category={category}/>
                    </CardActions>
                  </Card>
        </div>)}
        )}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add A New Category To Your Cookbook!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new category, please enter the name below.
            </DialogContentText>
            <TextField 
              value={this.state.category_name} 
              onChange={this.handleCategory('category_name')}
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
            <Button onClick={()=>this.addCategory(this.state.newCategory)} color="primary">
              Add Category
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Cookbook);