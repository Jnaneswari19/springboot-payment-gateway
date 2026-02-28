import React, { useState } from "react";

export default function Checkout({ order }) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleUPI = async () => {
    setStatus("processing");
    try {
      const res = await fetch("http://localhost:8000/api/v1/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          method: "UPI",
          vpa: "test@upi"
        })
      });
      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      setError("UPI payment failed");
      setStatus("failed");
    }
  };

  const handleCard = async () => {
    setStatus("processing");
    try {
      const res = await fetch("http://localhost:8000/api/v1/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          method: "CARD",
          cardNumber: "4111111111111111",
          expiry: "12/26",
          cvv: "123",
          cardholderName: "Test User"
        })
      });
      const data = await res.json();
      setStatus(data.status);
    } catch (err) {
      setError("Card payment failed");
      setStatus("failed");
    }
  };

  return (
    <div data-testid="checkout-page">
      <h2>Checkout</h2>
      <p data-testid="order-id">Order ID: {order.id}</p>
      <p data-testid="order-amount">Amount: {order.amount}</p>

      <div>
        <button data-testid="method-upi" onClick={handleUPI}>
          Pay with UPI
        </button>
        <button data-testid="method-card" onClick={handleCard}>
          Pay with Card
        </button>
      </div>

      {status === "processing" && (
        <div data-testid="processing-state">Processing...</div>
      )}
      {status === "success" && (
        <div data-testid="success-state">Payment Successful</div>
      )}
      {status === "failed" && (
        <div data-testid="error-state">
          <span data-testid="error-message">{error}</span>
          <button
            data-testid="retry-button"
            onClick={() => {
              setStatus(null);
              setError(null);
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
