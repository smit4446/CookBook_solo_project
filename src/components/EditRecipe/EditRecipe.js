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
import FloatingActionButtons from '../ActionButtons/ActionButtons';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
// import { timingSafeEqual } from 'crypto';

const mapStateToProps = state => ({
    user: state.user,
    recipes: state.cookbookReducer.recipe,
    activeCategory: state.cookbookReducer.activeCategory
  });

class EditRecipe extends React.Component {
    constructor(){
        super();
        this.state = {
          updatedRecipe: {
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

  handleUpdate = (recipe) => (event) => {
    console.log('event happended', this.props.activeCategory)
    this.setState({
      updatedRecipe: {
          ...this.props.recipe,
          [recipe]: event.target.value
      }
    })
    console.log(this.state);
  }


  updateRecipe = () => {
    console.log('in udpatedRecipe', this.state.updatedRecipe);
    const action = ({
      type: COOKBOOK_ACTIONS.UPDATE_RECIPE,
      payload: this.state.updatedRecipe
    })
    this.props.dispatch(action); 
    this.handleClose();
  }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
        <Icon>edit_icon</Icon>
        </IconButton>
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
              value={this.state.updatedRecipe.recipe_name} 
              defaultValue={this.props.recipe.recipe_name}
              onChange={this.handleUpdate('recipe_name')}
              name="recipe_name"
              autoFocus
              margin="dense"
              label="Recipe Name"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.prep_time} 
              defaultValue={this.props.recipe.prep_time}
              onChange={this.handleUpdate('prep_time')}
              name="prep_time"
              autoFocus
              margin="dense"
              label="Prep Time"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.cook_time} 
              defaultValue={this.props.recipe.cook_time}
              onChange={this.handleUpdate('cook_time')}
              name="cook_time"
              autoFocus
              margin="dense"
              label="Cook Time"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.servings} 
              defaultValue={this.props.recipe.servings}
              onChange={this.handleUpdate('servings')}
              name="servings"
              autoFocus
              margin="dense"
              label="Servings"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.summary} 
              defaultValue={this.props.recipe.summary}
              onChange={this.handleUpdate('summary')}
              name="summary"
              autoFocus
              margin="dense"
              label="Summary"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.ingredients} 
              defaultValue={this.props.recipe.ingredients}
              onChange={this.handleUpdate('ingredients')}
              name="ingredients"
              autoFocus
              margin="dense"
              label="List of Ingredients"
              fullWidth
            />
            <TextField 
              value={this.state.updatedRecipe.instructions} 
              defaultValue={this.props.recipe.instructions}
              onChange={this.handleUpdate('instructions')}
              name="instructions"
              autoFocus
              margin="dense"
              label="Instructions"     
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateRecipe} color="primary">
              Edit Recipe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditRecipe);