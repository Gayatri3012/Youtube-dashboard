const { refreshAccessToken } = require('../utils/googleAuth'); 

const {youtubeAPIRequest} = require('../utils/youtubeApiRequest');

exports.getComments = async (req, res) => {
  const videoId = req.params.videoId;

  try {
    let accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Access token required' });

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&maxResults=20`;

    let data;
    try {
      data = await youtubeAPIRequest(url, 'GET', accessToken);
    } catch (err) {
      if (err.message === 'AccessTokenExpired') {
        accessToken = await refreshAccessToken();
        data = await youtubeAPIRequest(url, 'GET', accessToken);
      } else {
        throw err;
      }
    }
    res.json(data.items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get comments', error: error.message });
  }
};

exports.addComment = async (req, res) => {
 
  const { text , videoId} = req.body;

  try {
    let accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Access token required' });

    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet`;
    const body = {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    let data;
    try {
      data = await youtubeAPIRequest(url, 'POST', accessToken, body);
    } catch (err) {
      if (err.message === 'AccessTokenExpired') {
        accessToken = await refreshAccessToken();
        data = await youtubeAPIRequest(url, 'POST', accessToken, body);
      } else {
        throw err;
      }
    }
 const topLevelComment = data.snippet.topLevelComment;

res.status(200).json({
  comment: {
    id: topLevelComment.id,
    snippet: topLevelComment.snippet,
  },
});
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};

exports.replyToComment = async (req, res) => {
const { snippet } = req.body;
const { videoId, parentId, textOriginal } = snippet;

  try {
    let accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Access token required' });

    const url = `https://www.googleapis.com/youtube/v3/comments?part=snippet`;
    const body = {
      snippet: {
        videoId,
        parentId,
        textOriginal: textOriginal,
      },
    };

    let data;
    try {
      data = await youtubeAPIRequest(url, 'POST', accessToken, body);
    } catch (err) {
      if (err.message === 'AccessTokenExpired') {
        accessToken = await refreshAccessToken();
        data = await youtubeAPIRequest(url, 'POST', accessToken, body);
      } else {
        throw err;
      }
    }

    res.status(200).json({
      comment: {
        id: data.id,
        snippet: data.snippet,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reply to comment', error: error.message });
  }
};


exports.deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  console.log(commentId)

  try {
    let accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return res.status(401).json({ message: 'Access token required' });

    const url = `https://www.googleapis.com/youtube/v3/comments?id=${commentId}`;

    try {
      const data = await youtubeAPIRequest(url, 'DELETE', accessToken);
      console.log(data);
    } catch (err) {
      if (err.message === 'AccessTokenExpired') {
        accessToken = await refreshAccessToken();
        await youtubeAPIRequest(url, 'DELETE', accessToken);
      } else {
        throw err;
      }
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error: error.message });
  }
};
