/* [REPLACE] Frontend/src/components/custom/PostCard.jsx */
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, ThumbsDown } from "lucide-react"
import { useState } from "react";
import api from "../../lib/axios";
import { useNavigate, Link } from "react-router-dom";

export default function PostCard({ post }) {
  const authorName = post.author?.username || "Anonymous";
  const [userVote, setUserVote] = useState(post.userVote || null);
  const [upVotes, setUpVotes] = useState(post.upVotesCount || 0);
  const [downVotes, setDownVotes] = useState(post.downVotesCount || 0);
  const [isVoting, setIsVoting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const toggleComments = async () => {
    setShowComments(prev => !prev);
    if (!showComments && comments.length === 0) {
      setCommentsLoading(true);
      try {
        const response = await api.get(`/comment?limit=50`);
        const postComments = response.data.data.filter(c => c.post._id === post._id || c.post === post._id);
        setComments(postComments);
      } catch (error) {
        console.error("Failed to load comments", error);
      } finally {
        setCommentsLoading(false);
      }
    }
  }

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true)
    try {
      const response = await api.post('/comment', { content: newComment, post: post._id });
      if (response.data.success) {
        setComments(prev => [response.data.data, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      alert("You must be logged in to comment!")
    } finally {
      setSubmitting(false)
    }
  }

  const handleVote = async (type) => {
    setIsVoting(true);
    try {
      const response = await api.post(`/like/${post._id}/vote`, { voteType: type });
      if (response.data.success) {
        setUpVotes(response.data.upVotes);
        setDownVotes(response.data.downVotes);
        setUserVote(response.data.voteType);
      }
    } catch (error) {
      alert("You need to be logged in to vote!");
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm hover:border-primary/20 transition-all p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative">
          <img src={post.author?.avatar || "/default-avatar.png"} className="h-10 w-10 rounded-full border-2 border-primary/10 object-cover" alt="" />
          <div className="absolute -bottom-1 -right-1 bg-primary text-[10px] text-primary-foreground font-bold px-1.5 rounded-full border border-background">
            {post.author?.reputation || 0}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold hover:text-primary transition-colors cursor-pointer">{authorName}</span>
            <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
              {post.author?.badge || 'Newcomer'}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <button className="ml-auto p-1 rounded-md hover:bg-accent text-muted-foreground">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <Link to={`/posts/${post._id}`}>
        <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
          {post.title}
        </h2>
      </Link>
      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.content}</p>

      <div className="flex items-center gap-4 text-muted-foreground pt-4 border-t">
        <div className="flex items-center gap-1 bg-accent/50 rounded-full p-1 px-2">
          <button onClick={() => handleVote('up')} className={`p-1 rounded-full ${userVote === 'up' ? 'text-primary bg-primary/10' : 'hover:text-primary'}`} disabled={isVoting}>
            <ThumbsUp size={16} fill={userVote === 'up' ? "currentColor" : "none"} />
          </button>
          <span className="text-xs font-bold w-4 text-center">{upVotes}</span>
        </div>
        <div className="flex items-center gap-1 bg-accent/50 rounded-full p-1 px-2">
          <button onClick={() => handleVote('down')} className={`p-1 rounded-full ${userVote === 'down' ? 'text-destructive bg-destructive/10' : 'hover:text-destructive'}`} disabled={isVoting}>
            <ThumbsDown size={16} fill={userVote === 'down' ? "currentColor" : "none"} />
          </button>
          <span className="text-xs font-bold w-4 text-center">{downVotes}</span>
        </div>
        <button onClick={toggleComments} className="flex items-center gap-1.5 hover:text-primary text-sm">
          <MessageSquare size={16} /> {post.commentsCount || 0}
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary text-sm ml-auto">
          <Share2 size={16} /> Share
        </button>
      </div>

      {showComments && (
        <div className="mt-6 pt-6 border-t space-y-4">
          <form onSubmit={handleComment} className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary italic">U</div>
            <textarea
              className="flex-1 bg-muted/60 rounded-lg p-2 text-sm outline-none border focus:border-primary resize-none"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" disabled={submitting || !newComment.trim()} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold h-fit disabled:opacity-50">Post</button>
          </form>

          {commentsLoading ? <p className="text-xs text-center text-muted-foreground">Loading...</p> :
            comments.map(c => (
              <div key={c._id} className="flex gap-3 bg-muted/30 p-3 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">{c.author?.username?.[0]}</div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold mb-1">{c.author?.username} • {new Date(c.createdAt).toLocaleDateString()}</p>
                  <p className="text-xs">{c.content}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
