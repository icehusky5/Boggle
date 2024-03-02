import { Col, Button } from "react-bootstrap";
import "./Styles.css";

function ReadyButton(props) {
    // Destructuring props
    const { handleReadyClick, isReady } = props;

    return (
        <Col md={2} className="d-flex justify-content-sm-center align-items-baseline">
            <Button
                className="readyButton mt-2"
                variant="primary"
                onClick={handleReadyClick}
                disabled={isReady}
            >
                Ready
            </Button>
        </Col>
    );
}

export default ReadyButton;