import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const Card = ({ children, className, ...props }: CardProps) => (
  <div 
    className={cn("bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden", className)} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className, ...props }: CardProps) => (
  <div 
    className={cn("px-6 py-4 border-b border-slate-50 flex items-center justify-between", className)} 
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }: CardProps) => (
  <div 
    className={cn("px-6 py-4", className)} 
    {...props}
  >
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' | 'info', className?: string }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100',
    info: 'bg-sky-50 text-sky-700 border border-sky-100',
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
};

export const Button = ({ children, variant = 'primary', size = 'md', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg' }) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button className={cn("inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none", variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};

export const Progress = ({ value, className, color = 'primary' }: { value: number, className?: string, color?: 'primary' | 'success' | 'warning' | 'danger' }) => {
  const colors = {
    primary: 'bg-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
  };
  return (
    <div className={cn("w-full bg-slate-100 rounded-full h-2 overflow-hidden", className)}>
      <div 
        className={cn("h-full transition-all duration-500", colors[color])} 
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};
