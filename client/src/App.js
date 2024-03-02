import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import Store from "./components/store";
import HorizontalMenu from "./components/HorizontalMenu";
import React from "react";
import TransactionHistory from "./components/TransactionHistory";
import Home from "./components/Home";

const currentUser = Store.getState().user;

function App() {

    /*
        if(!currentUser?.token){
            return (
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                </div>
            )
        }else {
    */

    return (
        <div className="App">
            <HorizontalMenu/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/transactionHistory" element={<TransactionHistory/>}/>
                <Route path="/" element={<Home/>}>
                </Route>
            </Routes>
        </div>
    )
}

export default App;
