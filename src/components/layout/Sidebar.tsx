import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Kanban, BarChart3, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Kanban, label: 'Content Board', path: '/content' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Agents', path: '/agents' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 text-accent font-bold text-2xl">
          <span className="text-3xl">Ω</span>
          <span>MEGA</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium",
                isActive 
                  ? "bg-accent/10 text-accent" 
                  : "text-muted hover:text-text hover:bg-surface-hover"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium",
              isActive 
                ? "bg-accent/10 text-accent" 
                : "text-muted hover:text-text hover:bg-surface-hover"
            )
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-medium text-muted hover:text-red-400 hover:bg-red-400/5 w-full text-left">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
