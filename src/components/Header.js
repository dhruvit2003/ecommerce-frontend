import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { redirect } from 'react-router-dom'

const Header = () => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid" bis_skin_checked="1">
                    <LinkContainer to="/">
                        <Nav.Link className="navbar-brand"> Ecommerce Cart</Nav.Link>
                    </LinkContainer>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02" bis_skin_checked="1">
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <LinkContainer to="/">
                                    <Nav.Link className="nav-link active">Home <i className='fa-solid fa-house' /></Nav.Link>
                                </LinkContainer>
                            </li>

                            <li className="nav-item">
                                <LinkContainer to="/cart">
                                    <Nav.Link className="nav-link"> Cart</Nav.Link>
                                </LinkContainer>
                            </li>

                            {userInfo ? (
                                <li className="nav-item dropdown">
                                    <LinkContainer to="/">
                                        <Nav.Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                                            aria-haspopup="true" aria-expanded="false">Welcome {userInfo.name}</Nav.Link>
                                    </LinkContainer >                                    
                                    <div className="dropdown-menu">
                                        <Nav.Link className="dropdown-item" onClick={logoutHandler}>Logout</Nav.Link>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item dropdown">
                                    <LinkContainer to="/login">
                                        <Nav.Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">New User?</Nav.Link>
                                    </LinkContainer>
                                    <div className="dropdown-menu" bis_skin_checked="1">
                                        <LinkContainer to="/login">
                                            <Nav.Link className="nav-link"> Login</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/signup">
                                            <Nav.Link className="nav-link"> Signup</Nav.Link>
                                        </LinkContainer>
                                    </div>
                                </li>
                            )}
                        </ul>

                        <form className="d-flex">
                            <input className="form-control me-sm-2" type="search" placeholder="Search" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </Navbar>
        </>
    )
}

export default Header
