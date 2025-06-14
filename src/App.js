import React, { useState } from 'react';
import './App.css';
import NewsScraper from './components/NewsScraper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>News Scraper</h1>
      </header>
      <main>
        <NewsScraper />
      </main>
    </div>
  );
}

export default App; 