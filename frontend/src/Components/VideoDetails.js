import { useState, useEffect } from 'react';
import Comments from './Comments';
import styles from '../styles/VideoDetails.module.css'
import { Edit3, Eye, ThumbsUp, X } from 'lucide-react';

function VideoDetails({ videoId }) {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    fetch(`https://youtube-dashboard-eda3.onrender.com/video/${videoId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.snippet) {
          console.log('Fetched video data:', data);
          setVideo(data);
          setTitle(data.snippet.title);
          setDescription(data.snippet.description);
        } else {
          console.error('Invalid video data:', data);
        }
      });
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch(`https://youtube-dashboard-eda3.onrender.com/video/${videoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const result = await res.json();

    if (res.ok) {
      setMessage('Video updated successfully!');
      setVideo(prev => ({
        ...prev,
        snippet: {
          ...prev.snippet,
          title,
          description,
        }
      }));
      setIsEditing(false);
    } else {
      setMessage(`Failed to update video: ${result.message}`);
    }
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setMessage(''); // Clear any existing messages
  };

  if (!video || !video.snippet) return <p>Loading video details...</p>;

  return (
  <div className={styles.videoSection}>
    <div className={styles.VideoDetailsContainer}>
      <div className={styles.VideoDetails}>    
                <img src={video?.snippet?.thumbnails?.standard?.url} alt="Video thumbnail" />
        <div className={styles.thumbnailContainer}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.meta}>
              {/* <p><strong>Channel:</strong> {video?.snippet?.channelTitle}</p> */}

              <div className={styles.stats}>
                  <div><strong><Eye /></strong> {video?.statistics?.viewCount}</div>
                  <div><strong> <ThumbsUp /></strong> {video?.statistics?.likeCount}</div>
              </div>
    
            </div>
            <button
              onClick={toggleEdit}
              className={styles.editToggleBtn}
              title={isEditing ? "Close Edit" : "Edit Details"}
            >
              {isEditing ? <X size={20} /> : <Edit3 size={20} />}
            </button>
        </div>
            
      </div>

      <div className={`${styles.editDetails} ${isEditing ? styles.editVisible : styles.editHidden}`}>
        <div className={styles.editHeader}>
            <h2>Edit Video Details</h2>
            <button
                onClick={toggleEdit}
                className={styles.editToggleBtn}
                title="Close Edit"
              >
              <X size={20} />
            </button>
          </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Update Video</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}

      </div>
    </div>
    <Comments videoId={videoId} accessToken={token} />
  </div>
    
  );
}

export default VideoDetails;