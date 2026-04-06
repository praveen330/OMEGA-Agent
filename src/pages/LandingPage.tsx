import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, MousePointer2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text selection:bg-accent selection:text-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-border max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-accent font-bold text-2xl">
          <span className="text-3xl">Ω</span>
          <span>MEGA</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-muted font-medium">
          <a href="#features" className="hover:text-text transition-colors">Features</a>
          <a href="#pricing" className="hover:text-text transition-colors">Pricing</a>
          <a href="#how-it-works" className="hover:text-text transition-colors">How it works</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="px-6 py-2 rounded-md border border-border hover:bg-surface transition-colors font-medium">
            SIGN IN
          </Link>
          <Link to="/auth" className="px-6 py-2 rounded-md bg-accent text-background hover:opacity-90 transition-opacity font-bold flex items-center gap-2">
            START FREE <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 text-accent font-mono text-sm tracking-widest uppercase mb-8">
            <span>Zero Cost</span>
            <span className="w-1 h-1 bg-muted rounded-full" />
            <span>Fully Automated</span>
            <span className="w-1 h-1 bg-muted rounded-full" />
            <span>Drag & Drop Simple</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
            Drop your product <span className="text-accent">in.</span><br />
            Revenue comes <span className="text-secondary">out.</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto mb-12">
            10 AI agents research, write, and distribute your marketing every week. 
            Approve with one click. $0–5/month total cost.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link to="/auth" className="w-full md:w-auto px-8 py-4 rounded-md bg-accent text-background text-lg font-bold hover:opacity-90 transition-opacity">
              ADD YOUR FIRST PRODUCT FREE
            </Link>
            <button className="w-full md:w-auto px-8 py-4 rounded-md border border-border text-lg font-medium hover:bg-surface transition-colors flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-current" /> 90-SEC DEMO
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-32 border-t border-border pt-16">
          <div>
            <div className="text-4xl font-bold mb-2">10</div>
            <div className="text-muted font-mono text-xs uppercase tracking-widest">AI Agents</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">40+</div>
            <div className="text-muted font-mono text-xs uppercase tracking-widest">Content/Week</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-accent">$0–5</div>
            <div className="text-muted font-mono text-xs uppercase tracking-widest">Monthly Cost</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-secondary">98%</div>
            <div className="text-muted font-mono text-xs uppercase tracking-widest">Margin</div>
          </div>
        </div>
      </section>
    </div>
  );
}
