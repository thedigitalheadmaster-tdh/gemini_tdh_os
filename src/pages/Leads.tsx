import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  Filter, Search, ChevronDown, MoreHorizontal, X, 
  Phone, Mail, MessageSquare, Briefcase, FileText, ChevronRight, ArrowUpDown
} from 'lucide-react';

const LEADS = [
  { id: 1, name: 'Dr Mashudu', company: 'Mashudu Dental', vertical: 'Medical', score: 85, status: 'Active', touches: 6, lastContact: '2h ago', daysSince: 0, journey: 'Proposal' },
  { id: 2, name: 'Sarah Jenkins', company: 'Finserve Partners', vertical: 'Financial', score: 62, status: 'Nurture', touches: 3, lastContact: '4d ago', daysSince: 4, journey: 'Discovery' },
  { id: 3, name: 'Jason Smith', company: 'Smith Logistics', vertical: 'General', score: 40, status: 'Cold', touches: 1, lastContact: '14d ago', daysSince: 14, journey: 'New' },
  { id: 4, name: 'Tanya Meyer', company: 'Cape Town Ortho', vertical: 'Medical', score: 92, status: 'Active', touches: 12, lastContact: '1d ago', daysSince: 1, journey: 'Negotiation' },
];

type SortConfig = { key: keyof typeof LEADS[0]; direction: 'asc' | 'desc' } | null;

export default function Leads() {
  const [selectedLead, setSelectedLead] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [verticalFilter, setVerticalFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const [isVerticalDropdownOpen, setIsVerticalDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const activeLead = LEADS.find(l => l.id === selectedLead);

  const handleSort = (key: keyof typeof LEADS[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...LEADS];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(lowerQuery) || 
        lead.company.toLowerCase().includes(lowerQuery)
      );
    }

    if (verticalFilter) {
      result = result.filter(lead => lead.vertical === verticalFilter);
    }

    if (statusFilter) {
      result = result.filter(lead => lead.status === statusFilter);
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, verticalFilter, statusFilter, sortConfig]);

  return (
    <div className="flex h-full flex-col relative w-full overflow-hidden">
      
      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0 z-30">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-bg-surface border border-border-default rounded-md pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors w-64"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsVerticalDropdownOpen(!isVerticalDropdownOpen)}
              className="flex items-center gap-2 bg-bg-surface border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
            >
              <Filter size={14} />
              <span>{verticalFilter || 'Vertical'}</span>
              <ChevronDown size={14} />
            </button>
            {isVerticalDropdownOpen && (
              <div className="absolute top-10 w-32 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
                 {['All', 'Medical', 'Financial', 'General'].map(v => (
                   <div 
                     key={v}
                     onClick={() => { setVerticalFilter(v === 'All' ? null : v); setIsVerticalDropdownOpen(false); }}
                     className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer"
                   >
                     {v}
                   </div>
                 ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center gap-2 bg-bg-surface border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
            >
              <span>{statusFilter || 'Status'}</span>
              <ChevronDown size={14} />
            </button>
             {isStatusDropdownOpen && (
              <div className="absolute top-10 w-32 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
                 {['All', 'Active', 'Nurture', 'Cold'].map(s => (
                   <div 
                     key={s}
                     onClick={() => { setStatusFilter(s === 'All' ? null : s); setIsStatusDropdownOpen(false); }}
                     className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer"
                   >
                     {s}
                   </div>
                 ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-elevated/50 text-[11px] uppercase tracking-wider text-text-muted sticky top-0 z-10 border-b border-border-default">
              <tr>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Name <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('company')}>
                  <div className="flex items-center gap-1">Company <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary">Vertical</th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('score')}>
                   <div className="flex items-center gap-1">Score <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary">Status</th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary text-right" onClick={() => handleSort('touches')}>
                  <div className="flex justify-end items-center gap-1">Touches <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary text-right" onClick={() => handleSort('daysSince')}>
                  <div className="flex justify-end items-center gap-1">Days Since <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary">Journey state</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredAndSortedLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  onClick={() => setSelectedLead(lead.id)}
                  className={cn(
                    "group cursor-pointer transition-colors relative",
                    selectedLead === lead.id ? "bg-bg-elevated/40" : "hover:bg-bg-elevated/20"
                  )}
                >
                  {/* Left border highlight on hover/active */}
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1 bg-accent-primary transition-opacity duration-200",
                    selectedLead === lead.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )} />
                  
                  <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{lead.company}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg-elevated border border-border-default text-text-muted">
                      {lead.vertical}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-display font-bold",
                      lead.score > 70 ? "text-status-success" : lead.score > 50 ? "text-status-warning" : "text-status-danger"
                    )}>{lead.score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border",
                      lead.status === 'Active' ? "bg-status-success/10 text-status-success border-status-success/20" :
                      lead.status === 'Nurture' ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                      "bg-bg-elevated text-text-muted border-border-default"
                    )}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">{lead.touches}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    <div className="flex flex-col items-end">
                      <span>{lead.daysSince}</span>
                      <span className="text-[10px] text-text-muted">{lead.lastContact}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{lead.journey}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-text-muted hover:text-white p-1 rounded hover:bg-bg-elevated opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DRAWER */}
      <div className={cn(
        "absolute top-0 right-0 bottom-0 w-full sm:w-[450px] bg-bg-base border-l border-border-default shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out z-20 flex flex-col",
        selectedLead ? "translate-x-0" : "translate-x-full"
      )}>
        {activeLead && (
          <>
            {/* Drawer Header */}
            <div className="p-5 border-b border-border-default flex items-start justify-between bg-bg-surface shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="font-display font-bold text-xl text-white">{activeLead.name}</h2>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold border",
                    activeLead.score > 70 ? "bg-status-success/20 text-status-success border-status-success/30" : 
                    activeLead.score > 50 ? "bg-status-warning/20 text-status-warning border-status-warning/30" : 
                    "bg-status-danger/20 text-status-danger border-status-danger/30"
                  )}>
                    {activeLead.score} Score
                  </span>
                </div>
                <div className="text-sm text-text-secondary mb-3">{activeLead.company}</div>
                <div className="flex gap-2">
                  <span className="text-[10px] uppercase font-semibold text-text-muted border border-border-default rounded px-1.5 py-0.5">
                    Stage: {activeLead.journey}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-bg-elevated text-text-muted hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Opportunities Card */}
              {activeLead.journey !== 'New' && (
                <div className="border border-accent-primary/30 bg-accent-primary/5 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-accent-primary" />
                      <h3 className="font-semibold text-sm text-white">Active Opportunity</h3>
                    </div>
                    <span className="text-accent-primary font-display font-bold text-lg">R135,500</span>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Stage: Proposal</span>
                    <span>Probability: 40%</span>
                  </div>
                </div>
              )}

              {/* Audit Summary */}
              {activeLead.vertical === 'Medical' && (
                <div className="border border-border-default bg-bg-surface rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={16} className="text-text-muted" />
                    <h3 className="font-semibold text-sm text-white">Audit Submission</h3>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Detected Revenue Leak:</span>
                      <span className="text-status-danger font-medium">R45,000 / mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Recommended Pack:</span>
                      <span className="text-white">Growth OS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="font-semibold text-sm text-white mb-4 uppercase tracking-wider text-[11px] text-text-muted">Interaction History</h3>
                <div className="space-y-4">
                  
                  <div className="flex gap-4 relative">
                    <div className="absolute left-[11px] top-6 bottom-[-16px] w-[2px] bg-border-default" />
                    <div className="w-6 h-6 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center shrink-0 border border-accent-primary/30 z-10 relative">
                      <Mail size={10} />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">2 hours ago • Automated</div>
                      <div className="text-sm text-white font-medium">Email Reply Received</div>
                      <div className="text-xs text-text-secondary mt-1 max-w-[280px]">"Thanks PK, the proposal looks solid. Let's discuss timelines next week."</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 relative">
                     <div className="absolute left-[11px] top-6 bottom-[-16px] w-[2px] bg-border-default" />
                    <div className="w-6 h-6 rounded-full bg-bg-elevated text-text-muted flex items-center justify-center shrink-0 border border-border-default z-10 relative">
                      <Phone size={10} />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">4 days ago • PK</div>
                      <div className="text-sm text-white font-medium">Discovery Call</div>
                      <div className="text-xs text-text-secondary mt-1 max-w-[280px]">Discussed operational bottlenecks. Major issues in patient onboarding flow. Agreed to send proposal.</div>
                    </div>
                  </div>

                  <div className="flex gap-4 relative">
                    <div className="w-6 h-6 rounded-full bg-bg-elevated text-text-muted flex items-center justify-center shrink-0 border border-border-default z-10 relative">
                      <MessageSquare size={10} />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">12 days ago • Automated</div>
                      <div className="text-sm text-white font-medium">WhatsApp Opt-in</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-5 border-t border-border-default bg-bg-surface shrink-0 flex gap-3">
              <button className="flex-1 bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold py-2 rounded-md transition-colors text-sm">
                Log Activity
              </button>
              <button className="flex-1 bg-bg-elevated hover:bg-bg-elevated/80 border border-border-default text-white font-semibold py-2 rounded-md transition-colors text-sm">
                Convert to Client
              </button>
              <button className="p-2 bg-bg-elevated hover:bg-bg-elevated/80 border border-border-default rounded-md text-text-muted transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
