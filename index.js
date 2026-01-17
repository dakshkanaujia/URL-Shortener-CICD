const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory storage
const urlDb = {};

function generateSlug(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// API #1: Shorten URL
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    let slug = generateSlug();
    // Simple collision check
    while (urlDb[slug]) {
        slug = generateSlug();
    }

    urlDb[slug] = url;
    res.json({ 
        slug: slug,
        url: url
    });
});

// API #2: Fetch URL (No redirect, just JSON)
app.get('/url/:slug', (req, res) => {
    const { slug } = req.params;
    const originalUrl = urlDb[slug];

    if (originalUrl) {
        res.json({
            slug: slug,
            url: originalUrl
        });
    } else {
        res.status(404).json({ error: 'URL not found' });
    }
});

// Export app for testing
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app;
