# YouTube Companion Dashboard

A full-stack application that integrates with the **YouTube API** to help manage a specific uploaded video.  
It allows you to view video details, manage comments and replies, update video metadata, add personal notes, and track all actions in event logs.

---

## 📂 Project Structure

/project-root
├── frontend/ # React.js client
├── backend/ # Node.js + Express.js server
├── README.md

---

## ⚡Features
- Fetch and display YouTube video details (title, description, statistics, etc.)
- Manage comments: view, add, reply, and delete
- Update video metadata (title, description)
- Personal notes system with tagging and search
- Event logging for tracking all user actions

---

## API Endpoints

### 🎥 Video Routes (`/api/video`)
- `GET /:videoId` → Fetch video details  
- `PATCH /:videoId` → Update video details (title, description)

### 💬 Comment Routes (`/api/comments`)
- `GET /:videoId` → Get comments for a video  
- `POST /` → Add a new comment  
- `POST /reply` → Reply to an existing comment  
- `DELETE /:commentId` → Delete a comment

### 📝 Note Routes (`/api/notes`)
- `POST /` → Create a new note  
- `GET /` → Get all notes (with optional search/tag)

---

## Database Schema (MongoDB + Mongoose)

### **Note**
```js
{
  videoId: String,
  content: String,
  tags: [String],
  createdAt: Date,
}
```

### **EventLog**
```js
{
  videoId: String,
  eventType: String,
  timestamp: Date,
  details: Object
}
```

---

## Tech Stack
- **Frontend**: React.js, CSS, JavaScript , HTML 
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose)  
- **APIs**: YouTube Data API v3

---

## Setup Instructions
1.  **Clone the repository**

    ``` bash
    git clone https://github.com/Gayatri3012/ycactroFullstack17August.git
    cd youtube-companion-dashboard
    ```

2.  **Backend Setup**

    ``` bash
    cd backend
    npm install
    npm start
    ```

3.  **Frontend Setup**

    ``` bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Environment Variables**

    -   In `backend/.env`:

        ``` env
        MONGO_URI=your_mongo_connection_string
        YOUTUBE_API_KEY=your_youtube_api_key
        ```

    -   In `frontend/.env`:

        ``` env
        VITE_API_URL=http://localhost:5000
        ```

---

## License
MIT License
