import { User, Mail, Calendar, MapPin, Link as LinkIcon, Edit } from "lucide-react"

export default function UserProfile() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="h-24 w-24 rounded-full border-4 border-background bg-muted flex items-center justify-center text-4xl font-bold text-muted-foreground">
              J
            </div>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-muted-foreground text-lg mb-4">Full-stack developer & open source enthusiast.</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <LinkIcon className="h-4 w-4" />
                <span className="text-primary hover:underline cursor-pointer">johndoe.dev</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4" />
                Joined March 2024
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Mail className="h-4 w-4" />
                john@example.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_250px]">
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-lg border p-4 bg-muted/30">
                <p className="text-sm font-medium mb-1">Posted in <span className="text-primary">Programming</span></p>
                <p className="text-base font-bold mb-2">How to build a forum app with React and Shadcn</p>
                <p className="text-sm text-muted-foreground">3 days ago • 14 likes • 2 comments</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-6">Stats</h2>
          <div className="grid gap-4">
            <div className="rounded-lg border p-4 bg-card text-center">
              <p className="text-2xl font-bold">128</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Posts</p>
            </div>
            <div className="rounded-lg border p-4 bg-card text-center">
              <p className="text-2xl font-bold">1.2k</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Likes</p>
            </div>
            <div className="rounded-lg border p-4 bg-card text-center">
              <p className="text-2xl font-bold">45</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
