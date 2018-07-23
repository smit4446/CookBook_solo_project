import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import EditRecipe from '../EditRecipe/EditRecipe';
import DeleteIcon from '@material-ui/icons/Delete';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.cookbookReducer.recipe,
  likes: state.cookbookReducer.likes
});

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class RecipeReviewCard extends React.Component {
  constructor(){
    super();
    this.state = {
      newRecipe: {
      
      }
    }
  }

  state = { expanded: false };

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_RECIPES})
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_LIKES})
    console.log('in component did mount');
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  
  deleteRecipe = (id) => {
    console.log('in deleteRecipe');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_RECIPE,
      payload: id
    })
    this.props.dispatch(action);
  }
  
  likeRecipe = (id) => {
    console.log('in likeRecipe', this.state.newRecipe);
    let liked = this.props.likes.filter(like => like.recipe_id === id).length > 0 ? true : false;
    console.log(liked);
    
    if(liked){
      const action = ({
        type: COOKBOOK_ACTIONS.DELETE_LIKE,
        payload: id
      })
      this.props.dispatch(action);
    } else {
      const action = ({
        type: COOKBOOK_ACTIONS.LIKE_RECIPE,
        payload: id
      })
      this.props.dispatch(action);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="RecipeDiv">
        <Card className={classes.card} style={{backgroundColor: "#DEDEE0"}}>
          <CardHeader
            title={<h5>{this.props.recipe.recipe_name}</h5>}
          />
          <CardMedia
            className={classes.media}
            image="/static/images/cards/food--1200x600.jpg"
            title="Food"
          />
          <CardContent>
            <Typography component="p">
              <p>{this.props.recipe.summary}</p>
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <EditRecipe recipe={this.props.recipe}/>
            <IconButton onClick={() => this.deleteRecipe(this.props.recipe.id)} size="small">
              <DeleteIcon className="rightIcon" />
            </IconButton>
            <IconButton style={this.props.likes.filter(like => like.recipe_id === this.props.recipe.id).length > 0 ? {color: 'red'} : {color: 'grey'}} onClick={() => this.likeRecipe(this.props.recipe.id)} >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent >
              <Typography paragraph variant="body2">
                <p>Prep Time: {this.props.recipe.prep_time}</p>
                <p>Cook Time: {this.props.recipe.cook_time}</p>
                <p>Servings: {this.props.recipe.servings}</p>
              </Typography>
              <Typography paragraph>
                <p>Ingredients: {this.props.recipe.ingredients}</p>
              </Typography>
              <Typography paragraph>
                <p>Instructions: {this.props.recipe.instructions}</p>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(RecipeReviewCard);