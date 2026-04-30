import React from 'react';
import { BarChart3, LineChart as LineChartIcon, PieChart, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DATA = [
  { name: 'Jan', revenue: 4000, margin: 2400 },
  { name: 'Feb', revenue: 3000, margin: 1398 },
  { name: 'Mar', revenue: 2000, margin: 9800 },
  { name: 'Apr', revenue: 2780, margin: 3908 },
  { name: 'May', revenue: 1890, margin: 4800 },
  { name: 'Jun', revenue: 2390, margin: 3800 },
  { name: 'Jul', revenue: 3490, margin: 4300 },
];

export default function Reports() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center shrink-0">
        <h2 className="font-display font-bold text-xl text-white">Reports & Analytics</h2>
        <select className="bg-bg-surface border border-border-default rounded-md px-3 py-1.5 text-sm text-white outline-none">
          <option>Last 30 Days</option>
          <option>This Quarter</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
        {[
          { title: 'Total Revenue', value: 'R145,000', change: '+12%', icon: BarChart3 },
          { title: 'Avg. Project Margin', value: '64%', change: '+2.4%', icon: Activity },
          { title: 'Client Retention', value: '98%', change: '0%', icon: PieChart },
        ].map(metric => (
           <div key={metric.title} className="bg-bg-surface border border-border-default hover:border-text-muted transition-colors rounded-xl p-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1 font-semibold">{metric.title}</div>
                <div className="font-display font-bold text-2xl text-white">{metric.value}</div>
                <div className="text-xs text-status-success font-semibold mt-1">{metric.change} vs last period</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-bg-elevated flex items-center justify-center text-accent-primary border border-border-default">
                <metric.icon size={20} />
              </div>
           </div>
        ))}
      </div>

      <div className="flex-1 min-h-[400px] bg-bg-surface border border-border-default rounded-xl p-6 flex flex-col">
          <h3 className="font-display font-semibold text-sm mb-6">Revenue vs Margin Trend</h3>
          <div className="flex-1">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E86A34" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#E86A34" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8896b0', fontSize: 10 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8896b0', fontSize: 10 }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a2540', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#E86A34" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="margin" stroke="#8896b0" strokeWidth={2} fillOpacity={1} fill="url(#colorMargin)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
      </div>
    </div>
  );
}
