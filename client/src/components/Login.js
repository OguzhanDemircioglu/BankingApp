import React, {useState} from 'react';
import "../App.css";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "../store/action/user";
import {BASE_URL} from "../store/Enums";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const returnVal = {username, token: ""};
    const dispatch = useDispatch();

    const submitForm = () => {

        fetch(BASE_URL + '/auth/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: null, password: password, username: username
            })
        })
            .then(response => {

                if (!response.ok) {
                    alert("İşlem şuan gerçekleştirilemiyor")
                    return;
                }

                return response.json();
            }).then(data => {

            returnVal.username = username;
            returnVal.token = data.token;
            dispatch(setCurrentUser(returnVal));
            navigate('/');
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    return (
        <div style={{marginTop:"30px"}} className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="username" className="form-control" placeholder="Enter username"
                               onChange={e => setUsername(e.target.value)}
                               id="username"/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                               onChange={e => setPassword(e.target.value)}
                               id="pwd"/>
                    </div>
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Login</button>
                    <br/>
                    <label> Need an Account?</label>
                    <button type="button" onClick={() => navigate("/register")}
                            className="btn btn-primary">Register
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Login;