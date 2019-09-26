import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import Home from './containers/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route path="/" exact component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
