import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import { ThumbsUp, ThumbsDown, MessageSquare, ArrowLeft, Calendar, Tag } from "lucide-react";
// import PostCard from "../components/custom/PostCard";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const [postRes, commentRes] = await Promise.all([api.get(`/post/${id}`), api.get('/comment?limit=100')]);
                setPost(postRes.data.data);
                const filtered = commentRes.data.data.filter(c => c.post?._id === id || c.post === id);
                setComments(filtered);
            } catch (error) {
                console.error("failed to load post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);


    const handleComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return
        setSubmitting(true);
        try {
            const response = await api.post('/comment', {
                content: newComment,
                post: id
            });
            if (response.data.success) {
                setComments(prev => [response.data.data, ...prev]);
                setNewComment("");
                setPost(prev => ({
                    ...prev, commentsCount: (prev.commentsCount || 0) + 1
                }));
            }
        } catch (error) {
            alert("You must logged in to comment!");
        } finally {
            setSubmitting(false);
        }
    }


    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
    )

    if (!post) return (
        <div className="text-center py-20 text-muted-foreground">
            Post not found.
        </div>
    )

    const authorName = post.author?.username || "Anonymous"

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4 " />
                Back to Feed
            </Link>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map(tag => (
                        <Link key={tag} to={`/categories/${tag}`} className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium">
                            <Tag className="h-3 w-3" />
                            {tag}
                        </Link>
                    ))}
                </div>

                <h1 className="text-3xl font-bold tracking-tight leading-tight mb-4">
                    {post.title}
                </h1>

                <div className="flex items-center gap-3 mb-8 pb-6 border-b">
                    <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        {authorName[0].toUpperCase()}
                    </div>

                    <div>
                        <p className="text-sm font-semibold">
                            {authorName}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>

                <div className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {post.content}
                </div>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t text-muted-foreground">
                    <div className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1.5 border">
                        <ThumbsUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-bold text-blue-500">
                            {post.upVotesCount || 0}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1.5 border">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-bold text-red-500">
                            {post.downVotesCount || 0}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 ml-2 text-sm">
                        <MessageSquare className="h-4 w-4" />
                        {post.commentsCount || 0} comments
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-8">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    {comments.length} Comments
                </h2>

                <form onSubmit={handleComment} className="flex items-start gap-3 mb-8">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                        U
                    </div>


                    <div className="flex-1 space-y-2">
                        <textarea rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Share your thoughts on this post..."
                            className="w-full rounded-xl border border-input bg-muted/60 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground" />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" disabled={submitting || !newComment.trim()} className="px-6 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all disabled:opacity-40">
                            {submitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>


                {comments.length === 0 ? (
                    <div className="text-center py-10 rounded-xl bg-muted/20 border border-dashed">
                        <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No comments yet. Be first!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {comments.map(comment => (
                            <div key={comment._id} className="flex gap-3">
                                <div className="h-9 w-9 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary ring-2 ring-primary/10">
                                    {comment.author?.username?.[0].toUpperCase()}
                                </div>

                                <div className="flex-1 bg-muted/60 rounded-xl px-4 py-3 border border-border/50">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold">
                                            {comment.author?.username}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed">{comment.content}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    )
}