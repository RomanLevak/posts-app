import './index.sass'
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './components/users';
import Posts from './components/posts';
import Post from './components/post';

function App() {
  return (
    <Router>
      <header className="header">
        <h1 className="header__title">
          <Link className="header__link" to="/">Posts-app</Link>
        </h1>
      </header>
      <Switch>
        <Route path="/users/:userId"
          render={({ match }) =>
            <Posts userId={match.params.userId} />
          }
        />
        <Route path="/posts/:postId"
          render={({ match }) =>
            <Post postId={match.params.postId} />
          }
        />
        <Route>
          <Users />
        </Route>
      </Switch>
      <ToastContainer
        closeButton={false}
        progressStyle={{visibility: 'hidden'}}
        autoClose={2300}
        draggable={false}
      />
    </Router>
  );
}

export default App;
