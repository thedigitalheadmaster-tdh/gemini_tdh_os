import React from 'react';
import { Bot, Map, ListTodo, CreditCard, CrossIcon, Check, Plus, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShepherdOS() {
  return (
    <div className="flex flex-col space-y-6 h-full pb-10">
      
      {/* HEADER */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-6 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Bot size={120} />
        </div>
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center border border-accent-primary/30">
               <Bot size={20} className="text-accent-primary" />
             </div>
             <div>
               <h1 className="font-display font-bold text-2xl text-white tracking-tight">ShepherdOS</h1>
               <p className="text-sm text-text-secondary mt-1">Church Management OS powered by specialized AI Agents.</p>
             </div>
          </div>
          <span className="bg-status-info/10 text-status-info border border-status-info/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Planning Phase
          </span>
        </div>
      </div>

      {/* 3 COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ROADMAP */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-5 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6">
            <Map size={16} className="text-accent-primary" />
            <h3 className="font-display font-bold text-sm text-white">Roadmap Timeline</h3>
          </div>
          <div className="flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border-default before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-accent-primary bg-bg-surface text-accent-primary shrink-0 z-10 shadow-sm shadow-accent-primary/20 mb-auto mt-1 md:mt-0 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="w-1.5 h-1.5 bg-accent-primary rounded-full"></div>
              </div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:pr-6 md:group-even:pl-6 text-left md:group-odd:text-right">
                <div className="text-[10px] text-accent-primary font-bold uppercase tracking-wider mb-1">Sep 2026</div>
                <div className="text-sm font-semibold text-white mb-1">Phase 1: MVP</div>
                <div className="text-xs text-text-muted">Core congregation directory and simple donation tracking.</div>
              </div>
            </div>
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-border-default bg-bg-surface text-text-muted shrink-0 z-10 mb-auto mt-1 md:mt-0 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2" />
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:pr-6 md:group-even:pl-6 text-left md:group-odd:text-right">
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Dec 2026</div>
                <div className="text-sm font-semibold text-text-secondary mb-1">Phase 2: Growth</div>
                <div className="text-xs text-text-muted">Event scheduling, volunteer rosters, and AI automated comms.</div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-border-default bg-bg-surface text-text-muted shrink-0 z-10 mb-auto mt-1 md:mt-0 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2" />
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-4 md:pl-0 md:group-odd:pr-6 md:group-even:pl-6 text-left md:group-odd:text-right">
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mb-1">Jun 2027</div>
                <div className="text-sm font-semibold text-text-secondary mb-1">Phase 3: Scale</div>
                <div className="text-xs text-text-muted">Multi-campus support, advanced financial forecasting.</div>
              </div>
            </div>

          </div>
        </div>

        {/* FEATURES BACKLOG */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-5 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ListTodo size={16} className="text-accent-primary" />
              <h3 className="font-display font-bold text-sm text-white">Features Backlog</h3>
            </div>
            <button className="text-text-muted hover:text-white"><Plus size={16} /></button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
            
            <div>
              <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-2 bg-bg-elevated/50 py-1 px-2 rounded">Phase 1: MVP</div>
              <div className="space-y-2">
                <div className="bg-bg-base border border-border-default rounded-md p-3 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-status-danger mt-1.5 shrink-0" title="High Priority" />
                  <div>
                    <div className="text-xs font-semibold text-white mb-1">Member Directory DB</div>
                    <span className="text-[9px] bg-status-info/10 text-status-info px-1.5 py-0.5 rounded border border-status-info/20 uppercase">In Design</span>
                  </div>
                </div>
                <div className="bg-bg-base border border-border-default rounded-md p-3 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-status-warning mt-1.5 shrink-0" title="Medium Priority" />
                  <div>
                    <div className="text-xs font-semibold text-white mb-1">Basic Donation Forms</div>
                    <span className="text-[9px] bg-bg-elevated text-text-muted px-1.5 py-0.5 rounded border border-border-default uppercase">Drafting</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-2 bg-bg-elevated/50 py-1 px-2 rounded">Phase 2: Growth</div>
              <div className="space-y-2">
                <div className="bg-bg-base border border-border-default rounded-md p-3 flex items-start gap-3 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-status-info mt-1.5 shrink-0" title="Low Priority" />
                  <div>
                    <div className="text-xs font-semibold text-white mb-1">AI Newsletter Writer</div>
                    <span className="text-[9px] bg-bg-elevated text-text-muted px-1.5 py-0.5 rounded border border-border-default uppercase">Icebox</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* PRICING TIERS */}
        <div className="bg-bg-surface border border-border-default rounded-xl p-5 flex flex-col h-[500px]">
          <div className="flex items-center gap-2 mb-6 shrink-0">
            <CreditCard size={16} className="text-accent-primary" />
            <h3 className="font-display font-bold text-sm text-white">Pricing Model</h3>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-2">
            
            <div className="border border-border-default rounded-lg p-4 bg-bg-base">
              <div className="flex justify-between items-baseline border-b border-border-default pb-3 mb-3">
                <h4 className="font-display font-bold text-white">Starter</h4>
                <div className="text-accent-primary font-bold">R299<span className="text-text-muted text-xs font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Up to 100 members</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Basic directory</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Email support</li>
              </ul>
            </div>

            <div className="border border-accent-primary/30 rounded-lg p-4 bg-accent-primary/5 relative">
              <div className="absolute top-0 right-0 bg-accent-primary text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg">Popular</div>
              <div className="flex justify-between items-baseline border-b border-border-default pb-3 mb-3">
                <h4 className="font-display font-bold text-white">Growth</h4>
                <div className="text-accent-primary font-bold">R599<span className="text-text-muted text-xs font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Up to 500 members</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> AI Event scheduling</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Priority support</li>
              </ul>
            </div>

            <div className="border border-border-default rounded-lg p-4 bg-bg-base">
              <div className="flex justify-between items-baseline border-b border-border-default pb-3 mb-3">
                <h4 className="font-display font-bold text-white">Ministry</h4>
                <div className="text-accent-primary font-bold">R1,299<span className="text-text-muted text-xs font-normal">/mo</span></div>
              </div>
              <ul className="space-y-2 text-xs text-text-secondary">
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Unlimited members</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Multi-site management</li>
                 <li className="flex gap-2 items-center"><Check size={12} className="text-status-success" /> Dedicated Agent</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* LEAD CTA SECTION */}
      <div className="bg-bg-elevated/40 border border-border-default border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center shrink-0">
        <div className="bg-bg-surface w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <AlertCircle size={20} className="text-text-muted" />
        </div>
        <h3 className="font-display font-bold text-lg text-white mb-2">Zero Product Leads</h3>
        <p className="text-sm text-text-secondary mb-6 max-w-md">You haven't added any churches to the beta waitlist yet. Start capturing interest to validate Phase 1 features.</p>
        <button className="bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold py-2 px-6 rounded-md transition-colors text-sm shadow-[0_0_20px_rgba(232,106,52,0.3)] hover:shadow-[0_0_30px_rgba(232,106,52,0.5)]">
          Add Interested Church
        </button>
      </div>

    </div>
  );
}
