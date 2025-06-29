import React, { useState, useEffect } from "react";
import "./style.css";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData = [
        {
          id: 1,
          date: "2024-06-15T10:30:00Z",
          description: "Coffee Shop Purchase",
          amount: -4.25,
        },
        {
          id: 2,
          date: "2024-06-14T14:20:00Z",
          description: "Salary Deposit",
          amount: 2500.0,
        },
        {
          id: 3,
          date: "2024-06-13T09:15:00Z",
          description: "Grocery Store",
          amount: -87.43,
        },
        {
          id: 4,
          date: "2024-06-12T16:45:00Z",
          description: "ATM Withdrawal",
          amount: -100.0,
        },
        {
          id: 5,
          date: "2024-06-11T11:30:00Z",
          description: "Investment Return",
          amount: 150.75,
        },
      ];

      return mockData;
    } catch (err) {
      throw new Error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  if (loading) {
    return (
      <div className="transaction-table">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transaction-table">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="transaction-table">
      <h3>Recent Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction?.id}>
              <td>{formatDate(transaction?.date)}</td>
              <td>{transaction?.description}</td>
              <td
                className={transaction?.amount >= 0 ? "positive" : "negative"}
              >
                {transaction?.amount >= 0 ? "+" : "-"}
                {formatAmount(transaction?.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {transactions?.length === 0 && (
        <div className="no-data">No transactions found</div>
      )}
    </div>
  );
};

export default TransactionTable;
