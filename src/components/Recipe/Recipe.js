import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.cookbookReducer.recipe,
  activeCategory: state.cookbookReducer.activeCategory
});

class Recipe extends Component {
  constructor(){
    super();
    this.state = {
      recipeArray: []
    }
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_RECIPES})
    console.log('in component did mount');
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
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

  // getCategories = () => {
  //   console.log('in getCategories');
  //   axios.get('/cookbook').then((response)=>{
  //     console.log('in the axios GET call for Cookbook page', response.data);
  //     this.setState({
  //       categoryArray: response.data
  //     })
  //     console.log(this.state.categoryArray);  
  //   })
  // }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Desserts
          </p>
        </div>
      );
    }

    return (
      <div>

        { content }
        <input></input><Button size="small" variant="contained">+ Add Recipe</Button>
        <pre>{JSON.stringify(this.props.activeCategory.id)}</pre> 
        {this.props.recipes.filter(recipe => recipe.category_id === this.props.activeCategory.id).map(recipe => {
            return (
        <div>
          <Button size="small" onClick={() => this.handleClick(recipe.id)} variant="contained">{recipe.recipe_name}</Button>
        </div>)}
        )}
        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Recipe);