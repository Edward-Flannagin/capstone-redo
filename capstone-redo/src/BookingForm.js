import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import CustomDropdown from "./CustomDropdown.jsx";
import "./formErrors.css";
import "react-datepicker/dist/react-datepicker.css";
import "./my-datepicker.css";

/*
  Preserves original ids, classNames, layout and labels.
  Sends top-level reservation fields (date, time, guests, occasion)
  to the parent via onNext(patch).
*/

export default function BookingForm({
    reservation = {},
    setReservation = () => { },
    onNext = () => { },
    onBack = () => { },
    saveDraft = null,
    isSaving = false,
    availableTimes = [],
    occasions = ["", "Anniversary", "Birthday"],
}) {
    // Normalize incoming reservation shape: accept either top-level or nested booking
    const incoming = reservation;
    const initialDate = incoming.date ? new Date(incoming.date) : null;
    const [time, setTime] = useState(incoming.time ?? "");
    const [guests, setGuests] = useState(incoming.guests ?? 1);
    const [occasion, setOccasion] = useState(incoming.occasion ?? "");

    const [date, setDate] = useState(initialDate);
    const [dateTouched, setDateTouched] = useState(false);
    const [timeTouched, setTimeTouched] = useState(false);
    const [guestTouched, setGuestTouched] = useState(false);
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (availableTimes && availableTimes.length > 0 && !time) {
            setTime(availableTimes[0]);
        }
    }, [availableTimes, time]);

    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = "Please select a date";
        if (!time) newErrors.time = "Please select a time";
        if (!guests || guests < 1 || guests > 10)
            newErrors.guests = "Number of guests must be between 1 and 10";

        if (Object.keys(newErrors).length > 0) {
            Object.values(newErrors).forEach((msg) => toast.error(msg));
            setErrors(newErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    // Build a top-level patch and send it to the wizard
    const handleContinue = () => {
        if (!validateForm()) return;

        const patch = {
            // store date as ISO string for consistency across components and persistence
            date: date ? new Date(date).toISOString() : null,
            time,
            guests: Number(guests),
            occasion,
        };

        // update parent state and advance in one call
        setReservation((prev) => ({ ...prev, ...patch }));
        onNext?.(patch);
    };

    const handleSaveDraft = async () => {
        const patch = {
            date: date ? new Date(date).toISOString() : null,
            time,
            guests: Number(guests),
            occasion,
        };

        try {
            if (typeof saveDraft === "function") {
                await saveDraft(patch);
                toast.success("Draft saved");
            } else {
                setReservation((prev) => ({ ...prev, ...patch }));
                toast.info("Draft updated locally");
            }
        } catch (err) {
            toast.error("Failed to save draft");
        }
    };

    return (
        <div className="reservation-container">
            <form className="reservation-form" noValidate>
                <div className="form-field">
                    {/* DATE INPUT */}
                    <label htmlFor="reservation-date" className="label">Choose Date: </label>
                    <div className="field-wrapper">
                        <DatePicker
                            id="reservation-date"
                            className={`input ${dateTouched && date ? "selected-date" : ""} ${errors.date ? "error" : ""}`}
                            selected={date ? new Date(date) : null}
                            onChange={(newDate) => setDate(newDate)}
                            onBlur={() => setDateTouched(true)}
                            popperPlacement="bottom-start"
                            placeholderText="Select a Date"
                        />
                        {errors.date && (
                            <div className="error-message">
                                ✗ {errors.date}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-field">
                    {/* TIME INPUT */}
                    <div className="field-wrapper">
                        <CustomDropdown
                            id="reservation-time"
                            label="Choose Time: "
                            className={`input ${errors.time ? "error" : ""}`}
                            value={time}
                            onChange={(t) => setTime(t)}
                            onBlur={() => setTimeTouched(true)}
                            options={(availableTimes || []).map(t => ({
                                value: t,
                                label:
                                    t === "17:00" ? "5:00 PM" :
                                        t === "18:00" ? "6:00 PM" :
                                            t === "19:00" ? "7:00 PM" :
                                                t === "20:00" ? "8:00 PM" : "9:00 PM"
                            }))}
                        />
                        {errors.time && (
                            <div className="error-message">
                                ✗ {errors.time}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-field">
                    {/* NUMBER OF GUESTS */}
                    <label htmlFor="guests" className="label">Number of Guests: </label>
                    <div className="field-wrapper">
                        <input
                            type="number"
                            placeholder="1"
                            min="1"
                            max="10"
                            id="guests"
                            value={guests}
                            className={`input ${guestTouched && guests ? "selected-date" : ""} ${errors.guests ? "error" : ""}`}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            onBlur={() => setGuestTouched(true)}
                        />
                        {errors.guests && (
                            <div className="error-message">
                                ✗ {errors.guests}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-field">
                    {/* OCCASION */}
                    <label htmlFor="occasion" className="label">Occasion: </label>
                    <CustomDropdown
                        id="occasion"
                        value={occasion}
                        className="input"
                        onChange={(v) => setOccasion(v)}
                        options={[
                            { value: "", label: "Select an Occasion" },
                            { value: "Anniversary", label: "Anniversary" },
                            { value: "Birthday", label: "Birthday" }
                        ]}
                    />
                </div>

                {/* SUBMIT BUTTON */}
                <div className="submit-button-container">
                    <div className="form-actions" style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                            {/* Back button (replaces Skip) */}
                            <button type="button" className="category-button same-width-btn" onClick={() => onBack?.()}>
                                Back
                            </button>

                            {/* Continue button: disabled when saving or when form invalid */}
                            <button
                                type="button"
                                className="category-button same-width-btn"
                                onClick={handleContinue}
                            >
                                {isSaving ? "Saving…" : "Begin my Reservation"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

BookingForm.propTypes = {
    reservation: PropTypes.object,
    setReservation: PropTypes.func,
    onNext: PropTypes.func,
    onBack: PropTypes.func,
    saveDraft: PropTypes.func,
    isSaving: PropTypes.bool,
    availableTimes: PropTypes.array,
    occasions: PropTypes.array,
};