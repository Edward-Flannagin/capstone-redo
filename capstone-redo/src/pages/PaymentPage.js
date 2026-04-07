import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../formErrors.css";
import "./PaymentPage.css";
import OrderReviewOverlay from "../components/OrderReviewOverlay";
import OrderSuccessOverlay from "../components/OrderSuccessOverlay";

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [errors, setErrors] = useState({});
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    
    // Billing Address
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    
    // Payment Details
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paypalEmail: "",
  });

  // Load cart data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("orderCart");
    if (savedCart) {
      setCartData(JSON.parse(savedCart));
    }

    const savedDeliveryInfo = localStorage.getItem("orderDeliveryInfo");
    if (savedDeliveryInfo) {
      setDeliveryInfo(JSON.parse(savedDeliveryInfo));
    }
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Clear errors for payment method
    const newErrors = { ...errors };
    delete newErrors.paymentMethod;
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate payment method
    if (!paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    // Validate shipping address
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    // Validate billing address if different from shipping
    if (!sameAsShipping) {
      if (!formData.billingFirstName.trim()) newErrors.billingFirstName = "First name is required";
      if (!formData.billingLastName.trim()) newErrors.billingLastName = "Last name is required";
      if (!formData.billingAddress.trim()) newErrors.billingAddress = "Address is required";
      if (!formData.billingCity.trim()) newErrors.billingCity = "City is required";
      if (!formData.billingState) newErrors.billingState = "State is required";
      if (!formData.billingZipCode.trim()) newErrors.billingZipCode = "ZIP code is required";
    }

    // Validate payment details based on method
    if (paymentMethod === "creditCard" || paymentMethod === "debitCard") {
      if (!formData.cardholderName.trim()) newErrors.cardholderName = "Cardholder name is required";
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (formData.cardNumber.replace(/\s/g, "").length < 13)
        newErrors.cardNumber = "Card number must be at least 13 digits";
      if (!formData.expirationDate.trim()) newErrors.expirationDate = "Expiration date is required";
      if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
      else if (formData.cvv.length < 3)
        newErrors.cvv = "CVV must be at least 3 digits";
    } else if (paymentMethod === "paypal") {
      if (!formData.paypalEmail.trim()) newErrors.paypalEmail = "PayPal email is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show review overlay instead of processing directly
    setShowReviewOverlay(true);
  };

  const handleOrderConfirm = async (reviewData) => {
    setShowReviewOverlay(false);
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Clear the cart from localStorage
      localStorage.removeItem("orderCart");

      // Get delivery info from localStorage
      const deliveryInfo = JSON.parse(localStorage.getItem("orderDeliveryInfo") || "{}");

      // Prepare order data for success overlay
      const finalOrderData = {
        ...deliveryInfo,
        total: getFinalTotal(),
        orderNumber: Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      };

      setOrderData(finalOrderData);
      setIsProcessing(false);
      setShowSuccessOverlay(true);

      // Clear delivery info after showing success
      localStorage.removeItem("orderDeliveryInfo");
    }, 2000);
  };

  const handleReviewCancel = () => {
    setShowReviewOverlay(false);
  };

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
    return deliveryInfo.deliveryType === "delivery" ? 3.99 : 0.00;
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

  return (
    <div className="payment-page-container">
      <div className="payment-header">
        <h1 className="payment-title">Checkout</h1>
        <h2 className="payment-subtitle">Complete your order with secure payment</h2>
      </div>

      <div className="payment-content-wrapper">
        {/* Main Payment Form */}
        <form onSubmit={handleSubmit} noValidate className="payment-section">
          <h2 className="payment-section-title">Payment Information</h2>

          {/* Payment Method Selection */}
          <div>
            <h3 className="payment-section-heading">
              Select Payment Method
            </h3>
            <div className="payment-methods">
              <label className={`payment-method-option ${paymentMethod === "creditCard" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => handlePaymentMethodChange("creditCard")}
                  className="payment-method-radio"
                />
                <span className="payment-method-label">Credit Card</span>
              </label>
              <label className={`payment-method-option ${paymentMethod === "debitCard" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debitCard"
                  checked={paymentMethod === "debitCard"}
                  onChange={() => handlePaymentMethodChange("debitCard")}
                  className="payment-method-radio"
                />
                <span className="payment-method-label">Debit Card</span>
              </label>
              <label className={`payment-method-option ${paymentMethod === "paypal" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => handlePaymentMethodChange("paypal")}
                  className="payment-method-radio"
                />
                <span className="payment-method-label">PayPal</span>
              </label>
            </div>
            {errors.paymentMethod && <div className="error-message">✗ {errors.paymentMethod}</div>}
          </div>

          {/* Shipping Address */}
          <div className="payment-section-divider">
            <h3 className="payment-section-heading">
              Shipping Address
            </h3>
            <div className="form-row">
              <div className={`form-group ${errors.firstName ? "error" : ""}`}>
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
                {errors.firstName && <div className="error-message">✗ {errors.firstName}</div>}
              </div>
              <div className={`form-group ${errors.lastName ? "error" : ""}`}>
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
                {errors.lastName && <div className="error-message">✗ {errors.lastName}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.email ? "error" : ""}`}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
                {errors.email && <div className="error-message">✗ {errors.email}</div>}
              </div>
              <div className={`form-group ${errors.phone ? "error" : ""}`}>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && <div className="error-message">✗ {errors.phone}</div>}
              </div>
            </div>

            <div className={`form-group ${errors.address ? "error" : ""}`}>
              <label>Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
              />
              {errors.address && <div className="error-message">✗ {errors.address}</div>}
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.city ? "error" : ""}`}>
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Chicago"
                />
                {errors.city && <div className="error-message">✗ {errors.city}</div>}
              </div>
              <div className={`form-group ${errors.state ? "error" : ""}`}>
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="IL"
                  maxLength="2"
                />
                {errors.state && <div className="error-message">✗ {errors.state}</div>}
              </div>
              <div className={`form-group ${errors.zipCode ? "error" : ""}`}>
                <label>ZIP Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="60601"
                />
                {errors.zipCode && <div className="error-message">✗ {errors.zipCode}</div>}
              </div>
            </div>
          </div>

          {/* Billing Address Section */}
          <div className="billing-address-section">
            <label className="billing-address-checkbox">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
              />
              <span>Billing address same as shipping</span>
            </label>

            {!sameAsShipping && (
              <div className="billing-fields show">
                <div className="form-row">
                  <div className={`form-group ${errors.billingFirstName ? "error" : ""}`}>
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="billingFirstName"
                      value={formData.billingFirstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                    {errors.billingFirstName && <div className="error-message">✗ {errors.billingFirstName}</div>}
                  </div>
                  <div className={`form-group ${errors.billingLastName ? "error" : ""}`}>
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="billingLastName"
                      value={formData.billingLastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                    {errors.billingLastName && <div className="error-message">✗ {errors.billingLastName}</div>}
                  </div>
                </div>

                <div className={`form-group ${errors.billingAddress ? "error" : ""}`}>
                  <label>Street Address *</label>
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                  />
                  {errors.billingAddress && <div className="error-message">✗ {errors.billingAddress}</div>}
                </div>

                <div className="form-row">
                  <div className={`form-group ${errors.billingCity ? "error" : ""}`}>
                    <label>City *</label>
                    <input
                      type="text"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      placeholder="Chicago"
                    />
                    {errors.billingCity && <div className="error-message">✗ {errors.billingCity}</div>}
                  </div>
                  <div className={`form-group ${errors.billingState ? "error" : ""}`}>
                    <label>State *</label>
                    <input
                      type="text"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleInputChange}
                      placeholder="IL"
                      maxLength="2"
                    />
                    {errors.billingState && <div className="error-message">✗ {errors.billingState}</div>}
                  </div>
                  <div className={`form-group ${errors.billingZipCode ? "error" : ""}`}>
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="billingZipCode"
                      value={formData.billingZipCode}
                      onChange={handleInputChange}
                      placeholder="60601"
                    />
                    {errors.billingZipCode && <div className="error-message">✗ {errors.billingZipCode}</div>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Payment Details */}
          {(paymentMethod === "creditCard" || paymentMethod === "debitCard") && (
            <div className="payment-section-divider">
              <h3 className="payment-section-heading">
                {paymentMethod === "creditCard" ? "Credit Card" : "Debit Card"} Details
              </h3>

              <div className={`form-group ${errors.cardholderName ? "error" : ""}`}>
                <label>Cardholder Name *</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
                {errors.cardholderName && <div className="error-message">✗ {errors.cardholderName}</div>}
              </div>

              <div className={`form-group ${errors.cardNumber ? "error" : ""}`}>
                <label>Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {errors.cardNumber && <div className="error-message">✗ {errors.cardNumber}</div>}
              </div>

              <div className="form-row">
                <div className={`form-group ${errors.expirationDate ? "error" : ""}`}>
                  <label>Expiration Date *</label>
                  <input
                    type="text"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {errors.expirationDate && <div className="error-message">✗ {errors.expirationDate}</div>}
                </div>
                <div className={`form-group ${errors.cvv ? "error" : ""}`}>
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                  />
                  {errors.cvv && <div className="error-message">✗ {errors.cvv}</div>}
                </div>
              </div>
            </div>
          )}

          {/* PayPal Details */}
          {paymentMethod === "paypal" && (
            <div className="payment-section-divider">
              <h3 className="payment-section-heading">
                PayPal Details
              </h3>

              <div className={`form-group ${errors.paypalEmail ? "error" : ""}`}>
                <label>PayPal Email *</label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                  placeholder="your@paypal.com"
                />
                {errors.paypalEmail && <div className="error-message">✗ {errors.paypalEmail}</div>}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="payment-button-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/order-online")}
              disabled={isProcessing}
            >
              ← Back to Cart
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="loading-indicator"></span>
                  Processing...
                </>
              ) : (
                `Complete Order - $${getFinalTotal()}`
              )}
            </button>
          </div>
        </form>

        {/* Order Summary Sidebar */}
        <div className="order-summary-sidebar">
          <h3 className="order-summary-title">Order Summary</h3>

          {cartData.length === 0 ? (
            <p className="order-summary-empty">Your cart is empty</p>
          ) : (
            <>
              <div>
                {cartData.map((item) => {
                  const price = parseFloat(item.price.replace("$", ""));
                  const itemTotal = (price * (item.quantity || 1)).toFixed(2);
                  return (
                    <div key={item.id} className="order-summary-item">
                      <span className="order-summary-item-name">{item.title}</span>
                      <span className="order-summary-item-qty">×{item.quantity || 1}</span>
                      <span className="order-summary-item-price">${itemTotal}</span>
                    </div>
                  );
                })}
              </div>

              <div className="order-summary-totals">
                <div className="order-summary-row">
                  <span>Subtotal</span>
                  <span>${getCartTotal()}</span>
                </div>
                {getDeliveryFee() > 0 && (
                  <div className="order-summary-row">
                    <span>Delivery Fee</span>
                    <span>${getDeliveryFee().toFixed(2)}</span>
                  </div>
                )}
                <div className="order-summary-row">
                  <span>Tax (10%)</span>
                  <span>${getTaxAmount()}</span>
                </div>
              </div>

              <div className="order-summary-total">
                <span>Total</span>
                <span className="order-summary-total-amount">${getFinalTotal()}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Order Review Overlay */}
      {showReviewOverlay && (
        <OrderReviewOverlay
          data={{
            cart: cartData,
            delivery: deliveryInfo,
            shipping: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            },
            billing: sameAsShipping ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode
            } : {
              firstName: formData.billingFirstName,
              lastName: formData.billingLastName,
              address: formData.billingAddress,
              city: formData.billingCity,
              state: formData.billingState,
              zipCode: formData.billingZipCode
            },
            payment: {
              method: paymentMethod,
              cardholderName: formData.cardholderName,
              cardNumber: formData.cardNumber,
              expirationDate: formData.expirationDate,
              cvv: formData.cvv,
              paypalEmail: formData.paypalEmail
            }
          }}
          onCancel={handleReviewCancel}
          onConfirm={handleOrderConfirm}
        />
      )}

      {/* Order Success Overlay */}
      {showSuccessOverlay && (
        <OrderSuccessOverlay
          orderData={orderData}
          onDone={() => navigate("/", { state: { orderSuccess: true } })}
        />
      )}
    </div>
  );
}

export default PaymentPage;