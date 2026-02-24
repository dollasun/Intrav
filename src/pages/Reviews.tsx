import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronRight,
  User,
  FileText,
  History,
  ArrowUpRight
} from 'lucide-react';
import { Card, Badge, Button } from '../ui/components';
import { cn } from '../ui/utils';

const reviews = [
  { id: '1', branch: 'Singapore Hub', metric: 'Scope 2 Emissions', user: 'Li Wei', date: '2 hours ago', status: 'pending', priority: 'high' },
  { id: '2', branch: 'London HQ', metric: 'Water Intensity', user: 'James Smith', date: '5 hours ago', status: 'in-review', priority: 'medium' },
  { id: '3', branch: 'Berlin Factory', metric: 'Gender Pay Gap', user: 'Emma Weber', date: '1 day ago', status: 'rejected', priority: 'critical' },
  { id: '4', branch: 'Sydney Branch', metric: 'Ethics Training', user: 'Sarah Jones', date: '2 days ago', status: 'approved', priority: 'low' },
];

export const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState<any>(reviews[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(r => 
    r.metric.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Data Reviews</h1>
          <p className="text-slate-500 text-sm mt-1">Verify submissions and manage change requests.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
          <Button variant="secondary" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Review List */}
        <div className="lg:col-span-5 flex flex-col space-y-6 overflow-y-auto custom-scrollbar pr-2">
          {filteredReviews.map((review) => (
            <Card 
              key={review.id} 
              onClick={() => setSelectedReview(review)}
              className={cn(
                "cursor-pointer transition-all border-l-8 rounded-[2rem] border-none shadow-sm group",
                selectedReview?.id === review.id ? "bg-sidebar text-white" : "bg-white hover:bg-slate-50",
                review.priority === 'critical' ? "border-l-rose-500" : "border-l-transparent"
              )}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={
                    review.status === 'approved' ? 'success' :
                    review.status === 'rejected' ? 'danger' :
                    review.status === 'in-review' ? 'warning' :
                    'info'
                  }>
                    {review.status.toUpperCase()}
                  </Badge>
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", selectedReview?.id === review.id ? "text-slate-400" : "text-slate-400")}>{review.date}</span>
                </div>
                <h3 className={cn("text-lg font-black", selectedReview?.id === review.id ? "text-white" : "text-slate-900")}>{review.metric}</h3>
                <p className={cn("text-xs font-bold uppercase tracking-widest mt-1", selectedReview?.id === review.id ? "text-accent" : "text-slate-400")}>{review.branch}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className={cn("flex items-center text-[10px] font-bold uppercase tracking-widest", selectedReview?.id === review.id ? "text-slate-300" : "text-slate-600")}>
                    <User className="w-3.5 h-3.5 mr-2" />
                    {review.user}
                  </div>
                  {review.priority === 'critical' && (
                    <div className="flex items-center text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                      <AlertCircle className="w-3.5 h-3.5 mr-1" /> Critical
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Review Detail Panel */}
        <div className="lg:col-span-7 flex flex-col">
          {selectedReview ? (
            <Card className="flex-1 flex flex-col rounded-[2rem] border-none shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedReview.metric}</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedReview.branch} • Submission ID: #SUB-2941</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="secondary" className="rounded-xl text-rose-500 border-rose-100 hover:bg-rose-50">
                    <XCircle className="w-4 h-4 mr-2" /> Reject
                  </Button>
                  <Button variant="primary" className="bg-sidebar text-white rounded-xl">
                    <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
                {/* Data Comparison */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Submitted Value</p>
                    <p className="text-3xl font-black text-slate-900">1,250 <span className="text-sm font-normal text-slate-500">tCO2e</span></p>
                    <p className="text-xs text-accent mt-2 font-bold uppercase tracking-widest">-12% vs last period</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Target Value</p>
                    <p className="text-3xl font-black text-slate-900">1,100 <span className="text-sm font-normal text-slate-500">tCO2e</span></p>
                    <p className="text-xs text-rose-500 mt-2 font-bold uppercase tracking-widest">+13.6% over target</p>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2" /> Attached Evidence
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-accent hover:text-sidebar cursor-pointer transition-all group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 font-black text-[10px] text-rose-500 group-hover:bg-sidebar group-hover:text-accent">PDF</div>
                        <span className="text-sm font-bold">Utility_Bill_Feb.pdf</span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-accent hover:text-sidebar cursor-pointer transition-all group">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 font-black text-[10px] text-emerald-500 group-hover:bg-sidebar group-hover:text-accent">XLS</div>
                        <span className="text-sm font-bold">Emission_Calc_V2.xlsx</span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" /> Discussion
                  </h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold text-xs">LW</div>
                      <div className="flex-1 bg-slate-50 rounded-[2rem] p-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-black text-slate-900">Li Wei</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">2 hours ago</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          The Scope 2 emissions include the new solar array offset. Please verify the calculation in the attached spreadsheet.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-accent text-sidebar flex items-center justify-center flex-shrink-0 text-xs font-black">AR</div>
                    <div className="flex-1 relative">
                      <textarea 
                        placeholder="Add a comment or request changes..." 
                        className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[120px]"
                      />
                      <div className="absolute bottom-4 right-4">
                        <Button variant="primary" className="bg-sidebar text-white rounded-xl py-2 px-6">Post</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <ClipboardCheck className="w-16 h-16 mb-6 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">Select a review to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
