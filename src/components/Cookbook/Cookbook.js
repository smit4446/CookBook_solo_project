import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';
import {CATEGORY_ACTIONS} from '../../redux/actions/categoryActions'

const mapStateToProps = state => ({
  user: state.user,
  state
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
    this.getCategories();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getCategories = () => {
    console.log('in getCategories');
    axios.get('/cookbook').then((response)=>{
      console.log('in the axios GET call for Cookbook page', response.data);
      this.setState({
        categoryArray: response.data
      })
      console.log(this.state.categoryArray);  
    })
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Cookbook Page
          </p>
        </div>
      );
    }

    return (
      <div>
        { content }
        <pre>{JSON.stringify(this.state.categoryArray)}</pre> 
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Cookbook);