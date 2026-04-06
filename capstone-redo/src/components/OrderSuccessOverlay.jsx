import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import "./OrderSuccessOverlay.css";
import PropTypes from "prop-types";

const OrderSuccessOverlay = ({ orderData, onDone }) => {
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
        }, interval);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 0) {
            onDone && onDone();
        }
    }, [progress, onDone]);

    const handleReturnHome = () => {
        navigate("/");
    };

    const getOrderTypeText = () => {
        if (!orderData?.deliveryType) return "Your order has been placed!";
        switch (orderData.deliveryType) {
            case "delivery":
                return "Your order is being prepared for delivery!";
            case "curbside":
                return "Your order will be ready for curbside pickup in 20 minutes!";
            default:
                return "Your order has been placed!";
        }
    };

    const getEstimatedTime = () => {
        if (!orderData?.deliveryType) return "30-45 minutes";
        switch (orderData.deliveryType) {
            case "delivery":
                return "45-60 minutes";
            case "curbside":
                return "20-30 minutes";
            default:
                return "30-45 minutes";
        }
    };

    return (
        <div className="order-success-overlay">
            <Confetti width={width} height={height} numberOfPieces={40} recycle={true} gravity={0.3} />
            <div className="order-success-content">
                <h1 className="order-success-text-h1">Order Confirmed!</h1>
                <img src="./celebratory image.png" alt="Order Success" className="order-success-image" />
                <h2 className="order-success-text-h2">{getOrderTypeText()}</h2>
                <p className="order-success-text-p">
                    Thank you for your order! We'll send you updates via email and SMS.
                    {orderData?.deliveryType === "curbside" && orderData?.vehicleInfo &&
                        ` Please have your vehicle ready with license plate: ${orderData.vehicleInfo}.`
                    }
                    {orderData?.deliveryType === "delivery" && orderData?.deliveryAddress &&
                        ` Your order will be delivered to: ${orderData.deliveryAddress}.`
                    }
                </p>
                <div className="order-details">
                    <div className="order-detail-item">
                        <span className="detail-label">Order Number:</span>
                        <span className="detail-value">#{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                    </div>
                    <div className="order-detail-item">
                        <span className="detail-label">Estimated Time:</span>
                        <span className="detail-value">{getEstimatedTime()}</span>
                    </div>
                    <div className="order-detail-item">
                        <span className="detail-label">Total:</span>
                        <span className="detail-value">${orderData?.total || "0.00"}</span>
                    </div>
                </div>
                <button type="button" className="order-success-home-button" onClick={handleReturnHome}>
                    Return to Home
                </button>
                <p className="order-thank-you">
                    Thank you for choosing Little Lemon!
                </p>
            </div>

            <div className="order-success-timer-bar">
                <div className="order-success-timer-progress" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

OrderSuccessOverlay.propTypes = {
    orderData: PropTypes.object,
    onDone: PropTypes.func
};

export default OrderSuccessOverlay;