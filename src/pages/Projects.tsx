import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Folder, Clock, CheckCircle2, AlertTriangle, Users, Plus, Target, BarChart2 } from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const PROJECTS = [
  { id: 1, name: 'VOV Website Revamp', client: 'VOV Dental', status: 'In Progress', progress: 65, tasks: 12, due: '2026-05-15', health: 'green', desc: 'Full redesign of the VOV website to increase lead conversion.' },
  { id: 2, name: 'Security Audit Q2', client: 'Virl', status: 'At Risk', progress: 30, tasks: 8, due: '2026-04-30', health: 'red', desc: 'Perform penetration testing and vulnerability assessment for the Q2 compliance requirement.' },
  { id: 3, name: 'Mashudu SEO Setup', client: 'Mashudu Dental', status: 'Planning', progress: 10, tasks: 24, due: '2026-06-01', health: 'amber', desc: 'Initial SEO setup, keyword analysis, and content planning.' },
  { id: 4, name: 'TDH Operations Manual', client: 'TDH Internal', status: 'In Progress', progress: 85, tasks: 4, due: '2026-05-05', health: 'green', desc: 'Documentation of standard operating procedures for new agents.' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isNewProjectDrawer, setIsNewProjectDrawer] = useState(false);

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title="Project Details"
      >
        {selectedProject && (
          <div className="p-6 space-y-6">
            <div>
               <div className="text-xs text-text-muted mb-1 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                 <Folder size={12}/> {selectedProject.client}
               </div>
               <h2 className="font-display font-bold text-2xl text-white">{selectedProject.name}</h2>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
              <p className="text-sm text-text-secondary">{selectedProject.desc}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-elevated border border-border-default p-4 rounded-lg">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Status</div>
                 <div className={cn(
                  "font-semibold",
                  selectedProject.health === 'green' ? "text-status-success" :
                  selectedProject.health === 'amber' ? "text-status-warning" :
                  "text-status-danger"
                 )}>{selectedProject.status}</div>
              </div>
              <div className="bg-bg-elevated border border-border-default p-4 rounded-lg">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Due Date</div>
                 <div className="font-semibold text-white">{selectedProject.due}</div>
              </div>
            </div>

             <div>
               <div className="flex justify-between items-center text-xs text-text-secondary mb-2">
                 <span className="font-semibold uppercase tracking-wider">Progress</span>
                 <span>{selectedProject.progress}%</span>
               </div>
               <div className="h-2 w-full bg-bg-base border border-border-default rounded-full overflow-hidden">
                 <div 
                   className={cn("h-full rounded-full",
                     selectedProject.health === 'green' ? "bg-status-success" :
                     selectedProject.health === 'amber' ? "bg-status-warning" :
                     "bg-status-danger"
                   )}
                   style={{ width: `${selectedProject.progress}%` }}
                 />
               </div>
             </div>

             <div className="border-t border-border-default pt-6">
               <h4 className="font-semibold text-sm mb-4 text-white">Project Actions</h4>
               <div className="space-y-2">
                 <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                   <Target size={16} /> View Tasks
                 </button>
                 <button className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                   <BarChart2 size={16} /> Generate Report
                 </button>
               </div>
             </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isNewProjectDrawer}
        onClose={() => setIsNewProjectDrawer(false)}
        title="New Project"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Project Name</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. Q3 Brand Audit" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Client</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>VOV Dental</option>
              <option>Virl</option>
              <option>Mashudu Dental</option>
              <option>TDH Internal</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description</label>
            <textarea className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary h-24 resize-none" placeholder="Project goals and scope..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Due Date</label>
            <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsNewProjectDrawer(false)}
            >
              Create Project
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
        <h2 className="font-display font-bold text-xl text-white">Active Projects</h2>
        <button 
          onClick={() => setIsNewProjectDrawer(true)}
          className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus size={14} /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map(project => (
           <div 
             key={project.id} 
             onClick={() => setSelectedProject(project)}
             className="bg-bg-surface border border-border-default rounded-xl p-5 hover:border-text-muted transition-colors group cursor-pointer"
           >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs text-text-muted mb-1 flex items-center gap-1.5"><Folder size={12}/> {project.client}</div>
                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-accent-primary transition-colors">{project.name}</h3>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                  project.health === 'green' ? "bg-status-success/10 text-status-success" :
                  project.health === 'amber' ? "bg-status-warning/10 text-status-warning" :
                  "bg-status-danger/10 text-status-danger"
                )}>
                  {project.status}
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>Progress</span>
                  <span className="font-semibold text-white">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-bg-base rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent-primary rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-default">
                 <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1"><CheckCircle2 size={12}/> {project.tasks} tasks</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {project.due}</span>
                 </div>
                 <div className="flex -space-x-2">
                   <div className="w-6 h-6 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-[10px] font-bold">PK</div>
                   <div className="w-6 h-6 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-[10px] font-bold">Vi</div>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
