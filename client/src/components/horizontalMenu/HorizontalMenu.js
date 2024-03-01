import Navbar from "react-bootstrap/Navbar";
import React from "react";
import {Container, Nav, NavLink} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideoSlash} from "@fortawesome/free-solid-svg-icons/faVideoSlash";
import "../../App.css";
import Store from "../store";
import {useDispatch} from "react-redux";
import {clearCurrentUser, setCurrentUser} from "../store/action/user";

const currentUser = Store.getState().user;

export default function HorizontalMenu() {
    const dispatch = useDispatch();

    return (
        <div className="horizontalMenu">
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/"
                                  style={{
                                      color: "gold"
                                      , marginLeft: "30px", marginRight: "40px"
                                  }}>
                        <FontAwesomeIcon icon={faVideoSlash}/>
                        Banking App
                    </Navbar.Brand>
                    <Nav style={{flex: "max-content"}}>
                        <NavLink className="nav-link" href="/transactionHistory">
                            Transaction History
                        </NavLink>
                    </Nav>
                    {/*<NavLink className="nav-link" style={{color: "cyan", marginRight: "10px"}} href="/register">
                        Register
                    </NavLink>*/}
                    {currentUser?.token ?
                        <NavLink className="nav-link" style={{color: "cyan"}} href="/login"
                                 onClick={()=>dispatch(clearCurrentUser()) }>
                            LogOut
                        </NavLink>
                        :
                        <NavLink className="nav-link" style={{color: "cyan"}} href="/login">
                            Login
                        </NavLink>}
                </Container>
            </Navbar>
        </div>
    );
};