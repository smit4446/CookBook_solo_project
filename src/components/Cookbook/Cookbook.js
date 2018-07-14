import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';


const mapStateToProps = state => ({
  user: state.user,
  categories: state.cookbookReducer.category,
  activeCookbook: state.cookbookReducer.activeCookbook
});

class Cookbook extends Component {
  constructor(){
    super();
    this.state = {
      categoryArray: []
    }
  }

  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_CATEGORIES})
    console.log('in component did mount');
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
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
        { content }
        <input></input><Button size="small" variant="contained">+ Add Category</Button>
        {/* <pre>{JSON.stringify(this.props.activeCookbook.id)}</pre>  */}
        {this.props.categories.filter(category => category.cookbook_id === this.props.activeCookbook.id).map(category => {
            return (
        <div className="Button" key={category.id}>
          <Button size="small" onClick={() => this.handleClick(category)} variant="contained">{category.category_name}</Button>
        </div>)}
        )}
        
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Cookbook);