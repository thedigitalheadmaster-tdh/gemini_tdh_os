import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { FileSpreadsheet, Plus, Download, MoreHorizontal, ArrowRight, User, Calendar, CreditCard, Filter, ChevronDown, ArrowUpDown, Search } from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const INVOICES = [
  { id: 'INV-2026-041', client: 'VOV Dental', amount: 35000, status: 'Paid', issued: '2026-04-01', due: '2026-04-15', paid: '2026-04-14', items: [{ desc: 'Retainer - April 2026', amount: 35000 }] },
  { id: 'INV-2026-042', client: 'Virl', amount: 12500, status: 'Sent', issued: '2026-04-15', due: '2026-04-30', paid: null, items: [{ desc: 'Security Audit Q2', amount: 12500 }] },
  { id: 'INV-2026-043', client: 'Dr Mashudu', amount: 65000, status: 'Draft', issued: '2026-04-29', due: '2026-05-14', paid: null, items: [{ desc: 'Website Redesign Deposit (50%)', amount: 65000 }] },
  { id: 'INV-2026-039', client: 'Cape Town Ortho', amount: 28000, status: 'Overdue', issued: '2026-03-15', due: '2026-03-31', paid: null, items: [{ desc: 'SEO Campaign - March 2026', amount: 28000 }] },
];

type SortConfig = { key: keyof typeof INVOICES[0]; direction: 'asc' | 'desc' } | null;

export default function Invoices() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof INVOICES[0] | null>(null);
  const [isNewInvoiceDrawer, setIsNewInvoiceDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const formatCurrency = (val: number) => `R${val.toLocaleString()}`;

  const handleSort = (key: keyof typeof INVOICES[0]) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedInvoices = useMemo(() => {
    let result = [...INVOICES];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(inv => 
        inv.id.toLowerCase().includes(lowerQuery) || 
        inv.client.toLowerCase().includes(lowerQuery)
      );
    }

    if (statusFilter) {
      result = result.filter(inv => inv.status === statusFilter);
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, statusFilter, sortConfig]);

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Drawer: Invoice Details */}
      <Drawer
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        title="Invoice Details"
        width="sm:w-[500px]"
      >
        {selectedInvoice && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-mono text-xl font-bold text-white mb-1">{selectedInvoice.id}</h2>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <User size={14} />
                  {selectedInvoice.client}
                </div>
              </div>
              <span className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase",
                selectedInvoice.status === 'Paid' ? "bg-status-success/10 text-status-success border-status-success/20" :
                selectedInvoice.status === 'Overdue' ? "bg-status-danger/10 text-status-danger border-status-danger/20" :
                selectedInvoice.status === 'Sent' ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                "bg-bg-elevated text-text-muted border-border-default"
              )}>
                {selectedInvoice.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-bg-elevated border border-border-default rounded-lg p-3">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Issued</div>
                 <div className="text-white font-medium">{selectedInvoice.issued}</div>
               </div>
               <div className="bg-bg-elevated border border-border-default rounded-lg p-3">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Due</div>
                 <div className="text-white font-medium">{selectedInvoice.due}</div>
               </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Line Items</h3>
              <div className="border border-border-default rounded-lg overflow-hidden bg-bg-base text-sm">
                 <div className="grid grid-cols-4 gap-2 bg-bg-elevated p-2 border-b border-border-default text-xs font-semibold text-text-muted uppercase tracking-wider">
                   <div className="col-span-3">Description</div>
                   <div className="text-right">Amount</div>
                 </div>
                 {selectedInvoice.items?.map((item, idx) => (
                   <div key={idx} className="grid grid-cols-4 gap-2 p-3 text-text-secondary border-b border-border-default last:border-0">
                     <div className="col-span-3">{item.desc}</div>
                     <div className="text-right text-white tabular-nums">{formatCurrency(item.amount)}</div>
                   </div>
                 ))}
                 <div className="grid grid-cols-4 gap-2 p-3 bg-bg-surface border-t border-border-default">
                    <div className="col-span-3 text-right font-semibold text-text-muted">Total</div>
                    <div className="text-right font-display font-bold text-white tabular-nums">{formatCurrency(selectedInvoice.amount)}</div>
                 </div>
              </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <CreditCard size={16} /> Record Payment
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                    <Download size={14} /> Download PDF
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                     Resend Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

       {/* Drawer: New Invoice */}
      <Drawer
        isOpen={isNewInvoiceDrawer}
        onClose={() => setIsNewInvoiceDrawer(false)}
        title="Create Invoice"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Client</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>VOV Dental</option>
              <option>Virl</option>
              <option>Dr Mashudu</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description (Line Item)</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. Monthly Retainer" />
          </div>
           <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Amount (R)</label>
            <input type="number" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. 10000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Issue Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Due Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsNewInvoiceDrawer(false)}
            >
              Generate Invoice
            </button>
          </div>
        </div>
      </Drawer>

      {/* HEADER & SUMMARY PILLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 flex-1">
          <div className="bg-bg-surface border border-border-default rounded-lg p-3">
            <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 font-semibold">Total Invoiced YTD</div>
            <div className="font-display font-bold text-white text-xl">R140,500</div>
          </div>
          <div className="bg-bg-surface border border-border-default rounded-lg p-3">
            <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 font-semibold">Total Paid</div>
            <div className="font-display font-bold text-status-success text-xl">R35,000</div>
          </div>
          <div className="bg-bg-surface border border-status-warning/30 rounded-lg p-3">
            <div className="text-[10px] text-status-warning uppercase tracking-wider mb-1 font-semibold">Outstanding</div>
            <div className="font-display font-bold text-white text-xl">R77,500</div>
          </div>
          <div className="bg-bg-surface border border-status-danger/30 rounded-lg p-3">
            <div className="text-[10px] text-status-danger uppercase tracking-wider mb-1 font-semibold">Overdue</div>
            <div className="font-display font-bold text-white text-xl">R28,000</div>
          </div>
        </div>
        <div className="hidden md:block">
           <button 
             onClick={() => setIsNewInvoiceDrawer(true)}
             className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(232,106,52,0.2)]"
           >
            <Plus size={16} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* FILTER BAR  */}
      <div className="flex justify-between items-center bg-bg-surface p-3 rounded-lg border border-border-default shrink-0 z-10 w-full">
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search invoice or client..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-bg-base border border-border-default rounded-md pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-text-muted outline-none focus:border-accent-primary transition-colors w-full"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="flex items-center gap-2 bg-bg-base border border-border-default px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-white transition-colors"
          >
             <Filter size={14} /> <span className="capitalize">{statusFilter || 'Status'}</span> <ChevronDown size={14} />
          </button>
          {isStatusDropdownOpen && (
            <div className="absolute right-0 top-10 w-32 bg-bg-surface border border-border-default shadow-lg rounded-md overflow-hidden z-40">
               {['All', 'Paid', 'Sent', 'Draft', 'Overdue'].map(v => (
                 <div 
                   key={v}
                   onClick={() => { setStatusFilter(v === 'All' ? null : v); setIsStatusDropdownOpen(false); }}
                   className="px-3 py-2 text-sm text-text-secondary hover:bg-bg-elevated hover:text-white cursor-pointer"
                 >
                   {v}
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-elevated/80 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-default sticky top-0">
            <tr>
              <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-1">Invoice Number <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('client')}>
                 <div className="flex items-center gap-1">Client <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('amount')}>
                 <div className="flex items-center gap-1">Amount <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold cursor-pointer hover:text-text-secondary" onClick={() => handleSort('status')}>
                 <div className="flex items-center gap-1">Status <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold text-right cursor-pointer hover:text-text-secondary" onClick={() => handleSort('issued')}>
                 <div className="flex justify-end items-center gap-1">Issued Date <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold text-right cursor-pointer hover:text-text-secondary" onClick={() => handleSort('due')}>
                 <div className="flex justify-end items-center gap-1">Due Date <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 font-semibold text-right cursor-pointer hover:text-text-secondary" onClick={() => handleSort('paid')}>
                 <div className="flex justify-end items-center gap-1">Paid Date <ArrowUpDown size={10}/></div>
              </th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {filteredAndSortedInvoices.map(invoice => (
              <tr 
                key={invoice.id} 
                onClick={() => setSelectedInvoice(invoice)}
                className="group hover:bg-bg-elevated/40 transition-colors cursor-pointer relative"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-text-secondary font-mono text-[11px] group-hover:text-white transition-colors">
                    <FileSpreadsheet size={14} className="text-text-muted" />
                    {invoice.id}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-white">{invoice.client}</td>
                <td className="px-4 py-3 font-display font-bold text-white">{formatCurrency(invoice.amount)}</td>
                <td className="px-4 py-3">
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase",
                    invoice.status === 'Paid' ? "bg-status-success/10 text-status-success border-status-success/20" :
                    invoice.status === 'Overdue' ? "bg-status-danger/10 text-status-danger border-status-danger/20" :
                    invoice.status === 'Sent' ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                    "bg-bg-elevated text-text-muted border-border-default"
                  )}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-text-secondary">{invoice.issued}</td>
                <td className="px-4 py-3 text-right text-white font-medium">{invoice.due}</td>
                <td className="px-4 py-3 text-right text-text-muted">{invoice.paid || '-'}</td>
                <td className="px-4 py-3 text-right">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                    <button className="p-1 hover:bg-bg-base rounded text-text-muted hover:text-white transition-colors" title="Download PDF">
                      <Download size={14} />
                    </button>
                    <button className="p-1 hover:bg-bg-base rounded text-text-muted hover:text-white transition-colors">
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       {/* Mobile FAB */}
       <button className="md:hidden fixed bottom-20 right-4 w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-white shadow-lg z-10" onClick={() => setIsNewInvoiceDrawer(true)}>
         <Plus size={24} />
       </button>

    </div>
  );
}
