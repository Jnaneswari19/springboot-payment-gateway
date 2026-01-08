import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, amount: 0, successRate: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/payments-list", {
      headers: {
        "X-Api-Key": localStorage.getItem("apiKey"),
        "X-Api-Secret": localStorage.getItem("apiSecret"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const total = data.length;
        const amount = data.reduce((sum, p) => sum + p.amount, 0);
        const success = data.filter((p) => p.status === "success").length;
        setStats({
          total,
          amount,
          successRate: total ? Math.round((success / total) * 100) : 0,
        });
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p data-test-id="api-key">API Key: {localStorage.getItem("apiKey")}</p>
      <p data-test-id="api-secret">API Secret: {localStorage.getItem("apiSecret")}</p>
      <div>
        <p data-test-id="total-transactions">Total Transactions: {stats.total}</p>
        <p data-test-id="total-amount">Total Amount: ₹{stats.amount}</p>
        <p data-test-id="success-rate">Success Rate: {stats.successRate}%</p>
      </div>
    </div>
  );
}
