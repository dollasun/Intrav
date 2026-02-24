import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  Lock,
  ArrowRight,
  Search
} from 'lucide-react';
import { Card, Badge, Button, Progress } from '../ui/components';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

export const ReportingPeriods = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const periods = mockESGData.periods;

  const filteredPeriods = periods.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Reporting Periods</h1>
          <p className="text-slate-500 text-sm mt-1">Manage data collection cycles and submission deadlines.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search periods..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <Button variant="primary" className="bg-sidebar text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" /> Create New Period
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar View Placeholder */}
        <Card className="lg:col-span-1 rounded-[2rem] border-none shadow-sm p-8">
          <h3 className="text-lg font-black text-slate-900 mb-6">Deadline Calendar</h3>
          <div className="aspect-square bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-6">
            Interactive Calendar Component Placeholder
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-accent mr-3" />
              <span className="text-slate-600">Submission Open</span>
            </div>
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-amber-400 mr-3" />
              <span className="text-slate-600">Review Phase</span>
            </div>
            <div className="flex items-center text-[10px] font-bold uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-slate-400 mr-3" />
              <span className="text-slate-600">Locked / Archived</span>
            </div>
          </div>
        </Card>

        {/* Periods Table */}
        <div className="lg:col-span-3 space-y-6">
          {filteredPeriods.map((period) => (
            <Card key={period.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all cursor-pointer group overflow-hidden">
              <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mr-6 transition-all group-hover:bg-accent group-hover:text-sidebar",
                    period.status === 'open' ? "bg-emerald-50 text-emerald-600" :
                    period.status === 'review' ? "bg-amber-50 text-amber-600" :
                    "bg-slate-100 text-slate-500"
                  )}>
                    {period.status === 'locked' ? <Lock className="w-8 h-8" /> : <Calendar className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{period.name}</h3>
                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      <Clock className="w-3.5 h-3.5 mr-2" />
                      {period.startDate} — {period.endDate}
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-slate-900">{period.completion}%</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", period.status === 'open' ? "bg-accent" : "bg-sidebar")} 
                      style={{ width: `${period.completion}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <Badge variant={
                    period.status === 'open' ? 'success' :
                    period.status === 'review' ? 'warning' :
                    'default'
                  }>
                    {period.status.toUpperCase()}
                  </Badge>
                  <div className="flex items-center space-x-3">
                    <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 bg-sidebar text-white rounded-xl hover:bg-accent hover:text-sidebar transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
