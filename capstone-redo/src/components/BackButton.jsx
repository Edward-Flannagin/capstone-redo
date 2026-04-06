import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

/**
 * BackButton
 *
 * - Calls `onBack` if provided.
 * - If no `onBack`, will call router back when `useRouterBack` is true.
 * - If history is very short (likely entry point) and `exitOnShortHistory` is true,
 *   navigates to `exitPath` instead of calling `history.back()`.
 * - Falls back to `window.history.back()` or `window.location.href` when router isn't available.
 */
export default function BackButton({
  label = "Back",
  onBack = null,
  useRouterBack = false,
  confirmMessage = null,
  disabled = false,
  className = "",
  ariaLabel = "Go Back",
  onAnalytics = null,
  exitPath = "/",
  exitOnShortHistory = true,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    if (confirmMessage && !window.confirm(confirmMessage)) return;

    onAnalytics?.("back_click", { label });

    // Prefer parent-provided handler
    if (typeof onBack === "function") {
      onBack(e);
      return;
    }

    // Use router history back if requested
    if (useRouterBack && typeof navigate === "function") {
      try {
        navigate(-1);
        return;
      } catch (err) {
        // fall through to other strategies
      }
    }

    // If the browser history is very short (likely the user landed here),
    // navigate to a safe exit path instead of calling history.back()
    try {
      const historyLength = window.history?.length ?? 0;
      if (exitOnShortHistory && exitPath && historyLength <= 1) {
        // Prefer SPA navigation when possible
        if (typeof navigate === "function") {
          navigate(exitPath, { replace: true });
        } else {
          window.location.href = exitPath;
        }
        return;
      }
    } catch (err) {
      // ignore and fallback
    }

    // Fallback to browser history back
    try {
      window.history.back();
    } catch (err) {
      // Last resort: full redirect to exitPath
      if (exitPath) window.location.href = exitPath;
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`back-button ${className}`}
      aria-label={ariaLabel}
    >
      ← <span className="sr-only">{label}</span>
      <span aria-hidden="true">{label}</span>
    </button>
  );
}

BackButton.propTypes = {
  label: PropTypes.string,
  onBack: PropTypes.func,
  useRouterBack: PropTypes.bool,
  confirmMessage: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  onAnalytics: PropTypes.func,
  exitPath: PropTypes.string,
  exitOnShortHistory: PropTypes.bool,
};