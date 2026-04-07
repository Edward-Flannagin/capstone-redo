import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./FullScreenSuccessOverlay.css"
import PropTypes from "prop-types";

const FullScreenSuccessOverlay = ({ imageSrc, message, onDone }) => {
    const [width, height] = useWindowSize();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            onDone && onDone();
        }, 20000);
        return () => clearTimeout(timer);
    }, [onDone]);

    const handleSubmit = () => {
        navigate("/")
    }

    return (
        <div className="success-overlay">
            <Confetti width={width} height={height} numberOfPieces={40} recycle={true} gravity={0.3} />
            <div className="success-content">
                <h1 className="success-text-h1">Success!</h1>
                <img src="./celebratory image.png" alt="Success" className="success-image" />
                <h2 className="success-text-h2">Your reservation confirmed!</h2>
                <p className="success-text-p">
                    {message}
                </p>
                <button type="button" className="success-home-button" onClick={handleSubmit}>
                    Return to Home
                </button>
                <p className="thank-you">
                    Thank you!
                </p>
                
            </div>

            <div className="success-timer-bar">
                <div className="success-timer-progress" />
            </div>
        </div>
    )
};

FullScreenSuccessOverlay.propTypes = {
    imageSrc: PropTypes.string,
    onDone: PropTypes.func
}

export default FullScreenSuccessOverlay;