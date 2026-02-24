import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  User, 
  Database, 
  Clock,
  ArrowRight,
  MoreHorizontal,
  ArrowUpRight
} from 'lucide-react';
import { Card, Badge, Button } from '../ui/components';
import { cn } from '../ui/utils';

const logs = [
  { id: '1', user: 'Alex Rivera', action: 'Updated Metric', entity: 'Scope 1 Emissions', time: '10 mins ago', old: '1,200', new: '1,250' },
  { id: '2', user: 'Li Wei', action: 'Uploaded Evidence', entity: 'Singapore Hub', time: '1 hour ago', old: '-', new: 'Utility_Bill.pdf' },
  { id: '3', user: 'System', action: 'Period Locked', entity: '2024 Q3 Quarterly', time: '2 hours ago', old: 'Open', new: 'Locked' },
  { id: '4', user: 'Sarah Jones', action: 'Approved Review', entity: 'Ethics Training', time: '5 hours ago', old: 'Pending', new: 'Approved' },
  { id: '5', user: 'Alex Rivera', action: 'Changed Target', entity: 'Water Intensity', time: '1 day ago', old: '8,500', new: '8,000' },
];

export const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.entity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Audit Logs</h1>
          <p className="text-slate-500 text-sm mt-1">Full immutable history of all platform changes and activities.</p>
        </div>
        <Button variant="secondary" className="rounded-xl bg-white border-slate-100 shadow-sm hover:bg-sidebar hover:text-white transition-all">
          <Download className="w-4 h-4 mr-2" /> Export Logs (CSV)
        </Button>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="flex items-center space-x-3 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Filter by user, action, or entity..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 shadow-sm"
              />
            </div>
            <Button variant="secondary" className="rounded-2xl p-3">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-accent" /> Last 30 Days</span>
            <span className="flex items-center"><Database className="w-4 h-4 mr-2 text-accent" /> 12,402 Total Events</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entity</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Changes</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-xl bg-sidebar text-accent flex items-center justify-center mr-3 text-[10px] font-black">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-black text-slate-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge variant={
                      log.action.includes('Updated') ? 'info' :
                      log.action.includes('Approved') ? 'success' :
                      log.action.includes('Locked') ? 'danger' :
                      'default'
                    }>
                      {log.action.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{log.entity}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-300 line-through">{log.old}</span>
                      <ArrowRight className="w-3.5 h-3.5 mx-3 text-accent" />
                      <span className="text-slate-900">{log.new}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-slate-300 hover:text-sidebar transition-colors p-2 hover:bg-slate-100 rounded-xl">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredLogs.length} of 12,402 events</span>
          <div className="flex items-center space-x-3">
            <Button variant="secondary" className="rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-widest opacity-50 cursor-not-allowed">Previous</Button>
            <Button variant="secondary" className="rounded-xl py-2 px-4 text-xs font-bold uppercase tracking-widest hover:bg-sidebar hover:text-white">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
