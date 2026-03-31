import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import PostCard from "./components/custom/PostCard"
import Categories from "./pages/Categories"
import CategoryDetail from "./pages/CategoryDetail"
import Popular from "./pages/Popular"
import UserProfile from "./pages/UserProfile"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Trending from "./pages/Trending"
import Login from "./pages/Login"
import api from "./lib/axios"
import { useEffect, useState } from "react"
import Register from "./pages/Register"
import CreatePostModal from "./components/custom/CreatePostModal"
import ProtectedRoute from "./components/custom/ProtectedRoute";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';


  const loadPosts = async (showLoading = false) => {
    try {
      // setLoading(true);
      if (showLoading) setLoading(true);
      const url = searchQuery ? `/post?search=${encodeURIComponent(searchQuery)}` : '/post';
      const response = await api.get(url);
      console.log(response.data);
      setPosts(response.data.data || response.data);
    } catch (error) {
      setError("Failed to load posts. Make sure you are logged in!")
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts(true);
  }, [searchQuery]);

  if (loading) return <div className="text-center py-10">Loading posts...</div>
  if (error) return <div className="text-center py-10 text-destructive">Error </div>
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{searchQuery ? `Results for ${searchQuery}` : "Recent Posts"}</h1>
          <p className="text-muted-foreground">{searchQuery ? "Showing posts matching your search." : "Stay updated with the latest discussions."}</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2" onClick={() => setIsModelOpen(true)}>
          New Post
        </button>
      </div>

      <CreatePostModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} onPostCreated={() => loadPosts(false)} />


      <div className="grid gap-6">
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
        {/* {posts.length > 0 ? (posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))) : (
          <p className="text-center text-muted-foreground py-10">No posts found.</p>
        )}: */}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categorySlug" element={<CategoryDetail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
