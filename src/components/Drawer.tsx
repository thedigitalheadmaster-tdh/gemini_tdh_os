import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export function Drawer({ isOpen, onClose, title, children, width = 'sm:w-[450px]' }: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <div className={cn("fixed inset-0 z-50 transition-opacity", isOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className={cn(
        "absolute top-0 right-0 bottom-0 w-full bg-bg-base border-l border-border-default shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out flex flex-col",
        width,
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {title && (
          <div className="p-5 border-b border-border-default flex items-center justify-between bg-bg-surface shrink-0">
            <h2 className="font-display font-bold text-xl text-white">{title}</h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-bg-elevated text-text-muted hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto w-full relative">
          {children}
        </div>
      </div>
    </div>
  );
}
