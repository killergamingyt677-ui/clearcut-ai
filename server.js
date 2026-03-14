// Backend API Server for Background Removal
// This handles communication with n8n webhook
// Run: npm install express cors dotenv multer node-fetch
// Start: node server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const N8N_WEBHOOK_URL = "https://pankaj-bot.app.n8n.cloud/webhook/background_remover";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      cb(new Error('Only JPG, PNG, and WEBP files are allowed'));
    } else {
      cb(null, true);
    }
  },
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Background removal API is running' });
});

// Main webhook endpoint for background removal
app.post('/webhook/remove-bg', upload.single('image'), async (req, res) => {
  try {
    console.log('Received request for background removal');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Read the file and create FormData to send to n8n
    const fs = await import('fs').then(m => m.promises);
    const fileBuffer = await fs.readFile(req.file.path);

    // Create FormData for n8n
    const FormData = (await import('form-data')).default;
    const form = new FormData();
    form.append('image', fileBuffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    form.append('fileName', req.file.originalname);
    form.append('fileType', req.file.mimetype);

    console.log(`Forwarding request to n8n: ${N8N_WEBHOOK_URL}`);

    // Forward the request to n8n
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
      timeout: 120000, // 2 minutes
    });

    console.log('N8N Response Status:', n8nResponse.status);

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('N8N Error:', errorText);
      return res.status(n8nResponse.status).json({
        error: `N8N webhook error: ${n8nResponse.statusText}`,
        details: errorText,
      });
    }

    const n8nData = await n8nResponse.json();
    console.log('N8N Response Data:', n8nData);

    if (!n8nData.url) {
      return res.status(400).json({
        error: 'Invalid response from n8n: missing URL',
        response: n8nData,
      });
    }

    // Clean up uploaded file
    try {
      await fs.unlink(req.file.path);
    } catch (err) {
      console.warn('Could not delete temp file:', err);
    }

    // Return the processed image URL
    res.json({
      success: true,
      url: n8nData.url,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error:', error);

    // Clean up on error
    if (req.file) {
      try {
        const fs = await import('fs').then(m => m.promises);
        await fs.unlink(req.file.path);
      } catch (err) {
        console.warn('Could not delete temp file:', err);
      }
    }

    res.status(500).json({
      error: error.message || 'Failed to process image',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

// Proxy endpoint to download images (handles CORS)
app.get('/download-image', async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log('Downloading image from:', url);

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Failed to fetch image: ${response.statusText}`,
      });
    }

    // Get content type and set headers
    const contentType = response.headers.get('content-type');
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="image.png"');

    // Stream the response
    response.body.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      error: error.message || 'Failed to download image',
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({ error: 'File is too large. Max 10MB.' });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err.message === 'Only JPG, PNG, and WEBP files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: err.message || 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Background removal API running on http://localhost:${PORT}`);
  console.log(`📝 POST http://localhost:${PORT}/webhook/remove-bg - Remove background from image`);
  console.log(`🔍 GET http://localhost:${PORT}/health - Health check`);
});
