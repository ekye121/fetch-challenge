import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/hiring.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <div>
        {
          data.map((el, i) => (
            <div key={i}>{el.id}</div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
