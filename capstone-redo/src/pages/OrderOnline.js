import React, { useState, useContext } from "react";
import { navigate, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { CartContext } from "../context/CartContext";
import "./OrderOnline.css";



const OrderOnline = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [deliveryType, setDeliveryType] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState("");
  const navigate = useNavigate();

  const menuItems = {
    appetizers: [
      {
        id: 1,
        imgSrc: "/whipped feta.jpg",
        imgAlt: "Whipped Feta",
        title: "Whipped Feta",
        text: "Tangy barrel-aged feta is whipped until light and airy with fresh rosemary and thyme, topped generously with Kalamata olives.",
        price: "$14.99",
      },
      {
        id: 2,
        imgSrc: "/hummus & pita.jpg",
        imgAlt: "Hummus and Pita",
        title: "Hummus and Pita",
        text: "Creamy, house-made hummus blended from organic chickpeas, tahini, lemon juice, and roasted garlic served with warm pita bread.",
        price: "$14.99",
      },
      {
        id: 3,
        imgSrc: "/bruschetta reg.jpg",
        imgAlt: "Bruschetta al Pomodoro",
        title: "Bruschetta al Pomodoro",
        text: "Toasted slices of rustic Italian bread rubbed with fresh garlic, topped with sweet marinated cherry tomatoes and fragrant basil.",
        price: "$5.99",
      },
      {
        id: 4,
        imgSrc: "/greek salad hidef.jpg",
        imgAlt: "Greek Salad",
        title: "Greek Salad",
        text: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic croutons.",
        price: "$12.99",
      },
    ],
    mains: [
      {
        id: 5,
        imgSrc: "/Seafood Paella.jpg",
        imgAlt: "Seafood Paella",
        title: "Seafood Paella",
        text: "Succulent shrimp, tender calamari, mussels, and clams simmered with bomba rice and vibrant saffron in a rich fish stock.",
        price: "$24.99",
      },
      {
        id: 6,
        imgSrc: "/chicken Shawarma Rice Bowl.jpg",
        imgAlt: "Chicken Shawarma Rice Bowl",
        title: "Chicken Shawarma Rice Bowl",
        text: "Succulent, slow-roasted chicken shawarma marinated in yogurt and warm Middle Eastern spices, served over fluffy turmeric rice.",
        price: "$14.99",
      },
      {
        id: 7,
        imgSrc: "/Moussaka.jpg",
        imgAlt: "Moussaka",
        title: "Moussaka",
        text: "A decadent layering of rich, spiced ground beef and lamb ragù with tender eggplant and potatoes, topped with creamy béchamel sauce.",
        price: "$18.99",
      },
      {
        id: 8,
        imgSrc: "/gyros.jpg",
        imgAlt: "Gyros",
        title: "Gyros",
        text: "Savory, herb-infused beef and lamb slices carved fresh from the spit, enveloped in warm pita with tomatoes and tzatziki sauce.",
        price: "$12.55",
      },
      {
        id: 9,
        imgSrc: "/grilled fish reg.jpg",
        imgAlt: "Grilled Fish",
        title: "Grilled Fish",
        text: "A fresh, flaky whole fish seasoned simply with sea salt, lemon, and fragrant Mediterranean herbs, then grilled to perfection.",
        price: "$25.99",
      },
      {
        id: 10,
        imgSrc: "/lamb Souvlaki.jpg",
        imgAlt: "Lamb Slouvaki",
        title: "Lamb Slouvaki",
        text: "Succulent cubes of boneless leg of lamb marinated in lemon, garlic, and Mediterranean herbs, grilled with bell peppers and onions.",
        price: "$18.95",
      },

      // Shakshuka
      {
        id: 11,
        imgSrc: "/Shakshuka.jpg",
        imgAlt: "Shakshuka",
        title: "Shakshuka",
        text: "Spicy, slow-simmered tomatoes, bell peppers, and onions are brightened with cumin and paprika, forming a rich base where fresh eggs are gently poached until the whites are set and the yolks remain perfectly runny, served hot with crusty bread for dipping.",
        price: "$12.55",
      },
    ],
    desserts: [
      {
        id: 12,
        imgSrc: "/Baklava.jpg",
        imgAlt: "Baklava",
        title: "Baklava",
        text: "Layers of delicate, flaky phyllo pastry are brushed with melted butter, layered with a rich mixture of finely chopped walnuts and pistachios, baked until golden and crisp, then drenched in a sweet, spiced orange blossom syrup for a truly decadent and satisfying crunch.",
        price: "$18.95",
      },
      {
        id: 13,
        imgSrc: "/Turkish Delight.jpg",
        imgAlt: "Turkish Delight",
        title: "Turkish Delight (Lokum)",
        text: "Delicate cubes of rosewater-infused confection are coated lightly in powdered sugar, offering a soft, chewy, and subtly fragrant bite that provides an elegant, traditional sweet finish to any meal.",
        price: "$14.99",
      },
      {
        id: 14,
        imgSrc: "/Tiramisu.jpg",
        imgAlt: "Tiramisu",
        title: "Tiramisu",
        text: "Layers of delicate ladyfingers are quickly dipped in a robust espresso and coffee liqueur blend, then nestled between a rich, velvety mascarpone cream filling and dusted generously with high-quality cocoa powder for an elegant, timeless Italian dessert.",
        price: "$14.99",
      },
      {
        id: 15,
        imgSrc: "/Rice Pudding.jpg",
        imgAlt: "Rice Pudding (Arroz con Leche)",
        title: "Rice Pudding (Arroz con Leche)",
        text: "Creamy Arborio rice is slow-simmered in milk with cinnamon sticks, vanilla, and a hint of citrus zest until perfectly tender, then chilled and dusted with ground cinnamon for a smooth, comforting, and nostalgic dessert.",
        price: "$12.55",
      },
      {
        id: 16,
        imgSrc: "/churros.jpg",
        imgAlt: "Churros",
        title: "Churros",
        text: "Crisp, golden-fried pastry dough is rolled immediately in a generous cinnamon-sugar mixture, served warm and ready for dipping into a rich, decadent chocolate or dulce de leche sauce for a perfect sweet treat.",
        price: "$12.55",
      },
    ],
    beverages: [
      {
        id: 17,
        imgSrc: "/lemonade 2.jpg",
        imgAlt: "Fresh Lemonade",
        title: "Fresh Lemonade",
        text: "Refreshing homemade lemonade made with fresh lemons, sparkling water, and a touch of honey.",
        price: "$4.99",
      },
      {
        id: 18,
        imgSrc: "/tea2.jpg",
        imgAlt: "Iced Tea",
        title: "Iced Tea",
        text: "Chilled house-brewed iced tea served over ice with fresh lemon for a perfect thirst quencher.",
        price: "$3.99",
      },
      {
        id: 19,
        imgSrc: "/wine.jpg",
        imgAlt: "Greek Wine",
        title: "Greek Wine (Glass)",
        text: "Select from our curated collection of Greek wines that pair perfectly with Mediterranean cuisine.",
        price: "$8.99",
      },
    ],
  };

  const getCartTotal = () => {
    return cart
      .reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const getTaxAmount = () => {
    const subtotal = parseFloat(getCartTotal());
    return (subtotal * 0.1).toFixed(2); // 10% tax
  };

  const getFinalTotal = () => {
    const subtotal = parseFloat(getCartTotal());
    const tax = parseFloat(getTaxAmount());
    return (subtotal + tax).toFixed(2);
  };

  const handleContinue = () => {
    if (cart.length > 0) {
      setShowDeliveryOptions(true);
    }
  };

  const handleDeliverySelection = (type) => {
    setDeliveryType(type);
  };

  const handleProceedToPayment = () => {
    if (deliveryType) {
      // Save cart and delivery info to localStorage before navigating
      const orderData = {
        cart,
        deliveryType,
        deliveryAddress: deliveryType === "delivery" ? deliveryAddress : "",
        vehicleInfo: deliveryType === "curbside" ? vehicleInfo : "",
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("orderCart", JSON.stringify(cart));
      localStorage.setItem("orderDeliveryInfo", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const handleBackToCart = () => {
    setShowDeliveryOptions(false);
    setDeliveryType("");
    setDeliveryAddress("");
    setVehicleInfo("");
  };

  const currentItems = menuItems[selectedCategory];

  return (
    <div className="order-online-container">
      <div className="order-online-header">
        <h1 className="order-online-title"> Order Online </h1>
        <h2 className="order-online-subtitle">
          Browse our delicious menu and order for delivery
        </h2>
      </div>

      <div className="order-online-content">
        {/* SIDEBAR - Category Filters */}
        <div className="category-sidebar">
          <h3 className="category-title">Categories</h3>
          <div className="category-filters">
            {Object.keys(menuItems).map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? "active" : ""
                  }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT - Menu Items */}
        <div className="menu-items-section">
          <div className="menu-items-grid">
            {currentItems.map((item) => (
              <div key={item.id} className="menu-item-card-wrapper">
                <Card className="order-online-menu-card">
                  <Card.Img
                    variant="top"
                    className="card-image"
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    style={{ objectFit: "cover", objectPosition: "center", height: "300px" }}
                  />
                  <Card.Body>
                    <div className="card-title-price">
                      <Card.Title className="order-card-title">
                        {item.title}
                      </Card.Title>
                      <Card.Subtitle className="order-card-price">
                        {item.price}
                      </Card.Subtitle>
                    </div>
                    <Card.Text className="order-card-text">
                      {item.text}
                    </Card.Text>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR - Shopping Cart */}
        <div className="shopping-cart-sidebar">
          <h3 className="cart-title">Shopping Cart</h3>
          {cart.length === 0 ? (
            <p className="cart-empty">Your cart is empty</p>
          ) : (
            <div>
              <div className="cart-items">
                {cart.map((item) => {
                  const price = parseFloat(item.price.replace("$", ""));
                  const itemTotal = (price * item.quantity).toFixed(2);
                  return (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-details">
                        <p className="cart-item-name">{item.title}</p>
                        <p className="cart-item-price">${itemTotal}</p>
                      </div>
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cart-summary">
                <div className="tax">
                  <span>Tax (10%):</span>
                  <span className="tax-amount">${getTaxAmount()}</span>
                </div>
                <div className="cart-total">
                  <span>Total:</span>
                  <span className="total-amount">${getFinalTotal()}</span>
                </div>
                <button 
                  className="checkout-btn" 
                  onClick={handleContinue}
                  disabled={cart.length === 0}
                  style={{
                    opacity: cart.length === 0 ? 0.5 : 1,
                    cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  {cart.length === 0 ? 'Add Items to Checkout' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Options Modal */}
      {showDeliveryOptions && (
        <div className="delivery-options-overlay">
          <div className="delivery-options-modal">
            <h2 className="delivery-options-title">Choose Your Order Type</h2>
            <p className="delivery-options-subtitle">How would you like to receive your order?</p>

            <div className="delivery-options">
              <div
                className={`delivery-option ${deliveryType === "delivery" ? "selected" : ""}`}
                onClick={() => handleDeliverySelection("delivery")}
              >
                <div className="option-icon">🚚</div>
                <h3>Delivery</h3>
                <p>Get your food delivered right to your door. Additional delivery fee may apply.</p>
                <div className="option-details">
                  <span className="fee">+$3.99 delivery fee</span>
                  <span className="time">45-60 min</span>
                </div>
              </div>

              <div
                className={`delivery-option ${deliveryType === "curbside" ? "selected" : ""}`}
                onClick={() => handleDeliverySelection("curbside")}
              >
                <div className="option-icon">🚗</div>
                <h3>Curbside Pickup</h3>
                <p>Park in our designated pickup area and we'll bring your order to your car.</p>
                <div className="option-details">
                  <span className="fee">No additional fees</span>
                  <span className="time">20-30 min</span>
                </div>
              </div>
            </div>

            {deliveryType === "delivery" && (
              <div className="delivery-form">
                <h4>Delivery Address</h4>
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="delivery-input"
                />
              </div>
            )}

            {deliveryType === "curbside" && (
              <div className="delivery-form">
                <h4>Vehicle Information</h4>
                <input
                  type="text"
                  placeholder="Vehicle make, model, and color (e.g., Blue Toyota Camry)"
                  value={vehicleInfo}
                  onChange={(e) => setVehicleInfo(e.target.value)}
                  className="delivery-input"
                />
              </div>
            )}

            <div className="delivery-actions">
              <button
                className="delivery-back-btn"
                onClick={handleBackToCart}
              >
                ← Back to Cart
              </button>
              <button
                className="delivery-continue-btn"
                onClick={handleProceedToPayment}
                disabled={!deliveryType || (deliveryType === "delivery" && !deliveryAddress.trim()) || (deliveryType === "curbside" && !vehicleInfo.trim())}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      );
};

      export default OrderOnline;