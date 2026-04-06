// src/components/FadingAlert.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FadingAlert = ({
    icon,
    message,
    children,
    duration = 1500,
    fadeDuration = 400,
    onDone,
    className = "",
}) => {
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // If there's no content, do nothing
        if (!message && !children) return;

        const startFade = setTimeout(() => setFading(true), duration);
        const finish = setTimeout(() => {
            onDone && onDone();
        }, duration + fadeDuration);

        return () => {
            clearTimeout(startFade);
            clearTimeout(finish);
        };
    }, [message, children, duration, fadeDuration, onDone]);

    // nothing to render if no message/children
    if (!message && !children) return null;

    return (
        <div className={`field-alert ${fading ? "fade-out" : ""} ${className}`.trim()} role="status" aria-live="polite">
            <i className="bi bi-exclamation-octagon-fill error-icon" aria-hidden="true"></i>

            {message !== undefined && message !== null ? message : children}
        </div>
    );
};

FadingAlert.propTypes = {
    message: PropTypes.string,
    children: PropTypes.node,
    duration: PropTypes.number,
    fadeDuration: PropTypes.number,
    onDone: PropTypes.func,
    className: PropTypes.string,
};

export default FadingAlert;