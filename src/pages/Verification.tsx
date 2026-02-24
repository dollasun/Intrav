import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  QrCode, 
  ExternalLink, 
  Download, 
  CheckCircle2,
  Lock,
  Search,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, Badge, Button, Progress } from '../ui/components';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

export const Verification = () => {
  const { score } = mockESGData;

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      {/* Public Verification Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-[2rem] text-sidebar mb-4 shadow-lg shadow-accent/20">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">ESG Verification Portal</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          This portal provides transparent access to verified ESG performance data for stakeholders, auditors, and regulatory bodies.
        </p>
      </div>

      {/* Verification Status Card */}
      <Card className="bg-white border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden">
        <CardContent className="p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-10">
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-[12px] border-slate-50 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-slate-900">{score.overall}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Score</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-sidebar shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div>
                <Badge variant="success" className="mb-4 px-4 py-1.5 text-[10px] font-black tracking-widest">VERIFIED DATA</Badge>
                <h2 className="text-3xl font-black text-slate-900">Global Corp Industries</h2>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Reporting Period: 2024 Annual Cycle</p>
                <div className="flex items-center mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Lock className="w-4 h-4 mr-2 text-accent" />
                  Verified by ESG Trust Partners on Jan 15, 2025
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 group cursor-pointer hover:bg-sidebar transition-all">
              <div className="p-4 bg-white rounded-3xl shadow-sm group-hover:scale-110 transition-transform">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-accent">Scan to Verify</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 pt-12 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="text-slate-400">Environmental</span>
                <span className="text-slate-900">{score.environmental}/100</span>
              </div>
              <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${score.environmental}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="text-slate-400">Social</span>
                <span className="text-slate-900">{score.social}/100</span>
              </div>
              <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${score.social}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3">
                <span className="text-slate-400">Governance</span>
                <span className="text-slate-900">{score.governance}/100</span>
              </div>
              <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${score.governance}%` }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auditor Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Auditor Activity Log</h3>
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { user: 'Sarah Miller', action: 'Verified Scope 1 Data', time: '2 days ago' },
              { user: 'Robert Chen', action: 'Approved Social Metrics', time: '5 days ago' },
              { user: 'System', action: 'Blockchain Hash Generated', time: '1 week ago' },
            ].map((log, i) => (
              <div key={i} className="px-8 py-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-2xl bg-sidebar text-accent flex items-center justify-center mr-4 text-[10px] font-black">
                    {log.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{log.action}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{log.user}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Stakeholder Access</h3>
          </div>
          <CardContent className="p-8 space-y-6">
            <p className="text-sm text-slate-500 leading-relaxed">
              Enter a secure access code to view detailed evidence files and full audit trails.
            </p>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Enter Access Code" 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <Button variant="primary" className="bg-sidebar text-white rounded-2xl px-8">Verify</Button>
            </div>
            <div className="pt-6 space-y-3">
              <Button variant="secondary" className="w-full justify-between rounded-2xl py-4 px-6 group">
                <span className="flex items-center font-bold text-xs uppercase tracking-widest">
                  <Download className="w-4 h-4 mr-3 text-accent" /> Download Verification Certificate
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button variant="secondary" className="w-full justify-between rounded-2xl py-4 px-6 group">
                <span className="flex items-center font-bold text-xs uppercase tracking-widest">
                  <ExternalLink className="w-4 h-4 mr-3 text-accent" /> Share Public Link
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
