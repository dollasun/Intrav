import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  FileText, 
  AlertTriangle, 
  CheckCircle2,
  Users,
  Lock,
  ExternalLink,
  Search,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui/components';
import { RiskRadarChart } from '../charts/ESGCharts';

const riskData = [
  { subject: 'Corruption', A: 85, fullMark: 100 },
  { subject: 'Data Privacy', A: 78, fullMark: 100 },
  { subject: 'Supply Chain', A: 65, fullMark: 100 },
  { subject: 'Ethics', A: 92, fullMark: 100 },
  { subject: 'Regulatory', A: 80, fullMark: 100 },
];

const policies = [
  'Code of Business Conduct',
  'Environmental Policy',
  'Human Rights Policy',
  'Data Privacy & Security',
  'Supplier Code of Conduct',
  'Tax Transparency Policy'
];

export const GovernanceModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPolicies = policies.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Governance & Ethics</h1>
          <p className="text-slate-500 text-sm mt-1">Manage board composition, corporate ethics, and risk compliance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="primary" className="bg-sidebar text-white rounded-xl">
            <FileText className="w-4 h-4 mr-2" /> Policy Center
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Risk Radar */}
        <Card className="lg:col-span-4 rounded-[2rem] border-none shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50">
            <h3 className="text-lg font-black text-slate-900">Risk Assessment Radar</h3>
          </div>
          <CardContent className="p-8">
            <div className="h-64">
              <RiskRadarChart data={riskData} />
            </div>
            <div className="mt-8 p-6 bg-slate-50 rounded-[2rem]">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="text-slate-400">Overall Risk Score</span>
                <span className="text-accent">Low Risk (80/100)</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-accent h-full transition-all duration-1000" style={{ width: '80%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Board & Ethics */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-none shadow-sm p-8 group hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-accent group-hover:text-sidebar transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <Badge variant="success">Compliant</Badge>
              </div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Board Independence</h4>
              <div className="flex items-baseline">
                <span className="text-3xl font-black text-slate-900">75%</span>
                <span className="ml-2 text-xs font-bold text-slate-400">Independent Directors</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Target: &gt; 70%</p>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm p-8 group hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-accent group-hover:text-sidebar transition-all">
                  <Scale className="w-6 h-6" />
                </div>
                <Badge variant="success">98%</Badge>
              </div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ethics Training</h4>
              <div className="flex items-baseline">
                <span className="text-3xl font-black text-slate-900">12,201</span>
                <span className="ml-2 text-xs font-bold text-slate-400">Employees Certified</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">Period: 2024-2025 Cycle</p>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">Recent Governance Actions</h3>
              <button className="text-xs font-bold text-sidebar hover:text-accent transition-colors">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { action: 'Anti-Corruption Policy Updated', date: 'Feb 12, 2025', status: 'Approved', icon: FileText },
                { action: 'Board Diversity Review', date: 'Feb 08, 2025', status: 'In Progress', icon: Users },
                { action: 'Whistleblower Report #842', date: 'Feb 01, 2025', status: 'Resolved', icon: AlertTriangle },
              ].map((item, i) => (
                <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mr-4 group-hover:bg-accent group-hover:text-sidebar transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.action}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'Approved' || item.status === 'Resolved' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Policy List */}
      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="text-lg font-black text-slate-900">Policy Documentation</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search policies..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {filteredPolicies.map((policy) => (
            <div key={policy} className="p-6 bg-slate-50 rounded-[2rem] hover:bg-accent hover:text-sidebar transition-all cursor-pointer group relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 mr-4 group-hover:bg-sidebar group-hover:text-accent transition-all">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">{policy}</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
