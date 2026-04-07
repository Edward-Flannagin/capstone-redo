import React from "react";
import "./ProgressStepper.css";

function ProgressStepper({ steps = [], current = 0, onStepClick }) {
    return (
        <nav className="progress-stepper" aria-label="Reservation Progress">
            <div className="progress-line" aria-hidden="true">
                <div className={`progress-line-fill progress-fill-${Math.round((current / Math.max(1, steps.length - 1)) * 100)}`} />
            </div>

            <ul className="progress-steps" role="list">
                {steps.map((label, i) => {
                    const isActive = i === current;
                    const isCompleted = i < current;
                    return (
                        <li
                            key={label}
                            className={`progress-step ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}
                            role="listitem"
                        >
                            <button
                                type="button"
                                className="progress-step-button"
                                aria-current={isActive ? "step" : undefined}
                                aria-label={`${label} ${isActive ? "(current step)" : ""}`}
                                onClick={() => onStepClick?.(i)}
                            >
                                <span className="progress-step-circle" aria-hidden="true">
                                    {isCompleted ? "✓" : i + 1}
                                </span>
                            </button>

                            <div className="progress-step-label">{label}</div>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}


export default ProgressStepper;