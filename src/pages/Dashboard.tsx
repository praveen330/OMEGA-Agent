import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, TrendingUp, MousePointer2, DollarSign, Lightbulb, CheckCircle2, Edit3, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [counts, setCounts] = useState({ total: 0, approved: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('omega_content');
    if (saved) {
      const content = JSON.parse(saved);
      setCounts({
        total: content.length,
        approved: content.filter((c: any) => c.status === 'approved').length
      });
    }
  }, []);

  const stats = [
    { label: 'CONTENT READY', value: counts.total.toString(), sub: `+${counts.total - counts.approved} pending`, icon: Edit3, color: 'text-accent' },
    { label: 'TOTAL CLICKS', value: '1,247', sub: '↑ 34% vs last week', icon: MousePointer2, color: 'text-secondary' },
    { label: 'SALES TRACKED', value: '19', sub: '3 products', icon: CheckCircle2, color: 'text-accent' },
    { label: 'REVENUE', value: '$228', sub: '↑ $84 this week', icon: DollarSign, color: 'text-secondary' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Good morning, Kumar ☀️
          </h1>
          <p className="text-muted mt-1">
            3 products active · Week 4 · Agents ran 2 hours ago
          </p>
        </div>
        <Link 
          to="/products/new" 
          className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-md font-bold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" /> NEW PRODUCT
        </Link>
      </header>

      {/* Insight Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/5 border border-accent/20 rounded-lg p-6 flex items-start gap-4"
      >
        <div className="p-2 bg-accent/10 rounded-full">
          <Lightbulb className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <p className="text-lg">
            <span className="text-accent font-medium">ΩMEGA learned this week:</span> BAB framework outperforms HSO 3:1 on LinkedIn for your audience. Next week's LinkedIn content will use BAB by default.
          </p>
        </div>
        <button className="px-4 py-2 rounded-md border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent/10 transition-colors">
          NEW INSIGHT
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border p-6 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted font-mono text-xs uppercase tracking-widest">{stat.label}</span>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Needs Approval Section */}
      <section className="bg-surface border border-border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" /> Needs Your Approval
          </h2>
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            5 ITEMS
          </span>
        </div>
        <div className="divide-y divide-border">
          {[
            { type: 'Reddit post', platform: 'REDDIT', target: 'r/ChatGPT', framework: 'PAS framework · Hook #5', stage: 'awareness stage' },
            { type: 'LinkedIn Carousel', platform: 'LINKEDIN', target: '5 slides', framework: 'BAB framework', stage: 'interest stage' },
          ].map((item, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-surface-hover transition-colors">
              <div>
                <h3 className="font-medium text-lg">
                  {item.type} — {item.target} ({item.framework})
                </h3>
                <p className="text-muted text-sm mt-1">
                  {item.platform.toLowerCase()} · {item.stage} · ai auto book
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 rounded text-[10px] font-bold tracking-widest",
                  item.platform === 'REDDIT' ? "bg-red-500/10 text-red-500 border border-red-500/20" : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                )}>
                  {item.platform}
                </span>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent/10 text-accent font-bold transition-colors">
                  ✓ APPROVE
                </button>
                <button className="px-4 py-2 rounded-md border border-border text-muted hover:text-text transition-colors font-medium">
                  EDIT
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Status */}
      <section className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" /> Agent Status
          </h2>
          <span className="text-accent font-mono text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            ALL SYSTEMS GO
          </span>
        </div>
        <div className="space-y-4">
          {[
            { name: 'STRATEGIST', status: 'idle', detail: 'ran 3 days ago' },
            { name: 'RESEARCH', status: 'running', detail: 'scraping reddit... 62%', color: 'text-secondary' },
            { name: 'CONTENT', status: 'idle', detail: '47 pieces generated' },
            { name: 'OUTREACH', status: 'queued', detail: 'Thu 8am' },
          ].map((agent) => (
            <div key={agent.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="font-mono text-sm tracking-wider">{agent.name}</span>
              <div className="text-right">
                <span className={cn("text-sm font-medium", agent.color || "text-muted")}>
                  {agent.status}
                </span>
                <span className="text-muted text-sm mx-2">·</span>
                <span className="text-muted text-sm">{agent.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
