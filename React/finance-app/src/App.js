import React, { useState, useEffect } from "react";
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransaction = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransaction();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a href="/" className="navbar-brand">Finance App</a>
        </div>
      </nav>

      <div className="container mt-4">
        <form onSubmit={handleFormSubmit}>
          <input name="amount" placeholder="Amount" value={formData.amount} onChange={handleInputChange} className="form-control mb-2" />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} className="form-control mb-2" />
          <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="form-control mb-2" />
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-control mb-2" />
          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" name="is_income" checked={formData.is_income} onChange={handleInputChange} />
            <label className="form-check-label">Is Income</label>
          </div>
          <button type="submit" className="btn btn-primary">Add Transaction</button>
        </form>

        <hr />

        <h3>Transactions</h3>
        <ul className="list-group">
          {transactions.map((txn) => (
            <li className="list-group-item" key={txn.id}>
              {txn.date} - ₹{txn.amount} - {txn.category} - {txn.description} ({txn.is_income ? 'Income' : 'Expense'})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
