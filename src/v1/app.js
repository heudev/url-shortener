require('dotenv').config();
const express = require('express');
const loaders = require('./loaders');
const { UrlRoutes } = require('./routes');

loaders();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
    <h1>URL SHORTENER API</h1>
    <p>This application allows you to shorten long URLs and provides an option for a custom URL path.</p>
    
    <h2>How to Use:</h2>
    <ol>
        <li><strong>Original URL</strong> (Required): The URL you want to shorten.</li>
        <li><strong>Custom URL Path</strong> (Optional): A specific path for the short URL (e.g., <code>my-custom-url</code>).</li>
    </ol>
    
    <h3>Request Format:</h3>
    <p>Send a <code>POST</code> request to <code>/shorten</code>:</p>
    <pre>
    <code>
    POST /shorten
    {
        "original_url": "https://www.example.com",
        "custom_url_path": "my-custom-url" // Optional
    }
    </code>
    </pre>
    
    <h3>Response:</h3>
    <p>You will receive the shortened URL. If no <code>custom_url_path</code> is provided, a random path consisting of 4 characters will be generated.</p>
    
    <div>
        <p><strong>Example Shortened URL:</strong></p>
        <pre><code>${process.env.BASE_URL}/<strong>my-custom-url</strong></code></pre>
    </div>
    `);
});

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${process.env.APP_PORT}`);
    app.use('/', UrlRoutes);
});