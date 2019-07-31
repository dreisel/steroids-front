import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './Login'

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Todos</Link>
          </li>
          <li>
            <Link to="/login">About</Link>
          </li>
        </ul>
        <hr />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="login" />
      </div>
    </Router>
  );
}

export default App;
