import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RefreshCw, DollarSign, Clock, Users, Search, Edit3, Target, BarChart2, Repeat } from 'lucide-react';
import { cn } from '../lib/utils';

const agents = [
  {
    id: 'strategist',
    name: 'Strategist',
    icon: Lightbulb,
    description: 'Builds full marketing strategy. Run when product changes.',
    model: 'Claude Haiku',
    time: '~45s',
    cost: '~$0.01/run',
    status: 'idle',
  },
  {
    id: 'research',
    name: 'Research',
    icon: Search,
    description: 'Scrapes Reddit + Quora for buyer language. Mon 6am.',
    model: 'Ollama + Firecrawl',
    time: '~2min',
    cost: '$0/run',
    status: 'running',
    progress: 62,
    detail: 'Scraping r/freelance...',
  },
  {
    id: 'content',
    name: 'Content',
    icon: Edit3,
    description: 'Writes 10-12 pieces using AIDA + 8 frameworks. Tue 7am.',
    model: 'Claude Haiku',
    time: '~4min',
    cost: '~$0.05/run',
    status: 'idle',
  },
  {
    id: 'competitor',
    name: 'Competitor Spy',
    icon: Target,
    description: 'Monitors competitors. Finds gaps. Wed 7am.',
    model: 'Ollama + Firecrawl',
    time: '~2min',
    cost: '$0/run',
    status: 'idle',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart2,
    description: 'Scores content, writes report. Sunday 11pm.',
    model: 'Claude Haiku',
    time: '~1min',
    cost: '~$0.02/run',
    status: 'queued',
    nextRun: 'RUNS SUNDAY',
  },
  {
    id: 'iteration',
    name: 'Iteration',
    icon: Repeat,
    description: 'Rewrites losers. Amplifies winners. Runs after Analytics.',
    model: 'Claude Haiku',
    time: '~2min',
    cost: '~$0.03/run',
    status: 'queued',
    nextRun: 'AFTER ANALYTICS',
  },
];

import { Lightbulb } from 'lucide-react';

export function AgentPanel() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Control Panel</h1>
          <p className="text-muted mt-1">10 agents · Total cost this month: $1.84 · Next scheduled runs below</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted font-mono uppercase tracking-widest">Total Monthly Cost</div>
            <div className="text-xl font-bold text-accent">$1.84</div>
          </div>
          <button className="p-2 rounded-md border border-border hover:bg-surface transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface border border-border rounded-lg p-6 flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <agent.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{agent.name}</h3>
                  <span className={cn(
                    "text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded",
                    agent.status === 'running' ? "bg-secondary/10 text-secondary border border-secondary/20" : 
                    agent.status === 'queued' ? "bg-orange-400/10 text-orange-400 border border-orange-400/20" :
                    "bg-muted/10 text-muted border border-muted/20"
                  )}>
                    {agent.status}
                  </span>
                </div>
              </div>
              {agent.status === 'idle' && (
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors group">
                  <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> RUN NOW
                </button>
              )}
            </div>

            <p className="text-muted text-sm mb-6 flex-1">{agent.description}</p>

            <div className="space-y-4">
              {agent.status === 'running' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-secondary">{agent.detail}</span>
                    <span className="text-secondary">{agent.progress}%</span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.progress}%` }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              )}

              {agent.status === 'queued' && (
                <div className="w-full py-2 border border-border rounded-md text-center text-[10px] font-mono uppercase tracking-widest text-muted">
                  {agent.nextRun}
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] font-mono text-muted uppercase tracking-widest pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <span>{agent.model}</span>
                  <span>{agent.time}</span>
                </div>
                <div className="text-text">{agent.cost}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
