import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class Cookbook extends Component {
  constructor(){
    super();
    this.state = {
      categoryArray: [],
    }
  }

  componentDidMount(){
    this.getCategories();
  }

  getCategories = () => {
    axios.get('/cookbook').then((response)=>{
      console.log('in the axios GET call for Cookbook page', response.data);
      this.setState({
        categoryArray: response.data
      })
      console.log(this.state.categoryArray);  
    })
  }

  render(){
    return(
      <pre>{JSON.stringify(this.state.categoryArray)}</pre>
    )
  }
}

export default connect(mapStateToProps)(Cookbook);
