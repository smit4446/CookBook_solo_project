import React, { Component} from 'react';
import { connect } from 'react-redux';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import AddCategory from '../AddCategory/AddCategory';
import EditCategory from '../EditCategory/EditCategory';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
        image: '/images/food--1200x600.jpg',
        cookbook_id: '',
        user_id: 1
      }
    }
  }

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
  }

  // updateCategory = (id) => {
  //   console.log('in updateCategory');
  //   // const action = ({
  //   //   type: COOKBOOK_ACTIONS.UPDATE_CATEGORY,
  //   //   payload: id
  //   // })
  //   // this.props.dispatch(action); 
  // }

  deleteCategory = (id) => {
    console.log('in deleteCategory');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_CATEGORY,
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
            {this.props.activeCookbook.cookbook_name}
          </p>
        </div>
      );
    }

    return (
      <div>
        <ProfileNav/>
        { content }
        {this.props.categories.filter(category => category.cookbook_id === this.props.activeCookbook.id).map(category => {
            return (
        <div className="CategoryDiv" key={category.id}>
          <Card  >
                    <CardMedia
                      image="/images/food--1200x600.jpg"
                      title="Food"
                    />
                    <CardContent onClick={() => this.handleClick(category)}>
                      <Typography gutterBottom variant="headline" component="h2">
                        {category.category_name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button onClick={() => this.updateCategory(category.id)} size="small" color="primary" >
                        Update
                      </Button> */}
                      <EditCategory />
                      <Button onClick={() => this.deleteCategory(category.id)} size="small" color="primary">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
        </div>)}
        )}

        <input type="text" value={this.state.category_name} onChange={this.handleCategory('category_name')}></input>
        <Button onClick={()=>this.addCategory(this.state.newCategory)} className="Button" size="small" variant="contained">+ Add Category</Button>
        <AddCategory />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Cookbook);