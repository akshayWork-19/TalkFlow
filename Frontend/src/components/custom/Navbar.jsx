import { useState } from "react"
import { Search, Bell, User, Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import NotificationPopover from "./NotificationPopover"

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">
              ForumApp
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link className={`transition-colors hover:text-foreground/80 ${isActive('/') ? 'text-foreground' : 'text-foreground/60'}`} to="/">Home</Link>
            <Link className={`transition-colors hover:text-foreground/80 ${isActive('/categories') ? 'text-foreground' : 'text-foreground/60'}`} to="/categories">Categories</Link>
            <Link className={`transition-colors hover:text-foreground/80 ${isActive('/popular') ? 'text-foreground' : 'text-foreground/60'}`} to="/popular">Popular</Link>
          </nav>
        </div>
        <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search posts..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2 relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 ${showNotifications ? 'bg-accent text-accent-foreground' : ''}`}
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-background"></div>
            </button>
            {showNotifications && <NotificationPopover />}
            
            <Link to="/profile" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <User className="h-5 w-5" />
              <span className="sr-only">User Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  )
}
