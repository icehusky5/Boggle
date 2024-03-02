import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Styles.css";

function Register(props) {
    // Destructuring props
    const { onRegister } = props;

    // State for handling username and password inputs
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle register submission
    const handleRegister = async (event) => {
        event.preventDefault();
        onRegister(username, password);
    };

    return (
        <Container>
            <Row className="mt-5 d-flex justify-content-sm-center">
                <Col md={6}>
                    <Form onSubmit={handleRegister}>
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
                            Register
                        </Button>
                        <div className="mt-4">
                            <Link to="/login">Login</Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
