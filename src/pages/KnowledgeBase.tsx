import React, { useState } from 'react';
import { Book, Folder, FileText, Search, Download, Trash2, Edit3, MessageSquare } from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const RECENT_DOCS = [
  { id: 1, title: 'VOV Dental - Tone of Voice', type: 'Client Context', size: '256 KB', edited: '2026-04-20', content: 'Brand guidelines for VOV Dental marketing copy. Focuses on clinical expertise mixed with accessible language.' },
  { id: 2, title: 'Virl Pricing Tiers 2026', type: 'Service Offerings', size: '12 KB', edited: '2026-04-25', content: 'Updated pricing models for Virl cybersecurity solutions.' },
  { id: 3, title: 'Incident Response SOP', type: 'Standard Operating Procedures', size: '1.2 MB', edited: '2026-03-15', content: 'Step-by-step procedures for handling critical system alerts for SME clients.' },
];

export default function KnowledgeBase() {
  const [selectedDoc, setSelectedDoc] = useState<typeof RECENT_DOCS[0] | null>(null);

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title="Document Details"
      >
        {selectedDoc && (
          <div className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 border border-border-default">
                 <FileText size={24} className="text-text-muted" />
              </div>
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 font-semibold">{selectedDoc.type}</div>
                <h2 className="font-display font-medium text-xl text-white mb-2">{selectedDoc.title}</h2>
              </div>
            </div>

            <div className="bg-bg-elevated border border-border-default rounded-xl p-4 flex gap-6 text-sm">
               <div>
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Last Edited</div>
                 <div className="font-medium text-white">{selectedDoc.edited}</div>
               </div>
               <div>
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">File Size</div>
                 <div className="font-medium text-white">{selectedDoc.size}</div>
               </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Content Preview</h4>
              <div className="bg-bg-base border border-border-default rounded-xl p-4 text-sm text-text-secondary leading-relaxed">
                 {selectedDoc.content}
              </div>
            </div>
            
            <div className="bg-bg-base/50 border border-border-default rounded-xl p-4 text-xs text-text-muted">
              <div className="flex items-center gap-2 font-semibold mb-2 text-white">
                <MessageSquare size={14} className="text-accent-primary" /> Copilot Context
              </div>
              <p>This document is indexed by <b>Scribe</b> and <b>Vigil</b> for generating contextual responses for this client.</p>
            </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <Edit3 size={16} /> Edit Document
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-bg-surface border border-border-default hover:border-text-muted text-white rounded-md py-2 text-sm font-semibold transition-colors">
                    <Download size={16} /> Download
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-bg-surface border border-status-danger/30 hover:border-status-danger/70 text-status-danger px-4 rounded-md py-2 text-sm font-semibold transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
        <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
          <Book size={20} className="text-accent-primary" /> AI Knowledge Base
        </h2>
         <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="bg-bg-surface border border-border-default rounded-md pl-9 pr-3 py-1.5 text-sm text-white placeholder:text-text-muted outline-none focus:border-accent-primary w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-bg-surface border border-border-default rounded-xl p-4">
          <div className="flex items-center gap-2 text-text-muted mb-4 text-xs font-semibold uppercase tracking-wider">
            <Folder size={14} /> Folders
          </div>
          <div className="space-y-1">
            {['Standard Operating Procedures', 'Client Context', 'Service Offerings', 'Brand Guidelines'].map(folder => (
              <button key={folder} className="w-full text-left px-3 py-2 rounded-md text-sm text-text-secondary hover:text-white hover:bg-bg-elevated transition-colors truncate">
                {folder}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 bg-bg-surface border border-border-default rounded-xl p-6">
           <h3 className="font-semibold text-white mb-6">Recent Documents</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             {RECENT_DOCS.map(doc => (
               <div 
                 key={doc.id} 
                 onClick={() => setSelectedDoc(doc)}
                 className="flex items-start gap-3 p-4 rounded-lg border border-border-default hover:border-text-muted transition-colors cursor-pointer group"
               >
                  <div className="mt-1">
                    <FileText size={16} className="text-text-muted group-hover:text-accent-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white mb-1">{doc.title}</h4>
                    <div className="text-xs text-text-muted">{doc.type}</div>
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
