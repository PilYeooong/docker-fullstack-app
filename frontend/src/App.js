import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

function App() {
  
  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log('response', response);
        setLists(response.data);
      });
  }, []);

  const changeHandler = e => {
    setValue(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    axios.post('/api/value', { value })
      .then(response => {
        if(response.data.success) {
          console.log('response', response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert('failed');
        }
      })
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">

          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}
          <form action="" className="example" onSubmit={submitHandler} >
            <input type="text" placeholder="Write ..." value={value}onChange={changeHandler} />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
