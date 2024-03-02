import { Col, Button, Modal } from "react-bootstrap";
import "./Styles.css";

function Profile(props) {
    // Destructuring props
    const { isPopupOpen, setIsPopupOpen, username, games, handleLogout } = props;

    // Array to store sorted games
    let sortedGames = [];
    if (games) {
        sortedGames = games.slice().sort((a, b) => b.points - a.points);
    }

    // Function to toggle the visibility of the profile popup
    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    // Function to handle logout
    const logout = () => {
        handleLogout();
    }

    // Function to get the first letter of the username for the profile button
    const getProfileButtonLetter = () => {
        if (username && username.length > 0) {
            return username.charAt(0).toUpperCase();
        }
        return "?";
    };

    return (
        <Col md={2} className="d-flex justify-content-center">
            <Button className="inputSubmit profileButton" variant="primary" onClick={togglePopup}>
                {getProfileButtonLetter()}
            </Button>
            <Modal show={isPopupOpen} onHide={togglePopup}>
                <Modal.Header closeButton className="profileHeaderAndFooter">
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="profileModalBody profileBackground">
                    <h2>Username: {username}</h2>
                    <h4>Previous games:</h4>
                    <ul className="noBullets">
                        {sortedGames && sortedGames.map((game, index) => (
                            <li key={index} className="previousGames">
                                <div>
                                    <h6>
                                        Score:
                                    </h6>
                                    <p>
                                        {game.points}
                                    </p>
                                </div>
                                <div>
                                    <h6>
                                        Submitted Words: 
                                    </h6>
                                    <p>
                                        {game.submittedWords.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <h6>
                                        Gameboard:
                                    </h6>
                                    <div>
                                        <Col md={4}>
                                            <div className="grid-container">
                                                {game.gameboard && game.gameboard.flat().map((die, index) => (
                                                    <div key={index} className="profile-grid-item">
                                                        {die && die.toUpperCase()}
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer className="profileHeaderAndFooter justify-content-between">
                    <Button variant="dark" onClick={logout}>
                        Logout
                    </Button>
                    <Button variant="secondary" onClick={togglePopup}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default Profile;