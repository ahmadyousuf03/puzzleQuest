// src/routes/puzzleRoutes.js

import express from 'express';
import { getPuzzles, getPuzzleById, validateAnswer } from '../controllers/puzzleController.js';

const router = express.Router();

// Get all puzzles
router.get('/', getPuzzles);

// Get a specific puzzle by ID
router.get('/:id', getPuzzleById);

// Validate an answer
router.post('/validate', validateAnswer);

export default router;
