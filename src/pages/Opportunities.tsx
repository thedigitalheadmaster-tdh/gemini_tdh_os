import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { 
  Flame, LayoutGrid, List as ListIcon, MoreHorizontal, Clock, Plus, User, Building, DollarSign, Search, Filter, ChevronDown, ArrowUpDown
} from 'lucide-react';
import { Drawer } from '@/components/Drawer';

type Stage = 'Discovery' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

interface Opp {
  id: string;
  name: string;
  company: string;
  value: number;
  probability: number;
  daysInStage: number;
  stalled: boolean;
  stage: Stage;
}

const INITIAL_DATA: Opp[] = [
  { id: '1', name: 'Dr Mashudu', company: 'Mashudu Dental', value: 135500, probability: 40, daysInStage: 19, stalled: true, stage: 'Proposal' },
  { id: '2', name: 'Sarah Jenkins', company: 'Finserve Partners', value: 45000, probability: 20, daysInStage: 4, stalled: false, stage: 'Discovery' },
  { id: '3', name: 'Tanya Meyer', company: 'Cape Town Ortho', value: 85000, probability: 80, daysInStage: 2, stalled: false, stage: 'Negotiation' },
  { id: '4', name: 'James Doe', company: 'JD Tech', value: 25000, probability: 10, daysInStage: 1, stalled: false, stage: 'Discovery' },
];

const STAGES: Stage[] = ['Discovery', 'Proposal', 'Negotiation', 'Won', 'Lost'];

type SortConfig = { key: keyof Opp; direction: 'asc' | 'desc' } | null;

export default function Opportunities() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [opps, setOpps] = useState<Opp[]>(INITIAL_DATA);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  
  const [selectedOpp, setSelectedOpp] = useState<Opp | null>(null);
  const [isNewOppDrawerOpen, setIsNewOppDrawerOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [stalledFilter, setStalledFilter] = useState<boolean | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const formatCurrency = (val: number) => `R${val.toLocaleString()}`;

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: Stage) => {
    e.preventDefault();
    if (draggedId) {
      setOpps(prev => prev.map(o => o.id === draggedId ? { ...o, stage, daysInStage: 0 } : o));
    }
    setDraggedId(null);
  };
  
  const handleSort = (key: keyof Opp) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredOpps = useMemo(() => {
    let filtered = [...opps];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        o => o.name.toLowerCase().includes(q) || o.company.toLowerCase().includes(q)
      );
    }
    
    if (stalledFilter !== null) {
      filtered = filtered.filter(o => o.stalled === stalledFilter);
    }
    
    if (sortConfig && view === 'list') {
      filtered.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [opps, searchQuery, stalledFilter, sortConfig, view]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Drawer: Opportunity Details */}
      <Drawer 
        isOpen={!!selectedOpp} 
        onClose={() => setSelectedOpp(null)}
        title="Opportunity Details"
      >
        {selectedOpp && (
          <div className="p-6 space-y-6">
            <div>
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Company</div>
              <div className="flex items-center gap-2 text-white font-medium">
                <Building size={16} className="text-text-muted" />
                {selectedOpp.company}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Contact Name</div>
              <div className="flex items-center gap-2 text-white font-medium">
                <User size={16} className="text-text-muted" />
                {selectedOpp.name}
              </div>
            </div>
            
            <div>
              <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Deal Value</div>
              <div className="font-display text-2xl font-bold text-white">
                {formatCurrency(selectedOpp.value)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-elevated p-4 rounded-lg border border-border-default">
                <div className="text-xs text-text-muted uppercase mb-1">Stage</div>
                <div className="font-semibold text-white">{selectedOpp.stage}</div>
              </div>
              <div className="bg-bg-elevated p-4 rounded-lg border border-border-default">
                <div className="text-xs text-text-muted uppercase mb-1">Probability</div>
                <div className="font-semibold text-white">{selectedOpp.probability}%</div>
              </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4">Actions</h4>
              <div className="space-y-2">
                <button className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2 text-sm font-semibold transition-colors">
                  Edit Opportunity
                </button>
                <button className="w-full bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                  Generate Proposal
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Drawer: New Opportunity */}
      <Drawer
        isOpen={isNewOppDrawerOpen}
        onClose={() => setIsNewOppDrawerOpen(false)}
        title="New Opportunity"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Contact Name</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. John Smith" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Company</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. XYZ Corp" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Deal Value (R)</label>
            <input type="number" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. 50000" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Stage</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <div className="pt-6">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2 text-sm font-semibold transition-colors"
              onClick={() => setIsNewOppDrawerOpen(false)}
            >
              Create Opportunity
            </button>
          </div>
        </div>
      </Drawer>

      {/* HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-bg-surface border border-border-default rounded-md flex p-1">
            <button 
              onClick={() => setView('kanban')}
              className={cn("p-1.5 rounded text-text-muted hover:text-white transition-colors", view === 'kanban' && "bg-bg-elevated text-accent-primary")}
            >
              <LayoutGrid size={16} />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn("p-1.5 rounded text-text-muted hover:text-white transition-colors", view === 'list' && "bg-bg-elevated text-accent-primary")}
            >
              <ListIcon size={16} />
            </button>
          </div>
          
          <div className="relative w-64 hidden md:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search opps or companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-bg-surface border border-border-default rounded-md pl-9 pr-3 py-1.5 text-sm w-full text-white placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors"
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
              className="flex items-center gap-2 bg-bg-surface border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
            >
               <Filter size={14} /> <span>{stalledFilter === null ? 'All Status' : stalledFilter ? 'Stalled' : 'Active'}</span> <ChevronDown size={14} />
            </button>
            {isFilterDropdownOpen && (
              <div className="absolute left-0 top-10 w-40 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
                 {[
                   { label: 'All Status', val: null }, 
                   { label: 'Stalled Deals', val: true }, 
                   { label: 'Active Deals', val: false }
                 ].map(f => (
                   <div 
                     key={f.label}
                     onClick={() => { setStalledFilter(f.val); setIsFilterDropdownOpen(false); }}
                     className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer"
                   >
                     {f.label}
                   </div>
                 ))}
              </div>
            )}
          </div>
        </div>
        <button 
          onClick={() => setIsNewOppDrawerOpen(true)}
          className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus size={14} />
          New Opportunity
        </button>
      </div>

      {/* BOARD VIEW */}
      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto flex-1 no-scrollbar pb-4 items-start h-full">
          {STAGES.map(stage => {
            const stageOpps = filteredOpps.filter(o => o.stage === stage);
            const totalValue = stageOpps.reduce((sum, o) => sum + o.value, 0);

            return (
              <div 
                key={stage} 
                className="w-[300px] shrink-0 bg-bg-surface/50 rounded-xl flex flex-col max-h-full border border-transparent"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
              >
                {/* Column Header */}
                <div className="p-3 mb-2 flex items-center justify-between border-b border-border-default/50 shrink-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wider">{stage}</h3>
                    <span className="text-[10px] bg-bg-elevated text-text-muted px-1.5 py-0.5 rounded-full">{stageOpps.length}</span>
                  </div>
                  <span className="text-xs font-semibold text-text-muted">{formatCurrency(totalValue)}</span>
                </div>

                {/* Column Body */}
                <div className="flex-1 overflow-y-auto p-2 space-y-3 no-scrollbar">
                  {stageOpps.map(opp => (
                    <div 
                      key={opp.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, opp.id)}
                      onClick={() => setSelectedOpp(opp)}
                      className={cn(
                        "bg-bg-surface border border-border-default rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-accent-primary/50 transition-colors shadow-sm relative group",
                        opp.stalled && "border-l-2 border-l-status-warning"
                      )}
                    >
                      <button className="absolute top-3 right-3 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
                        <MoreHorizontal size={14} />
                      </button>
                      
                      <div className="text-xs text-text-muted mb-1 truncate pr-6">{opp.company}</div>
                      <div className="text-sm font-semibold text-white mb-3">{opp.name}</div>
                      
                      <div className="font-display font-bold text-lg text-white mb-4">
                        {formatCurrency(opp.value)}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-bold",
                            opp.probability >= 50 ? "bg-status-success/20 text-status-success" : "bg-status-info/20 text-status-info"
                          )}>
                            {opp.probability}%
                          </span>
                          {opp.stalled && (
                            <div className="flex items-center gap-1 text-status-warning text-[10px] font-semibold bg-status-warning/10 px-1.5 py-0.5 rounded" title="Stalled Deal">
                              <Flame size={10} />
                              Stalled
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 text-[10px] text-text-muted">
                          <Clock size={10} />
                          {opp.daysInStage}d
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {stageOpps.length === 0 && (
                    <div className="border-2 border-dashed border-border-default rounded-lg p-6 flex items-center justify-center text-text-muted text-xs text-center opacity-50">
                      Drop cards here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {view === 'list' && (
        <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden flex-1 overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg-elevated/50 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-default">
              <tr>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('name')}>
                  <div className="flex items-center gap-1">Name <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('company')}>
                   <div className="flex items-center gap-1">Company <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('value')}>
                   <div className="flex items-center gap-1">Deal Value <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('stage')}>
                   <div className="flex items-center gap-1">Stage <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('probability')}>
                   <div className="flex items-center gap-1">Probability <ArrowUpDown size={10}/></div>
                </th>
                <th className="px-4 py-3 font-semibold cursor-pointer hover:text-white" onClick={() => handleSort('daysInStage')}>
                   <div className="flex items-center gap-1">Days in Stage <ArrowUpDown size={10}/></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredOpps.map((opp) => (
                <tr 
                  key={opp.id} 
                  onClick={() => setSelectedOpp(opp)}
                  className="hover:bg-bg-elevated/20 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-white flex items-center gap-2">
                    {opp.name}
                    {opp.stalled && <Flame size={14} className="text-status-warning" />}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{opp.company}</td>
                  <td className="px-4 py-3 font-display font-bold text-white">{formatCurrency(opp.value)}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] uppercase font-semibold text-text-muted border border-border-default rounded px-1.5 py-0.5">
                      {opp.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                     <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold",
                        opp.probability >= 50 ? "bg-status-success/20 text-status-success" : "bg-status-info/20 text-status-info"
                      )}>
                        {opp.probability}%
                      </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{opp.daysInStage} days</td>
                </tr>
              ))}
              {filteredOpps.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-text-muted">No opportunities found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
