import React, { Component } from 'react';

class AuthPage extends Component {
  state = {

  }

  render () {
    return (
      <div>
        <div>
          <h1>Join A community of Pug lovers</h1>
        </div>
      <form>
        <div>
          <label>
            Username
          </label>
          <input type="text"/>
        </div>
        <div>
          <label>
            Password
          </label>
          <input type="text"/>
        </div>
        <button>Login</button>
      </form>
      </div>
    )
  }
}

export default AuthPage