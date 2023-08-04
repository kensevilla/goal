import React, {useState, useContext} from 'react'
import {connect} from "react-redux"
import AuthContext from '../../context/AuthProvider'
import './login.css'

import {_getUser} from '../../state/user/action'
import Main from '../main/main'

const Login = (props) => { 

    const { setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        let user = {
            username: username,
            password: password
        }

        props.getUser(user).then((resp) => {
            if(resp) {
                setAuth({resp});
                setLoginSuccess(true);
            } else {
                setErrorMessage("Username or Password is incorrect.");
            }
        }).catch(err =>{
            if(!err?.response) {
                setErrorMessage("No Server Response");
            } else {
                setErrorMessage("Login Failed");
            }
        })
    }

        return(
            <>
            {
                loginSuccess ? <Main /> 
                :
                <div className="login">
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className="errorMessage"><label>{errorMessage}</label></div>
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' required></input>
                        <button>Login</button>
                        <div className='signup-here'>
                            <label>Don't have an account? </label> <a onClick={() => props.onFormSwitch('signup')}>Signup here</a>
                        </div>
                    </form>
                </div>
            }
            </>
        )
}

const mapDispatchToProps = {
    getUser : _getUser
}

export default connect(
    null,
    mapDispatchToProps
  )(Login);
