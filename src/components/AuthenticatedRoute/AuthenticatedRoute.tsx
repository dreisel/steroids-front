import React, { useContext } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps
} from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

interface AuthenticatedRouteProps extends RouteProps {
  render: (props: RouteComponentProps<any>) => React.ReactNode;
}
const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  render,
  ...routeProps
}) => {
  const { user } = useContext(AppContext);
  return (
    <Route
      {...routeProps}
      render={props => (user ? render(props) : <Redirect to="/login" />)}
    />
  );
};

export default AuthenticatedRoute;
