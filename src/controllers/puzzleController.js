// src/controllers/puzzleController.js

import fs from 'fs';
import path from 'path';

const puzzleDataPath = path.join(process.cwd(), 'puzzles.json');

// Get all puzzles
export const getPuzzles = (req, res) => {
  fs.readFile(puzzleDataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load puzzles.' });
    }
    const puzzles = JSON.parse(data);
    res.json(puzzles);
  });
};

// Get a single puzzle by ID
export const getPuzzleById = (req, res) => {
  const puzzleId = parseInt(req.params.id);
  fs.readFile(puzzleDataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load puzzles.' });
    }
    const puzzles = JSON.parse(data);
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle) {
      res.json(puzzle);
    } else {
      res.status(404).json({ message: 'Puzzle not found' });
    }
  });
};

// Validate a given answer
export const validateAnswer = (req, res) => {
  const { puzzleId, answer } = req.body;
  fs.readFile(puzzleDataPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to load puzzles.' });
    }
    const puzzles = JSON.parse(data);
    const puzzle = puzzles.find(p => p.id === puzzleId);
    if (puzzle) {
      const isCorrect = puzzle.answer.toLowerCase() === answer.toLowerCase();
      res.json({ correct: isCorrect, answer: puzzle.answer });
    } else {
      res.status(404).json({ message: 'Puzzle not found' });
    }
  });
};
