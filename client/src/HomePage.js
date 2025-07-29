import React, { useState } from 'react';

function HomePage({ onLogout, user }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="card">
      <h2>Welcome, {user}!</h2>
      <p>You are logged in successfully</p>
      
      <form onSubmit={handleSubmit}>
        <label>
          Your Input Request to Server:
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      
      <div>
        Response from server: {response}
      </div>
      
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default HomePage;
