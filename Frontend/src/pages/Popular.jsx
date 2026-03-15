import PostCard from "@/components/custom/PostCard"
import { TrendingUp, Clock, MessageSquare } from "lucide-react"

const TRENDING_POSTS = [
  {
    id: 1,
    author: "Elena Vance",
    timeAgo: "1 hour ago",
    category: "Gaming",
    title: "The biggest surprises from the latest Indie Showcase",
    content: "I didn't expect much from the stream today, but wow! Some of these titles look like GOTY material. Specifically, the physics-based dungeon crawler that was shown halfway through. What did you all think?",
    likes: 842,
    comments: 112
  },
  {
    id: 2,
    author: "Josh Dev",
    timeAgo: "3 hours ago",
    category: "Programming",
    title: "React 19 is officially here! Let's talk about the new features.",
    content: "The wait is over. React 19 brings some massive changes to the way we handle state and effects. I've spent the morning testing the new compiler and the performance gains are real. Here's a quick summary for everyone.",
    likes: 654,
    comments: 84
  }
]

export default function Popular() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Popular Discussions</h1>
          <p className="text-muted-foreground text-lg">What's hot in the community right now.</p>
        </div>
        <div className="flex bg-muted rounded-lg p-1">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-background shadow-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Hot
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-background/50 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Latest
          </button>
          <button className="px-3 py-1.5 text-sm font-medium rounded-md hover:bg-background/50 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Top
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {TRENDING_POSTS.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
