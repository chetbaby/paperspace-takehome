import React, { useState, useEffect } from 'react';
import './App.css';
import ReactJson from 'react-json-view';
import Axios from 'axios';

function App() {
  const [list, setList] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get('/api')
      .then(result => {
        setList(result.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <ReactJson src={list} theme="hop scotch" />
      )}
    </div>
  );
}

export default App;
