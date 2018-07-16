import React, { Component, Link } from 'react';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import HomeNav from '../../components/HomeNav/HomeNav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
  state
});

class UserPage extends Component {
  constructor(){
    super();
    this.state = {
      cookbookArray: []
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  render() {
    let content = null;

    {this.state.cookbookArray.map((book, i) => 
      <div key={i}>
        <Link>{book.cookbook_name}</Link>
      </div>
    )}

    if (this.props.user.userName) {
      content = (
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.props.user.userName }!
          </h1>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      );
    }

    return (
      <div>
       
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);