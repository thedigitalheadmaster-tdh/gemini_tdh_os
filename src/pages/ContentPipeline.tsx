import React, { useState } from 'react';
import { PenTool, Calendar, Plus, MessageSquare, Bot, Edit3 } from 'lucide-react';
import { Drawer } from '@/components/Drawer';

const BOARDS = {
  ideation: [{ id: 1, title: 'AI in Dentistry Guide', author: 'Scribe', type: 'Guide', publishDate: '2026-06-01' }, { id: 2, title: 'Case Study: VOV Dental', author: 'PK', type: 'Case Study', publishDate: '2026-06-15' }],
  drafting: [{ id: 3, title: 'Virl Security Checklist', author: 'Vigil', type: 'Checklist', publishDate: '2026-05-20' }],
  review: [{ id: 4, title: 'Weekly TDH Newsletter', author: 'Scribe', type: 'Newsletter', publishDate: '2026-05-08' }],
  published: [{ id: 5, title: 'Why You Need a vCISO', author: 'PK', type: 'Blog Post', publishDate: '2026-04-25' }],
};

export default function ContentPipeline() {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [isNewContentDrawer, setIsNewContentDrawer] = useState(false);

  return (
    <div className="flex flex-col h-full space-y-6">
      <Drawer
        isOpen={!!selectedContent}
        onClose={() => setSelectedContent(null)}
        title="Content Details"
      >
        {selectedContent && (
          <div className="p-6 space-y-6">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-text-muted mb-2">{selectedContent.type}</div>
              <h2 className="font-display font-medium text-2xl text-white mb-2">{selectedContent.title}</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-elevated border border-border-default rounded p-4">
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Author</div>
                <div className="text-white font-medium flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center text-[10px] font-bold">
                    {selectedContent.author === 'Scribe' || selectedContent.author === 'Vigil' ? <Bot size={10} /> : 'PK'}
                  </div>
                  {selectedContent.author}
                </div>
              </div>
              <div className="bg-bg-elevated border border-border-default rounded p-4">
                 <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 flex items-center gap-1.5"><Calendar size={12}/> Target Date</div>
                 <div className="font-medium text-white">{selectedContent.publishDate}</div>
              </div>
            </div>

             <div className="border border-border-default rounded-lg p-4 bg-bg-base/50">
               <div className="flex items-center gap-2 text-sm text-text-muted mb-2 font-semibold">
                  <MessageSquare size={14} /> Agent Context (Scribe)
               </div>
               <p className="text-sm text-text-secondary leading-relaxed">
                 This content piece is currently in "{Object.keys(BOARDS).find(key => BOARDS[key as keyof typeof BOARDS].some(item => item.id === selectedContent.id))}". 
                 I've gathered the necessary outline and reference materials. 
               </p>
             </div>

            <div className="border-t border-border-default pt-6">
              <h4 className="font-semibold text-sm mb-4 text-white">Actions</h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors">
                  <Edit3 size={16} /> Open Editor
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer
        isOpen={isNewContentDrawer}
        onClose={() => setIsNewContentDrawer(false)}
        title="Add Content Draft"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Title / Topic Ideas</label>
            <input type="text" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" placeholder="e.g. 5 Benefits of AI Analytics" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Content Type</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>Blog Post</option>
              <option>Newsletter</option>
              <option>Case Study</option>
              <option>Social Media Thread</option>
              <option>Guide</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Assigned Agent/Writer</label>
            <select className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary">
              <option>Scribe (AI Content Agent)</option>
              <option>PK</option>
              <option>Vigil (Technical Writing)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Target Publish Date</label>
            <input type="date" className="w-full bg-bg-base border border-border-default rounded-md px-3 py-2 text-white outline-none focus:border-accent-primary" />
          </div>

          <div className="pt-6 border-t border-border-default">
            <button 
              className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white rounded-md py-2.5 text-sm font-semibold transition-colors"
              onClick={() => setIsNewContentDrawer(false)}
            >
              Add to Board
            </button>
          </div>
        </div>
      </Drawer>

      <div className="flex justify-between items-center shrink-0">
         <h2 className="font-display font-bold text-xl text-white">Content Pipeline</h2>
         <button 
           onClick={() => setIsNewContentDrawer(true)}
           className="flex items-center gap-1.5 bg-accent-primary hover:bg-accent-primary/90 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
         >
          <Plus size={14} /> New Content
        </button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-max h-full pb-4">
          {Object.entries(BOARDS).map(([stage, items]) => (
            <div key={stage} className="w-72 flex flex-col">
               <div className="mb-4 flex items-center justify-between">
                 <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted">{stage}</h3>
                 <span className="bg-bg-surface px-2 py-0.5 rounded text-xs font-bold text-text-secondary">{items.length}</span>
               </div>
               <div className="bg-bg-surface/50 border border-border-default rounded-xl p-2 flex-1 space-y-2">
                 {items.map(item => (
                   <div 
                     key={item.id} 
                     onClick={() => setSelectedContent(item)}
                     className="bg-bg-surface border border-border-default rounded-lg p-3 hover:border-text-muted transition-colors cursor-grab"
                   >
                      <div className="text-xs text-text-muted mb-2 flex items-center gap-1.5"><PenTool size={12}/> {item.type}</div>
                      <h4 className="font-medium text-sm text-white">{item.title}</h4>
                   </div>
                 ))}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
