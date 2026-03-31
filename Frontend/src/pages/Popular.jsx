import PostCard from "@/components/custom/PostCard"
import { TrendingUp, Clock, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react";

export default function Popular() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        const response = await api.get('/post');
        const sorted = (response.data.data || []).sort((a, b) => (b.upVotesCount - b.downVotesCount) - (a.upVotesCount - a.downVotesCount))
        setPosts(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, []);

  if (loading) return <div className="text-center py-10">
    Loading...
  </div>

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Popular Posts
      </h1>
      <p className="text-muted-foreground mb-8">
        The most upvoted discussions from the community.
      </p>
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <div key={post._id} className="relative">
            <span className="absolute -left-8 top-6 text-2xl font-black text-muted-foreground/30">
              #{index + 1}
            </span>
            <PostCard post={post} />

          </div>
        ))}

      </div>

    </div>
  )
}
