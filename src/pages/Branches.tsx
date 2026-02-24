import React, { useState } from 'react';
import { 
  GitBranch, 
  MapPin, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Globe,
  TrendingDown,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, Badge, Button } from '../ui/components';
import { mockESGData } from '../data/mockData';
import { cn } from '../ui/utils';

export const Branches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState('All Regions');
  const branches = mockESGData.branches;

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         branch.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = filterRegion === 'All Regions' || branch.location.includes(filterRegion);
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Branch Management</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor and manage ESG performance across your global locations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="rounded-xl">
            <Globe className="w-4 h-4 mr-2" /> Map View
          </Button>
          <Button variant="primary" className="bg-sidebar text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" /> Add Branch
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search branches by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="bg-white border border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:outline-none"
          >
            <option>All Regions</option>
            <option>Europe</option>
            <option>Asia Pacific</option>
            <option>Americas</option>
          </select>
          <Button variant="secondary" className="rounded-xl py-2.5">
            <Filter className="w-4 h-4 mr-2" /> More Filters
          </Button>
        </div>
      </div>

      {/* Branch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBranches.map((branch) => (
          <Card key={branch.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent group-hover:text-sidebar transition-all">
                    <GitBranch className="w-7 h-7" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-black text-slate-900">{branch.name}</h3>
                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <MapPin className="w-3 h-3 mr-1" />
                      {branch.location}
                    </div>
                  </div>
                </div>
                <button className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="text-slate-400">ESG Score</span>
                    <span className="text-slate-900">{branch.score} / 100</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-1000" 
                      style={{ width: `${branch.score}%` }} 
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Users className="w-3.5 h-3.5 mr-2" />
                    <span>24 Members</span>
                  </div>
                  <Badge variant={
                    branch.submissionStatus === 'submitted' ? 'success' :
                    branch.submissionStatus === 'in-progress' ? 'warning' :
                    'default'
                  }>
                    {branch.submissionStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center text-accent text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +4.2% Trend
                </div>
                <button className="text-xs font-bold text-sidebar hover:text-accent transition-colors flex items-center group">
                  View Details <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
