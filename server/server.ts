import express from 'express';
/**
 * Entry point for the Express server providing the API.
 */
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import communityRoutes from './routes/community';
import activitiesRoutes from './routes/activities';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/koh-tao-sunflower';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/community', communityRoutes);
app.use('/api/activities', activitiesRoutes);

// Serve static files from Angular build
app.use(express.static(path.join(__dirname, '../dist/koh-tao-sunflower')));

// Catch all handler: send back index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/koh-tao-sunflower/index.html'));
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 
