'use client';

import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({ children, className, hoverEffect = false }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border transition-all duration-300',
        'bg-zinc-900 border-zinc-800',
        'shadow-[0_4px_24px_rgba(0,0,0,0.35)]',
        'max-md:bg-zinc-900 max-md:border-zinc-700 max-md:shadow-[0_6px_28px_rgba(0,0,0,0.5)]',
        hoverEffect &&
          'hover:border-zinc-600 hover:bg-zinc-800/90 hover:shadow-xl',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
