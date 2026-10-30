import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Increase JSON payload limit for high-res base64 image uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure persistent directories exist
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const DB_FILE = path.join(DATA_DIR, 'db.json');

// Auto-seed db.json if not present
if (!fs.existsSync(DB_FILE)) {
  try {
    const seed = {
      settings: {
        websiteName: 'Islamabad Escapes',
        tagline: 'Discover the Beauty of the Capital',
        logoText: 'Islamabad Escapes',
        logoSubtitle: 'Curated Capital Expeditions',
        logoImageUrl: '',
        primaryColor: '#1B4332',
        accentColor: '#D4A373',
        phone: '+92 51 289 4400',
        email: 'explore@islamabadescapes.pk',
        address: 'Executive Tower 4, Blue Area & F-6 Markaz, Islamabad, Pakistan',
        whatsappNumber: '+92 300 852 4499',
        whatsappMessage: 'Salam! I am planning a luxury trip to Islamabad and would like to consult with an itinerary specialist.',
        socialLinks: {
          instagram: 'https://instagram.com/islamabadescapes',
          facebook: 'https://facebook.com/islamabadescapes',
          youtube: 'https://youtube.com/@islamabadescapes',
          twitter: 'https://twitter.com/isbescapes',
        },
        footerAbout: 'Islamabad Escapes is Pakistan’s premier boutique destination concierge. We craft bespoke cultural journeys, guided Margalla expeditions, diplomatic retreats, and curated luxury stays across the verdant federal capital.',
        copyrightText: '© 2026 Islamabad Escapes. All rights reserved. Registered Tourism Operator.',
      },
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to create seed:', err);
  }
}

// Helper to read database
function readDatabase() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading db.json:', err);
    }
  }
  return null;
}

// Helper to write database
function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
}

// ======================== API ROUTES ========================

// 1. GET /api/data - Retrieve entire CMS dataset
app.get('/api/data', (_req: Request, res: Response) => {
  const db = readDatabase();
  if (db) {
    return res.json({ success: true, data: db });
  }
  return res.json({ success: false, message: 'No stored DB file yet. Using initial client defaults.' });
});

// 2. POST /api/data - Save entire CMS dataset
app.post('/api/data', (req: Request, res: Response) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ success: false, message: 'Invalid payload' });
  }
  const ok = writeDatabase(data);
  return res.json({ success: ok, message: ok ? 'Database persisted to server' : 'Error writing database' });
});

// 3. POST /api/upload - Handle direct base64 image / file save to /public/uploads
app.post('/api/upload', (req: Request, res: Response) => {
  try {
    const { fileName, dataUrl, fileType } = req.body;
    if (!dataUrl || !fileName) {
      return res.status(400).json({ success: false, message: 'Missing file data or name' });
    }

    const base64Data = dataUrl.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    const cleanFileName = `${Date.now()}_${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const filePath = path.join(UPLOADS_DIR, cleanFileName);

    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const publicUrl = `/uploads/${cleanFileName}`;
    return res.json({
      success: true,
      url: publicUrl,
      name: cleanFileName,
      type: fileType || 'image',
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to save uploaded file' });
  }
});

// 4. POST /api/inquiries - Submit an inquiry directly to server
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const newInquiry = req.body;
    const db = readDatabase();
    if (db) {
      if (!Array.isArray(db.inquiries)) db.inquiries = [];
      db.inquiries.unshift(newInquiry);
      writeDatabase(db);
    }
    return res.json({ success: true, inquiry: newInquiry });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to register inquiry' });
  }
});

// 5. POST /api/reset - Reset server DB
app.post('/api/reset', (_req: Request, res: Response) => {
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
  }
  return res.json({ success: true, message: 'Server database reset to initial seeds' });
});

// ======================== VITE SPA SERVING ========================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Islamabad Escapes CMS] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
