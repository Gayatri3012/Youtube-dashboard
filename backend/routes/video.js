const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController')

router.get('/:videoId', videoController.videoDetails);

router.patch('/:videoId', videoController.updateVideoDetails);


module.exports = router;
