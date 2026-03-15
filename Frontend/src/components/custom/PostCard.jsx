import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react"

export default function PostCard({ post }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
            {post.author[0].toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{post.author}</span>
            <span className="text-xs text-muted-foreground">{post.timeAgo} in <span className="text-primary hover:underline cursor-pointer">{post.category}</span></span>
          </div>
          <button className="ml-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <h3 className="text-xl font-bold mb-2 hover:text-primary cursor-pointer transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
          {post.content}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground pt-4 border-t">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm font-medium">
            <ThumbsUp className="h-4 w-4" />
            {post.likes}
          </button>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm font-medium">
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </button>
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-sm font-medium ml-auto">
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
