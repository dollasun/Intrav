import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  GraduationCap, 
  UserPlus, 
  TrendingUp, 
  TrendingDown,
  PieChart as PieChartIcon,
  BarChart2,
  CheckCircle2,
  Search,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui/components';
import { DiversityDonutChart } from '../charts/ESGCharts';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

const diversityData = [
  { name: 'Male', value: 55, color: '#B4E600' },
  { name: 'Female', value: 42, color: '#051C14' },
  { name: 'Other', value: 3, color: '#F3F4F6' },
];

export const SocialModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Social & Workforce</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor employee wellbeing, diversity, and community impact.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search metrics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <Button variant="primary" className="bg-sidebar text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" /> Add Data
          </Button>
        </div>
      </div>

      {/* Workforce KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Headcount', value: '12,450', trend: '+2.4%', icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Turnover Rate', value: '8.4%', trend: '-1.2%', icon: Heart, color: 'bg-rose-50 text-rose-600' },
          { label: 'Training Hours', value: '32.5', trend: '+15%', icon: GraduationCap, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Gender Pay Gap', value: '4.2%', trend: 'Stable', icon: UserPlus, color: 'bg-amber-50 text-amber-600' },
        ].map((kpi, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-sm p-8 group hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-sidebar", kpi.color)}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <Badge variant={kpi.trend.includes('+') ? 'success' : kpi.trend === 'Stable' ? 'info' : 'danger'}>
                {kpi.trend}
              </Badge>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
            <h2 className="text-3xl font-black text-slate-900">{kpi.value}</h2>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Diversity Chart */}
        <Card className="lg:col-span-4 rounded-[2rem] border-none shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Gender Diversity</h3>
            <PieChartIcon className="w-5 h-5 text-slate-400" />
          </div>
          <CardContent className="p-8">
            <div className="h-64">
              <DiversityDonutChart data={diversityData} />
            </div>
            <div className="mt-8 space-y-4">
              {diversityData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health & Safety */}
        <Card className="lg:col-span-8 rounded-[2rem] border-none shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Health & Safety Performance</h3>
            <BarChart2 className="w-5 h-5 text-slate-400" />
          </div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {[
                  { label: 'LTIFR (Lost Time Injury Frequency)', value: 0.42, target: '< 0.50', progress: 42, color: 'bg-accent' },
                  { label: 'Safety Training Completion', value: '98.5%', target: '100%', progress: 98.5, color: 'bg-accent' },
                  { label: 'Near Miss Reporting', value: 124, target: 'Goal: Increase', progress: 65, color: 'bg-amber-400' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-slate-900 font-black">{item.value}</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                      <div className={cn("h-full transition-all duration-1000", item.color)} style={{ width: `${item.progress}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{item.target}</p>
                  </div>
                ))}
              </div>
              <div className="bg-sidebar rounded-[2rem] p-8 flex flex-col justify-center text-center text-white">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 className="w-10 h-10 text-sidebar" />
                </div>
                <h4 className="text-2xl font-black text-white">Zero Fatalities</h4>
                <p className="text-sm text-slate-400 mt-2">Maintained for 4 consecutive periods.</p>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Community Investment</p>
                  <p className="text-4xl font-black text-accent">$2.4M</p>
                  <button className="mt-6 text-xs font-bold text-white hover:text-accent transition-colors flex items-center justify-center w-full group">
                    View Impact Report <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
