const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configure AWS SDK
AWS.config.update({ region: 'your-region' });
const s3 = new AWS.S3();
const BUCKET_NAME = 'your-bucket-name';
const KEY = 'PlayerWhitelist.json';

// Middleware
app.use(bodyParser.json());

// Endpoint to get JSON data
app.get('/whitelist', (req, res) => {
    const params = { Bucket: BUCKET_NAME, Key: KEY };
    s3.getObject(params, (err, data) => {
        if (err) {
            return res.status(500).send('Error fetching file');
        }
        res.json(JSON.parse(data.Body.toString()));
    });
});

// Endpoint to update JSON data
app.put('/whitelist', (req, res) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: KEY,
        Body: JSON.stringify(req.body, null, 2),
        ContentType: 'application/json'
    };
    s3.putObject(params, (err) => {
        if (err) {
            return res.status(500).send('Error updating file');
        }
        res.send('File updated successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
