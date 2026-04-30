import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, BarChart2, Users, Briefcase, FileText, 
  Target, CheckSquare, Clock, ArrowUpRight, FileSpreadsheet, 
  CreditCard, Receipt, Repeat, Mic, Send, Star, Network, 
  Activity, ShieldAlert, Database, Scale, Book, Lock, Wrench,
  Bot, Archive, FolderTree, Cpu, List, Trash2, Search, Bell,
  Plus, ChevronLeft, ChevronRight, Menu as MenuIcon, User
} from 'lucide-react';

const NAV_GROUPS = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Reports', path: '/reports', icon: BarChart2 },
    ]
  },
  {
    title: 'SALES',
    items: [
      { name: 'Leads', path: '/leads', icon: Target },
      { name: 'Opportunities', path: '/opportunities', icon: Briefcase },
      { name: 'Clients', path: '/clients', icon: Users },
      { name: 'Audit Submissions', path: '/audit-submissions', icon: FileText },
    ]
  },
  {
    title: 'DELIVERY',
    items: [
      { name: 'Projects', path: '/projects', icon: FolderTree },
      { name: 'Tasks', path: '/tasks', icon: CheckSquare },
      { name: 'Timesheets', path: '/timesheets', icon: Clock },
      { name: 'Releases', path: '/releases', icon: ArrowUpRight },
    ]
  },
  {
    title: 'FINANCE',
    items: [
      { name: 'Invoices', path: '/finance-invoices', icon: FileSpreadsheet },
      { name: 'Payments', path: '/payments', icon: CreditCard },
      { name: 'Expenses', path: '/finance-expenses', icon: Receipt },
      { name: 'Subscriptions', path: '/subscriptions', icon: Repeat },
    ]
  },
  {
    title: 'MARKETING',
    items: [
      { name: 'Campaigns', path: '/marketing-campaigns', icon: Mic },
      { name: 'Content Pipeline', path: '/marketing-content', icon: Send },
      { name: 'GBP Activity', path: '/gbp-activity', icon: Star },
      { name: 'Reviews', path: '/reviews', icon: Star },
    ]
  },
  {
    title: 'PARTNERS',
    items: [
      { name: 'Partners', path: '/partners', icon: Network },
      { name: 'Partner Deals', path: '/partner-deals', icon: Briefcase },
      { name: 'Partner Pipeline', path: '/partner-pipeline', icon: Activity },
      { name: 'Referrals', path: '/referrals', icon: Users },
    ]
  },
  {
    title: 'SECURITY & RISK',
    items: [
      { name: 'Vulnerability Registry', path: '/vulnerability-registry', icon: ShieldAlert },
      { name: 'Risk Register', path: '/risk-register', icon: Activity },
      { name: 'Infrastructure Assets', path: '/infrastructure', icon: Database },
    ]
  },
  {
    title: 'LEGAL',
    items: [
      { name: 'Contracts', path: '/contracts', icon: FileText },
      { name: 'IP Attribution', path: '/ip-attribution', icon: Scale },
      { name: 'Product Legal Docs', path: '/legal-docs', icon: Book },
      { name: 'Suppliers', path: '/suppliers', icon: Users },
      { name: 'Audit Log', path: '/audit-log', icon: Lock },
    ]
  },
  {
    title: 'AI & SYSTEM',
    items: [
      { name: 'Agent Workload', path: '/ai-agent-workload', icon: Bot },
      { name: 'Knowledge Base', path: '/ai-knowledge-base', icon: Book },
      { name: 'Project Templates', path: '/templates', icon: FileText },
      { name: 'Service Catalog', path: '/services', icon: Wrench },
      { name: 'Assignees', path: '/assignees', icon: Users },
    ]
  },
  {
    title: 'AGENT LOGS',
    items: [
      { name: 'Decision Logs', path: '/agent-logs/decision', icon: Archive },
      { name: 'Execution Logs', path: '/agent-logs/execution', icon: Cpu },
      { name: 'Tool Calls', path: '/agent-logs/tools', icon: List },
      { name: 'Performance', path: '/agent-logs/performance', icon: Activity },
    ]
  },
  {
    title: 'PRODUCTS',
    items: [
      { name: 'ShepherdOS', path: '/shepherdos', icon: Bot },
      { name: 'Trash', path: '/trash', icon: Trash2 },
    ]
  }
];

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'Critical Vulnerability', desc: 'Vigil detected unauthenticated API endpoint in Virl.', time: '2m ago', icon: ShieldAlert, color: 'text-status-danger', bg: 'bg-status-danger/10' },
    { id: 2, type: 'warning', title: 'Agent Bottleneck', desc: 'Vigil is currently at 85% utilization due to scans.', time: '15m ago', icon: Bot, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 3, type: 'info', title: 'Content Generated', desc: 'Scribe drafted 3 posts for TDH LinkedIn.', time: '1h ago', icon: Send, color: 'text-status-info', bg: 'bg-status-info/10' },
  ]);

  const location = useLocation();
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getPageTitle = () => {
    for (const group of NAV_GROUPS) {
      for (const item of group.items) {
        if (item.path === location.pathname) {
          return item.name.toUpperCase();
        }
      }
    }
    return '';
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
    setNotificationsOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-base">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-bg-sidebar border-r border-border-default transition-all duration-300 relative",
          sidebarCollapsed ? "w-[56px]" : "w-[220px]"
        )}
      >
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-6 bg-bg-elevated border border-border-default rounded-full p-1 text-text-muted hover:text-text-primary hover:border-accent-primary z-10"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
        
        <div className="p-4 border-b border-border-default min-h-[64px] flex items-center">
          {!sidebarCollapsed && <div className="font-display font-bold text-lg text-text-primary tracking-tight">TDH OS</div>}
          {sidebarCollapsed && <div className="font-display font-bold text-lg text-text-primary tracking-tight mx-auto">T</div>}
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-4">
          {NAV_GROUPS.map((group, idx) => (
            <div key={idx} className="mb-6">
              {!sidebarCollapsed && (
                <div className="px-4 mb-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest cursor-pointer hover:text-text-secondary">
                  {group.title}
                </div>
              )}
              {sidebarCollapsed && (
                <div className="h-4 border-b border-border-default mx-4 mb-4" />
              )}
              <div className="flex flex-col">
                {group.items.map((item, itemIdx) => (
                  <NavLink
                    key={itemIdx}
                    to={item.path}
                    className={({ isActive }) => cn(
                      "flex items-center py-2 px-4 gap-3 text-sm transition-colors",
                      isActive 
                        ? "text-white border-l-2 border-accent-primary bg-bg-elevated/50 font-medium" 
                        : "text-text-secondary border-l-2 border-transparent hover:text-text-primary hover:bg-bg-elevated/30"
                    )}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon size={16} className={cn("shrink-0", sidebarCollapsed && "mx-auto")} />
                    {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border-default flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center font-bold text-sm shrink-0">
            PK
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-text-primary truncate">Sibongiseni Mlungwana</span>
              <span className="text-xs text-text-muted truncate">Sign out</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top bar */}
        <header className="h-[64px] border-b border-border-default flex items-center justify-between px-4 md:px-6 shrink-0 bg-bg-base/80 backdrop-blur z-20">
          <div className="flex items-center gap-4">
            <h1 className="font-display font-bold text-lg hidden md:block tracking-tight text-white">{getPageTitle()}</h1>
            <h1 className="font-display font-bold text-lg md:hidden tracking-tight text-white">TDH OS</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-bg-surface border border-border-default rounded-md px-3 py-1.5 w-64 focus-within:border-accent-primary/50 transition-colors">
              <Search size={14} className="text-text-muted mr-2" />
              <input 
                type="text" 
                placeholder="Search command centre (Cmd+K)" 
                className="bg-transparent border-none outline-none text-sm w-full text-text-primary placeholder:text-text-muted"
              />
            </div>
            
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-text-muted hover:text-white transition-colors"
                title="Notifications"
              >
                <Bell size={18} />
                {notifications.length > 0 && (
                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-primary rounded-full border border-bg-base animate-pulse" />
                )}
              </button>
              
              {notificationsOpen && (
                <div className="absolute top-10 flex flex-col md:right-0 right-[-80px] w-[320px] bg-bg-surface border border-border-default shadow-2xl rounded-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-border-default flex justify-between items-center bg-bg-elevated/30">
                    <h3 className="font-display font-medium text-white">Notifications</h3>
                    <button className="text-xs text-accent-primary hover:text-white transition-colors" onClick={handleMarkAllRead}>Mark all as read</button>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-text-muted text-sm">
                        You're all caught up!
                      </div>
                    ) : (
                       notifications.map(notif => (
                         <div key={notif.id} className="p-4 border-b border-border-default hover:bg-bg-elevated/20 transition-colors cursor-pointer">
                           <div className="flex gap-3">
                             <div className={cn("w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center", notif.color, notif.bg)}>
                               <notif.icon size={14} />
                             </div>
                             <div>
                               <div className="text-sm text-white font-medium mb-0.5">{notif.title}</div>
                               <div className="text-xs text-text-secondary">{notif.desc}</div>
                               <div className="text-[10px] text-text-muted mt-2 uppercase tracking-wide">{notif.time}</div>
                             </div>
                           </div>
                         </div>
                       ))
                    )}
                  </div>
                  <div className="p-2 border-t border-border-default bg-bg-elevated/30">
                    <button className="w-full py-2 text-xs text-text-secondary hover:text-white transition-colors">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            <button className="hidden md:flex items-center gap-1 bg-bg-surface border border-border-default hover:border-accent-primary text-sm px-3 py-1.5 rounded-md text-text-primary transition-colors">
              <Plus size={14} />
              <span>New</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="max-w-[1440px] mx-auto min-h-full p-4 md:p-6 pb-24 md:pb-6">
            <Outlet />
          </div>
        </div>
        
      </main>

      {/* Mobile Bottom Bar Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-sidebar border-t border-border-default flex justify-around items-center h-[60px] pb-safe z-30">
         <NavLink to="/" className={({isActive}) => cn("flex flex-col items-center gap-1 p-2 w-full text-text-muted", isActive && "text-accent-primary")}>
           <LayoutDashboard size={20} />
           <span className="text-[10px]">Home</span>
         </NavLink>
         <NavLink to="/leads" className={({isActive}) => cn("flex flex-col items-center gap-1 p-2 w-full text-text-muted", isActive && "text-accent-primary")}>
           <Target size={20} />
           <span className="text-[10px]">Leads</span>
         </NavLink>
         <NavLink to="/tasks" className={({isActive}) => cn("flex flex-col items-center gap-1 p-2 w-full text-text-muted", isActive && "text-accent-primary")}>
           <CheckSquare size={20} />
           <span className="text-[10px]">Tasks</span>
         </NavLink>
         <NavLink to="/finance-invoices" className={({isActive}) => cn("flex flex-col items-center gap-1 p-2 w-full text-text-muted", isActive && "text-accent-primary")}>
           <FileSpreadsheet size={20} />
           <span className="text-[10px]">Finance</span>
         </NavLink>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={cn("flex flex-col items-center gap-1 p-2 w-full text-text-muted", mobileMenuOpen && "text-accent-primary")}>
           <MenuIcon size={20} />
           <span className="text-[10px]">Menu</span>
         </button>
      </div>

      {/* Mobile Full Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-bg-base z-20 pt-[64px] pb-[60px] overflow-y-auto">
          <div className="p-4 space-y-6">
            {NAV_GROUPS.map((group, idx) => (
              <div key={idx}>
                <div className="mb-2 text-[10px] font-semibold text-text-muted uppercase tracking-widest">{group.title}</div>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item, itemIdx) => (
                    <NavLink
                      key={itemIdx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({isActive}) => cn(
                        "flex flex-col items-start p-3 rounded-lg border",
                        isActive ? "bg-bg-elevated border-accent-primary text-white" : "bg-bg-surface border-border-default text-text-secondary"
                      )}
                    >
                      <item.icon size={18} className="mb-2" />
                      <span className="text-xs font-medium">{item.name}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
