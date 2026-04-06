import React from 'react';
import { motion } from 'motion/react';
import { Download, TrendingUp, MousePointer2, DollarSign, Lightbulb, CheckCircle2, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '../lib/utils';

const data = [
  { name: 'WK1', clicks: 400 },
  { name: 'WK2', clicks: 600 },
  { name: 'WK3', clicks: 800 },
  { name: 'WK4', clicks: 1247 },
  { name: 'WK5', clicks: 1100 },
  { name: 'WK6', clicks: 1300 },
  { name: 'WK7', clicks: 1500 },
  { name: 'WK8', clicks: 1800 },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted mt-1">AI Auto Book · Last 30 days · All channels</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:bg-surface transition-colors font-mono text-xs uppercase tracking-widest">
          <Download className="w-4 h-4" /> DOWNLOAD REPORT
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'TOTAL CLICKS', value: '1,247', sub: '↑ 34%', icon: MousePointer2, color: 'text-accent' },
          { label: 'SALES', value: '19', sub: 'Gumroad tracked', icon: CheckCircle2, color: 'text-secondary' },
          { label: 'BEST CHANNEL', value: 'LinkedIn', sub: '680 clicks · 7 sales', icon: TrendingUp, color: 'text-accent' },
          { label: 'REVENUE', value: '$228', sub: '↑ $84 this week', icon: DollarSign, color: 'text-secondary' },
        ].map((stat, i) => (
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

      {/* Chart */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold mb-6 font-mono text-xs uppercase tracking-widest text-muted">Weekly Clicks — 8 weeks</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#282850" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#505080" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#505080" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111120', border: '1px solid #282850', borderRadius: '8px' }}
                itemStyle={{ color: '#b8f000' }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#b8f000" 
                strokeWidth={3} 
                dot={{ fill: '#b8f000', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* A/B Test Results */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-accent" /> A/B Test Results This Week
          </h2>
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
            ΩMEGA LEARNED
          </span>
        </div>
        
        <div className="space-y-8">
          {[
            {
              title: 'LinkedIn: BAB framework vs HSO framework',
              detail: 'test ran 7 days · 480 impressions',
              results: [
                { label: 'BAB: 7.2% CTR', winner: true },
                { label: 'HSO: 2.4% CTR', winner: false },
              ],
              winnerLabel: 'BAB WINS ✓'
            },
            {
              title: 'Twitter: Hook #2 (Counterintuitive) vs Hook #7 (Pain)',
              detail: 'test ran 7 days · 240 impressions',
              results: [
                { label: 'Hook #7: 1.8% CTR', winner: true },
                { label: 'Hook #2: 0.9% CTR', winner: false },
              ],
              winnerLabel: 'HOOK #7 WINS ✓'
            }
          ].map((test, i) => (
            <div key={i} className="flex items-start justify-between pb-8 border-b border-border last:border-0 last:pb-0">
              <div>
                <h3 className="font-medium text-lg">{test.title}</h3>
                <p className="text-muted text-sm mt-1">{test.detail}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {test.results.map((res, j) => (
                  <div key={j} className={cn("text-sm font-mono", res.winner ? "text-accent" : "text-muted")}>
                    {res.label}
                  </div>
                ))}
                <div className="mt-2 bg-accent/10 text-accent border border-accent/20 px-4 py-1 rounded text-xs font-bold uppercase tracking-widest">
                  {test.winnerLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Report */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" /> AI Weekly Report — Week 8
          </h2>
          <span className="bg-orange-400/10 text-orange-400 border border-orange-400/20 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
            ACTION ITEMS INSIDE
          </span>
        </div>
        <div className="space-y-4 text-muted leading-relaxed">
          <p><span className="text-text font-medium">Headline:</span> LinkedIn is your revenue channel. Reddit builds awareness. Twitter still underperforming.</p>
          <p><span className="text-text font-medium">What worked:</span> LinkedIn BAB carousel "Stop wasting 3 hours on emails" drove 89 clicks, 1 sale. CTR 7.2%.</p>
          <p><span className="text-text font-medium">What didn't:</span> Twitter threads averaging 0.8% CTR. Switching to Hook #7 (Direct Pain) next week.</p>
          <p><span className="text-text font-medium">This week:</span> (1) Generate 3 more LinkedIn BAB carousels. (2) Reddit post in r/freelance using PAS. (3) Email #4 social proof sequence — 38% open rate on #3.</p>
        </div>
      </div>
    </div>
  );
}
