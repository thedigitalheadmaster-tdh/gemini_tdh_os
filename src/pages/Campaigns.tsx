import React, { useState } from 'react';
import { Megaphone, Target, Users, Plus, BarChart2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from '@/components/Drawer';

const CAMPAIGNS = [
  { id: 1, name: 'Dental AI Transformation', platform: 'LinkedIn', status: 'Active', spend: 2500, clicks: 450, leads: 12, ctr: '2.4%', cpc: 'R5.55' },
  { id: 2, name: 'Q2 Newsletter Reactivation', platform: 'Email', status: 'Draft', spend: 0, clicks: 0, leads: 0, ctr: '0%', cpc: 'R0.00' },
  { id: 3, name: 'Cybersecurity Webinar', platform: 'Google Ads', status: 'Ended', spend: 5000, clicks: 1200, leads: 48, ctr: '3.1%', cpc: 'R4.16' },
];

export default function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState<typeof CAMPAIGNS[0] | null>(null);
  const [isNewCampaignDrawer, setIsNewCampaignDrawer] = useState(false);

  const formatCurrency = (val: number) => `R${val.toLocaleString()}`;

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        title="Campaign Insights"
      >
        {selectedCampaign && (
          <div className="p-6 space-y-6">
            <div>
               <div className="text-xs text-text-muted mb-1 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                 <Megaphone size={12}/> {selectedCampaign.platform}
               </div>
               <h2 className="font-display font-bold text-2xl text-white mb-2">{selectedCampaign.name}</h2>
               <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  selectedCampaign.status === 'Active' ? "bg-status-success/10 text-status-success" :
                  selectedCampaign.status === 'Ended' ? "bg-bg-elevated text-text-muted" :
                  "bg-status-warning/10 text-status-warning"
              )}>
                {selectedCampaign.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Total Spend</div>
                 <div className="font-display font-medium text-2xl text-white">{formatCurrency(selectedCampaign.spend)}</div>
               </div>
               <div className="bg-bg-elevated border border-border-default rounded-lg p-4">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Total Leads</div>
                 <div className="font-display font-medium text-2xl text-white">{selectedCampaign.leads}</div>
               </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Performance Metrics</h4>
               <div className="grid grid-cols-3 gap-3">
                 <div className="bg-bg-base border border-border-default rounded p-3 text-center">
                   <div className="text-[10px] text-text-muted uppercase mb-1">Clicks</div>
                   <div className="font-medium text-white">{selectedCampaign.clicks}</div>
                 </div>
                 <div className="bg-bg-base border border-border-default rounded p-3 text-center">
                   <div className="text-[10px] text-text-muted uppercase mb-1">CTR</div>
                   <div className="font-medium text-white">{selectedCampaign.ctr}</div>
                 </div>
                 <div className="bg-bg-base border border-border-default rounded p-3 text-center">
                   <div className="text-[10px] text-text-muted uppercase mb-1">CPC</div>
                   <div className="font-medium text-white">{selectedCampaign.cpc}</div>
                 </div>
               </div>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <BarChart2 size={16} /> View Full Analytics
                </button>
                 {selectedCampaign.status === 'Active' && (
                  <button className="w-full bg-bg-surface border border-status-danger/30 hover:border-status-danger/70 text-status-danger rounded-md py-2 text-sm font-semibold transition-colors">
                    Pause Campaign
                  </button>
                 )}
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isNewCampaignDrawer}
        onClose={() => setIsNewCampaignDrawer(false)}
        title="Create Campaign"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Campaign Name</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. Q3 Lead Gen" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Platform</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>LinkedIn Ads</option>
              <option>Google Ads</option>
              <option>Facebook/IG Ads</option>
              <option>Email</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Start Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">End Date</label>
              <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Budget (R)</label>
            <input type="number" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="0.00" />
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsNewCampaignDrawer(false)}
            >
              Launch Campaign
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
        <h2 className="font-display font-bold text-xl text-white">Marketing Campaigns</h2>
        <button 
          onClick={() => setIsNewCampaignDrawer(true)}
          className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
        >
          <Plus size={14} /> Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAMPAIGNS.map(campaign => (
          <div 
            key={campaign.id} 
            onClick={() => setSelectedCampaign(campaign)}
            className="bg-bg-surface border border-border-default rounded-xl p-5 hover:border-text-muted transition-colors group cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-display font-semibold text-white group-hover:text-accent-primary transition-colors">{campaign.name}</h3>
              <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                  campaign.status === 'Active' ? "bg-status-success/10 text-status-success" :
                  campaign.status === 'Ended' ? "bg-bg-elevated text-text-muted" :
                  "bg-status-warning/10 text-status-warning"
              )}>
                {campaign.status}
              </span>
            </div>
            
            <div className="text-xs text-text-secondary mb-6 flex items-center gap-1.5">
              <Megaphone size={12} /> {campaign.platform}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-border-default">
              <div>
                <div className="text-[10px] text-text-muted uppercase mb-1">Spend</div>
                <div className="font-medium text-white">{formatCurrency(campaign.spend)}</div>
              </div>
              <div className="border-l border-border-default pl-2">
                <div className="text-[10px] text-text-muted uppercase mb-1">Clicks</div>
                <div className="font-medium text-white">{campaign.clicks}</div>
              </div>
              <div className="border-l border-border-default pl-2">
                <div className="text-[10px] text-text-muted uppercase mb-1">Leads</div>
                <div className="font-medium text-white">{campaign.leads}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
