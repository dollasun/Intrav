import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowUpRight,
  ShieldCheck,
  GitBranch,
  Leaf,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  Users
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, Badge, Button, CardHeader } from '../ui/components';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

const MetricCard = ({ title, value, trend, trendValue }: any) => (
  <Card className="rounded-2xl border-none shadow-sm">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="p-1.5 bg-slate-50 rounded-lg">
          <MoreHorizontal className="w-4 h-4 text-slate-400" />
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-sm font-bold text-slate-400 mr-1">$</span>
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
      </div>
      <div className={cn(
        "flex items-center mt-4 text-xs font-bold",
        trend === 'up' ? "text-accent" : "text-rose-500"
      )}>
        {trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
        {trendValue}% from last month
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { score, kpis, trends, pillarComparison } = mockESGData;

  const donutData = [
    { name: 'Environmental', value: 23, color: '#0F5132' },
    { name: 'Social', value: 16, color: '#B4E600' },
    { name: 'Governance', value: 68, color: '#E7F3EF' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">An easy way to manage ESG with care and precision.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-100 rounded-2xl px-4 py-2 shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400 mr-2" />
          <span className="text-sm font-bold text-slate-700">January 2024 - May 2024</span>
          <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (Main Stats) */}
        <div className="lg:col-span-9 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Update Card */}
            <Card className="bg-sidebar text-white border-none rounded-[2rem] p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                   <div className="w-2 h-2 bg-rose-500 rounded-full mr-2 animate-pulse" />
                   <span className="text-xs font-bold uppercase tracking-widest opacity-80">Update</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Feb 12th 2024</p>
                <h3 className="text-xl font-bold leading-tight mb-8">
                  ESG performance increased <br />
                  <span className="text-accent">40% in 1 week</span>
                </h3>
                <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center group">
                  See Statistics <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            </Card>

            <MetricCard title="Net Score" value="193.000" trend="up" trendValue="+35" />
            <MetricCard title="Total Impact" value="32.000" trend="down" trendValue="-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transaction Style List */}
            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardHeader className="px-8 py-6 border-none">
                <h3 className="text-lg font-black text-slate-900">Recent Submissions</h3>
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                {[
                  { name: 'London HQ Report', date: 'Jul 12th 2024', status: 'Completed', id: '0JWEJS7ISNC', icon: Leaf },
                  { name: 'Singapore Hub Data', date: 'Jul 12th 2024', status: 'Pending', id: '0JWEJS7ISNC', icon: GitBranch },
                  { name: 'Berlin Factory Audit', date: 'Jul 12th 2024', status: 'Pending', id: '0JWEJS7ISNC', icon: ShieldCheck },
                  { name: 'Sydney Branch Social', date: 'Jul 12th 2024', status: 'Completed', id: '0JWEJS7ISNC', icon: Users },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-sidebar transition-all">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        item.status === 'Completed' ? "text-emerald-500" : "text-amber-500"
                      )}>{item.status}</p>
                      <p className="text-[10px] text-slate-300 font-mono mt-0.5">{item.id}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Revenue Style Chart */}
            <Card className="rounded-[2rem] border-none shadow-sm">
              <CardHeader className="px-8 py-6 border-none flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Metric Performance</h3>
                </div>
                <div className="flex items-center space-x-4">
                   <div className="flex items-center">
                      <div className="w-2 h-2 bg-sidebar rounded-full mr-2" />
                      <span className="text-[10px] font-bold text-slate-400">Target</span>
                   </div>
                   <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2" />
                      <span className="text-[10px] font-bold text-slate-400">Actual</span>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="flex items-baseline mb-8">
                  <span className="text-sm font-bold text-slate-400 mr-1">$</span>
                  <h3 className="text-3xl font-black text-slate-900">193.000</h3>
                  <div className="ml-3 flex items-center text-xs font-bold text-accent">
                    <TrendingUp className="w-3.5 h-3.5 mr-1" />
                    +35% from last month
                  </div>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Jan', actual: 40, target: 30 },
                      { name: 'Feb', actual: 30, target: 45 },
                      { name: 'Mar', actual: 50, target: 40 },
                      { name: 'Apr', actual: 45, target: 55 },
                      { name: 'May', actual: 60, target: 50 },
                      { name: 'Jun', actual: 55, target: 45 },
                    ]}>
                      <Bar dataKey="target" fill="#051C14" radius={[4, 4, 0, 0]} barSize={12} />
                      <Bar dataKey="actual" fill="#B4E600" radius={[4, 4, 0, 0]} barSize={12} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column (Sidebar Stats) */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-black text-slate-900 mb-8">Overall ESG Score</h3>
              <div className="relative h-48 w-48 mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Count</p>
                  <p className="text-3xl font-black text-slate-900">565K</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-8 leading-relaxed">
                Here are some tips on how to <br /> improve your score.
              </p>
              <Button variant="secondary" className="w-full mt-6 rounded-2xl py-4 font-bold border-slate-100">
                Guide Views
              </Button>
              <div className="grid grid-cols-3 gap-2 mt-8">
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-accent rounded-sm mb-1" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">View</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-sidebar rounded-sm mb-1" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Perc</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-rose-400 rounded-sm mb-1" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Sales</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Up Card */}
          <Card className="rounded-[2rem] border-none bg-[#D9E4C5] p-8 relative overflow-hidden">
             <div className="relative z-10">
                <div className="w-10 h-10 bg-sidebar/10 rounded-xl flex items-center justify-center text-sidebar mb-6">
                   <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-sidebar leading-tight mb-4">
                  Level up your ESG <br />
                  tracking to the <br />
                  next level.
                </h3>
                <p className="text-xs text-sidebar/60 font-medium mb-8">
                  An easy way to manage ESG with <br /> care and precision.
                </p>
                <Button className="w-full bg-sidebar text-white hover:bg-sidebar/90 rounded-2xl py-4 font-bold">
                  Update to Intrav+
                </Button>
             </div>
             <div className="absolute -right-12 -top-12 w-48 h-48 text-accent/20">
                <Leaf className="w-full h-full rotate-45" />
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
