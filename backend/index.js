const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const {youtubeAPIRequest} = require("./utils/youtubeAPIRequest"); // Assuming this is a utility function to handle YouTube API requests

const app = express();
app.use(cors());
app.use(express.json());
const EventLog = require('./models/eventLog'); 

// Routes
const videoRoutes = require("./routes/video");
const commentRoutes = require("./routes/comments");
const noteRoutes = require('./routes/notes');
const { refreshAccessToken } = require( "./utils/googleAuth" );


app.use("/video", videoRoutes); 
app.use("/comment", commentRoutes); 
app.use("/note", noteRoutes); 

app.use('/event', async (req, res) => {
    try {
      const { type, videoId, description } = req.body;
  
  
      const event = await EventLog.create({
        eventType: type,
        videoId,
        description,
        timestamp: new Date(),
      });
  
      res.status(201).json({ message: 'Event logged', event });
    } catch (error) {
      console.error('Error logging event:', error);
      res.status(500).json({ message: 'Failed to log event' });
    }
  });

  app.get('/getChannelId', async (req, res) => {
  let accessToken = req.headers.authorization?.split(' ')[1];
  if (!accessToken) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const url = 'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true';

   try {
    let response;

    try {
      response = await youtubeAPIRequest(url, 'GET', accessToken);
    } catch (err) {
      console.error('Error fetching channel ID:', err);
      if (err.message === 'AccessTokenExpired') {
        accessToken = await refreshAccessToken();
        response = await youtubeAPIRequest(url, 'GET', accessToken);
      } else {
        throw err;
      }
    }

    const channelId = response?.items?.[0]?.id;
    if (!channelId) {
      return res.status(404).json({ message: 'Channel ID not found' });
    }

    res.json({ channelId });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch channel ID',
      error: error.message,
    });
  }
})

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
