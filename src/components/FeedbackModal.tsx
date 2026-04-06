import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare, Bug, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [type, setType] = useState<'feedback' | 'bug' | 'feature'>('feedback');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface border border-border rounded-lg w-full max-w-md overflow-hidden shadow-2xl"
        >
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-bold">Feedback</h2>
            <button onClick={onClose} className="text-muted hover:text-text transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex p-1 bg-background rounded-md border border-border">
              {[
                { id: 'feedback', label: 'Feedback', icon: MessageSquare },
                { id: 'bug', label: 'Bug', icon: Bug },
                { id: 'feature', label: 'Feature', icon: Lightbulb },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setType(item.id as any)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 rounded text-xs font-mono uppercase tracking-widest transition-all",
                    type === item.id ? "bg-surface text-accent shadow-sm" : "text-muted hover:text-text"
                  )}
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-muted font-mono text-[10px] uppercase tracking-widest">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Tell us what's on your mind..."
                className="w-full bg-background border border-border rounded-md px-4 py-3 focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-accent text-background py-3 rounded-md font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              SEND FEEDBACK <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
