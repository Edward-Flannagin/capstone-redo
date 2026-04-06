import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Main from "../Main.js";
import FadingAlert from "../FadingAlert.jsx";

function Home() {
  const location = useLocation();
  const [showOrderSuccess, setShowOrderSuccess] = useState(
    location.state?.orderSuccess || false
  );

  return (
    <>
      {showOrderSuccess && (
        <FadingAlert
          icon="✓"
          message="Order completed successfully! Thank you for your order."
          duration={3000}
          fadeDuration={500}
          onDone={() => setShowOrderSuccess(false)}
        />
      )}
      <Main />
    </>
  );
}

export default Home;

