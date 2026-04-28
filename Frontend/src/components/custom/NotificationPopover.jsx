import { Bell, Check, UserPlus, Heart, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import { useSocket } from "../../context/SocketContext";


export default function NotificationPopover() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setUnreadCount } = useSocket();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/notifications`);
      setNotifications(res.data.data);
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  }

  const markAsRead = async (id) => {
    try {
      await api.get(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) { }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'like': return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'follow': return <UserPlus className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-primary" />;
    }
  };


  return (
    <div className="absolute right-0 mt-2 w-80 rounded-xl border bg-card text-card-foreground shadow-lg z-[100] overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <h3 className="font-bold flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notifications
        </h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground text-sm">No new notifications</div>
        ) : (
          notifications.map(notif => (
            <div
              key={notif._id}
              onClick={() => markAsRead(notif._id)}
              className={`p-4 border-b flex gap-3 cursor-pointer transition-colors ${!notif.isRead ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
            >
              <div className="h-9 w-9 rounded-full flex items-center justify-center shrink-0 border bg-background">
                {getIcon(notif.type)}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm">{notif.message}</p>
                <span className="text-xs text-muted-foreground">{new Date(notif.createdAt).toLocaleDateString()}</span>
              </div>
              {!notif.isRead && <div className="ml-auto w-2 h-2 rounded-full bg-primary self-center"></div>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
