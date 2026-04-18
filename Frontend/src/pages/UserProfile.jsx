import { User, Mail, Calendar, MapPin, Link as LinkIcon, Edit, Award, Settings } from "lucide-react"
import { useEffect, useState } from "react";
import api from '../lib/axios';
import PostCard from "../components/custom/PostCard.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


export default function UserProfile() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAcitivity = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const response = await api.get(`/post?author=${user.id || user._id}`);
        setUserPosts(response.data.data || []);
      } catch (error) {
        console.error("failed to fetch user posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAcitivity();
  }, [user]);

  if (!user) return null;

  const totalVotesRecieved = userPosts.reduce((sum, post) => sum + (post.upVotesCount || 0), 0);


  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden" >
        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10">
        </div>

        <div className="p-6 pt-0 relative">
          <div className="absolute -top-12 h-24 w-24 rounded-full border-4 border-background bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground shadow-sm">
            {user.username?.[0]?.toUpperCase()}
          </div>

          <div className="flex justify-between items-start pt-14">
            <div>
              <h1 className="text-2xl font-bold">
                {user.username}
              </h1>
              <p className="text-muted-foreground text-sm">
                {user.email}
              </p>
            </div>

            <Link to="/settings" className="inline-flex items-center justify-center rounded-md font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-sm shadow-sm transition-colors">
              <Settings className="mr-2 h-4 w-4" />
              Edit Profile
            </Link>
          </div>

          <div className="flex gap-6 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                Joined Recently
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">
                {totalVotesRecieved} Upvotes Recieved
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium">
                {userPosts.length} Posts Created
              </span>
            </div>
          </div>
        </div>
      </div>

      <div >
        <h2 className="text-xl font-bold mb-6">
          Your Activity
        </h2>

        {loading ? (
          <div className="text-center py-10 text-muted-foreground flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin">
            </div>

            Loading your posts..
          </div>
        ) : userPosts.length > 0 ? (
          <div className="grid gap-6">
            {userPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border rounded-xl bg-muted/20 border-dashed">
            <p className="text-muted-foreground font-medium mb-2">You haven't posted anything yet.</p>
            <p className="text-sm text-muted-foreground/70 mb-4">Start a discussion to see it here.</p>
          </div>
        )}
      </div>
    </div >
  )
}
