import React, { useState } from 'react';
import { AlertTriangle, Plus, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/Drawer';

const RISKS = [
  { id: 'RSK-01', title: 'Key Person Dependency (PK)', impact: 'High', likelihood: 'Medium', mitigation: 'Documenting all core processes into TDH OS. Training Scribe and Vigil to take on automated tasks.', owner: 'Pezeze', status: 'In Progress' },
  { id: 'RSK-02', title: 'Client Concentration (Healthcare)', impact: 'Medium', likelihood: 'High', mitigation: 'Diversifying into legal sector. Initiating outbound campaigns targeting professional services.', owner: 'PK', status: 'Planned' },
];

export default function RiskRegister() {
  const [selectedRisk, setSelectedRisk] = useState<typeof RISKS[0] | null>(null);
  const [isLogRiskDrawer, setIsLogRiskDrawer] = useState(false);

  return (
     <div className="flex flex-col h-full space-y-6">
       <Drawer
        isOpen={!!selectedRisk}
        onClose={() => setSelectedRisk(null)}
        title="Risk Details"
      >
        {selectedRisk && (
          <div className="p-6 space-y-6">
            <div className="flex gap-3 items-start">
               <div className={cn(
                 "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                 selectedRisk.impact === 'High' ? "bg-status-danger/10 border-status-danger/20 text-status-danger" : "bg-status-warning/10 border-status-warning/20 text-status-warning"
               )}>
                 <AlertTriangle size={24} />
               </div>
               <div>
                  <h2 className="font-display font-medium text-xl text-white leading-tight mb-2">{selectedRisk.title}</h2>
                  <div className="font-mono text-xs text-text-muted">{selectedRisk.id}</div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-bg-elevated border border-border-default p-4 rounded-lg">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Impact</div>
                 <div className={cn(
                    "font-semibold",
                    selectedRisk.impact === 'High' ? "text-status-danger" : "text-status-warning"
                 )}>{selectedRisk.impact}</div>
               </div>
               <div className="bg-bg-elevated border border-border-default p-4 rounded-lg">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Likelihood</div>
                 <div className="font-semibold text-white">{selectedRisk.likelihood}</div>
               </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-2">
                 <ShieldCheck size={14} /> Mitigation Strategy
              </h4>
              <div className="bg-bg-base border border-border-default p-3 rounded-lg text-sm text-text-secondary leading-relaxed">
                 {selectedRisk.mitigation}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Owner</div>
                 <div className="text-sm font-medium text-white">{selectedRisk.owner}</div>
              </div>
              <div>
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Status</div>
                 <div className="text-sm font-medium text-text-secondary">{selectedRisk.status}</div>
              </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <Activity size={16} /> Update Progress
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isLogRiskDrawer}
        onClose={() => setIsLogRiskDrawer(false)}
        title="Log New Risk"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Risk Title</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. AWS Data Outage" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Impact</label>
              <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Likelihood</label>
              <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Risk Owner</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="Name or Role" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Mitigation Strategy</label>
            <textarea className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary h-24 resize-none" placeholder="Steps to reduce or accept risk..." />
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsLogRiskDrawer(false)}
            >
              Add Risk
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
         <h2 className="font-display font-bold text-xl text-white">Risk Register</h2>
         <button 
           onClick={() => setIsLogRiskDrawer(true)}
           className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
         >
          <Plus size={14} /> Log Risk
        </button>
      </div>

       <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-elevated/80 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-default sticky top-0">
            <tr>
              <th className="px-4 py-3 font-semibold">Risk ID</th>
              <th className="px-4 py-3 font-semibold w-1/3">Title</th>
              <th className="px-4 py-3 font-semibold">Impact</th>
              <th className="px-4 py-3 font-semibold">Likelihood</th>
              <th className="px-4 py-3 font-semibold">Mitigation Strategy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {RISKS.map(risk => (
              <tr 
                key={risk.id} 
                onClick={() => setSelectedRisk(risk)}
                className="hover:bg-bg-elevated/40 transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3 font-mono text-[11px] text-text-secondary">{risk.id}</td>
                <td className="px-4 py-3 font-medium text-white max-w-[200px] truncate">{risk.title}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase",
                    risk.impact === 'High' ? "bg-status-danger/10 text-status-danger border-status-danger/20" :
                    "bg-status-warning/10 text-status-warning border-status-warning/20"
                  )}>
                    {risk.impact}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary">{risk.likelihood}</td>
                <td className="px-4 py-3 text-text-muted text-xs whitespace-normal max-w-sm">{risk.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    </div>
  );
}
