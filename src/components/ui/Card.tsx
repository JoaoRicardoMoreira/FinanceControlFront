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
                'relative overflow-hidden',
                'bg-white dark:bg-slate-900/30 backdrop-blur-xl',
                'border border-gray-200 dark:border-white/5',
                'rounded-2xl',
                'shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]',
                hoverEffect && 'transition-all duration-300 hover:bg-gray-50 dark:hover:bg-slate-900/40 hover:border-gray-300 dark:hover:border-white/10 hover:shadow-xl dark:hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.45)] hover:-translate-y-1',
                className
            )}
        >
            {/* Top Reflection Effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/10 to-transparent pointer-events-none" />

            {children}
        </div>
    );
}
