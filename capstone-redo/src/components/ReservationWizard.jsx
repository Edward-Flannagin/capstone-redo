import React, { useState, useCallback, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import BackButton from "./BackButton.jsx";
import ProgressStepper from "../components/ProgressStepper";
import BookingPage from "../pages/BookingPage.js";
import TableSelectPage from "../pages/TableSelectPage.js";
import InformationDetailsPage from "../pages/InformationDetailsPage.js";
import ReservationReviewOverlay from "./ReservationReviewOverlay.jsx";
import FullScreenSuccessOverlay from "./FullScreenSuccessOverlay.jsx";
import { applyStepperTheme } from "../utils/stepperTheme.js";
import { useNavigate } from "react-router-dom";

/**
 * TopStepperWrapper
 * - Applies theme to the stepper container and re-applies on resize/theme changes.
 */
function TopStepperWrapper({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    applyStepperTheme(ref.current);
    const ro = new ResizeObserver(() => applyStepperTheme(ref.current));
    ro.observe(document.body);

    const onTheme = () => applyStepperTheme(ref.current);
    window.addEventListener("themechange", onTheme);
    return () => {
      ro.disconnect();
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return <div ref={ref} className="progress-stepper-wrapper">{children}</div>;
}

TopStepperWrapper.propTypes = {
  children: PropTypes.node,
};

/**
 * Steps (review removed from linear steps; review will be a popup)
 */
const steps = [
  { id: "booking", title: "Date & Time", Component: BookingPage },
  { id: "table", title: "Table Select", Component: TableSelectPage },
  { id: "contact", title: "Contact Info", Component: InformationDetailsPage },
  { id: "success", title: "Success", Component: FullScreenSuccessOverlay },
];

export default function ReservationWizard({ initialReservation = {}, onFinish }) {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [reservation, setReservation] = useState(() => ({
    date: null,
    time: null,
    guests: 2,
    location: null,
    tableId: null,
    seats: [],
    contact: { firstName: "", lastName: "", phoneNumber: "", email: "", contactMethod: "" },
    extras: {},
    ...initialReservation,
  }));

  const [savedSnapshot, setSavedSnapshot] = useState(reservation);
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  // Controls whether the review overlay (modal) is visible
  const [showReview, setShowReview] = useState(false);

  // Focus management for modal
  const reviewRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    if (showReview) {
      lastFocusedRef.current = document.activeElement;
      // move focus into modal
      const firstFocusable = reviewRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
      const onKey = (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          closeReview();
        } else if (e.key === "Tab") {
          // simple focus trap
          const focusable = reviewRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
        lastFocusedRef.current?.focus?.();
      };
    }
  }, [showReview]);

  const goNext = useCallback((patch = {}) => {
    setReservation((r) => ({ ...r, ...patch }));
    setIndex((i) => Math.min(steps.length - 1, i + 1));
  }, []);

  const goBack = useCallback(() => {
    setIndex((i) => {
      if (i === 0) {
        navigate("/", { replace: true });
        return 0;
      }
      return Math.max(0, i - 1);
    });
  }, [navigate]);

  const confirmAndFinish = useCallback(
    async (patch = {}) => {
      setIsSaving(true);
      setGlobalError(null);
      try {
        const finalReservation = { ...reservation, ...patch };
        setSavedSnapshot(finalReservation);
        setReservation(finalReservation);
        setShowReview(false);
        await Promise.resolve(); // placeholder for async save if needed
        // Advance to success step instead of calling onFinish
        setIndex(steps.length - 1);
        onFinish?.(finalReservation);
      } catch (err) {
        setGlobalError("Failed to confirm reservation. Try again.");
      } finally {
        setIsSaving(false);
      }
    },
    [reservation, onFinish]
  );

  const cancelToSaved = useCallback(() => {
    setReservation(savedSnapshot);
    setIndex(0);
    setShowReview(false);
  }, [savedSnapshot]);

  const openReview = useCallback((patch = {}) => {
    setReservation((r) => ({ ...r, ...patch }));
    setShowReview(true);
  }, []);

  const closeReview = useCallback(() => setShowReview(false), []);

  const CurrentStep = steps[index].Component;

  return (
    <div className="reservation-wizard" aria-live="polite">
      <header
        className="wizard-header"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <BackButton onBack={goBack} disabled={false} />
        <div>
          <strong>{steps[index].title}</strong>
          <div className="wizard-step" style={{ fontSize: 13, color: "#666" }}>
            Step {index + 1} of {steps.length}
          </div>
        </div>
      </header>

      {globalError && (
        <div className="wizard-error" role="alert">
          {globalError}
        </div>
      )}

      <main className="wizard-main">
        <CurrentStep
          reservation={reservation}
          setReservation={setReservation}
          onNext={goNext}
          onBack={goBack}
          onOpenReview={openReview} // contact page should call this to open the popup
          isSaving={isSaving}
          showTitle={true}
          // Props for FullScreenSuccessOverlay
          message={`Thank you for your reservation on ${reservation.date ? new Date(reservation.date).toLocaleDateString() : 'your selected date'} at ${reservation.time || 'your selected time'} for ${reservation.guests || 'your party'}. ${
            reservation.contact?.contactMethod === "email"
              ? `You will receive a confirmation message via email at ${reservation.contact?.email || 'your email'}.`
              : reservation.contact?.contactMethod === "phone"
              ? `You will receive a confirmation message via text at ${reservation.contact?.phoneNumber || 'your phone number'}.`
              : ""
          }`}
          onDone={() => {
            navigate("/");
          }}
          TopComponent={() => (
            <TopStepperWrapper>
              <ProgressStepper
                steps={steps.map((s) => s.title)}
                current={index}
                onStepClick={(i) => {
                  if (i <= index) setIndex(i);
                }}
              />
            </TopStepperWrapper>
          )}
        />
      </main>

      {/* Review modal popup */}
      {showReview && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            // close when clicking backdrop (but not when clicking inside modal)
            if (e.target === e.currentTarget) closeReview();
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            ref={reviewRef}
            role="dialog"
            aria-modal="true"
            aria-label="Review reservation"
            className="modal"
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 20,
              width: "90%",
              maxWidth: 720,
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <ReservationReviewOverlay
              data={{
                booking: {
                  date: reservation.date,
                  time: reservation.time,
                  guests: reservation.guests,
                  occasion: reservation.occasion
                },
                table: reservation.table || {},
                contact: reservation.contact || {}
              }}
              onCancel={closeReview}
              onConfirm={confirmAndFinish}
              onEdit={() => {
                // close review and keep user on contact step for edits
                setShowReview(false);
              }}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ReservationWizard.propTypes = {
  initialReservation: PropTypes.object,
  onFinish: PropTypes.func,
};