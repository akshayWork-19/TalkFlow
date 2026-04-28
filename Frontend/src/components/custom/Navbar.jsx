import { useEffect, useRef, useState } from "react";
import { Search, Bell, User, Menu, FileText, Users, Tag as TagIcon, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationPopover from "./NotificationPopover";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/axios";
import { useSocket } from "../../context/SocketContext";


export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { unreadCount } = useSocket();
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const res = await api.get(`/post/search/all?query=${searchQuery}`);
          setSearchResults(res.data);
        } catch (error) {
          console.error("Search Failed!", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults(null);
        setShowDropdown(false);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };


  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="mr-4 hidden md:flex items-center">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-black italic">T</span>
            </div>
            <span className="hidden font-bold sm:inline-block text-xl tracking-tight">TalkFlow</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link className={`transition-colors hover:text-primary ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`} to="/">Home</Link>
            <Link className={`transition-colors hover:text-primary ${location.pathname === '/categories' ? 'text-primary' : 'text-muted-foreground'}`} to="/categories">Categories</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          {/* 2. Search Container */}
          <div className="relative w-full max-w-[400px]" ref={dropdownRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search enthusiasts, tags, or posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                  className="flex h-10 w-full rounded-full border border-input bg-muted/50 px-3 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                {isSearching && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-primary" />}
              </div>
            </form>
            {/* 3. Search Results Dropdown */}
            {showDropdown && searchResults && (
              <div className="absolute top-12 left-0 w-full bg-card border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="max-h-[400px] overflow-y-auto p-2">

                  {/* Category: Posts */}
                  {searchResults.posts?.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-widest flex items-center gap-1">
                        <FileText size={12} /> Posts
                      </div>
                      {searchResults.posts.map(post => (
                        <div key={post._id} onClick={() => { navigate(`/posts/${post._id}`); setShowDropdown(false); }} className="px-3 py-2 hover:bg-muted cursor-pointer rounded-lg">
                          <p className="text-sm font-medium line-clamp-1">{post.title}</p>
                          <p className="text-[10px] text-muted-foreground">by {post.author.username}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Category: Users */}
                  {searchResults.users?.length > 0 && (
                    <div className="mb-2">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-widest flex items-center gap-1 border-t mt-1 pt-2">
                        <Users size={12} /> People
                      </div>
                      {searchResults.users.map(u => (
                        <div key={u._id} onClick={() => { navigate(`/profile/${u._id}`); setShowDropdown(false); }} className="px-3 py-2 hover:bg-muted cursor-pointer rounded-lg flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20 text-primary text-[10px] flex items-center justify-center font-bold">
                            {u.username[0].toUpperCase()}
                          </div>
                          <span className="text-sm">{u.username}</span>
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded">{u.reputation} REP</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Category: Tags */}
                  {searchResults.tags?.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase px-3 py-1 tracking-widest flex items-center gap-1 border-t mt-1 pt-2">
                        <TagIcon size={12} /> Tags
                      </div>
                      <div className="flex flex-wrap gap-1 px-3 py-2">
                        {searchResults.tags.map(tag => (
                          <span key={tag._id} onClick={() => { navigate(`/categories/${tag.name}`); setShowDropdown(false); }} className="text-[10px] bg-muted hover:bg-primary/20 hover:text-primary px-2 py-1 rounded-full cursor-pointer transition-colors">
                            #{tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {!isSearching && !searchResults.posts.length && !searchResults.users.length && !searchResults.tags.length && (
                    <div className="p-8 text-center text-muted-foreground text-sm">No results found for "{searchQuery}"</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted relative transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-background animate-pulse"></div>
              )}
            </button>
            {showNotifications && <NotificationPopover />}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 px-1 hover:bg-muted rounded-full transition-colors">
                  <div className="h-9 w-9 rounded-full bg-primary border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                </Link>
                <button onClick={logout} className="text-xs font-medium text-muted-foreground hover:text-destructive">Sign Out</button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-bold text-primary hover:underline">Log In</Link>
            )}
          </nav>
        </div>
      </div>
    </nav>
  )
}
