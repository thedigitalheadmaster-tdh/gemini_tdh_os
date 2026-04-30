import React, { useState } from 'react';
import { Receipt, Download, Plus, DollarSign, Calendar, Tag, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/Drawer';

const EXPENSES = [
  { id: 'EXP-101', date: '2026-04-28', category: 'Software Tools', vendor: 'Google Workspace', amount: 450, status: 'Approved', notes: 'Monthly subscription' },
  { id: 'EXP-102', date: '2026-04-25', category: 'Cloud Infrastructure', vendor: 'AWS', amount: 12500, status: 'Approved', notes: 'Hosting costs for Virl and Musoni.' },
  { id: 'EXP-103', date: '2026-04-20', category: 'Marketing', vendor: 'LinkedIn Ads', amount: 3500, status: 'Pending Review', notes: 'Q2 cyber awareness campaign.' },
  { id: 'EXP-104', date: '2026-04-10', category: 'Legal Services', vendor: 'LexCorp', amount: 4500, status: 'Reimbursed', notes: 'Drafting new IP agreements.' },
];

export default function Expenses() {
  const [selectedExpense, setSelectedExpense] = useState<typeof EXPENSES[0] | null>(null);
  const [isLogExpenseDrawer, setIsLogExpenseDrawer] = useState(false);

  const formatCurrency = (val: number) => `R${val.toLocaleString()}`;

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedExpense}
        onClose={() => setSelectedExpense(null)}
        title="Expense Details"
      >
        {selectedExpense && (
          <div className="p-6 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-mono text-xl font-bold text-white mb-1">{selectedExpense.id}</h2>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <User size={14} />
                  {selectedExpense.vendor}
                </div>
              </div>
              <span className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase",
                selectedExpense.status === 'Approved' ? "bg-status-success/10 text-status-success border-status-success/20" :
                selectedExpense.status === 'Pending Review' ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                "bg-bg-elevated text-text-muted border-border-default"
              )}>
                {selectedExpense.status}
              </span>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-xl p-6 text-center">
               <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Total Amount</div>
               <div className="font-display font-bold text-4xl text-white">{formatCurrency(selectedExpense.amount)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-bg-elevated border border-border-default rounded-lg p-3">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Date</div>
                 <div className="text-white font-medium">{selectedExpense.date}</div>
               </div>
               <div className="bg-bg-elevated border border-border-default rounded-lg p-3">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5"><Tag size={12}/> Category</div>
                 <div className="text-white font-medium">{selectedExpense.category}</div>
               </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Notes</h4>
              <div className="bg-bg-base border border-border-default p-3 rounded-lg text-sm text-text-secondary">
                 {selectedExpense.notes}
              </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <Download size={16} /> Download Receipt
                </button>
                {selectedExpense.status === 'Pending Review' && (
                  <button className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                    Approve Expense
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isLogExpenseDrawer}
        onClose={() => setIsLogExpenseDrawer(false)}
        title="Log Expense"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Vendor / Payee</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. AWS" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Amount (R)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input type="number" className="w-full bg-bg-base border border-border-default rounded-md pl-9 pr-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="0.00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Category</label>
              <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
                <option>Software Tools</option>
                <option>Cloud Infrastructure</option>
                <option>Marketing</option>
                <option>Legal Services</option>
                <option>Travel</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Notes</label>
            <textarea className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary h-20 resize-none" placeholder="Reason for expense..." />
          </div>
          <div className="pt-2">
             <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Receipt</label>
             <div className="border-2 border-dashed border-border-default rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent-primary transition-colors">
               <Receipt size={24} className="text-text-muted mb-2" />
               <div className="text-sm font-medium text-white mb-1">Click to upload</div>
               <div className="text-[10px] text-text-muted">PDF, JPG or PNG (max 5MB)</div>
             </div>
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsLogExpenseDrawer(false)}
            >
              Submit Expense
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
        <h2 className="font-display font-bold text-xl text-white">Expenses</h2>
        <button 
          onClick={() => setIsLogExpenseDrawer(true)}
          className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus size={14} />
          Log Expense
        </button>
      </div>

      <div className="bg-bg-surface border border-border-default rounded-xl overflow-hidden flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-bg-elevated/80 text-[11px] uppercase tracking-wider text-text-muted border-b border-border-default sticky top-0">
            <tr>
              <th className="px-4 py-3 font-semibold">Expense ID</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Vendor</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {EXPENSES.map(exp => (
              <tr 
                key={exp.id} 
                className="hover:bg-bg-elevated/40 transition-colors cursor-pointer group"
                onClick={() => setSelectedExpense(exp)}
              >
                <td className="px-4 py-3 font-mono text-[11px] text-text-secondary">
                  <div className="flex items-center gap-2">
                    <Receipt size={14} className="text-text-muted" />
                    {exp.id}
                  </div>
                </td>
                <td className="px-4 py-3 text-text-secondary">{exp.date}</td>
                <td className="px-4 py-3 font-medium text-white">{exp.vendor}</td>
                <td className="px-4 py-3 text-text-secondary">{exp.category}</td>
                <td className="px-4 py-3 font-display font-medium text-white">{formatCurrency(exp.amount)}</td>
                <td className="px-4 py-3">
                   <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase",
                    exp.status === 'Approved' ? "bg-status-success/10 text-status-success border-status-success/20" :
                    exp.status === 'Pending Review' ? "bg-status-warning/10 text-status-warning border-status-warning/20" :
                    "bg-bg-elevated text-text-muted border-border-default"
                  )}>
                    {exp.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1 text-text-muted hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
