import { Col } from "react-bootstrap";
import "./Styles.css";

function Timer(props) {
    // Destructuring props
    const { time } = props;

    return (
        <Col md={3} className="mt-1 infoCol d-flex justify-content-start">
            <h4 className="info">Time: {time} seconds</h4>
        </Col>
    );
}

export default Timer;