import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { validEmail, validPassword } from './Regex';
import { signup } from '../../actions/userActions';

const SignupScreen = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeMessage, setActiveMessage] = useState('');
  const [show, changeshow] = useState('fa fa-eye-slash');
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userSignup = useSelector((state) => state.userSignup);
  const [validationError, setValidationError] = useState('');
  const { loading, userInfo, error } = userSignup;

  useEffect(() => {
    if (userInfo) {
      console.log(error);
      setActiveMessage(userInfo.detail);
      setFname('');
      setLname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [userInfo, redirect]);

    // Clear activeMessage after 3 seconds
    useEffect(() => {
      if (activeMessage) {
        const timer = setTimeout(() => setActiveMessage(""), 5000);
        return () => clearTimeout(timer); // Cleanup timer
      }
    }, [activeMessage]);
  
    // Clear validationError after 3 seconds
    useEffect(() => {
      if (validationError) {
        const timer = setTimeout(() => setValidationError(""), 3000);
        return () => clearTimeout(timer); // Cleanup timer
      }
    }, [validationError]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validEmail.test(email)) {
      setValidationError('Invalid Email');
      navigate('/signup');
    }
    else if (!validPassword.test(password)) {
      setValidationError('Invalid Password');
      navigate('/signup');
    }
    else if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      navigate('/signup');
    }
    
    else {
      dispatch(signup(fname, lname, email, password));
      setActiveMessage("Signup Successful");
      // navigate('/login');
    }
  };

  const showPassword = () => {
    var x = document.getElementById('password');
    var y = document.getElementById('confirmPassword');
    if (x.type === 'password' && y.type === 'password') {
      x.type = 'text';
      y.type = 'text';
      changeshow('fa fa-eye')
    } else {
      x.type = 'password';
      y.type = 'password';
      changeshow('fa fa-eye-slash')
    }
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h3" className="text-center bg-black text-light">
              Sign Up
            </Card.Header>
            <Card.Body>
              {activeMessage && <Message variant="success">{activeMessage}</Message>}
              {validationError && <Message variant="danger">{validationError}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label>
                    {" "}
                    <span>
                      <i className="fa fa-user"></i>
                    </span>{" "}
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                  <Form.Label>
                    {" "}
                    <span>
                      <i className="fa fa-user"></i>
                    </span>{" "}
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    {" "}
                    <span>
                      <i className="fa-solid fa-envelope"></i>
                    </span>{""}
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>
                    {" "}
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword} />{' '}
                    <Form.Control
                      placeholder="Enter Your Password"
                      type="password"
                      required
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <small>
                  Password must include at least [1-9][a-z][A-Z][_$@*!..] & 5 Characters
                </small>
                <Form.Group className="mb-3" >
                  <Form.Label>
                    {" "}
                    <span>
                      <i className={show}></i>
                    </span>{" "}
                    Confirm Password
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox onClick={showPassword} />{' '}
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      required
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>
                <br />
                <div className="d-grid gap-2">
                  <Button className="btn btn-md btn-success" type="submit">
                    {" "}
                    Sign Up {" "}
                  </Button>
                </div>
              </Form>
              <Row className="py-3">
                <Col>
                  Have an Account? <Link to="/login">Login</Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
};

export default SignupScreen;
