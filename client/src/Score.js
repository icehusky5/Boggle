import { Col } from "react-bootstrap";
import "./Styles.css";

function Score(props) {
    // Destructuring props
    const { score } = props;

    return (
        <Col className="me-3 mt-1 infoCol d-flex justify-content-end">
            <h4 className="info">Score: {score}</h4>
        </Col>
    );
}

export default Score;