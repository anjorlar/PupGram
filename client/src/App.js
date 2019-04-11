<<<<<<< HEAD
import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Pages/Home';
import AddPost from './Pages/AddPost';
import PostPage from './Pages/PostPage';
import AuthPage from './Pages/AuthPage';
import UserSettings from './Pages/UserSettings';

import './App.css';

class App extends Component {
  state = {
    isAuth: true
  }

  render() {
    let routes = (
      <Switch>
				<Route path="/addPost" component={AddPost} />
				<Route path="/post/:id" component={PostPage} />
				<Route path="/auth" component={AuthPage} />
				<Route path="/" exact component={Home} />
				<Route render={() => <h2>Not Found</h2>} />
			</Switch>
    );

    if (this.state.isAuth) {
      routes = (
      <Switch>
				<Route path="/addPost" component={AddPost} />
				<Route path="/post/:id" component={PostPage} />
				<Route path="/userSettings" component={UserSettings} />
				<Route path="/" exact component={Home} />
				<Route render={() => <h2>Not Found</h2>} />
			</Switch>
      );
    }

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
        </div>
        {routes}
      </BrowserRouter>
    );
  }
}

export default App;
||||||| merged common ancestors
=======
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from './components/AppNavbar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
      </div>
    );
  }
}

export default App;
>>>>>>> master
