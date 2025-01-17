import React, { useState, useEffect } from 'react';
import { Card, Container, Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';


const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Message, setMessage] = useState('');
  const [show, changeshow] = useState('fa fa-eye-slash');
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const showPassword = () => {
    var x = document.getElementById('password');    
    if (x.type === 'password') {
      x.type = 'text';
      changeshow('fa fa-eye')
    } else {
      x.type = 'password';
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
              Login
            </Card.Header>
            <Card.Body>
              {Message && <Message variant="danger">{Message}</Message>}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <span>
                      <i className="fa-solid fa-envelope"></i>
                    </span>{' '}
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
                    <span>
                      <i className={show}></i>
                    </span>{' '}
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
                <br />
                <div className="d-grid gap-2">
                  <Button className="btn btn-md btn-success" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
              <Row className="py-3">
                <Col>
                  New User? <Link to="/signup">Sign Up</Link>
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

export default LoginScreen;
