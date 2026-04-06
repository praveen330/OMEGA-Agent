import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Auth() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock sign in
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-accent font-bold text-4xl mb-4">
            <span className="text-5xl">Ω</span>
            <span>MEGA</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted mt-2">Sign in to manage your AI marketing agency</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 bg-surface border border-border py-3 rounded-md font-medium hover:bg-surface-hover transition-colors">
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-surface border border-border py-3 rounded-md font-medium hover:bg-surface-hover transition-colors">
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted font-mono tracking-widest">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <label className="text-muted font-mono text-xs uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kumar@example.com"
                className="w-full bg-surface border border-border rounded-md pl-10 pr-4 py-3 focus:border-accent focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full bg-accent text-background py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            SEND MAGIC LINK <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-muted">
          By continuing, you agree to ΩMEGA's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
