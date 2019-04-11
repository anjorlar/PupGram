import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import UserProfile from './UserProfile'
import '../css/main.css'

class NavBar extends Component {
  state = {
    isAuth: true
  }
  render () {
    return (
    <div className="Nav">
      <div className="Nav-container">
        <NavLink to="/" className="logo">
          <h1>
            Pupgram
          </h1>
        </NavLink>
        <input type="text"/>
        {this.state.isAuth ? (
          <>
          <NavLink to='/addPost' className="btn-addpost">
            Add Post
          </NavLink>
          <UserProfile />
          </>
        ) : (
          <NavLink to="/auth" className="nav-auth">
            Login/Signup
          </NavLink>
        )}
      </div>
    </div>
    )
  }
}

export default NavBar