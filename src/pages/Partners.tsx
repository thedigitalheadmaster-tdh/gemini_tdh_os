import React, { useState } from 'react';
import { Users, Building, Plus, Mail, Phone, ExternalLink, Calendar } from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const PARTNERS = [
  { id: 1, name: 'CyberSec Africa', type: 'Virl Reseller', contact: 'Johan Smit', email: 'johan@cybersec.africa', phone: '+27 82 123 4567', joined: '2025-11-15' },
  { id: 2, name: 'Dental IT Solutions', type: 'Implementation Partner', contact: 'Sarah Jones', email: 'sarah@dentalit.co.za', phone: '+27 71 987 6543', joined: '2026-02-10' },
];

export default function Partners() {
  const [selectedPartner, setSelectedPartner] = useState<typeof PARTNERS[0] | null>(null);
  const [isAddPartnerDrawer, setIsAddPartnerDrawer] = useState(false);

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
        title="Partner Information"
      >
        {selectedPartner && (
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
               <div className="w-16 h-16 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0 border border-border-default">
                 <Building size={32} className="text-text-muted" />
               </div>
               <div>
                  <h2 className="font-display font-medium text-2xl text-white mb-1">{selectedPartner.name}</h2>
                  <div className="text-sm text-accent-primary font-medium">{selectedPartner.type}</div>
               </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-xl p-4 space-y-4">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Primary Contact</h4>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3 text-text-secondary text-sm">
                   <Users size={16} className="text-text-muted" />
                   <span className="font-medium text-white">{selectedPartner.contact}</span>
                 </div>
                 <div className="flex items-center gap-3 text-text-secondary text-sm">
                   <Mail size={16} className="text-text-muted" />
                   <a href={`mailto:${selectedPartner.email}`} className="hover:text-accent-primary transition-colors">{selectedPartner.email}</a>
                 </div>
                 <div className="flex items-center gap-3 text-text-secondary text-sm">
                   <Phone size={16} className="text-text-muted" />
                   <a href={`tel:${selectedPartner.phone}`} className="hover:text-accent-primary transition-colors">{selectedPartner.phone}</a>
                 </div>
              </div>
            </div>

            <div className="bg-bg-base border border-border-default rounded flex p-3">
               <Calendar size={14} className="text-text-muted mr-3 shrink-0 mt-0.5" />
               <div>
                  <div className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Partner Since</div>
                  <div className="text-sm font-medium text-white">{selectedPartner.joined}</div>
               </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <ExternalLink size={16} /> View Partner Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isAddPartnerDrawer}
        onClose={() => setIsAddPartnerDrawer(false)}
        title="Add Partner"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Company Name</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. Acme Corp" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Partner Type</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>Reseller</option>
              <option>Implementation Partner</option>
              <option>Integration Partner</option>
              <option>Strategic Partner</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Primary Contact</label>
              <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="Full Name" />
            </div>
             <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Joined Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Email Address</label>
            <input type="email" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="contact@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Phone Number</label>
            <input type="tel" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="+27 XX XXX XXXX" />
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsAddPartnerDrawer(false)}
            >
              Add Partner
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
         <h2 className="font-display font-bold text-xl text-white">Partners</h2>
         <button 
           onClick={() => setIsAddPartnerDrawer(true)}
           className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
         >
          <Plus size={14} /> Add Partner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PARTNERS.map(partner => (
          <div 
            key={partner.id} 
            onClick={() => setSelectedPartner(partner)}
            className="bg-bg-surface border border-border-default rounded-xl p-5 hover:border-text-muted transition-colors cursor-pointer flex gap-4 items-start"
          >
             <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 border border-border-default">
               <Building size={20} className="text-text-muted" />
             </div>
             <div>
               <h3 className="font-display font-semibold text-white mb-1">{partner.name}</h3>
               <div className="text-xs text-accent-primary font-medium mb-3">{partner.type}</div>
               <div className="text-xs text-text-secondary space-y-1">
                 <div>{partner.contact}</div>
                 <div>{partner.email}</div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
