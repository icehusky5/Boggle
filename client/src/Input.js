import { Col, Form, Button } from "react-bootstrap";
import "./Styles.css";

function Input(props) {
    // Destructuring props
    const { handleNewWordSubmit, newWord, handleNewWordChange, isReady, isSubmittingDisabled } = props;

    return (
        <Col md={6}>
            <Form onSubmit={handleNewWordSubmit}>
                <Form.Group>
                    <Form.Label className="inputLabel">Input:</Form.Label>
                    <Form.Control
                        className="input"
                        type="text"
                        placeholder="Enter a new word"
                        value={newWord}
                        onChange={handleNewWordChange}
                        disabled={!isReady}
                    />
                </Form.Group>
                <Button
                    className="inputSubmit mt-2"
                    variant="primary"
                    type="submit"
                    disabled={!isReady || isSubmittingDisabled}
                >
                    Submit
                </Button>
            </Form>
        </Col>
    );
}

export default Input;