import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Bot, ShieldAlert, LineChart, Briefcase, Calculator, Settings, Scale, AlertTriangle, Zap, Search, Filter, ChevronDown
} from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const AGENTS = [
  { id: 1, name: 'Pezeze', role: 'Interface Agent (CEO)', util: 45, tasks: 2, time: '2m ago', bottleneck: false, icon: Bot, isInterface: true, desc: 'Central orchestration agent responsible for routing tasks to other specialized agents.' },
  { id: 2, name: 'Scribe', role: 'Content Gen (CMO)', util: 20, tasks: 1, time: '1h ago', bottleneck: false, icon: LineChart, desc: 'Generates marketing copy, LinkedIn posts, and content strategy.' },
  { id: 3, name: 'Vigil', role: 'Security Ops (CTO)', util: 85, tasks: 12, time: '1m ago', bottleneck: true, icon: ShieldAlert, desc: 'Continuously monitors architecture and executes security audits on endpoints.' },
  { id: 4, name: 'Ledger', role: 'Finance Ops (CFO)', util: 10, tasks: 0, time: '4h ago', bottleneck: false, icon: Calculator, desc: 'Handles invoice generation, expense processing, and financial projections.' },
  { id: 5, name: 'Orion', role: 'Delivery Ops (COO)', util: 60, tasks: 5, time: '15m ago', bottleneck: false, icon: Briefcase, desc: 'Project execution, task assignment, and resource allocation.' },
  { id: 6, name: 'Justitia', role: 'Legal & Compliance (CLO)', util: 5, tasks: 0, time: '2d ago', bottleneck: false, icon: Scale, desc: 'Drafts DPAs, SLAs, and reviews compliance documentation.' },
  { id: 7, name: 'Nexus', role: 'System Infra (CIO)', util: 30, tasks: 2, time: '5m ago', bottleneck: false, icon: Settings, desc: 'Manages API keys, database backups, and internal network stability.' },
];

export default function AgentWorkload() {
  const [selectedAgent, setSelectedAgent] = useState<typeof AGENTS[0] | null>(null);

  return (
    <div className="flex flex-col h-full space-y-6 max-w-5xl mx-auto">
      
      {/* Drawer: Agent Details */}
      <Drawer
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        title="Agent Details"
      >
        {selectedAgent && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4 border-b border-border-default pb-6">
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                selectedAgent.isInterface ? "bg-accent-primary text-white shadow-accent-primary/50" : "bg-bg-elevated border border-border-default text-text-secondary"
              )}>
                <selectedAgent.icon size={32} />
              </div>
              <div>
                <h2 className="font-display font-bold text-2xl text-white">{selectedAgent.name}</h2>
                <div className="text-sm font-medium text-text-secondary">{selectedAgent.role}</div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h3>
              <p className="text-sm text-white bg-bg-elevated p-4 rounded-lg border border-border-default">{selectedAgent.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Utilization</div>
                 <div className={cn("font-display text-2xl font-bold", selectedAgent.bottleneck ? "text-status-danger" : "text-white")}>
                   {selectedAgent.util}%
                 </div>
               </div>
               <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Active Tasks</div>
                 <div className="font-display text-2xl font-bold text-white">
                   {selectedAgent.tasks}
                 </div>
               </div>
            </div>

            {selectedAgent.bottleneck && (
              <div className="bg-status-danger/10 border border-status-danger/20 rounded-lg p-4 flex items-start gap-3">
                 <AlertTriangle size={16} className="text-status-danger shrink-0 mt-0.5" />
                 <div>
                   <div className="text-sm font-bold text-status-danger mb-1">Bottleneck Warning</div>
                   <div className="text-xs text-status-danger/80">This agent is approaching its rate limit due to high concurrency. Consider queuing non-essential tasks.</div>
                 </div>
              </div>
            )}

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Execution Logs</h4>
              <button className="w-full bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                 View Stream
              </button>
            </div>
          </div>
        )}
      </Drawer>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-surface border border-border-default rounded-xl p-5 shrink-0">
        <div>
          <h2 className="font-display font-bold text-xl text-white mb-1">Agent Workload Command</h2>
          <p className="text-sm text-text-secondary">Real-time status and throughput of the TDH AI workforce.</p>
        </div>
        <div className="flex gap-4">
           <div className="text-center">
             <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Active Agents</div>
             <div className="font-display font-bold text-lg text-white">7 / 7</div>
           </div>
           <div className="w-px bg-border-default" />
           <div className="text-center">
             <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Total Tasks</div>
             <div className="font-display font-bold text-lg text-white">22</div>
           </div>
        </div>
      </div>

      {/* AGENT BOARD */}
      <div className="flex flex-col gap-3">
        {AGENTS.map((agent) => {
          const Icon = agent.icon;
          return (
            <div 
              key={agent.id} 
              onClick={() => setSelectedAgent(agent)}
              className={cn(
                "bg-bg-surface border rounded-xl overflow-hidden transition-colors hover:border-text-muted flex items-center p-4 sm:p-5 relative group cursor-pointer",
                agent.isInterface ? "border-accent-primary/50 shadow-[0_0_20px_rgba(232,106,52,0.1)] py-6" : "border-border-default",
                agent.bottleneck && "bg-status-warning/5"
              )}
            >
              {agent.isInterface && (
                <div className="absolute top-0 right-0 overflow-hidden w-32 h-full hidden sm:block pointer-events-none">
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 opacity-5 text-accent-primary transform scale-150">
                    <Bot size={120} />
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={cn(
                "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
                agent.isInterface ? "bg-accent-primary text-white shadow-accent-primary/50" : "bg-bg-elevated border border-border-default text-text-secondary group-hover:text-white transition-colors"
              )}>
                <Icon size={agent.isInterface ? 28 : 24} />
              </div>

              {/* Name & Role */}
              <div className="ml-4 sm:ml-6 w-32 sm:w-48 shrink-0">
                <div className={cn(
                  "font-display font-bold text-white tracking-tight truncate",
                  agent.isInterface ? "text-xl" : "text-base"
                )}>
                  {agent.name}
                </div>
                <div className="text-xs text-text-muted font-medium mt-0.5 truncate">{agent.role}</div>
              </div>

              {/* Utilization Bar */}
              <div className="flex-1 min-w-0 mx-4 sm:mx-8 hidden sm:block">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Utilization</div>
                  <div className={cn("text-xs font-bold", agent.util > 80 ? "text-status-danger" : "text-white")}>{agent.util}%</div>
                </div>
                <div className="h-2.5 w-full bg-bg-base border border-border-default rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      agent.util > 80 ? "bg-status-danger" : "bg-accent-primary relative overflow-hidden"
                    )}
                    style={{ width: `${agent.util}%` }}
                  >
                     {!agent.bottleneck && agent.util > 0 && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />}
                  </div>
                </div>
              </div>

              {/* Stats & Alerts */}
              <div className="flex items-center gap-6 sm:gap-8 ml-auto shrink-0 relative z-10">
                <div className="text-center hidden sm:block">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1">Active Tasks</div>
                  <div className="text-sm font-semibold text-white">{agent.tasks}</div>
                </div>
                
                <div className="text-center sm:text-right w-16 sm:w-20">
                  <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold mb-1">Last Action</div>
                  <div className="text-xs font-medium text-text-secondary">{agent.time}</div>
                </div>

                <div className="w-10 flex justify-end">
                  {agent.bottleneck ? (
                    <div className="w-8 h-8 rounded-full bg-status-warning/20 flex items-center justify-center border border-status-warning/50 animate-pulse" title="Bottleneck Alert">
                      <AlertTriangle size={14} className="text-status-warning" />
                    </div>
                  ) : agent.tasks > 0 ? (
                    <div className="w-8 h-8 rounded-full bg-status-success/10 flex items-center justify-center border border-status-success/20" title="Active">
                       <Zap size={14} className="text-status-success fill-status-success" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center border border-border-default text-text-muted" title="Idle">
                      <div className="w-2 h-2 rounded-full bg-text-muted" />
                    </div>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
{/* custom animation classes could be handled in index.css but since it's just shimmer, tailwind allows custom config. We'll leave the class and if it doesn't run it won't break anything. */}
    </div>
  );
}
