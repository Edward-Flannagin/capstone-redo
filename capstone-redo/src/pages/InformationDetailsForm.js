// src/pages/InformationDetailsForm.jsx
import React, { useState, useEffect } from "react";
import "../formErrors.css";
import { useFilledField } from "../context/useFilledField"

const InformationDetailsForm = ({
    reservation = {},
    setReservation = () => { },
    onNext = () => { },
    onBack = () => { },
    onOpenReview = () => { },
    isSaving = false,
}) => {
    // Normalize incoming reservation shape
    const incomingContact = reservation.contact || {};
    const [email, setEmail] = useState(incomingContact.email ?? "");
    const [phoneNumber, setPhoneNumber] = useState(incomingContact.phoneNumber ?? "");
    const [firstName, setFirstName] = useState(incomingContact.firstName ?? "");
    const [lastName, setLastName] = useState(incomingContact.lastName ?? "");
    const [contactMethod, setContactMethod] = useState(incomingContact.contactMethod ?? "email");

    const handleContactMethodChange = (value) => {
        setContactMethod(value);
        // remove the other method's error immediately so it doesn't linger
        setErrors((prev) => {
            const copy = { ...prev };
            if (value === "email") delete copy.phoneNumber;
            if (value === "phone") delete copy.email;
            return copy;
        });
    };

    const clearErrorKey = (key) => {
        setErrors((prev) => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = "Please enter your first name";
        if (!lastName.trim()) newErrors.lastName = "Please enter your last name";
        // if the selected preferred contact is email
        if (contactMethod === "email") {
            // if the email field is empty
            if (!email.trim()) newErrors.email = "Please enter your email";

            // else if the email in the email field is invalid
            else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email";

            // else if the selected prefered contact is phone
        } else if (contactMethod === "phone") {
            // if the phone field is left empty
            if (!phoneNumber.trim()) newErrors.phoneNumber = "Please enter your phone number";

            // else if the phone number in the filed is invalid
            else if (!/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phoneNumber))
                newErrors.phoneNumber = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [errors, setErrors] = useState({});

    const firstNameStyle = useFilledField(firstName)
    const lastNameStyle = useFilledField(lastName)
    const emailStyle = useFilledField(email)
    const phoneStyle = useFilledField(phoneNumber)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        // Update reservation with contact data and open review
        const contactData = {
            email,
            phoneNumber,
            firstName,
            lastName,
            contactMethod
        };
        onOpenReview({ contact: contactData });
    };

    return (
        <div className="reservation-container">
            <form className="reservation-form-info" onSubmit={handleSubmit} noValidate>

                {/* TITLE */}
                <label className="label-info-details name-label">
                    <h2 className="h2-label">Please enter the name for your reservation</h2>
                </label>


                {/* FIRST NAME */}
                <label htmlFor="reservation-first" className="label-info-details">First Name:</label>
                <div className="field-wrapper">
                    <input
                        type="text"
                        id="reservation-first"
                        required
                        aria-required="true"
                        value={firstName}
                        className={`input ${firstNameStyle.className} ${errors.firstName ? "error" : ""}`}
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={firstNameStyle.onBlur}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "error-firstName" : undefined}
                    />
                    {errors.firstName && (
                        <div className="error-message" id="error-firstName">
                            ✗ {errors.firstName}
                        </div>
                    )}
                </div>

                {/* LAST NAME */}
                <label htmlFor="reservation-last" className="label-info-details">Last Name:</label>
                <div className="field-wrapper">
                    <input
                        type="text"
                        id="reservation-last"
                        required
                        aria-required="true"
                        value={lastName}
                        className={`input ${lastNameStyle.className} ${errors.lastName ? "error" : ""}`}
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={lastNameStyle.onBlur}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "error-lastName" : undefined}
                    />
                    {errors.lastName && (
                        <div className="error-message" id="error-lastName">
                            ✗ {errors.lastName}
                        </div>
                    )}
                </div>

                {/* COMMUNICATION METHOD */}
                <label className="label-info-details communication-label">
                    <h2 className="h2-label">Please select your preferred method of communication</h2>
                </label>

                <div className="radio-row">

                    {/* EMAIL OPTION */}
                    <div className="radio-option-with-field">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="contactMethod"
                                value="email"
                                checked={contactMethod === "email"}
                                onChange={() => handleContactMethodChange("email")}
                            />
                            <span className="custom-radio"></span>
                            Email
                        </label>

                        <div className={`animated-field ${contactMethod !== "email" ? "hidden" : ""}`}>
                            <label htmlFor="reservation-email" className="label-info-details">Email:</label>
                            <div className="field-wrapper">
                                <input
                                    type="email"
                                    id="reservation-email"
                                    required
                                    aria-required="true"
                                    value={email}
                                    className={`input ${emailStyle.className} ${errors.email ? "error" : ""}`}
                                    placeholder="your_email@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={emailStyle.onBlur}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "error-email" : undefined}
                                />
                            </div>
                            {errors.email && (
                                <div className="error-message" id="error-email">
                                    ✗ {errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PHONE OPTION */}
                    <div className="radio-option-with-field">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="contactMethod"
                                value="phone"
                                checked={contactMethod === "phone"}
                                onChange={() => handleContactMethodChange("phone")}
                            />
                            <span className="custom-radio"></span>
                            Phone
                        </label>

                        <div className={`animated-field ${contactMethod !== "phone" ? "hidden" : ""}`}>
                            <label htmlFor="reservation-phone" className="label-info-details">Phone Number:</label>
                            <div className="field-wrapper">
                                <input
                                    type="tel"
                                    id="reservation-phone"
                                    required
                                    aria-required="true"
                                    value={phoneNumber}
                                    className={`input ${phoneStyle.className} ${errors.phoneNumber ? "error" : ""}`}
                                    placeholder="(123)-123-4567"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    onBlur={phoneStyle.onBlur}
                                    aria-invalid={!!errors.phoneNumber}
                                    aria-describedby={errors.phoneNumber ? "error-phoneNumber" : undefined}
                                />
                            </div>
                            {errors.phoneNumber && (
                                <div className="error-message" id="error-phoneNumber">
                                    ✗ {errors.phoneNumber}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="submit-button-container">
                    <div className="form-actions" style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 16 }}>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                            {/* Back button */}
                            <button type="button" className="category-button same-width-btn" onClick={() => onBack?.()}>
                                Back
                            </button>

                            {/* Continue button: disabled when saving or when form invalid */}
                            <button
                                type="submit"
                                className="category-button same-width-btn"
                            >
                                {isSaving ? "Saving…" : "Review Reservation"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* GLOBAL ALERTS */}
            <div className="alerts-container" aria-live="polite">
            </div>
        </div>
    );
};

export default InformationDetailsForm;