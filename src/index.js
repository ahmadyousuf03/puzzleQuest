// src/index.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import puzzleRoutes from './routes/puzzleRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use('/api/puzzles', puzzleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
