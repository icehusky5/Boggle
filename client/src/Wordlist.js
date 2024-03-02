import React, { useRef, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import "./Styles.css";

function Wordlist(props) {
    // Destructuring props
    const { words } = props;

    // Ref to the scrollable list for automatic scrolling
    const scrollableListRef = useRef(null);

    // Effect to scroll the list to the bottom when words are updated
    useEffect(() => {
        const scrollableList = scrollableListRef.current;
        if (scrollableList) {
            scrollableList.scrollTop = scrollableList.scrollHeight;
        }
    }, [words]);

    return (
        <Col md={4}>
            <h4>Words:</h4>
            <ListGroup className="wordlist" ref={scrollableListRef}>
                {words.map((word, index) => (
                    <ListGroup.Item className="wordlist-item" key={index}>{word}</ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
    );
}

export default Wordlist;