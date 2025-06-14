const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });

    const $ = cheerio.load(response.data);
    const newsItems = [];

    const hostname = new URL(url).hostname;

    if (hostname.includes('npr.org')) {
      $('article.story-wrap, article.has-image, article.item').each((i, element) => {
        const title = $(element).find('h2.title, h3.title,').text().trim();
        const link = $(element).find('a').attr('href');
        const teaser = $(element).find('p.teaser').text().trim();
        const date = $(element).find('time').attr('datetime') || $(element).find('.date').text().trim();
        const author = $(element).find('.author').text().trim();

        if (title && link) {
          newsItems.push({
            title,
            url: link.startsWith('http') ? link : `https://www.npr.org${link}`,
            teaser,
            date,
            author,
            category: 'News',
            topics: [],
            source: 'npr.org'
          });
        }
      });
    }

    // === CNN Specific Scraping ===
    if (newsItems.length === 0 && hostname.includes('cnn.com')) {
      $('.container__headline, .cd__headline, .card__content').each((i, element) => {
        const title = $(element).find('span, h3, a').first().text().trim();
        let link = $(element).find('a').first().attr('href');
        if (link && !link.startsWith('http')) {
          link = new URL(link, url).href;
        }

        const date = $(element).find('time').attr('datetime') || '';
        const category = $(element).find('.metadata__byline__category, .cd__section-name').text().trim();
        const topics = $(element).find('.tag, .label').map((i, el) => $(el).text().trim()).get();

        if (title && link) {
          newsItems.push({
            title,
            url: link,
            date,
            category,
            topics,
            source: hostname
          });
        }
      });
    }

    // === BBC Specific Scraping ===
    if (newsItems.length === 0 && (hostname.includes('bbc.com') || hostname.includes('bbc.co.uk'))) {
      $('.gs-c-promo').each((i, element) => {
        const title = $(element).find('.gs-c-promo-heading__title').text().trim();
        let link = $(element).find('a.gs-c-promo-heading').attr('href');

        if (link && !link.startsWith('http')) {
          link = new URL(link, 'https://www.bbc.com').href;
        }

        const date = $(element).find('time').attr('datetime') || '';
        const category = $(element).find('.gs-c-section-link').text().trim();
        const topics = $(element).find('.gs-c-promo-metadata__topics, .nw-c-tag').map((i, el) => $(el).text().trim()).get();

        if (title && link) {
          newsItems.push({
            title,
            url: link,
            date,
            category,
            topics,
            source: hostname
          });
        }
      });
    }

    // === Generic Fallback Scraping ===
    if (newsItems.length === 0) {
      $('article, .article, .news-item, .post, .story, .entry').each((i, element) => {
        const title = $(element).find('h1, h2, h3, .headline, .title, .entry-title').first().text().trim();
        const date = $(element).find('time, .date, .published, [itemprop="datePublished"]').first().text().trim();
        let link = $(element).find('a').first().attr('href') || url;
        if (link && !link.startsWith('http')) {
          link = new URL(link, url).href;
        }

        const topics = $(element).find('.topic, .tag, .labels, .label').map((i, el) => $(el).text().trim()).get();

        if (title && link) {
          newsItems.push({
            title,
            url: link,
            date,
            category: '',
            topics,
            source: hostname
          });
        }
      });
    }

    // === Last-Resort Fallback ===
    if (newsItems.length === 0) {
      $('h2, h3, a').each((i, element) => {
        const title = $(element).text().trim();
        let link = $(element).attr('href') || url;
        if (link && !link.startsWith('http')) {
          link = new URL(link, url).href;
        }

        if (title && link) {
          newsItems.push({
            title,
            url: link,
            date: '',
            category: '',
            topics: [],
            source: hostname
          });
        }
      });
    }

    res.json({ success: true, news: newsItems });
  } catch (err) {
    console.error('Scraping Error:', err.message);
    res.status(500).json({ success: false, error: 'Error scraping the website.', details: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
