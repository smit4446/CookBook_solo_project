import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeNav from '../../components/HomeNav/HomeNav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import {COOKBOOK_ACTIONS} from '../../redux/actions/cookbookActions';
import AddCookbook from '../AddCookbook/AddCookbook';
import EditCookbook from '../EditCookbook/EditCookbook';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const mapStateToProps = state => ({
  user: state.user,
  cookbooks: state.cookbookReducer.cookbook,
});

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      newCookbook: {
        cookbook_name: '',
        image: '',
        user_id: 1
      }
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

  handleCookbook = () => (event) => {
    console.log('event happended')
    this.setState({
      newCookbook: {
          ...this.state.newCookbook,
          cookbook_name: event.target.value,
      }
    })
    console.log(this.state);
  }

  addCookbook = (cookbook) => {
    console.log('new book is', cookbook);
    const action = ({
      type: COOKBOOK_ACTIONS.POST_COOKBOOK,
      payload: cookbook
    })
    this.props.dispatch(action);
  }

  // updateCookbook = (id) => {
  //   console.log('in updateCookbook');
  //   // const action = ({
  //   //   type: COOKBOOK_ACTIONS.UPDATE_COOKBOOK,
  //   //   payload: id
  //   // })
  //   // this.props.dispatch(action); 
  // }

  deleteCookbook = (id) => {
    console.log('in deleteCookbook');
    const action = ({
      type: COOKBOOK_ACTIONS.DELETE_COOKBOOK,
      payload: id
    })
    this.props.dispatch(action);
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
          {this.props.cookbooks.map((book) => {
            return (
              <div className="CookbookDiv" key={book.id}>
                 <Card  >
                    <CardMedia
                      image="food--1200x600.jpg"
                      title="food--1200x600"
                    />
                    <CardContent onClick={() => this.handleClick(book)}>
                      <Typography gutterBottom variant="headline" component="h2">
                        {book.cookbook_name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {/* <Button onClick={() => this.updateCookbook(book.id)} size="small" color="primary" >
                        Update
                      </Button> */}
                      <EditCookbook />
                      <Button onClick={() => this.deleteCookbook(book.id)} size="small" color="primary">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
              </div>)}
        )}
        { content }
        <input type="text" value={this.state.cookbook_name} onChange={this.handleCookbook('cookbook_name')}></input>
        <Button onClick={()=>this.addCookbook(this.state.newCookbook)} className="Button" size="small" variant="contained">+ Add Cookbook</Button>

        <AddCookbook />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);