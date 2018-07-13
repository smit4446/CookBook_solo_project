import React, { Component, Link} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import InfoPage from '../InfoPage/InfoPage';
import Cookbook from '../Cookbook/Cookbook';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';

const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state,
  index: 0
});

class Home extends Component {
  constructor(){
    super();
    this.state = {
      cookbookArray: [],
      index: 0
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: COOKBOOK_ACTIONS.FETCH_COOKBOOKS})
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleClick = (cookbooks, i) => {
    console.log(this.props.cookbooks.cookbook);
    
  }
    
  render() {
    let content = null;
    if (this.props.user.userName) {
      content = (
        <div>
          <Button onClick={this.logout}>
            Log Out
          </Button>
        </div>
        
      );
    }
    
    return (
      <div>
        <Nav />
        <pre>{JSON.stringify(this.props.cookbooks.cookbook.cookbook)}</pre>
          {this.props.cookbooks.cookbook.cookbook.map(book => {
            return (
        <div>
          <Button onClick={() => this.handleClick()} variant="contained">{book.cookbook_name}</Button>
        </div>)}
        )}
        
        <Button variant="contained">+ Add Cookbook</Button>

        { content }
        <div>
          <Cookbook cookbook={this.state.cookbookArray[this.state.index]}/>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);