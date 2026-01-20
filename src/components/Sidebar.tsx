'use client';

import { useState } from 'react';

export type SidebarSection = 'dashboard' | 'graficos' | 'metas' | 'openfinance';

interface SidebarProps {
  activeSection: SidebarSection;
  onSectionChange: (section: SidebarSection) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: 'dashboard' as SidebarSection,
      label: 'Dashboard',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
    },
    {
      id: 'graficos' as SidebarSection,
      label: 'Gráficos',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      ),
    },
    {
      id: 'metas' as SidebarSection,
      label: 'Metas',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      id: 'openfinance' as SidebarSection,
      label: 'Open Finance',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      badge: 'Soon',
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen 
          bg-slate-900/20 backdrop-blur-md border-r border-white/5
          transition-all duration-300 z-40
          ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'w-64'}
        `}
      >
        <div className="flex flex-col h-full p-4 relative">
          {/* Glossy gradient on top */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            {!isCollapsed && (
              <div className="h-8 w-8" />
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300 group relative overflow-hidden
                    ${isActive
                      ? 'bg-blue-500/10 text-blue-400'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                    }
                  `}
                >
                  {/* Active Glow/Indicator */}
                  {isActive && (
                    <>
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_15px_2px_rgba(59,130,246,0.6)]" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-50" />
                    </>
                  )}

                  {/* Icon */}
                  <span className={`relative z-10 ${isCollapsed ? 'mx-auto' : ''}`}>{item.icon}</span>

                  {/* Label */}
                  {!isCollapsed && (
                    <span className="font-medium flex-1 text-left relative z-10 tracking-wide">{item.label}</span>
                  )}

                  {/* Badge */}
                  {!isCollapsed && item.badge && (
                    <span className="relative z-10 text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 shadow-[0_0_10px_-2px_rgba(245,158,11,0.3)]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer Info */}
          {!isCollapsed && (
            <div className="mt-auto pt-4 border-t border-white/5">
              <p className="text-xs text-slate-600 text-center">
                Finance Control v1.0
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div
          onClick={() => setIsCollapsed(true)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
