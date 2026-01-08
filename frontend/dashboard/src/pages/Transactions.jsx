import React, { useEffect, useState } from "react";

export default function Transactions() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/payments-list", {
      headers: {
        "X-Api-Key": localStorage.getItem("apiKey"),
        "X-Api-Secret": localStorage.getItem("apiSecret"),
      },
    })
      .then((res) => res.json())
      .then(setPayments);
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table data-test-id="transactions-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td data-test-id="payment-id">{p.id}</td>
              <td data-test-id="order-id">{p.orderId}</td>
              <td data-test-id="amount">₹{p.amount}</td>
              <td data-test-id="status">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
