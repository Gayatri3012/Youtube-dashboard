
import './App.css';
import VideoDetails from './Components/VideoDetails';
import Notes from './Components/Notes';

function App() {

  const videoId = process.env.REACT_APP_VIDEO_ID; 

  return (
    <div className="App">
      <VideoDetails videoId={videoId} />
      <Notes videoId={videoId} />
    </div>
  );
}

export default App;
