import React, { Component} from 'react';
import { connect } from 'react-redux';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
// import AddRecipe from '../AddRecipe/AddRecipe';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRecipe from '../EditRecipe/EditRecipe';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import RecipeReviewCard from '../RecipeCard/RecipeCard';

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.cookbookReducer.recipe,
  activeCategory: state.cookbookReducer.activeCategory,
  likes: state.cookbookReducer.likes
});

class Category extends Component {
  constructor(props){
    super(props);
    this.state = {
      newRecipe: {
        recipe_name: '',
        category_id: '',
        prep_time: '',
        cook_time: '',
        servings: '',
        instructions: '',
        ingredients: '',
        summary: ''
      }
    }
  }

  state = {
    open: false,
  };

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_RECIPES})
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_LIKES})
    console.log('in component did mount');
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  handleRecipe = (recipe) => (event) => {
    console.log('event happended', this.props.activeCategory)
    this.setState({
      newRecipe: {
          ...this.state.newRecipe,
          [recipe]: event.target.value,
          category_id: this.props.activeCategory.id,
          is_liked: false
      }
    })
    console.log(this.state);
  }

  addRecipe = (recipe) => {
    console.log('new recipe is', recipe);
    const action = ({
      type: COOKBOOK_ACTIONS.POST_RECIPE,
      payload: recipe
    })
    this.props.dispatch(action);
    this.handleClose();
  }

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
          <h1>
          <p>
            {this.props.activeCategory.category_name}
          </p>
          </h1>
        </div>
      );
    }

    return (
      <div>
        <ProfileNav />
        { content } 
        
        {this.props.recipes.filter(recipe => recipe.category_id === this.props.activeCategory.id).map(recipe => {
            return (
              <div className="RecipeDiv" >
              <RecipeReviewCard recipe={recipe} likes={this.props.likes}/>   
            </div>
            )}
        )}
       
       <Button onClick={this.handleClickOpen}>+ Add Recipe</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add A New Recipe To Your Cookbook!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a new recipe, please fill in the information below.
            </DialogContentText>
            <TextField 
              value={this.state.newRecipe.recipe_name} 
              onChange={this.handleRecipe('recipe_name')}
              name="recipe_name"
              autoFocus
              margin="dense"
              label="Recipe Name"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.prep_time} 
              onChange={this.handleRecipe('prep_time')}
              name="prep_time"
              autoFocus
              margin="dense"
              label="Prep Time"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.cook_time} 
              onChange={this.handleRecipe('cook_time')}
              name="cook_time"
              autoFocus
              margin="dense"
              label="Cook Time"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.servings} 
              onChange={this.handleRecipe('servings')}
              name="servings"
              autoFocus
              margin="dense"
              label="Servings"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.summary} 
              onChange={this.handleRecipe('summary')}
              name="summary"
              autoFocus
              margin="dense"
              label="Summary"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.ingredients} 
              onChange={this.handleRecipe('ingredients')}
              name="ingredients"
              autoFocus
              margin="dense"
              label="List of Ingredients"
              type="email"
              fullWidth
            />
            <TextField 
              value={this.state.newRecipe.instructions} 
              onChange={this.handleRecipe('instructions')}
              name="instructions"
              autoFocus
              margin="dense"
              label="Instructions"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={()=>this.addRecipe(this.state.newRecipe)} color="primary">
              Add Recipe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Category);