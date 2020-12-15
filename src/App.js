import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [listIds, setListIds] = useState([]);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = () => {
    fetch('/hiring.json')
      .then(res => res.json())
      .then(data => {
        setData(displayItems(data));
        getListIds(data);
      })
      .catch(err => console.error(err));
  };

  const getListIds = (data) => {
    const listIds = data.reduce((acc, curr) => acc.add(curr.listId), new Set());
    const sorted = [...listIds].sort();
    setListIds(sorted);
  };

  const displayItems = (data) => {
    let itemsWithNames = data.filter(item => item.name);
    return itemsWithNames.sort((a, b) => {
      a = +a.name.match(/\d+/g).join();
      b = +b.name.match(/\d+/g).join();
      return a - b;
    });
  };

  return (
    <div className="App">
      <div id="data-list">
        <h2>
          <strong style={{color: '#724e7a'}}>List: {data.length} Items</strong>
        </h2>
        <table id="data-table">
          <thead>
            <tr>
              <th id="col-head-list-id">List ID</th>
              <th id="col-head-id">ID</th>
              <th id="col-head-name">Name</th>
            </tr>
          </thead>
          {
            listIds.map((listId, i) => (
              <tbody key={i}>
                {
                  data.filter(item => item.listId === listId)
                    .map((item, i) => (
                      <tr key={i}>
                        <td className="col-list-id">{item.listId}</td>
                        <td className="col-id">{item.id}</td>
                        <td className="col-name">{item.name}</td>
                      </tr>
                  ))
                }
              </tbody>
            ))
          }
        </table>
      </div>
    </div>
  );
}

export default App;
