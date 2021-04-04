import {Route, Redirect} from 'react-router-dom';
import {LinearProgress} from '@material-ui/core';

export default function PrivateRoute({component: Component, auth: isAuthenticated, ...rest}) {
  return (
    <Route {...rest} render={props => {
      if (isAuthenticated === null)
        return <LinearProgress/>
      if (isAuthenticated === true)
        return <Component {...props}/>;
      return <Redirect to='/login'/>
    }}/>``
  );
}