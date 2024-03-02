import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import "./Styles.css";

function Gameboard(props) {
    // Destructuring props
    const { dice, words, setNewWord, selectedDice, setSelectedDice } = props;

    // Reset selectedDice when the words array changes
    useEffect(() => {
        setSelectedDice([]);
    }, [words]);

    // Handle click on a die in the gameboard
    const handleDieClick = (die, index) => {
        if (selectedDice.includes(index)) {
            // Deselect the die if already selected
            setSelectedDice((prevSelectedDice) =>
                prevSelectedDice.filter((selectedIndex) => selectedIndex !== index)
            );
        } else {
            // Select the die and add its letter to the new word
            setSelectedDice((prevSelectedDice) => [...prevSelectedDice, index]);
            setNewWord((prevNewWord) => prevNewWord + die.toLocaleLowerCase("fi-FI"));
        }
    };

    // Update the new word when selectedDice or dice changes
    useEffect(() => {
        const word = selectedDice
            .map((index) => dice[index])
            .join("")
            .toLocaleLowerCase("fi-FI");
        setNewWord(word);
    }, [selectedDice, dice]);

    return (
        <Col md={4}>
            <div className="grid-container">
                {dice && dice.map((die, index) => (
                    <div
                        key={index}
                        className={`grid-item ${selectedDice.includes(index) ? "selected-item" : ""}`}
                        onClick={() => handleDieClick(die, index)}
                    >
                        <p>{die && die.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </Col>
    );
}

export default Gameboard;