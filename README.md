# News Scraper React Application

A React application that demonstrates web scraping using Cheerio to extract news articles from websites.

## Features

- Extract news headlines, authors, dates, and sources from websites
- Filter news by keywords
- Sort news by date or title
- Loading spinner for better UX
- Responsive design
- Error handling

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```

## Usage

1. Enter a website URL in the input field
2. Click "Scrape News" to extract news articles
3. Use the filter input to search for specific keywords
4. Use the sort dropdown to sort results by date or title

## Ethical Considerations

### When is scraping allowed?
- When the website's terms of service explicitly allow it
- When the data is publicly available and not behind authentication
- When you have permission from the website owner
- When you comply with the website's robots.txt rules

### Best Practices
1. Always check robots.txt before scraping
2. Implement rate limiting to avoid overwhelming servers
3. Respect copyright and intellectual property rights
4. Use appropriate user agents to identify your scraper
5. Consider using official APIs when available
6. Store only necessary data
7. Implement proper error handling and retry mechanisms

### Legal Alternatives
1. Use official APIs provided by news websites
2. Subscribe to news aggregation services
3. Use RSS feeds when available
4. Consider paid data services for commercial use

## Technical Notes

- The application uses Cheerio for HTML parsing
- Axios is used for making HTTP requests
- The scraping logic may need to be adjusted based on the target website's structure
- Some websites may block scraping attempts
- Dynamic content loaded via JavaScript may not be accessible

## Contributing

Feel free to submit issues and enhancement requests! 