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
                'relative overflow-hidden group',
                'bg-transparent',
                'border border-transparent',
                'rounded-2xl',
                'transition-all duration-300',
                hoverEffect && 'hover:bg-zinc-900/80 hover:border-zinc-800 hover:shadow-2xl hover:scale-[1.01] hover:backdrop-blur-xl',
                !hoverEffect && 'bg-zinc-900/20 border-white/5', // Fallback for non-hover cards if any
                className
            )}
        >
            {/* Top Reflection Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {children}
        </div>
    );
}
