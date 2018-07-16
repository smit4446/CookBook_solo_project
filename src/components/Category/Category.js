import React, { Component} from 'react';
import { connect } from 'react-redux';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import AddRecipe from '../AddRecipe/AddRecipe';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.cookbookReducer.recipe,
  activeCategory: state.cookbookReducer.activeCategory
});

class Category extends Component {
  constructor(){
    super();
    this.state = {
      newRecipe: {
        recipe_name: '',
        image: '',
        category_id: '',
        user_id: 1
      }
    }
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_RECIPES})
    console.log('in component did mount');
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  handleClick = (recipe) => {
    console.log('recipe is', recipe);
    const action = ({
      type: 'SET_ACTIVE_RECIPE',
      payload: recipe
    })
    this.props.dispatch(action);
    this.props.history.push('recipe');
  }

  handleRecipe = () => (event) => {
    console.log('event happended', this.props.activeCategory)
    this.setState({
      newRecipe: {
          ...this.state.newRecipe,
          recipe_name: event.target.value,
          category_id: this.props.activeCategory.id
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
  }

  // updateRecipe = (id) => {
  //   console.log('in updateRecipe');
  //   // const action = ({
  //   //   type: COOKBOOK_ACTIONS.UPDATE_RECIPE,
  //   //   payload: id
  //   // })
  //   // this.props.dispatch(action); 
  // }

  deleteRecipe = (id) => {
    console.log('in deleteRecipe');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_RECIPE,
      payload: id
    })
    this.props.dispatch(action);
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            {this.props.activeCategory.category_name}
          </p>
        </div>
      );
    }

    return (
      <div>
        <ProfileNav />
        { content } 
        {this.props.recipes.filter(recipe => recipe.category_id === this.props.activeCategory.id).map(recipe => {
            return (
              <div className="RecipeDiv" key={recipe.id}>
              <Card  >
                        <CardMedia
                          image="food--1200x600.jpg"
                          title="food--1200x600"
                        />
                        <CardContent onClick={() => this.handleClick(recipe)}>
                          <Typography gutterBottom variant="headline" component="h2">
                            {recipe.recipe_name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          {/* <Button onClick={() => this.updateRecipe(recipe.id)} size="small" color="primary" >
                            Update
                          </Button> */}
                          {/* <EditRecipe /> */}
                          <Button onClick={() => this.deleteRecipe(recipe.id)} size="small" color="primary">
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                 
            </div>)}
    )}
    <input type="text" value={this.state.recipe_name} onChange={this.handleRecipe('recipe_name')}></input>
        <Button onClick={()=>this.addRecipe(this.state.newRecipe)} className="Button" size="small" variant="contained">+ Add Recipe</Button>
        <AddRecipe />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Category);