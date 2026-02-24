import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, ClipboardCheck, ArrowRight, Leaf } from 'lucide-react';
import { useAppStore, UserRole } from '../data/mockData';
import { Card, CardContent } from '../ui/components';

export const LandingPage = () => {
  const setUserRole = useAppStore((state) => state.setUserRole);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    navigate('/');
  };

  const roles = [
    {
      id: 'admin' as UserRole,
      title: 'Sales Admin',
      description: 'Full access to ESG scores, branch management, and system settings.',
      icon: ShieldCheck,
    },
    {
      id: 'manager' as UserRole,
      title: 'Branch Manager',
      description: 'Manage local branch submissions, evidence, and social metrics.',
      icon: Users,
    },
    {
      id: 'auditor' as UserRole,
      title: 'ESG Auditor',
      description: 'Review submissions, verify evidence, and manage audit logs.',
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="min-h-screen bg-sidebar flex items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-sidebar font-black text-4xl mx-auto mb-8 shadow-xl shadow-accent/20">
            <Leaf className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Welcome to Intrav</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Select your portal to continue managing ESG with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <Card 
              key={role.id} 
              className="cursor-pointer hover:scale-105 transition-all duration-500 border-none bg-white/5 hover:bg-white/10 rounded-[2.5rem] group"
              onClick={() => handleRoleSelect(role.id)}
            >
              <CardContent className="p-10 flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-accent mb-8 shadow-lg group-hover:bg-accent group-hover:text-sidebar transition-all duration-500">
                  <role.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{role.title}</h3>
                <p className="text-slate-400 text-sm mb-10 flex-1 leading-relaxed">{role.description}</p>
                <div className="flex items-center text-accent font-black text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-500">
                  Enter Portal <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Powered by Intrav ESG Reporting Platform © 2025
          </p>
        </div>
      </div>
    </div>
  );
};
