const Note = require('../models/note')
const EventLog = require('../models/eventLog')

exports.createNote = async (req, res) => {
    const { videoId, content, tags } = req.body;
    try {
      const newNote = await Note.create({  videoId, content, tags });
      await EventLog.create({
        videoId,
        eventType: 'note_created',
        details: { noteId: newNote._id },
      });
      res.status(201).json(newNote);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create note' });
    }
}

exports.getAllNotes = async (req, res) => {
    const { videoId, search, tag } = req.query;
    try {
      const query = { videoId };
      if (search) {
        query.$or = [
          { content: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } },
        ];
      }
      if (tag) {
        query.tags = { $in: [tag] };
      }
      const notes = await Note.find(query).sort({ createdAt: -1 });
      res.json(notes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch notes' });
    }
  }

