import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Styles.css";
import Timer from "./Timer.js";
import ReadyButton from "./ReadyButton.js";
import Score from "./Score.js";
import Profile from "./Profile.js";
import Gameboard from "./Gameboard.js";
import Wordlist from "./Wordlist.js";
import Input from "./Input.js";

function Boggle(props) {
    // Destructuring props
    const { token, setToken, username, games, setGames, handleLogout, verifyLogin } = props;

    // Default time limit for Boggle in seconds
    const defaultTime = 180;

    // Initial states for various components and states
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(defaultTime);
    const [isReady, setIsReady] = useState(false);
    const [isSubmittingDisabled, setIsSubmittingDisabled] = useState(false);
    const [gameId, setGameId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const placeholderDice = ["?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];
    const [dice, setDice] = useState(placeholderDice);
    const [selectedDice, setSelectedDice] = useState([]);

    // Effect hook for handling countdown timer
    useEffect(() => {
        if (isReady && time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (time === 0) {
            setIsSubmittingDisabled(true);
            setIsReady(false);
            setSelectedDice([]);
            verifyLogin();
        }
    }, [isReady, time]);

    // Handler for input changes
    const handleNewWordChange = (event) => {
        setNewWord(event.target.value);
    };

    // Handler for form submissions
    const handleNewWordSubmit = async (event) => {
        event.preventDefault();
        const trimmedNewWord = newWord.trim().toLocaleLowerCase("fi-FI");
        if (trimmedNewWord.length >= 3 && trimmedNewWord.length <= 16 && gameId) {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.post("http://localhost:3001/submit-word",
                    {
                        gameId: gameId, word: trimmedNewWord
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                const { valid, points, newToken } = response.data;
                if (valid) {
                    setWords([...words, trimmedNewWord]);
                    setScore(points);
                }
                setNewWord("");
                setSelectedDice([]);
                setToken(newToken);
                localStorage.setItem("token", newToken);
            } catch (error) {
                console.error("Error submitting word: ", error);
            }
        }
    };

    // Handler for keydown events on Enter key
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleNewWordSubmit(event);
        }
    };

    // Effect hook for adding and removing keydown event listener
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    // Handler for clicking the ready button
    const handleReadyClick = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:3001/start", null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { gameId, flatGameboard, points, newToken } = response.data;
            setGameId(gameId);
            setDice(flatGameboard);
            setScore(points);
            setTime(defaultTime);
            setWords([]);
            setNewWord("");
            setIsSubmittingDisabled(false);
            setToken(newToken);
            localStorage.setItem("token", newToken);
        } catch (error) {
            console.error("Error starting game: ", error);
        }
        setIsReady(true);
    };

    return (
        <Container fluid="lg">
            <Row className="mt-2 d-flex justify-content-sm-between">
                <Timer time={time} />
                <ReadyButton
                    handleReadyClick={handleReadyClick}
                    isReady={isReady}
                />
                <Col md={4} className="d-flex justify-content-end">
                    <Score score={score} />
                    <Profile isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} username={username} games={games} handleLogout={handleLogout} />
                </Col>
            </Row>
            <Row className="mt-4 d-flex justify-content-around">
                <Gameboard
                    dice={dice}
                    words={words}
                    newWord={newWord}
                    setNewWord={setNewWord}
                    selectedDice={selectedDice}
                    setSelectedDice={setSelectedDice}
                />
                <Wordlist words={words} />
            </Row>
            <Row className="mt-4 d-flex justify-content-sm-center">
                <Input
                    handleNewWordSubmit={handleNewWordSubmit}
                    newWord={newWord}
                    handleNewWordChange={handleNewWordChange}
                    isReady={isReady}
                    isSubmittingDisabled={isSubmittingDisabled}
                />
            </Row>
        </Container>
    );
}

export default Boggle;