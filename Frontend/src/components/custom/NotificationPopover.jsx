import { Bell, Check, UserPlus, Heart, MessageSquare } from "lucide-react"

const NOTIFICATIONS = [
  { id: 1, type: "like", user: "Sarah Chen", detail: "liked your post 'How to master Shadcn UI'", time: "5m ago", unread: true, icon: <Heart className="h-4 w-4 text-red-500" /> },
  { id: 2, type: "comment", user: "Alex Rivers", detail: "commented on your discussion", time: "15m ago", unread: true, icon: <MessageSquare className="h-4 w-4 text-blue-500" /> },
  { id: 3, type: "follow", user: "Mike Thompson", detail: "started following you", time: "1h ago", unread: false, icon: <UserPlus className="h-4 w-4 text-green-500" /> }
]

export default function NotificationPopover() {
  return (
    <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-card text-card-foreground shadow-lg z-[100] overflow-hidden transform transition-all duration-200 origin-top-right">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <h3 className="font-bold flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </h3>
        <button className="text-xs text-primary hover:underline font-medium">Mark all as read</button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {NOTIFICATIONS.map(notif => (
          <div key={notif.id} className={`p-4 border-b flex gap-3 hover:bg-muted/50 cursor-pointer transition-colors ${notif.unread ? 'bg-primary/5' : ''}`}>
            <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 border bg-background`}>
              {notif.icon}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm">
                <span className="font-bold">{notif.user}</span> {notif.detail}
              </p>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
            {notif.unread && (
              <div className="ml-auto w-2 h-2 rounded-full bg-primary self-center"></div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 text-center border-t bg-muted/10">
        <button className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 mx-auto">
          View all notifications
          <Check className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
