import { Bell, Shield, User, Monitor, Key } from "lucide-react"

export default function Settings() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account and preferences.</p>
      </div>

      <div className="grid gap-6">
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Account Information</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Username</label>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value="johndoe" readOnly />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value="john@example.com" readOnly />
            </div>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-6 py-2">
              Update Profile
            </button>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Key className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Security</h2>
          </div>
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-input bg-background h-10 px-6 py-2">
            Change Password
          </button>
        </section>

        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="flex items-center justify-between p-2">
            <span>Email notifications on new comments</span>
            <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer">
              <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
