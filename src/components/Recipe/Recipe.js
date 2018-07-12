import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../../components/Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
  });

class Recipe extends Component {
  
}

export default connect(mapStateToProps)(Recipe);