import React, { useState, useEffect } from "react";
import FadingAlert from "../FadingAlert.jsx";
import CustomDropdown from "../CustomDropdown.jsx";
import "./OrderReviewOverlay.css";

/* -------------------------------------------------------
   Reusable Field Wrapper
------------------------------------------------------- */
const EditableField = ({ label, children }) => (
    <div className="field-group">
        <label>{label}</label>
        {children}
    </div>
);

const OrderReviewOverlay = ({ data = {}, onCancel, onConfirm }) => {
    const cartData = data.cart || [];
    const deliveryData = data.delivery || {};
    const shippingData = data.shipping || {};
    const billingData = data.billing || {};
    const paymentData = data.payment || {};

    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    // Shipping state
    const [shipping, setShipping] = useState(shippingData);
    const [shippingFirstNameInput, setShippingFirstNameInput] = useState(shippingData.firstName ?? "");
    const [shippingLastNameInput, setShippingLastNameInput] = useState(shippingData.lastName ?? "");
    const [shippingEmailInput, setShippingEmailInput] = useState(shippingData.email ?? "");
    const [shippingPhoneInput, setShippingPhoneInput] = useState(shippingData.phone ?? "");
    const [shippingAddressInput, setShippingAddressInput] = useState(shippingData.address ?? "");
    const [shippingCityInput, setShippingCityInput] = useState(shippingData.city ?? "");
    const [shippingStateInput, setShippingStateInput] = useState(shippingData.state ?? "");
    const [shippingZipInput, setShippingZipInput] = useState(shippingData.zipCode ?? "");

    // Billing state
    const [billing, setBilling] = useState(billingData);
    const [billingFirstNameInput, setBillingFirstNameInput] = useState(billingData.firstName ?? "");
    const [billingLastNameInput, setBillingLastNameInput] = useState(billingData.lastName ?? "");
    const [billingAddressInput, setBillingAddressInput] = useState(billingData.address ?? "");
    const [billingCityInput, setBillingCityInput] = useState(billingData.city ?? "");
    const [billingStateInput, setBillingStateInput] = useState(billingData.state ?? "");
    const [billingZipInput, setBillingZipInput] = useState(billingData.zipCode ?? "");

    // Payment state
    const [payment, setPayment] = useState(paymentData);
    const [paymentMethodInput, setPaymentMethodInput] = useState(paymentData.method ?? "creditCard");
    const [cardholderNameInput, setCardholderNameInput] = useState(paymentData.cardholderName ?? "");
    const [cardNumberInput, setCardNumberInput] = useState(paymentData.cardNumber ?? "");
    const [expirationDateInput, setExpirationDateInput] = useState(paymentData.expirationDate ?? "");
    const [cvvInput, setCvvInput] = useState(paymentData.cvv ?? "");
    const [paypalEmailInput, setPaypalEmailInput] = useState(paymentData.paypalEmail ?? "");

    // Pending edits
    const [pendingField, setPendingField] = useState(null);
    const [pendingValue, setPendingValue] = useState(null);
    const [originalValue, setOriginalValue] = useState(null);
    const [showEditConfirm, setShowEditConfirm] = useState(false);

    /* -------------------------------------------------------
       Disable scroll on mount
    ------------------------------------------------------- */
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    // Keep the input buffers in sync when data changes
    useEffect(() => {
        setShippingFirstNameInput(shipping.firstName ?? "");
        setShippingLastNameInput(shipping.lastName ?? "");
        setShippingEmailInput(shipping.email ?? "");
        setShippingPhoneInput(shipping.phone ?? "");
        setShippingAddressInput(shipping.address ?? "");
        setShippingCityInput(shipping.city ?? "");
        setShippingStateInput(shipping.state ?? "");
        setShippingZipInput(shipping.zipCode ?? "");
    }, [shipping.firstName, shipping.lastName, shipping.email, shipping.phone, shipping.address, shipping.city, shipping.state, shipping.zipCode]);

    useEffect(() => {
        setBillingFirstNameInput(billing.firstName ?? "");
        setBillingLastNameInput(billing.lastName ?? "");
        setBillingAddressInput(billing.address ?? "");
        setBillingCityInput(billing.city ?? "");
        setBillingStateInput(billing.state ?? "");
        setBillingZipInput(billing.zipCode ?? "");
    }, [billing.firstName, billing.lastName, billing.address, billing.city, billing.state, billing.zipCode]);

    useEffect(() => {
        setPaymentMethodInput(payment.method ?? "creditCard");
        setCardholderNameInput(payment.cardholderName ?? "");
        setCardNumberInput(payment.cardNumber ?? "");
        setExpirationDateInput(payment.expirationDate ?? "");
        setCvvInput(payment.cvv ?? "");
        setPaypalEmailInput(payment.paypalEmail ?? "");
    }, [payment.method, payment.cardholderName, payment.cardNumber, payment.expirationDate, payment.cvv, payment.paypalEmail]);

    /* -------------------------------------------------------
       Request Edit Confirmation
    ------------------------------------------------------- */
    const requestEdit = (fieldName, newValue, currentValue) => {
        setPendingField(fieldName);
        setPendingValue(newValue);
        setOriginalValue(currentValue);
        setShowEditConfirm(true);
    };

    /* -------------------------------------------------------
       Edit Handlers
    ------------------------------------------------------- */
    const editHandlers = {
        "Shipping First Name": (v) =>
            setShipping(p => ({ ...p, firstName: v })),
        "Shipping Last Name": (v) =>
            setShipping(p => ({ ...p, lastName: v })),
        "Shipping Email": (v) =>
            setShipping(p => ({ ...p, email: v })),
        "Shipping Phone": (v) =>
            setShipping(p => ({ ...p, phone: v })),
        "Shipping Address": (v) =>
            setShipping(p => ({ ...p, address: v })),
        "Shipping City": (v) =>
            setShipping(p => ({ ...p, city: v })),
        "Shipping State": (v) =>
            setShipping(p => ({ ...p, state: v })),
        "Shipping ZIP": (v) =>
            setShipping(p => ({ ...p, zipCode: v })),

        "Billing First Name": (v) =>
            setBilling(p => ({ ...p, firstName: v })),
        "Billing Last Name": (v) =>
            setBilling(p => ({ ...p, lastName: v })),
        "Billing Address": (v) =>
            setBilling(p => ({ ...p, address: v })),
        "Billing City": (v) =>
            setBilling(p => ({ ...p, city: v })),
        "Billing State": (v) =>
            setBilling(p => ({ ...p, state: v })),
        "Billing ZIP": (v) =>
            setBilling(p => ({ ...p, zipCode: v })),

        "Payment Method": (v) =>
            setPayment(p => ({ ...p, method: v })),
        "Cardholder Name": (v) =>
            setPayment(p => ({ ...p, cardholderName: v })),
        "Card Number": (v) =>
            setPayment(p => ({ ...p, cardNumber: v })),
        "Expiration Date": (v) =>
            setPayment(p => ({ ...p, expirationDate: v })),
        "CVV": (v) =>
            setPayment(p => ({ ...p, cvv: v })),
        "PayPal Email": (v) =>
            setPayment(p => ({ ...p, paypalEmail: v })),
    };

    const revertHandlers = { ...editHandlers };

    /* -------------------------------------------------------
       Apply Confirmed Edit
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

        revertHandlers[pendingField]?.(originalValue);

        switch (pendingField) {
            case "Shipping First Name":
                setShippingFirstNameInput(originalValue ?? "");
                break;
            case "Shipping Last Name":
                setShippingLastNameInput(originalValue ?? "");
                break;
            case "Shipping Email":
                setShippingEmailInput(originalValue ?? "");
                break;
            case "Shipping Phone":
                setShippingPhoneInput(originalValue ?? "");
                break;
            case "Shipping Address":
                setShippingAddressInput(originalValue ?? "");
                break;
            case "Shipping City":
                setShippingCityInput(originalValue ?? "");
                break;
            case "Shipping State":
                setShippingStateInput(originalValue ?? "");
                break;
            case "Shipping ZIP":
                setShippingZipInput(originalValue ?? "");
                break;
            case "Billing First Name":
                setBillingFirstNameInput(originalValue ?? "");
                break;
            case "Billing Last Name":
                setBillingLastNameInput(originalValue ?? "");
                break;
            case "Billing Address":
                setBillingAddressInput(originalValue ?? "");
                break;
            case "Billing City":
                setBillingCityInput(originalValue ?? "");
                break;
            case "Billing State":
                setBillingStateInput(originalValue ?? "");
                break;
            case "Billing ZIP":
                setBillingZipInput(originalValue ?? "");
                break;
            case "Cardholder Name":
                setCardholderNameInput(originalValue ?? "");
                break;
            case "Card Number":
                setCardNumberInput(originalValue ?? "");
                break;
            case "Expiration Date":
                setExpirationDateInput(originalValue ?? "");
                break;
            case "CVV":
                setCvvInput(originalValue ?? "");
                break;
            case "PayPal Email":
                setPaypalEmailInput(originalValue ?? "");
                break;
            default:
                break;
        }

        setShowEditConfirm(false);
        setPendingField(null);
        setPendingValue(null);
        setOriginalValue(null);
    };

    const isDifferent = (a, b) => {
        return String(a) !== String(b);
    };

    /* -------------------------------------------------------
       Validation + Confirmation Trigger
    ------------------------------------------------------- */
    const handleBlurTrigger = (fieldName, newValue, currentValue) => {
        // Email validation
        if (fieldName === "Shipping Email" || fieldName === "PayPal Email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (newValue && !emailRegex.test(newValue)) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: "Please enter a valid email address"
                }));
                setShowAlert(true);
                return;
            }
        }

        // ZIP code validation
        if (fieldName.includes("ZIP")) {
            if (newValue && !/^\d{5}$/.test(newValue.replace(/\D/g, ""))) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: "Please enter a valid 5-digit ZIP code"
                }));
                setShowAlert(true);
                return;
            }
        }

        // Phone validation
        if (fieldName === "Shipping Phone") {
            if (newValue && !/^\d{10}$/.test(newValue.replace(/\D/g, ""))) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: "Please enter a valid 10-digit phone number"
                }));
                setShowAlert(true);
                return;
            }
        }

        // Card number validation
        if (fieldName === "Card Number") {
            if (newValue && newValue.replace(/\s/g, "").length < 13) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: "Please enter a valid card number"
                }));
                setShowAlert(true);
                return;
            }
        }

        // CVV validation
        if (fieldName === "CVV") {
            if (newValue && newValue.length < 3) {
                setErrors(prev => ({
                    ...prev,
                    [fieldName]: "CVV must be at least 3 digits"
                }));
                setShowAlert(true);
                return;
            }
        }

        if (isDifferent(newValue, currentValue)) {
            requestEdit(fieldName, newValue, currentValue);
        }
    };

    /* -------------------------------------------------------
       Calculate Order Total
    ------------------------------------------------------- */
    const getCartTotal = () => {
        if (cartData.length === 0) return "0.00";
        return cartData
            .reduce((total, item) => {
                const price = parseFloat(item.price.replace("$", ""));
                return total + price * (item.quantity || 1);
            }, 0)
            .toFixed(2);
    };

    const getDeliveryFee = () => {
        return deliveryData.deliveryType === "delivery" ? 3.99 : 0.00;
    };

    const getTaxAmount = () => {
        const subtotal = parseFloat(getCartTotal()) + getDeliveryFee();
        return (subtotal * 0.1).toFixed(2);
    };

    const getFinalTotal = () => {
        const subtotal = parseFloat(getCartTotal());
        const deliveryFee = getDeliveryFee();
        const tax = parseFloat(getTaxAmount());
        return (subtotal + deliveryFee + tax).toFixed(2);
    };

    /* -------------------------------------------------------
       Render
    ------------------------------------------------------- */
    return (
        <>
            <div className="overlay-backdrop">
                <div className="overlay-panel">

                    <header className="overlay-header">
                        <h2>Review Your Order</h2>
                    </header>

                    {/* ORDER ITEMS */}
                    <section className="section-block">
                        <h3>Order Items:</h3>
                        <div className="order-items-list">
                            {cartData.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                cartData.map((item) => {
                                    const price = parseFloat(item.price.replace("$", ""));
                                    const itemTotal = (price * (item.quantity || 1)).toFixed(2);
                                    return (
                                        <div key={item.id} className="order-item">
                                            <span className="order-item-name">{item.title}</span>
                                            <span className="order-item-qty">×{item.quantity || 1}</span>
                                            <span className="order-item-price">${itemTotal}</span>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <div className="order-totals">
                            <div className="order-total-row">
                                <span>Subtotal:</span>
                                <span>${getCartTotal()}</span>
                            </div>
                            {getDeliveryFee() > 0 && (
                                <div className="order-total-row">
                                    <span>Delivery Fee:</span>
                                    <span>${getDeliveryFee().toFixed(2)}</span>
                                </div>
                            )}
                            <div className="order-total-row">
                                <span>Tax (10%):</span>
                                <span>${getTaxAmount()}</span>
                            </div>
                            <div className="order-total-row total">
                                <span>Total:</span>
                                <span>${getFinalTotal()}</span>
                            </div>
                        </div>
                    </section>

                    {/* SHIPPING ADDRESS */}
                    <section className="section-block">
                        <h3>Shipping Address:</h3>

                        <div className="field-row">
                            <EditableField label="First Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingFirstNameInput}
                                    onChange={(e) => setShippingFirstNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping First Name",
                                            e.target.value,
                                            shippingData.firstName
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="Last Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingLastNameInput}
                                    onChange={(e) => setShippingLastNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping Last Name",
                                            e.target.value,
                                            shippingData.lastName
                                        )
                                    }
                                />
                            </EditableField>
                        </div>

                        <div className="field-row">
                            <EditableField label="Email:">
                                <input
                                    type="email"
                                    className="editable-input"
                                    value={shippingEmailInput}
                                    onChange={(e) => setShippingEmailInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping Email",
                                            e.target.value,
                                            shippingData.email
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="Phone:">
                                <input
                                    type="tel"
                                    className="editable-input"
                                    value={shippingPhoneInput}
                                    onChange={(e) => setShippingPhoneInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping Phone",
                                            e.target.value,
                                            shippingData.phone
                                        )
                                    }
                                />
                            </EditableField>
                        </div>

                        <div className="field-row full-width">
                            <EditableField label="Street Address:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingAddressInput}
                                    onChange={(e) => setShippingAddressInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping Address",
                                            e.target.value,
                                            shippingData.address
                                        )
                                    }
                                />
                            </EditableField>
                        </div>

                        <div className="field-row">
                            <EditableField label="City:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingCityInput}
                                    onChange={(e) => setShippingCityInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping City",
                                            e.target.value,
                                            shippingData.city
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="State:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingStateInput}
                                    onChange={(e) => setShippingStateInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping State",
                                            e.target.value,
                                            shippingData.state
                                        )
                                    }
                                    maxLength="2"
                                />
                            </EditableField>

                            <EditableField label="ZIP Code:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={shippingZipInput}
                                    onChange={(e) => setShippingZipInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Shipping ZIP",
                                            e.target.value,
                                            shippingData.zipCode
                                        )
                                    }
                                />
                            </EditableField>
                        </div>
                    </section>

                    {/* BILLING ADDRESS */}
                    <section className="section-block">
                        <h3>Billing Address:</h3>

                        <div className="field-row">
                            <EditableField label="First Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingFirstNameInput}
                                    onChange={(e) => setBillingFirstNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing First Name",
                                            e.target.value,
                                            billingData.firstName
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="Last Name:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingLastNameInput}
                                    onChange={(e) => setBillingLastNameInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing Last Name",
                                            e.target.value,
                                            billingData.lastName
                                        )
                                    }
                                />
                            </EditableField>
                        </div>

                        <div className="field-row full-width">
                            <EditableField label="Street Address:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingAddressInput}
                                    onChange={(e) => setBillingAddressInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing Address",
                                            e.target.value,
                                            billingData.address
                                        )
                                    }
                                />
                            </EditableField>
                        </div>

                        <div className="field-row">
                            <EditableField label="City:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingCityInput}
                                    onChange={(e) => setBillingCityInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing City",
                                            e.target.value,
                                            billingData.city
                                        )
                                    }
                                />
                            </EditableField>

                            <EditableField label="State:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingStateInput}
                                    onChange={(e) => setBillingStateInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing State",
                                            e.target.value,
                                            billingData.state
                                        )
                                    }
                                    maxLength="2"
                                />
                            </EditableField>

                            <EditableField label="ZIP Code:">
                                <input
                                    type="text"
                                    className="editable-input"
                                    value={billingZipInput}
                                    onChange={(e) => setBillingZipInput(e.target.value)}
                                    onBlur={(e) =>
                                        handleBlurTrigger(
                                            "Billing ZIP",
                                            e.target.value,
                                            billingData.zipCode
                                        )
                                    }
                                />
                            </EditableField>
                        </div>
                    </section>

                    {/* PAYMENT INFORMATION */}
                    <section className="section-block">
                        <h3>Payment Information:</h3>

                        <div className="field-row">
                            <EditableField label="Payment Method:">
                                <CustomDropdown
                                    className="editable-input"
                                    value={paymentMethodInput}
                                    onChange={(method) => setPaymentMethodInput(method)}
                                    onBlur={() =>
                                        handleBlurTrigger(
                                            "Payment Method",
                                            paymentMethodInput,
                                            paymentData.method
                                        )
                                    }
                                    options={[
                                        { value: "creditCard", label: "Credit Card" },
                                        { value: "debitCard", label: "Debit Card" },
                                        { value: "paypal", label: "PayPal" }
                                    ]}
                                />
                            </EditableField>
                        </div>

                        {(paymentMethodInput === "creditCard" || paymentMethodInput === "debitCard") && (
                            <>
                                <div className="field-row">
                                    <EditableField label="Cardholder Name:">
                                        <input
                                            type="text"
                                            className="editable-input"
                                            value={cardholderNameInput}
                                            onChange={(e) => setCardholderNameInput(e.target.value)}
                                            onBlur={(e) =>
                                                handleBlurTrigger(
                                                    "Cardholder Name",
                                                    e.target.value,
                                                    paymentData.cardholderName
                                                )
                                            }
                                        />
                                    </EditableField>
                                </div>

                                <div className="field-row full-width">
                                    <EditableField label="Card Number:">
                                        <input
                                            type="text"
                                            className="editable-input"
                                            value={cardNumberInput}
                                            onChange={(e) => setCardNumberInput(e.target.value)}
                                            onBlur={(e) =>
                                                handleBlurTrigger(
                                                    "Card Number",
                                                    e.target.value,
                                                    paymentData.cardNumber
                                                )
                                            }
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                    </EditableField>
                                </div>

                                <div className="field-row">
                                    <EditableField label="Expiration Date:">
                                        <input
                                            type="text"
                                            className="editable-input"
                                            value={expirationDateInput}
                                            onChange={(e) => setExpirationDateInput(e.target.value)}
                                            onBlur={(e) =>
                                                handleBlurTrigger(
                                                    "Expiration Date",
                                                    e.target.value,
                                                    paymentData.expirationDate
                                                )
                                            }
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                    </EditableField>

                                    <EditableField label="CVV:">
                                        <input
                                            type="text"
                                            className="editable-input"
                                            value={cvvInput}
                                            onChange={(e) => setCvvInput(e.target.value)}
                                            onBlur={(e) =>
                                                handleBlurTrigger(
                                                    "CVV",
                                                    e.target.value,
                                                    paymentData.cvv
                                                )
                                            }
                                            placeholder="123"
                                            maxLength="4"
                                        />
                                    </EditableField>
                                </div>
                            </>
                        )}

                        {paymentMethodInput === "paypal" && (
                            <div className="field-row">
                                <EditableField label="PayPal Email:">
                                    <input
                                        type="email"
                                        className="editable-input"
                                        value={paypalEmailInput}
                                        onChange={(e) => setPaypalEmailInput(e.target.value)}
                                        onBlur={(e) =>
                                            handleBlurTrigger(
                                                "PayPal Email",
                                                e.target.value,
                                                paymentData.paypalEmail
                                            )
                                        }
                                    />
                                </EditableField>
                            </div>
                        )}
                    </section>

                    {/* ACTION BUTTONS */}
                    <div className="action-buttons">
                        <button className="cancel-btn" onClick={onCancel}>
                            Go Back
                        </button>

                        <button
                            className="confirm-btn"
                            onClick={() => onConfirm({
                                cart: cartData,
                                shipping: {
                                    ...shipping,
                                    firstName: shippingFirstNameInput,
                                    lastName: shippingLastNameInput,
                                    email: shippingEmailInput,
                                    phone: shippingPhoneInput,
                                    address: shippingAddressInput,
                                    city: shippingCityInput,
                                    state: shippingStateInput,
                                    zipCode: shippingZipInput
                                },
                                billing: {
                                    ...billing,
                                    firstName: billingFirstNameInput,
                                    lastName: billingLastNameInput,
                                    address: billingAddressInput,
                                    city: billingCityInput,
                                    state: billingStateInput,
                                    zipCode: billingZipInput
                                },
                                payment: {
                                    ...payment,
                                    method: paymentMethodInput,
                                    cardholderName: cardholderNameInput,
                                    cardNumber: cardNumberInput,
                                    expirationDate: expirationDateInput,
                                    cvv: cvvInput,
                                    paypalEmail: paypalEmailInput
                                }
                            })}
                        >
                            Confirm Order
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
                    message={errors[pendingField] || "An error occurred"}
                    onClose={() => setShowAlert(false)}
                />
            )}
        </>
    );
};

export default OrderReviewOverlay;
