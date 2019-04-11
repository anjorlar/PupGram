import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class UserProfile extends Component {

  state = {
    username: "Mayowa"
  }
  
  render () {
    return (
      <div>
        <NavLink to="/userSettings">
          {this.state.username}
        </NavLink>
      </div>
    )
  }
}

export default UserProfile