import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, User, Send, Hash, Heart, 
  Image as ImageIcon, Zap, Shield, TrendingUp,
  LayoutDashboard, Bell, Search
} from 'lucide-react';

// --- CONFIG & MOCK DATA ---
const CHAT_LIMIT = 25;

const FORUM_POSTS = [
  {
    id: 1,
    author: { name: 'Architect', avatar: 'https://i.pravatar.cc/150?u=arch', role: 'Staff' },
    title: 'Neden Minimalism? Karmaşanın İçindeki Sessizlik',
    content: 'Arayüz tasarlarken en zor şey, neyi ekleyeceğiniz değil, neyi çıkaracağınızdır. Boşluk bir eksiklik değil, bir elementtir.',
    likes: 124,
    tags: ['Design', 'UX'],
    time: '12m'
  },
  {
    id: 2,
    author: { name: 'Cyber_Nomad', avatar: 'https://i.pravatar.cc/150?u=nomad', role: 'User' },
    title: 'Ephemeral Chat Sistemlerinin Geleceği',
    content: 'Log tutmayan, anlık silinen konuşmalar dijital özgürlüğün anahtarı olabilir mi? Bu forumdaki chat tam olarak bunu deniyor.',
    likes: 89,
    tags: ['Privacy', 'Tech'],
    time: '2h'
  }
];

// --- STYLES ---
const styles = {
  card: "bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500",
  input: "w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-700",
  scrollbar: "scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
};

export default function AvantGardeApp() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat Rolling Logic
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, user: 'You', color: 'text-emerald-400' };
    setMessages(prev => [...prev, newMsg].slice(-CHAT_LIMIT));
    setInput("");
    
    // Auto-reply for life
    setTimeout(() => {
      const responses = ["Katılıyorum.", "İlginç bir nokta...", "Peki ya hız?", "Bunu düşünmemiştim."];
      const botMsg = { id: Date.now()+1, text: responses[Math.floor(Math.random()*responses.length)], user: 'Guest', color: 'text-zinc-500' };
      setMessages(prev => [...prev, botMsg].slice(-CHAT_LIMIT));
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                <Zap className="w-5 h-5 text-zinc-950 fill-current" />
              </div>
              <span className="text-white font-bold tracking-tighter text-xl">VOID.</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest">
              <a href="#" className="text-emerald-500">Threads</a>
              <a href="#" className="hover:text-white transition-colors">Lab</a>
              <a href="#" className="hover:text-white transition-colors">Vault</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-white" />
            <Bell className="w-5 h-5 text-zinc-500 cursor-pointer hover:text-white" />
            <div className="h-8 w-[1px] bg-zinc-800 mx-2" />
            <img src="https://i.pravatar.cc/150?u=me" className="w-8 h-8 rounded-full border border-zinc-700" alt="profile" />
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Sidebar & Profile */}
        <div className="lg:col-span-3 space-y-8">
          <section className={`${styles.card} p-6 bg-gradient-to-br from-zinc-900 to-zinc-950`}>
            <div className="relative mb-4 group w-20 h-20 mx-auto">
              <img src="https://i.pravatar.cc/150?u=me" className="rounded-2xl w-full h-full object-cover border-2 border-zinc-800 group-hover:border-emerald-500/50 transition-all" />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-lg shadow-xl">
                <ImageIcon className="w-3 h-3 text-zinc-950" />
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-white font-bold">Neo Architect</h2>
              <p className="text-[10px] font-mono text-zinc-600 uppercase mt-1 tracking-widest">Premium Member</p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Reputation</span>
                <span className="text-emerald-500">2.4k</span>
              </div>
              <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[10px] font-mono text-zinc-600 uppercase px-2 mb-4 tracking-[0.2em]">Quick Access</h3>
            {[
              { icon: TrendingUp, label: 'Trending' },
              { icon: Shield, label: 'Moderation' },
              { icon: LayoutDashboard, label: 'Analytics' }
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 text-sm cursor-pointer transition-colors group">
                <item.icon className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500" />
                <span className="group-hover:text-zinc-100">{item.label}</span>
              </div>
            ))}
          </section>
        </div>

        {/* Center: Forum Feed */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tighter">Community Feed</h1>
              <p className="text-zinc-500 text-sm">Derin düşünceler, anlık etkileşimler.</p>
            </div>
          </div>

          {FORUM_POSTS.map(post => (
            <article key={post.id} className={styles.card}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.author.avatar} className="w-6 h-6 rounded-md grayscale" />
                  <span className="text-xs font-mono text-emerald-500">{post.author.name}</span>
                  <span className="text-[10px] text-zinc-700">• {post.time}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors cursor-pointer">{post.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{post.content}</p>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-xs hover:text-red-400 transition-colors group">
                    <Heart className="w-4 h-4 group-hover:fill-current" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-xs hover:text-white transition-colors">
                    <MessageSquare className="w-4 h-4" /> 42 Replies
                  </button>
                  <div className="flex-1" />
                  <div className="flex gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-zinc-950 px-2 py-1 rounded border border-zinc-800 text-zinc-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right: Ephemeral Chat (Rolling 25) */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 h-[600px] flex flex-col bg-zinc-900/40 border border-zinc-800/60 rounded-3xl overflow-hidden shadow-2xl shadow-black">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/40">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-200">Live Stream</span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase font-mono">25 Limit</span>
            </div>

            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${styles.scrollbar}`}>
              <div className="h-20 bg-gradient-to-b from-zinc-950 to-transparent absolute top-12 left-0 right-0 z-10 pointer-events-none" />
              
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-xs text-center px-4">
                  <MessageSquare className="w-8 h-8 mb-2" />
                  <p>Konuşmalar anlıktır. Yeni mesajlar eskileri tarihe gömer.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase ${msg.color}`}>{msg.user}:</span>
                    <p className="text-sm text-zinc-300 leading-snug">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 bg-zinc-950/60 border-t border-zinc-800">
              <div className="relative">
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Mesaj yaz..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button 
                  onClick={sendMessage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
