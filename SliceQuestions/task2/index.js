import React from "react";
import "./style.css";

const BalanceWidget = ({ accounts = [], warningThreshold = 1000 }) => {
  const totalBalance = accounts?.reduce((sum, account) => {
    return sum + (account?.balance || 0);
  }, 0);

  const accountCount = accounts?.length;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const isLowBalance = totalBalance < warningThreshold;

  return (
    <div className="balance-widget">
      <div className="account-count">Accounts: {accountCount}</div>

      <div className="total-balance">
        Total Balance: {formatCurrency(totalBalance)}
      </div>

      {isLowBalance && (
        <div className="warning">
          Warning: Balance is below {formatCurrency(warningThreshold)}
        </div>
      )}
    </div>
  );
};

export default BalanceWidget;
