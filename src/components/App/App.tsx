import React from 'react';
import './App.css';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Login from '../../routes/Login/Login';
import { AppContextProvider } from '../../context/AppContext';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import Todos from '../../routes/Todos/Todos';
import { TodoContextProvider } from '../../context/TodosContext';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <TodoContextProvider>
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
            <AuthenticatedRoute exact path="/" render={() => <Todos />} />
          </div>
        </Router>
      </TodoContextProvider>
    </AppContextProvider>
  );
};

export default App;
