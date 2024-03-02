import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Styles.css";

function Login(props) {
    // Destructuring props
    const { onLogin, loginFailed } = props;

    // State for handling username and password inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle login submission
    const handleLogin = async (event) => {
        event.preventDefault();
        onLogin(username, password);
    };

    return (
        <Container>
            <Row className="mt-5 d-flex justify-content-sm-center">
                <Col md={6}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mt-2" controlId="formUsername">
                            <Form.Label className="inputLabel">Username:</Form.Label>
                            <Form.Control
                                className="input"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </Form.Group>

                        <Form.Group className="mt-2" controlId="formPassword">
                            <Form.Label className="inputLabel">Password:</Form.Label>
                            <Form.Control
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </Form.Group>

                        <Button className="inputSubmit mt-3" variant="primary" type="submit">
                            Login
                        </Button>
                        <div className="mt-4">
                            <Link to="/register">Register</Link>
                        </div>
                        {loginFailed &&
                            <div className="mt-4">
                                <Alert variant="danger">Login failed. Check your username and password.</Alert>
                            </div>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;