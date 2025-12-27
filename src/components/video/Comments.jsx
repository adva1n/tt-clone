import { useState } from "react";
import "./Comments.css";

const Comments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, { text: newComment, likes: 0, id: Date.now() }]);
    setNewComment("");
  };

  const likeComment = (id) => {
    setComments(
      comments.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  return (
    <div className="comments-container">
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment">
            <span>{c.text}</span>
            <button onClick={() => likeComment(c.id)}>❤️ {c.likes}</button>
          </div>
        ))}
      </div>
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>Post</button>
      </div>
    </div>
  );
};

export default Comments;
