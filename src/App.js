import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [postMessage, setPostMessage] = useState('');

  useEffect(() => {
    fetch('/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  const handlePostTest = () => {
    fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'test' }),
    })
    .then(response => response.json())
    .then(data => setPostMessage(data.message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TestApp</h1>
        <p>Backend Test Message: {message}</p>
        <button onClick={handlePostTest}>Send POST Request</button>
        {postMessage && <p>POST Response: {postMessage}</p>}
      </header>
    </div>
  );
}

export default App;
