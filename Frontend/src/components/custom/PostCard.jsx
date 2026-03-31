import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, ThumbsDown } from "lucide-react"
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { Navigate, useNavigate } from "react-router-dom";


export default function PostCard({ post }) {
  const authorName = post.author?.username || "Anonymous";
  const firstLetter = authorName[0].toUpperCase();
  const [userVote, setUserVote] = useState(post.userVote || null);
  const [upVotes, setUpVotes] = useState(post.upVotesCount || 0);
  const [downVotes, setDownVotes] = useState(post.downVotesCount || 0);
  const [isVoting, setIsVoting] = useState(null);
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
        const postComments = response.data.data.filter(
          c => c.post._id === post._id || c.post === post._id
        )
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
      const response = await api.post('/comment', {
        content: newComment,
        post: post._id
      });
      if (response.data.success) {
        setComments(prev => [response.data.data, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to post comment", err)
      alert("You must be logged in to comment!")
    } finally {
      setSubmitting(false)
    }
  }

  const handleVote = async (type) => {
    setIsVoting(true);
    try {
      const response = await api.post(`/like/${post._id}/vote`, {
        voteType: type
      });
      if (response.data.success) {
        setUpVotes(response.data.upVotes);
        setDownVotes(response.data.downVotes);
        setUserVote(response.data.voteType);
      }
    } catch (error) {
      console.error("Voting failed:", error.response?.data?.message);
      alert("You need to be logged in to vote!");
    } finally {
      setIsVoting(false);
    }
  }


  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
            {firstLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{authorName}</span>
            <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()} in <span className="text-primary hover:underline cursor-pointer">{post.tags?.map(tag => (
              <button key={tag}
                onClick={() => navigate(`/categories/${tag}`)}
                className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {tag}
              </button>
            )) || 'General'}</span></span>
          </div>
          <button className="ml-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-xl font-bold mb-2 hover:text-primary cursor-pointer transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
          {post.content}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground pt-4 border-t mt-4">
          <div className="flex items-center gap-1 bg-accent/50 rounded-full p-1 px-2 border">
            <button
              onClick={() => handleVote('up')}
              className={`p-1 transition-colors rounded-full ${userVote === 'up' ? 'text-blue-500 bg-blue-500/10' : 'hover:text-primary hover:bg-primary/10'}`}
              disabled={isVoting}
            >
              <ThumbsUp className={`h-4 w-4 ${userVote === 'up' ? 'fill-current' : ''}`} />
            </button>
            <span className={`text-sm font-bold min-w-[20px] text-center ${userVote === 'up' ? 'text-blue-500' : 'text-foreground'}`}>
              {upVotes}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-accent/50 rounded-full p-1 px-2 border">
            <button
              onClick={() => handleVote('down')}
              className={`p-1 transition-colors rounded-full ${userVote === 'down' ? 'text-red-500 bg-red-500/10' : 'hover:text-destructive hover:bg-destructive/10'}`}
              disabled={isVoting}
            >
              <ThumbsDown className={`h-4 w-4 ${userVote === 'down' ? 'fill-current' : ''}`} />
            </button>
            <span className={`text-sm font-bold min-w-[20px] text-center ${userVote === 'down' ? 'text-red-500' : 'text-foreground'}`}>
              {downVotes}
            </span>
          </div>

          <button onClick={toggleComments} className={`flex items-center gap-1.5 hover:text-primary transition-colors text-sm font-medium ${showComments ? 'text-primary' : ''}`}>
            <MessageSquare className="h-4 w-4" />
            {post.commentCount || 0}
          </button>

          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm font-medium"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>

        </div>
      </div>

      {showComments && (
        <div className="border-t mt-2 pt-5 space-y-5 px-6 pb-5">

          {/* Header */}
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">
              {post.commentsCount || 0} Comments
            </span>
          </div>
          {/* New Comment Form */}
          <form onSubmit={handleComment} className="flex items-start gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-primary/10">
              U
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full rounded-xl border border-input bg-muted/60 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  className="px-5 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all disabled:opacity-40"
                >
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </form>
          {/* Divider */}
          {comments.length > 0 && <div className="border-t" />}
          {/* Comment List */}
          {commentsLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Loading comments...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-6 rounded-xl bg-muted/20 border border-dashed">
              <MessageSquare className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No comments yet.</p>
              <p className="text-xs text-muted-foreground/60">Be the first to start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment._id} className="flex gap-3 group">
                  {/* Avatar */}
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-primary/10">
                    {comment.author?.username?.[0]?.toUpperCase()}
                  </div>
                  {/* Bubble */}
                  <div className="flex-1 bg-muted/60 rounded-xl px-4 py-3 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">{comment.author?.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div >
  )
}
