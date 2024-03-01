import React from 'react';
import Login from "./Login";
import {Navigate} from "react-router-dom";

const Guest = () => {
    return (
        <div className="row justify-content-center ">
            <p>You Must Login First</p>
        </div>
    );
};

export default Guest;