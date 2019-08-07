import React, {useContext, useState} from 'react';
import '../../components/App/App.css';
import {AppContext} from "../../context/AppContext";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {authService} from '../../services';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
    const { setAuthenticated } = useContext(AppContext);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    async function onSubmit() {
        const loginResponse = await authService.login({ username, password });
        setAuthenticated(loginResponse);
        if (loginResponse) {
            history.push('/');
        } else {
            setError('Invalid UserNAme OR Password');
        }
    }
  return (
    <div>
        <div>
            <input
                placeholder={'Username'}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
            />
        </div>
        <div>
            <input
                placeholder={'Password'}
                value={password}
                onChange={(event) => {
                setPassword(event.target.value);
            }}/>
        </div>
        <button onClick={onSubmit}>Send</button>
        {error && <div>{error}</div>}
    </div>
  );
};

export default withRouter(Login);
