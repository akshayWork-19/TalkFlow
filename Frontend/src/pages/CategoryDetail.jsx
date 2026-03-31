import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import PostCard from "@/components/custom/PostCard"
import api from "../lib/axios"



export default function CategoryDetail() {
  const { categorySlug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchByTag = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/post?tag=${encodeURIComponent(categorySlug)}`);
        setPosts(response.data.data || []);
      } catch (error) {
        console.error("Failed to load category posts!", error);
      } finally {
        setLoading(false);
      }
    }
    fetchByTag();
  }, [categorySlug])

  if (loading) return <div className="text-center">Loading...</div>

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {categorySlug}
      </h1>
      <p className="text-muted-foreground mb-8">
        All posts tagged with "{categorySlug}"
      </p>

      <div className="grid gap-6">
        {posts.length > 0 ? posts.map(post => (
          <PostCard key={post._id} post={post} />
        )) : (
          <p className="text-center text-muted-foreground py-10">
            No posts found for this category yet.
          </p>
        )}

      </div>
    </div>
  )
}
