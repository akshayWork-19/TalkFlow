import { Hash, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const categories = [
  { name: "Programming", slug: "programming", description: "All things code, from JavaScript to C++.", count: 1240, color: "bg-blue-500" },
  { name: "Design", slug: "design", description: "UI/UX, graphics, and visual arts discussions.", count: 850, color: "bg-purple-500" },
  { name: "Productivity", slug: "productivity", count: 620, description: "Tips and tricks to get more done.", color: "bg-green-500" },
  { name: "Gaming", slug: "gaming", count: 1450, description: "News, reviews, and general gaming talk.", color: "bg-red-500" },
  { name: "Hardware", slug: "hardware", count: 320, description: "PC builds, gadgets, and tech news.", color: "bg-orange-500" },
  { name: "Career", slug: "career", count: 540, description: "Job hunting, interviews, and work life.", color: "bg-yellow-500" },
]

export default function Categories() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground text-lg">Browse discussions by topic.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link 
            key={category.name} 
            to={`/categories/${category.slug}`}
            className="group relative rounded-xl border bg-card p-6 transition-all hover:shadow-md cursor-pointer overflow-hidden block"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-110 ${category.color}`}></div>
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${category.color} text-white`}>
                  <Hash className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{category.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4 grow leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-semibold text-primary">{category.count} posts</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
