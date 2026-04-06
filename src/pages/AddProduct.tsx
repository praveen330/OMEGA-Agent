import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Rocket, Lightbulb, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { runStrategist, runResearch, runContentAgent, validateContent } from '../services/gemini';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'product', label: 'PRODUCT' },
  { id: 'audience', label: 'AUDIENCE' },
  { id: 'platform', label: 'PLATFORM' },
  { id: 'channels', label: 'CHANNELS' },
  { id: 'voice', label: 'VOICE' },
];

export function AddProduct() {
  const [activeTab, setActiveTab] = useState('product');
  const [isLaunching, setIsLaunching] = useState(false);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    goal: ''
  });

  const handleLaunch = async () => {
    if (!formData.name || !formData.description) {
      alert('Please fill in product name and description');
      return;
    }

    setIsLaunching(true);
    try {
      setStatus('Strategist Agent: Building marketing strategy...');
      const strategy = await runStrategist(formData);
      
      setStatus('Research Agent: Analyzing buyer language...');
      const research = await runResearch(formData.name, strategy.target_audience);
      
      setStatus('Content Agent: Generating Reddit posts...');
      const redditContent = await runContentAgent('reddit', { 
        productName: formData.name, 
        painPoints: strategy.pain_points 
      });
      
      setStatus('Content Agent: Generating LinkedIn posts...');
      const linkedinContent = await runContentAgent('linkedin', { 
        productName: formData.name, 
        painPoints: strategy.pain_points 
      });

      setStatus('Validator Agent: Checking platform rules...');
      const validatedReddit = await validateContent(redditContent);
      const validatedLinkedin = await validateContent(linkedinContent);

      // Save to "DB" (localStorage for now)
      const newPieces = [
        ...(validatedReddit.reddit_posts || []).map((p: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          product_id: 'p1',
          type: 'REDDIT POST',
          title: p.title,
          body: p.body,
          platform: 'reddit',
          framework: 'PAS',
          aida_stage: 'awareness',
          status: 'draft',
        })),
        ...(validatedLinkedin.linkedin_posts || []).map((p: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          product_id: 'p1',
          type: 'LINKEDIN POST',
          title: p.hook,
          body: p.content,
          platform: 'linkedin',
          framework: 'BAB',
          aida_stage: 'interest',
          status: 'draft',
        }))
      ];

      const existingContent = JSON.parse(localStorage.getItem('omega_content') || '[]');
      localStorage.setItem('omega_content', JSON.stringify([...existingContent, ...newPieces]));

      setStatus('Success! Redirecting to Content Board...');
      setTimeout(() => navigate('/content'), 1500);
    } catch (error) {
      console.error(error);
      setStatus('Error occurred during agent run. Please try again.');
      setIsLaunching(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto relative">
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
            <h2 className="text-2xl font-bold mb-2">Agents are working...</h2>
            <p className="text-accent font-mono text-sm uppercase tracking-widest animate-pulse">
              {status}
            </p>
            <div className="mt-12 max-w-md text-muted text-sm italic">
              "Strategist Agent is building your strategy... Research Agent is scraping buyer language... Content Agent is writing your posts..."
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Tell the Agents About Your Product</h1>
        <p className="text-muted">5 minutes here → agents work every week forever</p>
      </header>

      {/* Self-Promotion Template */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-accent/10 rounded-full">
            <Rocket className="w-6 h-6 text-accent" />
          </div>
          <div>
            <p className="font-medium">Promoting ΩMEGA itself? <span className="text-accent">Use the self-promotion template</span></p>
            <p className="text-sm text-muted">— pre-fills everything in one click.</p>
          </div>
        </div>
        <button 
          onClick={() => setFormData({
            name: 'ΩMEGA Agent',
            description: 'The autonomous AI marketing system for solopreneurs. It researches, writes, and distributes your marketing every week at zero cost.',
            price: '$49/mo',
            goal: '100 signups in 30 days'
          })}
          className="px-4 py-2 rounded-md border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent/10 transition-colors"
        >
          USE TEMPLATE
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-4 font-mono text-xs uppercase tracking-widest transition-colors relative",
              activeTab === tab.id ? "text-accent" : "text-muted hover:text-text"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              />
            )}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-muted font-mono text-xs uppercase tracking-widest">PRODUCT NAME *</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Complete AI & Automation System"
            className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:border-accent focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-muted font-mono text-xs uppercase tracking-widest">DESCRIPTION * (MIN 100 WORDS)</label>
          <textarea 
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="A complete guide to building AI automation systems. For solopreneurs who want to save 10+ hours/week without coding. Covers ChatGPT, no-code tools, and step-by-step workflows."
            className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-muted font-mono text-xs uppercase tracking-widest">PRICE *</label>
            <input 
              type="text" 
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="$12"
              className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-muted font-mono text-xs uppercase tracking-widest">CAMPAIGN GOAL *</label>
            <input 
              type="text" 
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
              placeholder="100 sales in 30 days"
              className="w-full bg-surface border border-border rounded-md px-4 py-3 focus:border-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="bg-surface border border-border rounded-lg p-6 flex items-start gap-4">
          <div className="p-2 bg-secondary/10 rounded-full">
            <Lightbulb className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <span className="text-secondary font-mono text-[10px] uppercase tracking-widest block mb-1">AI SUGGESTION</span>
            <p className="text-sm">
              Audience likely on <span className="text-text font-medium">r/freelance, r/ChatGPT, r/nocode</span>. Top buyer keywords: <span className="text-accent">"ai tools freelancers", "automate repetitive tasks", "save time ai"</span>. Research Agent will target these.
            </p>
          </div>
        </div>

        {/* Platform Readiness */}
        <div className="bg-surface border border-border rounded-lg p-6">
          <span className="text-muted font-mono text-[10px] uppercase tracking-widest block mb-4">PLATFORM READINESS</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span>Reddit: <span className="text-orange-400">Need 50+ karma</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>LinkedIn: <span className="text-accent">Ready</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Twitter: <span className="text-accent">Ready</span></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Medium: <span className="text-accent">Ready</span></span>
            </div>
          </div>
          <p className="text-xs text-muted mt-4">
            Reddit karma low? <a href="#" className="text-accent hover:underline">See 3-day guide →</a>
          </p>
        </div>

        <button 
          onClick={handleLaunch}
          disabled={isLaunching}
          className="w-full bg-accent text-background py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-8 disabled:opacity-50"
        >
          🚀 LAUNCH AGENT CAMPAIGN →
        </button>
        <p className="text-center text-muted text-sm">Strategist Agent starts immediately. First content in ~60 seconds.</p>
      </div>
    </div>
  );
}
