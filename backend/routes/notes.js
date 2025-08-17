// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const EventLog = require('../models/eventLog'); 
const NoteController = require('../controllers/NoteController');

// Create a note
router.post('/',NoteController.createNote);

// Get all notes (with optional search/tag)
router.get('/', NoteController.getAllNotes);


module.exports = router;