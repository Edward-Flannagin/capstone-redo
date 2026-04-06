import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./FullScreenSuccessOverlay.css"
import PropTypes from "prop-types";

const FullScreenSuccessOverlay = ({ imageSrc, message, onDone }) => {
    const [width, height] = useWindowSize();
    const [progress, setProgress] = useState(80);
    const navigate = useNavigate();

    useEffect(() => {
        const duration = 20000; // 20 seconds
        const interval = 50; // update every 50 milliseconds
        const step = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - step;
            });
        }, interval)
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 0) {
            onDone && onDone();
        }
    }, [progress, onDone]);

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
                <div className="success-timer-progress" style={{ width: `${progress}%` }} />
            </div>
        </div>
    )
};

FullScreenSuccessOverlay.propTypes = {
    imageSrc: PropTypes.string,
    onDone: PropTypes.func
}

export default FullScreenSuccessOverlay;