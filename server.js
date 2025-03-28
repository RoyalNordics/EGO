const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
// Note: When using SVG.js in the server, import it as follows:
// const { SVG } = require('@svgdotjs/svg.js');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') {
      cb(null, true);
    } else {
      cb(new Error('Only SVG files are allowed'));
    }
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "img-src": ["'self'", "data:", "blob:"],
    },
  },
}));

// Serve static files from the ego-platform/ui/public directory
const uiPublicDir = path.join(__dirname, 'ego-platform', 'ui', 'public');
app.use(express.static(uiPublicDir));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
const apiRouter = express.Router();

// Upload SVG file
apiRouter.post('/upload', upload.single('svg'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    res.status(200).json({ 
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Parse SVG and generate 3D model
apiRouter.post('/convert', (req, res) => {
  try {
    const { svgPath } = req.body;

    if (!svgPath) {
      return res.status(400).json({ error: 'SVG path is required' });
    }

    // Load the SVG file
    fs.readFile(svgPath, 'utf8', async (err, svgData) => {
      if (err) {
        console.error('Error reading SVG file:', err);
        return res.status(500).json({ error: 'Failed to read SVG file' });
      }

      try {
        // Call the SVG parsing and 3D model generation code
        const { generateBagFromSVG } = require('./js/bag_generator');
        const result = await generateBagFromSVG(svgPath);

        res.status(200).json({
          message: 'Conversion successful',
          model: {
            id: `model-${Date.now()}`,
            preview: '/api/preview/sample.png', // TODO: Generate preview image
            download: '/api/download/sample.glb', // TODO: Generate GLB file
            data: result // Include the result data
          }
        });
      } catch (error) {
        console.error('Error converting SVG:', error);
        res.status(500).json({ error: 'Failed to convert SVG to 3D model' });
      }
    });
  } catch (error) {
    console.error('Error converting SVG:', error);
    res.status(500).json({ error: 'Failed to convert SVG to 3D model' });
  }
});

// Mount API routes
app.use('/api', apiRouter);

// Catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(uiPublicDir, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
