import React, { Component} from 'react';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import FavoriteRecipes from '../FavoriteRecipes/FavoriteRecipes';

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.cookbookReducer.recipe,
  activeCategory: state.cookbookReducer.activeCategory,
  likes: state.cookbookReducer.likes
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
            {this.props.user.userName.username}
          </p>
          {/* <FavoriteRecipes /> */}
        </div>
      );
    }

    return (
      
      <div>
        <ProfileNav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);