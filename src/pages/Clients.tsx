import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  Building2, Activity, ShieldCheck, ShieldAlert, Folder, Receipt, Users, ArrowUpRight, Search, Filter, ChevronDown
} from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const CLIENTS = [
  { 
    id: 1, name: 'VOV Dental', industry: 'Medical', health: 'amber', score: 72, 
    mrr: 5000, totalRev: 65000, projects: 2, tasks: 14, 
    flags: { dpa: false, sla: true },
    description: 'Specialist dental practice focused on high-end cosmetic procedures.'
  },
  { 
    id: 2, name: 'Virl', industry: 'Tech', health: 'red', score: 45, 
    mrr: 0, totalRev: 12500, projects: 1, tasks: 3, 
    flags: { dpa: true, sla: false },
    description: 'SaaS monitoring platform. Currently missing active event streams.'
  },
  { 
    id: 3, name: 'TDH Internal', industry: 'Internal', health: 'green', score: 98, 
    mrr: 0, totalRev: 0, projects: 4, tasks: 22, 
    flags: { dpa: true, sla: true },
    description: 'Internal operations, agent infrastructure, and product development.'
  },
];

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<typeof CLIENTS[0] | null>(null);
  const [isNewClientDrawer, setIsNewClientDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthFilter, setHealthFilter] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const formatCurrency = (val: number) => `R${val.toLocaleString()}`;

  const filteredClients = useMemo(() => {
    let result = [...CLIENTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q));
    }

    if (healthFilter) {
      result = result.filter(c => c.health === healthFilter);
    }

    return result;
  }, [searchQuery, healthFilter]);

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Drawer: Client Details */}
      <Drawer
        isOpen={!!selectedClient}
        onClose={() => setSelectedClient(null)}
        title="Client Profile"
      >
        {selectedClient && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-1">{selectedClient.name}</h2>
              <p className="text-sm text-text-secondary">{selectedClient.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-elevated p-4 rounded-lg border border-border-default">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Health Score</div>
                <div className={cn(
                  "font-display text-2xl font-bold",
                  selectedClient.health === 'green' ? "text-status-success" :
                  selectedClient.health === 'amber' ? "text-status-warning" : "text-status-danger"
                )}>
                  {selectedClient.score}
                </div>
              </div>
              <div className="bg-bg-elevated p-4 rounded-lg border border-border-default">
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Total Revenue</div>
                <div className="font-display text-2xl font-bold text-white">
                  {formatCurrency(selectedClient.totalRev)}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 border-b border-border-default pb-2 text-white">Compliance Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Data Processing Agreement</span>
                  {selectedClient.flags.dpa ? (
                    <span className="flex items-center gap-1.5 text-xs text-status-success font-semibold px-2 py-1 bg-status-success/10 rounded">
                      Signed <ShieldCheck size={14} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-status-danger font-semibold px-2 py-1 bg-status-danger/10 rounded">
                      Missing <ShieldAlert size={14} />
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Service Level Agreement</span>
                  {selectedClient.flags.sla ? (
                    <span className="flex items-center gap-1.5 text-xs text-status-success font-semibold px-2 py-1 bg-status-success/10 rounded">
                      Active <ShieldCheck size={14} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-status-warning font-semibold px-2 py-1 bg-status-warning/10 rounded">
                      Pending <ShieldAlert size={14} />
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2 text-sm font-semibold transition-colors">
                  Create Project
                </button>
                <button className="w-full bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Drawer: New Client */}
      <Drawer
        isOpen={isNewClientDrawer}
        onClose={() => setIsNewClientDrawer(false)}
        title="Add New Client"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Client Name</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="Company Name" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Industry</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. Finance, Tech" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description</label>
            <textarea className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary h-24 resize-none" placeholder="Brief overview of the client..." />
          </div>
          
          <div className="pt-6">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2 text-sm font-semibold transition-colors"
              onClick={() => setIsNewClientDrawer(false)}
            >
              Add Client
            </button>
          </div>
        </div>
      </Drawer>

      {/* FILTER BAR  */}
      <div className="flex justify-between items-center bg-bg-surface p-3 rounded-lg border border-border-default shrink-0 z-10 w-full mb-6 relative">
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search clients or industry..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-bg-base border border-border-default rounded-md pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors w-full"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-bg-base border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
          >
             <Filter size={14} /> 
             <span className="capitalize">{healthFilter === 'green' ? 'Healthy' : healthFilter === 'amber' ? 'At Risk' : healthFilter === 'red' ? 'Critical' : 'All Health'}</span> 
             <ChevronDown size={14} />
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 top-10 w-36 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
               {[
                 { label: 'All Health', val: null }, 
                 { label: 'Healthy', val: 'green' }, 
                 { label: 'At Risk', val: 'amber' }, 
                 { label: 'Critical', val: 'red' }
               ].map(f => (
                 <div 
                   key={f.label}
                   onClick={() => { setHealthFilter(f.val); setIsFilterOpen(false); }}
                   className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer"
                 >
                   {f.label}
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map(client => (
          <div 
            key={client.id} 
            className="bg-bg-surface border border-border-default rounded-xl overflow-hidden hover:border-text-muted transition-colors flex flex-col group relative cursor-pointer"
            onClick={() => setSelectedClient(client)}
          >
            {/* Header */}
            <div className="p-5 border-b border-border-default flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-display font-bold text-lg text-white">{client.name}</h3>
                  <span className="text-[10px] bg-bg-elevated border border-border-default px-1.5 py-0.5 rounded text-text-muted font-semibold uppercase">{client.industry}</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2">{client.description}</p>
              </div>
              <div className="shrink-0 ml-4 relative">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-display font-bold ring-4",
                  client.health === 'green' ? "bg-status-success/20 text-status-success ring-status-success/10" :
                  client.health === 'amber' ? "bg-status-warning/20 text-status-warning ring-status-warning/10" :
                  "bg-status-danger/20 text-status-danger ring-status-danger/10"
                )}>
                  {client.score}
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">MRR</div>
                <div className="text-white font-semibold">{formatCurrency(client.mrr)}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Total Revenue</div>
                <div className="text-white font-semibold">{formatCurrency(client.totalRev)}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Active Projects</div>
                <div className="text-white font-semibold">{client.projects}</div>
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Open Tasks</div>
                <div className="text-white font-semibold">{client.tasks}</div>
              </div>
            </div>

            {/* Compliance Flags */}
            <div className="px-5 pb-5 flex gap-2">
              <div className={cn(
                "flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md font-semibold border",
                client.flags.dpa 
                  ? "bg-status-success/10 border-status-success/20 text-status-success" 
                  : "bg-status-danger/10 border-status-danger/20 text-status-danger"
              )}>
                {client.flags.dpa ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                DPA {client.flags.dpa ? 'Signed' : 'Missing'}
              </div>
              <div className={cn(
                "flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-md font-semibold border",
                client.flags.sla 
                  ? "bg-status-success/10 border-status-success/20 text-status-success" 
                  : "bg-status-warning/10 border-status-warning/20 text-status-warning"
              )}>
                {client.flags.sla ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                SLA {client.flags.sla ? 'Active' : 'Pending'}
              </div>
            </div>

            {/* Quick Links Footer */}
            <div className="mt-auto border-t border-border-default bg-bg-elevated/30 grid grid-cols-3 divide-x divide-border-default">
               <button className="py-2.5 flex flex-col items-center justify-center text-text-muted hover:text-white hover:bg-bg-elevated transition-colors text-xs gap-1">
                 <Folder size={14} />
                 Projects
               </button>
               <button className="py-2.5 flex flex-col items-center justify-center text-text-muted hover:text-white hover:bg-bg-elevated transition-colors text-xs gap-1">
                 <Receipt size={14} />
                 Invoices
               </button>
               <button className="py-2.5 flex flex-col items-center justify-center text-text-muted hover:text-white hover:bg-bg-elevated transition-colors text-xs gap-1">
                 <Users size={14} />
                 Contacts
               </button>
            </div>
          </div>
        ))}
        
        {/* Placeholder for adding new client */}
        <div 
          onClick={() => setIsNewClientDrawer(true)}
          className="bg-bg-base border-2 border-dashed border-border-default rounded-xl flex flex-col items-center justify-center text-text-muted hover:text-white hover:border-text-secondary transition-colors cursor-pointer min-h-[300px]"
        >
          <Building2 size={24} className="mb-2" />
          <span className="text-sm font-semibold">Add New Client</span>
        </div>

      </div>
    </div>
  );
}
