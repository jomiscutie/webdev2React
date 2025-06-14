import React, { useState } from 'react';
import axios from 'axios';
import './NewsScraper.css';

const NewsScraper = () => {
  const [url, setUrl] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  const scrapeNews = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setNews([]);

    try {
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      setNews(response.data.news || []);
      setCategoryFilter('');
      setTopicFilter('');
    } catch {
      setError('Error scraping the website. Please try again.');
    }

    setLoading(false);
  };

  const uniqueCategories = Array.from(new Set(news.map(item => item.category).filter(Boolean)));
  const uniqueTopics = Array.from(new Set(news.flatMap(item => item.topics || []).filter(Boolean)));

  const filteredNews = news
    .filter(item =>
      (categoryFilter === '' || item.category === categoryFilter) &&
      (topicFilter === '' || (item.topics || []).includes(topicFilter))
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="news-scraper">
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>News Scraper</h2>

      <div className="controls">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter website URL to scrape"
          className="url-input"
        />
        <button
          onClick={scrapeNews}
          disabled={loading || !url}
          className="scrape-button"
        >
          {loading ? 'Scraping...' : 'Scrape News'}
        </button>
      </div>

      {news.length > 0 && (
        <>
          <div className="category-filters">
            <button
              className={`category-btn${categoryFilter === '' ? ' active' : ''}`}
              onClick={() => setCategoryFilter('')}
            >
              All Categories
            </button>
            {uniqueCategories.map(cat => (
              <button
                key={cat}
                className={`category-btn${categoryFilter === cat ? ' active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {uniqueTopics.length > 0 && (
            <div className="category-filters" style={{ marginTop: 0 }}>
              <button
                className={`category-btn${topicFilter === '' ? ' active' : ''}`}
                onClick={() => setTopicFilter('')}
              >
                All Topics
              </button>
              {uniqueTopics.map(topic => (
                <button
                  key={topic}
                  className={`category-btn${topicFilter === topic ? ' active' : ''}`}
                  onClick={() => setTopicFilter(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Scraping in progress...</p>
        </div>
      )}

      <div className="news-list">
        {filteredNews.length === 0 && news.length > 0 ? (
          <div style={{ textAlign: 'center', width: '100%', color: '#888', fontSize: 18, marginTop: 40 }}>
            No results found
            {categoryFilter ? ` for category "${categoryFilter}"` : ''}
            {topicFilter ? ` and topic "${topicFilter}"` : ''}.
          </div>
        ) : (
          filteredNews.map((item, idx) => (
            <div key={idx} className="news-item">
              <h2>{item.title}</h2>
              <div className="news-meta">
                <span>Category: {item.category || 'N/A'}</span>
                <span>Date: {item.date ? new Date(item.date).toLocaleString() : 'No date available'}</span>
                <span>Source: {item.source}</span>
                {item.author && <span>Author: {item.author}</span>}
                {item.topics && item.topics.length > 0 && (
                  <span>Topics: {item.topics.join(', ')}</span>
                )}
              </div>
              {item.teaser && <p>{item.teaser}</p>}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsScraper;
