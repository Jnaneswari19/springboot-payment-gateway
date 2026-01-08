import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com") {
      localStorage.setItem("apiKey", "TEST_API_KEY");
      localStorage.setItem("apiSecret", "TEST_API_SECRET");
      onLogin();
    } else {
      alert("Invalid email");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} data-test-id="login-form">
        <input
          data-test-id="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button data-test-id="login-submit" type="submit">Login</button>
      </form>
    </div>
  );
}
