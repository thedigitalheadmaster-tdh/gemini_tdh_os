import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  CheckCircle2, Circle, Clock, Filter, ListFilter, Plus, AlertCircle, Calendar as CalendarIcon, User as UserIcon, ChevronDown
} from 'lucide-react';
import { Modal } from '@/components/Modal';

const TASKS = [
  { id: 1, title: 'Sign DPA with VOV Dental', project: 'VOV Compliance', priority: 'critical', due: '2026-04-29', assignee: 'PK', status: 'todo', overdue: true, description: 'Client requires DPA before we can start data processing.' },
  { id: 2, title: 'Patch unauthenticated API endpoint', project: 'Virl Core', priority: 'critical', due: '2026-04-30', assignee: 'Vigil', status: 'in_progress', overdue: false, description: 'Critical vulnerability detected by Vigil on /api/v1/status' },
  { id: 3, title: 'Update IP Attribution Agreement', project: 'Internal Legal', priority: 'critical', due: '2026-05-02', assignee: 'PK', status: 'todo', overdue: false, description: 'Review the latest clauses from legal counsel.' },
  { id: 4, title: 'Prepare Proposal for Dr Mashudu', project: 'Lead: Dr Mashudu', priority: 'high', due: '2026-05-01', assignee: 'PK', status: 'todo', overdue: false, description: 'Prepare $135k proposal based on discovery call.' },
  { id: 5, title: 'Fix Virl monitoring alert', project: 'Virl Maintenance', priority: 'high', due: '2026-05-01', assignee: 'Vigil', status: 'todo', overdue: false, description: 'Monitoring streams are reporting offline.' },
  { id: 6, title: 'Draft content for TDH LinkedIn', project: 'TDH Organic', priority: 'medium', due: '2026-05-05', assignee: 'Scribe', status: 'todo', overdue: false, description: 'Batch 3 of standard linkedin content.' },
  { id: 7, title: 'Weekly sync with Pezeze', project: 'Internal', priority: 'medium', due: '2026-05-07', assignee: 'PK', status: 'todo', overdue: false, description: 'Sync workload and evaluate bottleneck.' },
  { id: 8, title: 'Update GBP for TDH', project: 'TDH Organic', priority: 'low', due: '2026-05-15', assignee: 'Scribe', status: 'todo', overdue: false, description: 'Ensure opening hours are correct for holiday.' },
];

export default function Tasks() {
  const [view, setView] = useState<'Priority' | 'Project' | 'All'>('Priority');
  const [selectedTask, setSelectedTask] = useState<typeof TASKS[0] | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const priorities = [
    { key: 'critical', label: 'Critical', color: 'bg-status-danger' },
    { key: 'high', label: 'High', color: 'bg-status-warning' },
    { key: 'medium', label: 'Medium', color: 'bg-status-info' },
    { key: 'low', label: 'Low', color: 'bg-status-gray' },
  ];

  // Helper to format date relative to today 
  const formatDue = (dateStr: string, overdue: boolean) => {
    if (overdue) return 'Overdue';
    if (dateStr === '2026-04-30') return 'Today';
    if (dateStr === '2026-05-01') return 'Tomorrow';
    return dateStr;
  }

  const filteredTasks = useMemo(() => {
    if (!assigneeFilter) return TASKS;
    return TASKS.filter(t => t.assignee === assigneeFilter);
  }, [assigneeFilter]);

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Modal: Task Details */}
      <Modal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        title="Task Details"
        footer={(
          <div className="flex gap-3 justify-end">
             <button 
              className="px-4 py-2 text-sm bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md transition-colors"
            >
              Edit
            </button>
            <button className="px-4 py-2 text-sm bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md transition-colors">
              Complete Task
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
                  selectedTask.priority === 'medium' ? "bg-status-info/20 text-status-info" :
                  "bg-bg-elevated text-text-muted"
                )}>
                  {selectedTask.priority}
                </span>
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded">
                  {selectedTask.project}
                </span>
            </div>
            
            <h3 className="font-display text-xl text-white font-semibold">{selectedTask.title}</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary">
              <div className="bg-bg-elevated p-3 rounded border border-border-default">
                <div className="text-[10px] text-text-muted uppercase mb-1">Due Date</div>
                <div className={cn("font-medium", selectedTask.overdue ? "text-status-danger" : "text-white")}>
                  {selectedTask.due} {selectedTask.overdue && '(Overdue)'}
                </div>
              </div>
               <div className="bg-bg-elevated p-3 rounded border border-border-default">
                <div className="text-[10px] text-text-muted uppercase mb-1">Assignee</div>
                <div className="font-medium text-white">{selectedTask.assignee}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default">
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-text-secondary leading-relaxed">{selectedTask.description}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: New Task */}
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        title="Create Task"
        footer={(
           <div className="flex gap-3 justify-end">
            <button 
              onClick={() => setIsNewTaskModalOpen(false)}
              className="px-4 py-2 text-sm text-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsNewTaskModalOpen(false)}
              className="px-4 py-2 text-sm bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md transition-colors"
            >
              Create
            </button>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Task Title</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="What needs to be done?" />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Project</label>
              <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="Select project" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Priority</label>
              <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Due Date</label>
            <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Assignee</label>
             <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
                <option value="PK">PK</option>
                <option value="Vigil">Vigil (Security Ops)</option>
                <option value="Scribe">Scribe (Content)</option>
                <option value="Pezeze">Pezeze (CEO)</option>
              </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description</label>
            <textarea className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary h-24 resize-none" placeholder="Add more details..." />
          </div>
        </div>
      </Modal>

      {/* HEADER CONTROLS */}
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
           <div className="bg-bg-surface border border-border-default rounded-md flex p-1">
             {['Priority', 'Project', 'All'].map(v => (
               <button 
                key={v}
                onClick={() => setView(v as any)}
                className={cn("px-3 py-1.5 rounded text-sm text-text-muted hover:text-white transition-colors", view === v && "bg-bg-elevated text-accent-primary font-semibold")}
              >
                {v}
              </button>
             ))}
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="flex items-center gap-2 bg-bg-surface border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
            >
              <Filter size={14} /> {assigneeFilter ? `Assignee: ${assigneeFilter}` : 'Filter'} <ChevronDown size={14} />
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute top-10 w-36 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
                 {['All', 'PK', 'Vigil', 'Scribe'].map(v => (
                   <div 
                     key={v}
                     onClick={() => { setAssigneeFilter(v === 'All' ? null : v); setIsFilterDropdownOpen(false); }}
                     className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer capitalize"
                   >
                     {v}
                   </div>
                 ))}
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus size={14} />
          New Task
        </button>
      </div>

      {/* TASKS LIST BY PRIORITY */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-8 no-scrollbar pb-6">
        {priorities.map(priority => {
           // Auto-float overdue tasks to the top of their section
           const sectionTasks = filteredTasks.filter(t => t.priority === priority.key)
                                     .sort((a,b) => (a.overdue === b.overdue) ? 0 : a.overdue ? -1 : 1);
           
           if (sectionTasks.length === 0) return null;

           return (
             <div key={priority.key} className="space-y-3">
               <div className="flex items-center gap-2 pb-2 border-b border-border-default">
                 <div className={cn("w-2.5 h-2.5 rounded-full", priority.color)} />
                 <h3 className="font-display font-semibold text-lg text-white">{priority.label}</h3>
                 <span className="bg-bg-surface px-2 py-0.5 rounded-full text-xs text-text-muted font-bold ml-2">{sectionTasks.length}</span>
               </div>
               
               <div className="space-y-2">
                 {sectionTasks.map(task => (
                   <div 
                    key={task.id} 
                    onClick={() => setSelectedTask(task)}
                    className={cn(
                      "bg-bg-surface border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-colors group cursor-pointer",
                      task.overdue ? "border-status-danger/50 bg-status-danger/5 hover:border-status-danger" : "border-border-default hover:border-text-muted"
                    )}
                   >
                      <button className="text-text-muted hover:text-accent-primary shrink-0 transition-colors hidden sm:block">
                        <Circle size={20} />
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <button className="text-text-muted hover:text-accent-primary shrink-0 transition-colors sm:hidden">
                            <Circle size={16} />
                          </button>
                          <h4 className={cn("text-sm font-semibold truncate", task.overdue ? "text-status-danger" : "text-white")}>{task.title}</h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                          <span className="font-medium bg-bg-elevated px-2 py-0.5 rounded text-text-muted">{task.project}</span>
                          <span className={cn(
                            "flex items-center gap-1",
                            task.overdue ? "text-status-danger font-semibold" : ""
                          )}>
                            <CalendarIcon size={12} />
                            {formatDue(task.due, task.overdue)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 bg-bg-base sm:bg-transparent rounded px-3 py-2 sm:p-0">
                         <div className="flex items-center gap-2 text-xs">
                           <span className={cn(
                              "px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px]",
                              task.status === 'in_progress' ? "bg-status-warning/10 text-status-warning" : "bg-bg-elevated text-text-muted"
                           )}>
                             {task.status.replace('_', ' ')}
                           </span>
                         </div>
                         <div className="w-6 h-6 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-sm" title={`Assignee: ${task.assignee}`}>
                           {task.assignee === 'PK' ? 'PK' : <BotIcon name={task.assignee} />}
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
           );
        })}
      </div>

    </div>
  );
}

function BotIcon({ name }: { name: string }) {
  if (name === 'Vigil') return <AlertCircle size={12} className="text-status-warning" />;
  if (name === 'Scribe') return <ListFilter size={12} className="text-status-info" />;
  return <UserIcon size={12} />;
}
