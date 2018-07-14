import React, { Component, Link} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import HomeNav from '../../components/HomeNav/HomeNav';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import InfoPage from '../InfoPage/InfoPage';
import Cookbook from '../Cookbook/Cookbook';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import '../Home/home.css'
import Category from '../Category/Category';


const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state.cookbookReducer.cookbook,
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
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  handleClick = (book) => {
    console.log('book is', book);
    const action = ({
      type: 'SET_ACTIVE_BOOK',
      payload: book
    })
    this.props.dispatch(action);
    this.props.history.push('cookbook');
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
        <HomeNav />
        <input ></input><Button className="Button" size="small" variant="contained">+ Add Cookbook</Button>
          {this.props.cookbooks.map(book => {
            return (
        <div className="Button" key={book.id}>
          <Button  size="small" onClick={() => this.handleClick(book)} variant="contained">{book.cookbook_name}</Button>
        </div>)}
        )}
        { content }
        {/* <div>
          <Cookbook size="small" cookbook={this.props.cookbooks}/>
        </div>
        <div>
          <Category size="small" category={this.props.categories}/>
        </div> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);