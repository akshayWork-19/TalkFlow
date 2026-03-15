import { Home, TrendingUp, Hash, Layers, Settings, HelpCircle } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const categories = [
  { name: "Programming", count: 124, slug: "/categories" },
  { name: "Design", count: 85, slug: "/categories" },
  { name: "Productivity", count: 62, slug: "/categories" },
  { name: "Gaming", count: 145, slug: "/categories" },
]

export default function Sidebar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  const navItemClasses = (path) => `inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full justify-start ${isActive(path) ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'}`

  return (
    <aside className="hidden w-[240px] flex-col md:flex sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r">
      <div className="flex flex-col gap-4 py-6">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Link to="/" className={navItemClasses('/')}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link to="/trending" className={navItemClasses('/trending')}>
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </Link>
            <Link to="/popular" className={navItemClasses('/popular')}>
              <Layers className="mr-2 h-4 w-4" />
              Popular
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Categories
          </h2>
          <div className="space-y-1">
            {categories.map((category) => (
              <Link key={category.name} to={category.slug} className={navItemClasses(category.slug)}>
                <Hash className="mr-2 h-4 w-4" />
                {category.name}
                <span className="ml-auto text-xs text-muted-foreground">{category.count}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto px-3 py-2">
          <div className="space-y-1">
            <Link to="/settings" className={navItemClasses('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
            <Link to="/support" className={navItemClasses('/support')}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
