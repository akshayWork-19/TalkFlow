import { useState } from "react";
import { X, Send, Tag, Type, AlignLeft } from "lucide-react";
import api from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/post', {
                title,
                content,
                author: user._id,
                tags: tags.split(',').map(tag => tag.trim())
            });

            if (response.data.success) {
                setTitle('');
                setTags('');
                setContent('');
                onPostCreated(); // trigger a refresh of the feed
                onClose();
            }
        } catch (error) {
            setError(error.response?.data?.message || "failed to create Post!")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border bg-card p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Create New Post
                    </h2>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-accent transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {error && (
                    <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='space-y-2'>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Type className="h-4 w-4 " />
                            Title
                        </label>

                        <input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="What's on your mind?" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className='space-y-2'>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <Tag className="h-4 w-4 " />
                            Tags(Comma seprated)
                        </label>

                        <input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Programming,Physics, General" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>

                    <div className='space-y-2'>
                        <label className="text-sm font-medium flex items-center gap-2">
                            <AlignLeft className="h-4 w-4 " />
                            Content
                        </label>

                        <textarea rows={5} required className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="Write your post content here..." value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>

                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 font-bold text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50">
                        {loading ? "Posting..." : <><Send className="h-4 w-4" /> Post to Talkflow </>}
                    </button>
                </form>
            </div>
        </div>
    )
}
