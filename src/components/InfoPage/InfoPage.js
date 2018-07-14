import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('login');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Profile:
            {this.props.user.userName}
          </p>
        </div>
      );
    }

    return (
      
      <div>
        <ProfileNav />
        <pre>{JSON.stringify(this.props.cookbook)}</pre>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);