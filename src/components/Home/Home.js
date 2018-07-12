import React, { Component, Link} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Button from '@material-ui/core/Button';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  state
});

class Home extends Component {
  constructor(){
    super();
    this.state = {
      cookbookArray: []
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getCookbooks();
    // this.props.dispatch({
    //   type: 'GET_COOKBOOK',
    //   payload: []
    // })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  getCookbooks = () => {
    axios.get('/main').then((response)=>{
      console.log('in the axios GET call for Home page', response.data);
      this.setState({
        cookbookArray: response.data
      })
      console.log(this.state.cookbookArray);  
    })
  }

  handleClick = () => {
    console.log('in handle click', this.state.cookbookArray);
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
        <Nav />
        {/* <pre>{JSON.stringify(this.state.cookbookArray)}</pre> */}
          {this.state.cookbookArray.map((book, i) => 
        <div key={i}>
          <Button onClick={this.handleClick} variant="contained">{book.cookbook_name}</Button>
        </div>
        )}
        <Button variant="contained">+ Add Cookbook</Button>
        { content }
        {/* { cookbookContent } */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);