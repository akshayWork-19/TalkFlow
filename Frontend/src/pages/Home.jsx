import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/custom/PostCard";
import CreatePostModal from "../components/custom/CreatePostModal";
import api from "../lib/axios";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const loadPosts = async (showLoading = false) => {
        try {
            if (showLoading) setLoading(true);
            const url = searchQuery ? `/post?search=${encodeURIComponent(searchQuery)}` : '/post';
            const response = await api.get(url);
            setPosts(response.data.data || response.data.posts || response.data);
        } catch (error) {
            setError("Failed to load posts.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPosts(true);
    }, [searchQuery]);

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        </div>
    );

    return (
        <div className="mx-auto max-w-4xl px-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black gradient-text">
                        {searchQuery ? `Results for "${searchQuery}"` : "Community Feed"}
                    </h1>
                    <p className="text-text-dim mt-1">
                        {searchQuery ? "Showing relevant discussions." : "Explore the latest expert insights."}
                    </p>
                </div>
                <button
                    onClick={() => setIsModelOpen(true)}
                    className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all transform hover:scale-105"
                >
                    New Thread
                </button>
            </div>

            <CreatePostModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} onPostCreated={() => loadPosts(false)} />

            <div className="grid gap-6">
                {posts.map(post => (
                    <PostCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
