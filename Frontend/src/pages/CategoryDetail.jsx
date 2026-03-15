import { useParams, Link } from "react-router-dom"
import { ChevronLeft, Filter, ArrowUpDown } from "lucide-react"
import PostCard from "@/components/custom/PostCard"

const MOCK_CATEGORIES = {
  "programming": { name: "Programming", description: "All things code, from JavaScript to C++." },
  "design": { name: "Design", description: "UI/UX, graphics, and visual arts discussions." },
  "productivity": { name: "Productivity", description: "Tips and tricks to get more done." },
  "gaming": { name: "Gaming", description: "News, reviews, and general gaming talk." }
}

const CATEGORY_POSTS = [
  {
    id: 101,
    author: "CodeNewbie",
    timeAgo: "4 hours ago",
    category: "Programming",
    title: "What is the best way to learn TypeScript in 2024?",
    content: "I've been using JavaScript for about a year and I want to level up. Is it worth jumping straight into TS or should I focus more on JS fundamentals?",
    likes: 28,
    comments: 15
  },
  {
    id: 102,
    author: "BackendGuru",
    timeAgo: "12 hours ago",
    category: "Programming",
    title: "Understanding Node.js Event Loop",
    content: "The event loop is often misunderstood. Here's a deep dive into how it actually works under the hood and why single-threaded doesn't mean slow.",
    likes: 56,
    comments: 8
  }
]

export default function CategoryDetail() {
  const { categorySlug } = useParams()
  const category = MOCK_CATEGORIES[categorySlug?.toLowerCase()] || { name: categorySlug, description: "Category discussions" }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-col gap-4">
        <Link to="/categories" className="flex items-center gap-2 text-sm text-primary hover:underline w-fit font-medium">
          <ChevronLeft className="h-4 w-4" />
          Back to Categories
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
            <p className="text-muted-foreground text-lg mt-1">{category.description}</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border h-9 px-3 gap-2 hover:bg-muted">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border h-9 px-3 gap-2 hover:bg-muted">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {CATEGORY_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {CATEGORY_POSTS.length === 0 && (
          <div className="text-center py-20 border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No posts yet in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
