import React, { useState } from 'react';
import { 
  ArrowUpRight, AlertCircle, CheckCircle2, Clock, 
  BarChart3, Activity, ShieldAlert, Cpu, Calendar, User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Modal } from '@/components/Modal';

const KPIS = [
  { label: 'TOTAL REVENUE (YTD)', value: 'R29,528' },
  { label: 'MONTHLY RETAINER', value: 'R5,000' },
  { label: 'OPEN PIPELINE', value: 'R135,500' },
  { label: 'WEIGHTED PIPELINE', value: 'R54,200' },
  { label: 'OPEN TASKS', value: '18', badge: '3 Critical' },
  { label: 'OUTSTANDING INV', value: 'R0', isGood: true },
];

const TASKS = [
  { id: 1, priority: 'critical', title: 'Sign DPA with VOV Dental', project: 'VOV Compliance', due: 'Today', description: 'The DPA needs to be signed to proceed with the audit process.', assignee: 'PK' },
  { id: 2, priority: 'high', title: 'Prepare Proposal for Dr Mashudu', project: 'Lead: Dr Mashudu', due: 'Tomorrow', description: 'Draft the growth proposal based on our discovery call.', assignee: 'PK' },
  { id: 3, priority: 'high', title: 'Fix Virl monitoring alert', project: 'Virl Maintenance', due: 'Tomorrow', description: 'Vigil detected a monitoring disconnect on Virl primary cluster.', assignee: 'Vigil' },
  { id: 4, priority: 'medium', title: 'Draft content for TDH LinkedIn', project: 'TDH Organic', due: 'Friday', description: 'Create week 3 content batch.', assignee: 'Scribe' },
  { id: 5, priority: 'medium', title: 'Weekly sync with Pezeze', project: 'Internal', due: 'Next Week', description: 'Review system performance and agent workloads.', assignee: 'Pezeze' },
];

const CLIENTS = [
  { name: 'VOV Dental', status: 'amber', score: 72, flag: 'DPA unsigned' },
  { name: 'Virl', status: 'red', score: 45, flag: 'No monitoring data' },
  { name: 'TDH Internal', status: 'green', score: 98, flag: 'All clear' },
];

const AGENTS = [
  { name: 'Pezeze', role: 'Interface Agent', util: 45, tasks: 2, time: '2m ago' },
  { name: 'Vigil', role: 'Security Ops', util: 85, tasks: 12, time: '1m ago', bottleneck: true },
  { name: 'Scribe', role: 'Content Gen', util: 20, tasks: 1, time: '1h ago' },
  { name: 'Ledger', role: 'Finance Ops', util: 10, tasks: 0, time: '4h ago' },
];

const REVENUE_DATA = [
  { name: 'Jan', confirmed: 4000, forecast: 0 },
  { name: 'Feb', confirmed: 5000, forecast: 0 },
  { name: 'Mar', confirmed: 12000, forecast: 0 },
  { name: 'Apr', confirmed: 8528, forecast: 5000 },
  { name: 'May', confirmed: 0, forecast: 14000 },
  { name: 'Jun', confirmed: 0, forecast: 22000 },
];

const PIPELINE_STAGES = [
  { name: 'Discovery', count: 2, value: 'R45,000', width: '20%' },
  { name: 'Proposal', count: 1, value: 'R135,500', width: '60%', activeLead: 'Dr Mashudu' },
  { name: 'Negotiation', count: 0, value: 'R0', width: '5%' },
  { name: 'Won (MTD)', count: 1, value: 'R8,528', width: '15%' },
];

function Card({ children, className, noPadding = false }: { children: React.ReactNode, className?: string, noPadding?: boolean, key?: React.Key }) {
  return (
    <div className={cn("bg-bg-surface border border-border-default rounded-xl hover:border-border-hover hover:shadow-[0_0_15px_rgba(232,106,52,0.05)] transition-all overflow-hidden flex flex-col", className)}>
      <div className={cn("flex-1", !noPadding && "p-5")}>
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<typeof TASKS[0] | null>(null);

  return (
    <div className="space-y-6">
      
      {/* Modal for viewing task details */}
      <Modal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        title="Task Details"
        footer={(
          <div className="flex gap-3 justify-end">
            <button 
              className="px-4 py-2 text-sm text-text-muted hover:text-white transition-colors"
              onClick={() => setSelectedTask(null)}
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md transition-colors">
              Mark Complete
            </button>
          </div>
        )}
      >
        {selectedTask && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn(
                "px-2 py-0.5 rounded text-[10px] uppercase font-bold",
                selectedTask.priority === 'critical' ? "bg-status-danger/20 text-status-danger" :
                selectedTask.priority === 'high' ? "bg-status-warning/20 text-status-warning" :
                "bg-status-info/20 text-status-info"
              )}>
                {selectedTask.priority}
              </span>
              <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded">
                Project: {selectedTask.project}
              </span>
            </div>
            
            <h3 className="font-display text-xl text-white font-semibold">{selectedTask.title}</h3>
            
            <div className="flex gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-1.5"><Calendar size={14} /> Due: {selectedTask.due}</div>
              <div className="flex items-center gap-1.5"><User size={14} /> Assignee: {selectedTask.assignee}</div>
            </div>
            
            <div className="pt-4 border-t border-border-default">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{selectedTask.description}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* KPI STRIP */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x">
        {KPIS.map((kpi, idx) => (
          <Card key={idx} className="min-w-[180px] shrink-0 snap-start bg-bg-elevated cursor-pointer group">
            <div className="flex flex-col h-full justify-between">
              <div className="text-[10px] uppercase font-semibold text-text-muted mb-2 group-hover:text-text-secondary transition-colors line-clamp-1">{kpi.label}</div>
              <div className="flex items-baseline justify-between">
                <div className={cn(
                  "font-display text-2xl font-bold tracking-tight",
                  kpi.isGood === true ? "text-status-success" : "text-white"
                )}>{kpi.value}</div>
                {kpi.badge && (
                  <span className="text-[9px] bg-status-danger/20 text-status-danger px-1.5 py-0.5 rounded-full font-semibold border border-status-danger/30">
                    {kpi.badge}
                  </span>
                )}
              </div>
              <div className="mt-4 h-0.5 w-8 bg-border-default group-hover:bg-accent-primary group-hover:w-full transition-all duration-300" />
            </div>
          </Card>
        ))}
      </div>

      {/* 3-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COL: Tasks + Leads (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm">Action Feed</h3>
              <ArrowUpRight size={14} className="text-text-muted cursor-pointer hover:text-white" />
            </div>
            
            <div className="space-y-3">
              {TASKS.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => setSelectedTask(task)}
                  className="flex items-start gap-3 p-3 rounded-lg bg-bg-base border border-border-default hover:border-text-muted transition-colors cursor-pointer group"
                >
                  <div className="mt-0.5 shrink-0">
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full ring-2 ring-bg-base",
                      task.priority === 'critical' ? "bg-status-danger mt-[3px]" :
                      task.priority === 'high' ? "bg-status-warning mt-[3px]" :
                      "bg-status-info mt-[3px]"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors leading-tight mb-1">{task.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-text-muted truncate mr-2">{task.project}</span>
                      <span className={cn(
                        "text-[10px] font-semibold",
                        task.due === 'Today' ? "text-status-danger" : "text-text-secondary"
                      )}>{task.due}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <span className="text-xs text-accent-primary hover:underline cursor-pointer font-medium">View all 18 tasks</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm">Recent Lead Activity</h3>
              <Activity size={14} className="text-text-muted" />
            </div>
            <div className="space-y-4">
              <div className="relative pl-4 border-l border-border-default">
                <div className="absolute w-2 h-2 bg-accent-primary rounded-full -left-[5px] top-1.5" />
                <div className="text-xs text-text-muted mb-0.5">2 hours ago</div>
                <div className="text-sm text-white font-medium">Dr Mashudu replied to email</div>
                <div className="text-xs text-text-secondary mt-1 line-clamp-2">"Thanks PK, the proposal looks solid. Let's discuss timelines next week."</div>
              </div>
              <div className="relative pl-4 border-l border-border-default">
                <div className="absolute w-2 h-2 bg-bg-elevated border border-text-muted rounded-full -left-[5px] top-1.5" />
                <div className="text-xs text-text-muted mb-0.5">Yesterday</div>
                <div className="text-sm text-text-secondary font-medium">Audit report generated for Virl</div>
              </div>
            </div>
          </Card>
        </div>

        {/* CENTER COL: Funnel + Revenue (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-sm">Pipeline Structure</h3>
            </div>
            
            <div className="space-y-4">
              {PIPELINE_STAGES.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-text-secondary font-medium uppercase tracking-wider">{stage.name} <span className="text-text-muted font-normal">({stage.count})</span></span>
                    <span className="text-white font-semibold">{stage.value}</span>
                  </div>
                  <div className="h-2 w-full bg-bg-base border border-border-default rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full", stage.count > 0 ? "bg-accent-primary" : "bg-bg-elevated")} 
                      style={{ width: stage.width }} 
                    />
                  </div>
                  {stage.activeLead && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-status-success" />
                      <span className="text-[10px] text-text-muted">Includes <strong className="text-text-secondary">{stage.activeLead}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-sm">Revenue Trajectory</h3>
              <select className="bg-bg-base border border-border-default text-[10px] text-text-muted rounded px-2 py-1 outline-none">
                <option>Trailing 6 Months</option>
              </select>
            </div>
            <div className="h-[200px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#8896b0', fontSize: 10 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#8896b0', fontSize: 10 }}
                    tickFormatter={(val) => val === 0 ? '0' : `${val/1000}k`}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ backgroundColor: '#1a2540', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="confirmed" fill="#E86A34" radius={[2, 2, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="forecast" fill="transparent" stroke="#8896b0" strokeDasharray="2 2" radius={[2, 2, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4 justify-center text-[10px] text-text-muted uppercase tracking-wider">
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-accent-primary rounded-sm"/> Confirmed</div>
               <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 border border-text-muted border-dashed rounded-sm"/> Forecast</div>
            </div>
          </Card>
        </div>

        {/* RIGHT COL: Health + Agents (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm">Client Health Overview</h3>
              <ShieldAlert size={14} className="text-text-muted" />
            </div>
            <div className="space-y-3">
              {CLIENTS.map((client, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bg-base border border-border-default flex items-center justify-between group cursor-pointer hover:border-text-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs ring-2 ring-bg-surface",
                      client.status === 'red' ? "bg-status-danger/20 text-status-danger ring-status-danger/30" :
                      client.status === 'amber' ? "bg-status-warning/20 text-status-warning ring-status-warning/30" :
                      "bg-status-success/20 text-status-success ring-status-success/30"
                    )}>
                      {client.score}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{client.name}</div>
                      <div className="text-[10px] mt-0.5 text-text-muted flex items-center gap-1.5">
                        {client.status !== 'green' && <AlertCircle size={10} className={client.status === 'red' ? "text-status-danger" : "text-status-warning"} />}
                        {client.status === 'green' && <CheckCircle2 size={10} className="text-status-success" />}
                        {client.flag}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm">Agent Workforce</h3>
              <Cpu size={14} className="text-text-muted" />
            </div>
            <div className="space-y-0 text-sm">
              {AGENTS.map((agent, idx) => (
                <div key={idx} className="flex items-center py-2.5 border-b border-border-default last:border-0 hover:bg-bg-elevated -mx-2 px-2 rounded-md transition-colors group cursor-pointer">
                  <div className="w-6 text-text-muted group-hover:text-white transition-colors">
                    {/* Placeholder for specific icons if needed, using a generic bot for now */}
                    <BotIcon role={agent.role} />
                  </div>
                  <div className="flex-1 min-w-0 ml-2">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-medium text-white text-xs mr-2 truncate">{agent.name}</span>
                      <span className="text-[9px] text-text-muted whitespace-nowrap">{agent.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-bg-base rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", agent.util > 80 ? "bg-status-danger" : "bg-accent-primary")} 
                          style={{ width: `${agent.util}%` }} 
                        />
                      </div>
                      <span className="text-[10px] text-text-muted w-4 text-right">{agent.tasks}</span>
                    </div>
                  </div>
                  {agent.bottleneck && (
                    <div className="ml-3 shrink-0">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-status-warning/20 border border-status-warning/50" title="Bottleneck Alert">
                        <AlertCircle size={12} className="text-status-warning" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}

// Simple icon selector for agents
function BotIcon({ role }: { role: string }) {
  // Return different SVG strokes based on role text just as a visual cue
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      {role.includes('Security') ? (
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      ) : role.includes('Interface') ? (
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      ) : role.includes('Content') ? (
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
      ) : (
        <circle cx="12" cy="12" r="10" />
      )}
    </svg>
  );
}
