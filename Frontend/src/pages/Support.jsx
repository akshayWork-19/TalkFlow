import { HelpCircle, Book, MessageCircle, Mail } from "lucide-react"

export default function Support() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">How can we help?</h1>
        <p className="text-muted-foreground text-xl">Search our help center or contact our team.</p>
        <div className="mt-8 max-w-xl mx-auto">
          <input 
            type="search" 
            placeholder="Search for answers..." 
            className="flex h-12 w-full rounded-full border border-input bg-background px-6 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
        {[
          { icon: <Book />, title: "Guides", desc: "Step-by-step tutorials" },
          { icon: <MessageCircle />, title: "Community", desc: "Get help from others" },
          { icon: <HelpCircle />, title: "FAQ", desc: "Common questions" },
          { icon: <Mail />, title: "Contact", desc: "Direct email support" }
        ].map(item => (
          <div key={item.title} className="rounded-xl border bg-card p-6 flex flex-col items-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-muted/50 p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
        <p className="text-muted-foreground mb-8">Our support team is available 24/7 to assist you with any issues.</p>
        <button className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full shadow-lg hover:bg-primary/90 transition-all">
          Chat with Support
        </button>
      </div>
    </div>
  )
}
