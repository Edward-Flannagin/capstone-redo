import React, { useState, useEffect, useReducer } from "react";

import DatePicker from "react-datepicker";
import CustomDropdown from "../CustomDropdown.jsx";
import FadingAlert from "../FadingAlert.jsx";

import { timesReducer, getAvailableTimes } from "../timesReducer.js";

import "react-datepicker/dist/react-datepicker.css";
import "../my-datepicker.css";
import "./ReservationReviewOverlay.css";

/* -------------------------------------------------------
   Reusable Field Wrapper
------------------------------------------------------- */
const EditableField = ({ label, children }) => (
    <div className="field-group">
        <label>{label}</label>
        {children}
    </div>
);

const ReservationReviewOverlay = ({ data = {}, onCancel, onConfirm }) => {
    const bookingData = data.booking || {};
    const tableData = data.table || {};
    const contactData = data.contact || {};
    
    console.log("POPUP RECEIVED TABLE:", tableData);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const [booking, setBooking] = useState(bookingData);
    const [table, setTable] = useState(tableData);
    const [contact, setContact] = useState(contactData);


    // Local buffers for contact fields (edits are staged here)
    const [firstNameInput, setFirstNameInput] = useState(contact.firstName ?? "");
    const [lastNameInput, setLastNameInput] = useState(contact.lastName ?? "");
    const [contactMethodInput, setContactMethodInput] = useState(contact.contactMethod ?? "");
    const [phoneInput, setPhoneInput] = useState(contact.phoneNumber ?? "");
    const [emailInput, setEmailInput] = useState(contact.email ?? "");

    // Track the pending edit and the original value (for cancel)
    const [pendingField, setPendingField] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [originalValue, setOriginalValue] = useState(null);
    const [showEditConfirm, setShowEditConfirm] = useState(false);


    const [availableTimes] = useReducer(
        timesReducer,
        getAvailableTimes(new Date())
    );

    /* -------------------------------------------------------
       Disable scroll on mount
    ------------------------------------------------------- */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);


    /* -------------------------------------------------------
       Auto-select first available time
    ------------------------------------------------------- */
    useEffect(() => {
        if (availableTimes.length > 0 && !booking.time) {
            setBooking(prev => ({ ...prev, time: availableTimes[0] }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableTimes]);

    // Keep the buggers in sync when contact changes:
    useEffect(() => {
        setFirstNameInput(contact.firstName ?? "")
        setLastNameInput(contact.lastName ?? "")
        setContactMethodInput(contact.contactMethod ?? "")
        setPhoneInput(contact.phoneNumber ?? "")
        setEmailInput(contact.email ?? "")
    }, [contact.firstName, contact.lastName, contact.contactMethod, contact.phoneNumber, contact.email])

    /* -------------------------------------------------------
       Trigger confirmation popup
    ------------------------------------------------------- */
    const requestEdit = (fieldName, newValue, currentValue) => {
        setPendingField(fieldName);
        setPendingValue(newValue);
        setOriginalValue(currentValue)  //This saves the original value
        setShowEditConfirm(true);
    };

    /* -------------------------------------------------------
       Mapping table for applying edits
    ------------------------------------------------------- */
    const editHandlers = {
        "Reservation Date": (v) =>
            setBooking(p => ({ ...p, date: new Date(v) })),

        "Reservation Time": (v) =>
            setBooking(p => ({ ...p, time: v })),

        "Number of Guests": (v) =>
            setBooking(p => ({ ...p, guests: Number(v) })),

        "Table Number": (v) =>
            setTable(p => ({ ...p, tableNumber: Number(v) })),

        "Table Location": (v) =>
            setTable(p => ({ ...p, location: v })),

        "First Name": (v) =>
            setContact(p => ({ ...p, firstName: v })),

        "Last Name": (v) =>
            setContact(p => ({ ...p, lastName: v })),

        "Preferred Contact Method": (v) =>
            setContact(p => ({ ...p, contactMethod: v })),

        "Email": (v) =>
            setContact(p => ({ ...p, email: v })),

        "Phone Number": (v) =>
            setContact(p => ({ ...p, phoneNumber: v })),
    };

    // This is for reversing the edit to the original value:
    const revertHandlers = {
        "Reservation Date": (v) =>
            setBooking(p => ({ ...p, date: new Date(v) })),

        "Reservation Time": (v) =>
            setBooking(p => ({ ...p, time: v })),

        "Number of Guests": (v) =>
            setBooking(p => ({ ...p, guests: Number(v) })),

        "Table Number": (v) =>
            setTable(p => ({ ...p, tableNumber: Number(v) })),

        "Table Location": (v) =>
            setTable(p => ({ ...p, location: v })),

        "First Name": (v) =>
            setContact(p => ({ ...p, firstName: v })),

        "Last Name": (v) =>
            setContact(p => ({ ...p, lastName: v })),

        "Preferred Contact Method": (v) =>
            setContact(p => ({ ...p, contactMethod: v })),

        "Email": (v) =>
            setContact(p => ({ ...p, email: v })),

        "Phone Number": (v) =>
            setContact(p => ({ ...p, phoneNumber: v })),
    };

    /* -------------------------------------------------------
       Apply confirmed edit
    ------------------------------------------------------- */
    const confirmEdit = () => {
        if (!pendingField) return;
        editHandlers[pendingField]?.(pendingValue);
        setShowEditConfirm(false);
        setPendingField(null);
        setPendingValue(null);
        setOriginalValue(null);
    };

    const cancelEdit = () => {
        if (!pendingField) {
            setShowEditConfirm(false);
            return;
        }

        // 1) Revert canonical state if needed (use your revertHandlers)
        revertHandlers[pendingField]?.(originalValue);

        // 2) Revert the local input buffer so the visible input shows the original
        switch (pendingField) {
            case "First Name":
                setFirstNameInput(originalValue ?? "");
                break;
            case "Last Name":
                setLastNameInput(originalValue ?? "");
                break;
            case "Preferred Contact Method":
                setContactMethodInput(originalValue ?? "");
                break;
            case "Phone Number":
                setPhoneInput(originalValue ?? "");
                break;
            case "Email":
                setEmailInput(originalValue ?? "");
                break;
            case "Number of Guests":
                // if you have a local guests buffer:
                // setGuestsInput(originalValue ?? "");
                break;
            // add other fields as needed
            default:
                break;
        }

        // 3) Clear pending state
        setShowEditConfirm(false);
        setPendingField(null);
        setPendingValue(null);
        setOriginalValue(null);
    };

    // This compares values safely (handles Date objects)
    const isDifferent = (a, b) => {
        if (a instanceof Date && b instanceof Date) return a.getTime() !== b.getTime();
        return String(a) !== String(b);
    }


    /* -------------------------------------------------------
       Validation + confirmation trigger
    ------------------------------------------------------- */
    const handleBlurTrigger = (fieldName, newValue, currentValue) => {
        if (fieldName === "Number of Guests") {
            const num = Number(newValue);
            if (isNaN(num) || num < 1 || num > 10) {
                setErrors(prev => ({
                    ...prev,
                    guests: "Please enter a number between 1 and 10"
                }));
                setShowAlert(true);
                return;
            }
        }

        // Only trigger edit confirmation if the value actually changed
        if (isDifferent(newValue, currentValue)) {
            requestEdit(fieldName, newValue, currentValue);
        }
    };

    /* -------------------------------------------------------
       Render
    ------------------------------------------------------- */
    return (
        <>
            <div className="overlay-backdrop">
                <div className="overlay-panel">

                    <header className="overlay-header">
                        <h2>Review Your Reservation</h2>
                    </header>

                    {/* BOOKING DETAILS */}
                    <section className="section-block">
                        <h3>Booking Details:</h3>

                        <div className="field-row">

                            <EditableField label="Reservation Date:">
                                <DatePicker
                                    selected={booking.date}
                                    onChange={(date) => setBooking({ ...booking, date })}
                                    onBlur={() =>
                                        handleBlurTrigger(
                                            "Reservation Date",
                                            booking.date,
                                            bookingData.date // original value passed here
                                        )
                                    }
                                    className="editable-input"
                                    shouldCloseOnSelect={true}
                                    shouldCloseOnEsc={true}
                                    closeOnScroll={true}
                                />
                            </EditableField>

                            <EditableField label="Reservation Time:">
                                <CustomDropdown
                                    className="editable-input"
                                    value={booking.time}
                                    onChange={(time) => setBooking({ ...booking, time })}
                                    onBlur={() =>
                                        handleBlurTrigger(
                                            "Reservation Time",
                                            booking.time,
                                            bookingData.time // original value
                                        )
                                    }
                                    options={availableTimes.map(t => ({
                                        value: t,
                                        label:
                                            t === "17:00" ? "5:00 PM" :
                                                t === "18:00" ? "6:00 PM" :
                                                    t === "19:00" ? "7:00 PM" :
                                                        t === "20:00" ? "8:00 PM" :
                                                            "9:00 PM"
                                    }))}
                                />
                            </EditableField>

                            <EditableField label="Number of Guests:">
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    className="editable-input"
                                    value={booking.guests}
                                    onChange={(e) =>
                                        setBooking({
                                            ...booking,
                                            guests: e.target.value
                                        })
                                    }
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Number of Guests",
                                            Number(e.target.value),
                                            bookingData.guests // original value
                                        )
                                    }
                                />
                            </EditableField>

                        </div>
                    </section>

                    {/* TABLE SELECTION */}
                    <section className="section-block">
                        <h3>Table Selection</h3>

                        <div className="field-row">

                            <EditableField label="Table Number and Location:">
                                <div className="table-selected" style={{ paddingTop: "0.6rem" }}>
                                    You currently have the table numbered <strong> {table.tableNumber} </strong> selected at <strong> {table.location} </strong>
                                </div>
                            </EditableField>

                        </div>
                    </section>

                    {/* CONTACT INFORMATION */}
                    <section className="section-block">
                        <h3>Contact Information: </h3>

                        <div className="field-row">

                            <EditableField label="First Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={firstNameInput}                         // local buffer
                                    onChange={(e) => setFirstNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "First Name",
                                            e.target.value,
                                            contactData.firstName                      // original snapshot
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="Last Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={lastNameInput}                          // local buffer
                                    onChange={(e) => setLastNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Last Name",
                                            e.target.value,
                                            contactData.lastName                       // original snapshot
                                        )
                                    }
                                />
                            </EditableField>

                        </div>

                        <div className="field-row">

                            <EditableField label="Preferred Contact Method:">
                                <CustomDropdown
                                    className="editable-input"
                                    value={contactMethodInput}                     // local buffer
                                    onChange={(value) => setContactMethodInput(value)}
                                    onBlur={() =>
                                        handleBlurTrigger(
                                            "Preferred Contact Method",
                                            contactMethodInput,
                                            contactData.contactMethod                  // original snapshot
                                        )
                                    }
                                    options={[
                                        { value: "email", label: "Email" },
                                        { value: "phone", label: "Phone Number" }
                                    ]}
                                />
                            </EditableField>

                            {contactMethodInput === "phone" && (
                                <EditableField label="Phone Number">
                                    <input
                                        type="tel"
                                        className="editable-input"
                                        value={phoneInput}                           // local buffer
                                        onChange={(e) => setPhoneInput(e.target.value)}
                                        onBlur={(e) =>
                                            handleBlurTrigger(
                                                "Phone Number",
                                                e.target.value,
                                                contactData.phoneNumber                  // original snapshot
                                            )
                                        }
                                    />
                                </EditableField>
                            )}

                            {contactMethodInput === "email" && (
                                <EditableField label="Email">
                                    <input
                                        type="email"
                                        className="editable-input"
                                        value={emailInput}                           // local buffer
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        onBlur={(e) =>
                                            handleBlurTrigger(
                                                "Email",
                                                e.target.value,
                                                contactData.email                         // original snapshot
                                            )
                                        }
                                    />
                                </EditableField>
                            )}

                        </div>
                    </section>

                    {/* ACTION BUTTONS */}
                    <div className="action-buttons">
                        <button className="cancel-btn" onClick={onCancel}>
                            Go Back
                        </button>

                        <button
                            className="confirm-btn"
                            onClick={() => onConfirm({ 
                                booking, 
                                table, 
                                contact: {
                                    ...contact,
                                    firstName: firstNameInput,
                                    lastName: lastNameInput,
                                    contactMethod: contactMethodInput,
                                    phoneNumber: phoneInput,
                                    email: emailInput
                                }
                            })}
                        >
                            Confirm
                        </button>
                    </div>

                </div>
            </div>

            {/* CONFIRMATION POPUP */}
            {showEditConfirm && (
                <div className="edit-confirm-backdrop">
                    <div className="edit-confirm-panel">
                        <h3>Are you sure?</h3>
                        <p>
                            Are you sure you want to edit:{" "}
                            <strong>{pendingField}</strong>
                        </p>

                        <div className="edit-confirm-buttons">
                            <button className="confirm-btn" onClick={confirmEdit}>
                                Yes, Edit
                            </button>
                            <button className="cancel-btn" onClick={cancelEdit}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <FadingAlert
                    message={errors.guests}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </>
    );
};

export default ReservationReviewOverlay;