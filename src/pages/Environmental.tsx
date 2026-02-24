import React, { useState } from 'react';
import { 
  Leaf, 
  Droplets, 
  Zap, 
  Trash2, 
  Wind, 
  ArrowUpRight, 
  TrendingDown, 
  TrendingUp,
  FileUp,
  Edit2,
  Filter,
  Download,
  Search,
  Plus,
  X,
  Upload
} from 'lucide-react';
import { Card, CardContent, Badge, Button, CardHeader } from '../ui/components';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

const tabs = [
  { id: 'emissions', name: 'Emissions', icon: Wind },
  { id: 'energy', name: 'Energy', icon: Zap },
  { id: 'water', name: 'Water', icon: Droplets },
  { id: 'waste', name: 'Waste', icon: Trash2 },
];

export const EnvironmentalModule = () => {
  const [activeTab, setActiveTab] = useState('emissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const metrics = mockESGData.environmentalMetrics;

  const filteredMetrics = metrics.filter(m => 
    m.category.toLowerCase() === activeTab && 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    setEditingMetric(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Environmental</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your environmental footprint.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter metrics..." 
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

      {/* Tabs */}
      <div className="flex space-x-1 bg-slate-100 p-1 rounded-2xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center px-6 py-2.5 text-sm font-bold rounded-xl transition-all",
              activeTab === tab.id 
                ? "bg-white text-sidebar shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Metric Name</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredMetrics.map((metric) => (
                    <tr key={metric.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-900">{metric.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{metric.unit}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-black text-slate-900">{metric.value.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold text-slate-400">{metric.target.toLocaleString()}</span>
                      </td>
                      <td className="px-8 py-5">
                        <Badge variant={metric.status === 'on-track' ? 'success' : metric.status === 'at-risk' ? 'warning' : 'danger'}>
                          {metric.status.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => setEditingMetric(metric)}
                          className="p-2 text-slate-400 hover:text-accent transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm p-8">
            <h3 className="text-lg font-black text-slate-900 mb-6">Evidence Upload</h3>
            <div className="border-2 border-dashed border-slate-100 rounded-[2rem] p-8 text-center hover:border-accent transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-4 group-hover:bg-accent group-hover:text-sidebar transition-all">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-900">Drop files here</p>
              <p className="text-[10px] text-slate-400 mt-1">PDF, PNG, JPG up to 10MB</p>
            </div>
          </Card>

          <Card className="rounded-[2rem] border-none bg-sidebar text-white p-8">
             <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-sidebar mr-4">
                   <Leaf className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Intensity</p>
                   <p className="text-2xl font-black text-white">42.5 <span className="text-xs font-normal opacity-60">tCO2e</span></p>
                </div>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                   <span>Target Progress</span>
                   <span>85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-accent w-[85%]" />
                </div>
             </div>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      {editingMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-sidebar/80 backdrop-blur-sm">
          <Card className="max-w-md w-full rounded-[2rem] border-none shadow-2xl overflow-hidden">
            <CardHeader className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Edit Metric</h3>
              <button onClick={() => setEditingMetric(null)} className="p-2 text-slate-400 hover:text-rose-500">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Metric Name</label>
                <input 
                  type="text" 
                  defaultValue={editingMetric.name}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Current Value</label>
                <input 
                  type="number" 
                  defaultValue={editingMetric.value}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="secondary" className="flex-1 rounded-xl py-3" onClick={() => setEditingMetric(null)}>Cancel</Button>
                <Button variant="primary" className="flex-1 bg-sidebar text-white rounded-xl py-3" onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
