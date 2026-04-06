import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { LayoutDashboard, Package, Kanban, BarChart3, Users, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FeedbackModal } from '../FeedbackModal';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Kanban, label: 'Content', path: '/content' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Agents', path: '/agents' },
];

export function Layout() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-8 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border px-4 py-3 flex items-center justify-between z-40">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-accent" : "text-muted"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-mono uppercase tracking-widest">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Floating Feedback Button */}
      <button 
        onClick={() => setIsFeedbackOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-8 p-4 bg-surface border border-border rounded-full shadow-xl hover:border-accent transition-all group z-50"
      >
        <HelpCircle className="w-6 h-6 text-muted group-hover:text-accent transition-colors" />
      </button>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
