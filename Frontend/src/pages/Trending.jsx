import { Flame, Star, Zap } from "lucide-react"
import PostCard from "@/components/custom/PostCard"

const TRENDING_NOW = [
  {
    id: 1,
    author: "TechWiz",
    timeAgo: "15 mins ago",
    category: "Hardware",
    title: "New GPU benchmark leaks show 30% jump",
    content: "Just saw the latest leaks for the upcoming series. If these numbers are true, we're looking at the biggest generation-on-generation jump since 2016. What's everyone's budget looking like for the fall?",
    likes: 124,
    comments: 45
  }
]

export default function Trending() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-bold mb-4 uppercase tracking-wider">
          <Flame className="h-4 w-4" />
          Trending Now
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">The Latest Buzz</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">
          Real-time feed of the most engaged discussions across all categories.
        </p>
      </div>

      <div className="grid gap-8">
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-200 p-8 relative overflow-hidden">
          <Zap className="absolute top-4 right-4 h-12 w-12 text-orange-500/20" />
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-orange-500" />
            Spotlight
          </h2>
          <PostCard post={TRENDING_NOW[0]} />
        </div>

        <div className="grid gap-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Recently Hot
          </h2>
          {[1, 2].map(i => (
            <div key={i} className="rounded-xl border p-4 hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">Discussion Title Example #{i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Started by <span className="font-medium text-foreground">User_{i}</span> in <span className="font-medium text-primary">General</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold">+{10 * i}%</p>
                  <p className="text-xs text-muted-foreground uppercase">Engagement</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
