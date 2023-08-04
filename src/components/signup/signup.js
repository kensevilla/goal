import React, {useState} from 'react'
import {connect} from "react-redux"
import './signup.css'

import {_createUser} from '../../state/user/action'
import Main from '../main/main'


const Signup = (props) => { 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorMessage("");

        if(password !== confirmPassword) {
            setErrorMessage("Password must match.")
            return;
        }

        props.createUser({username: username, password: password}).then((resp) => {
            if(resp) {
                setSignupSuccess(true);
            } else {
                setErrorMessage("Username is taken.");
            }
        }).catch(err =>{
            if(!err?.response) {
                setErrorMessage("No Server Response");
            } else {
                setErrorMessage("Signup Failed");
            }
        })
    }

        return(
            <>
            {
                signupSuccess ? <Main /> :
                <div className="signup">
                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="errorMessage"><label>{errorMessage}</label></div>
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                        <label>Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' required></input>
                        <label>Confirm Password</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' required></input>
                        <button>Signup</button>
                        <a onClick={() => props.onFormSwitch('login')}>Login here</a>
                    </form>
                </div>
            }
            </>
            
        )
}

const mapDispatchToProps = {
    createUser : _createUser
}

export default connect(
    null,
    mapDispatchToProps
  )(Signup);
