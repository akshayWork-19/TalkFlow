import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import PostCard from "./components/custom/PostCard"
import Categories from "./pages/Categories"
import CategoryDetail from "./pages/CategoryDetail"
import Popular from "./pages/Popular"
import UserProfile from "./pages/UserProfile"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Trending from "./pages/Trending"

const MOCK_POSTS = [
  {
    id: 1,
    author: "Alex Rivers",
    timeAgo: "2 hours ago",
    category: "Programming",
    title: "How to master Shadcn UI in React projects?",
    content: "I've been working with Tailwind CSS for a while, but Shadcn UI takes it to a whole new level. The way it provides accessible, reusable components without being a 'weight' on your bundle size is incredible. What are your tips for structuring a large project with Shadcn?",
    likes: 42,
    comments: 12
  },
  {
    id: 2,
    author: "Sarah Chen",
    timeAgo: "5 hours ago",
    category: "Design",
    title: "The importance of white space in modern web apps",
    content: "White space is often overlooked but it's one of the most powerful tools in a designer's arsenal. It helps guide the user's eye and reduces cognitive load. Here's a breakdown of how we used white space in our latest redesign...",
    likes: 85,
    comments: 24
  },
  {
    id: 3,
    author: "Mike Thompson",
    timeAgo: "1 day ago",
    category: "Productivity",
    title: "5 Habits of highly effective developers",
    content: "After a decade in the industry, I've noticed certain patterns among the most productive engineers I've worked with. It's not just about typing fast; it's about focused work, clear communication, and constant learning.",
    likes: 156,
    comments: 48
  }
]

function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recent Posts</h1>
          <p className="text-muted-foreground">Stay updated with the latest discussions in the community.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2">
          New Post
        </button>
      </div>
      
      <div className="grid gap-6">
        {MOCK_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
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
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
