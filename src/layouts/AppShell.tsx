import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Leaf, 
  Users, 
  ShieldCheck, 
  GitBranch, 
  Calendar, 
  ClipboardCheck, 
  FileCheck, 
  Search, 
  Bell, 
  ChevronDown,
  Menu,
  X,
  Settings,
  History,
  LogOut,
  User,
  Plus
} from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { useAppStore } from '../data/mockData';
import { cn } from '../ui/utils';
import { Button } from '../ui/components';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Environmental', href: '/environmental', icon: Leaf },
  { name: 'Social', href: '/social', icon: Users },
  { name: 'Governance', href: '/governance', icon: ShieldCheck },
  { name: 'Branches', href: '/branches', icon: GitBranch },
  { name: 'Reporting Periods', href: '/periods', icon: Calendar },
  { name: 'Reviews', href: '/reviews', icon: ClipboardCheck },
  { name: 'Verification', href: '/verification', icon: FileCheck },
  { name: 'Audit Logs', href: '/audit-logs', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, setUserRole } = useAppStore();

  if (!userRole) {
    return <>{children}</>;
  }

  const roleTitle = userRole === 'admin' ? 'Sales Admin' : userRole === 'manager' ? 'Branch Manager' : 'ESG Auditor';

  return (
    <div className="h-screen flex bg-neutral-bg overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar text-white transition-all duration-300 ease-in-out lg:relative",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 flex items-center px-6 flex-shrink-0">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-sidebar font-bold text-2xl flex-shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="ml-3 font-bold text-2xl tracking-tight text-white truncate">Intrav</span>}
          </div>

          {/* Navigation - Scrollable */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4">
            <p className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2", !sidebarOpen && "text-center")}>
              {sidebarOpen ? "Menu" : "•••"}
            </p>
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    title={!sidebarOpen ? item.name : ""}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all group relative",
                      isActive 
                        ? "bg-accent text-sidebar" 
                        : "text-slate-400 hover:text-white hover:bg-white/5",
                      !sidebarOpen && "justify-center px-0"
                    )}
                  >
                    {isActive && sidebarOpen && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-accent rounded-r-full -ml-4" />
                    )}
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-sidebar" : "text-slate-500 group-hover:text-slate-300")} />
                    {sidebarOpen && <span className="ml-4 truncate">{item.name}</span>}
                    {item.name === 'Reviews' && sidebarOpen && (
                      <span className="ml-auto bg-accent text-sidebar text-[10px] font-bold px-2 py-0.5 rounded-full">13</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8">
              <p className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 px-2", !sidebarOpen && "text-center")}>
                {sidebarOpen ? "General" : "•••"}
              </p>
              <div className="space-y-2">
                <button className={cn("flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 rounded-2xl hover:text-white hover:bg-white/5 transition-all", !sidebarOpen && "justify-center px-0")}>
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-4">Settings</span>}
                </button>
                <button className={cn("flex items-center w-full px-4 py-3 text-sm font-medium text-slate-400 rounded-2xl hover:text-white hover:bg-white/5 transition-all", !sidebarOpen && "justify-center px-0")}>
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-4">Security</span>}
                </button>
              </div>
            </div>
          </div>

          {/* User Profile - Fixed at bottom */}
          <div className="p-4 bg-white/5 flex-shrink-0 border-t border-white/5">
            <div className={cn("flex items-center", !sidebarOpen ? "flex-col space-y-4" : "justify-between")}>
              <div className="flex items-center min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-sidebar font-bold overflow-hidden flex-shrink-0">
                  <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                {sidebarOpen && (
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">Fandaww Punx</p>
                    <p className="text-[10px] text-slate-500 truncate">fandaww6@gmail.com</p>
                  </div>
                )}
              </div>
              <button 
                onClick={() => { setUserRole(null); navigate('/landing'); }}
                title="Logout"
                className={cn(
                  "p-2 text-slate-500 hover:text-rose-400 transition-colors rounded-xl hover:bg-white/5",
                  !sidebarOpen && "w-10 h-10 flex items-center justify-center"
                )}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center flex-1 min-w-0">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-slate-50 text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center ml-4 min-w-0">
               <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">{roleTitle}</h2>
               <ChevronDown className="w-4 h-4 ml-2 text-slate-400 flex-shrink-0" />
            </div>
            <div className="max-w-md w-full ml-8 hidden lg:block">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search anything in Intrav..." 
                  className="w-full pl-6 pr-12 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 ml-4">
            <button className="p-2 md:p-2.5 rounded-2xl border border-slate-100 text-slate-500 hover:bg-slate-50 transition-all hidden sm:block">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 md:p-2.5 rounded-2xl border border-slate-100 text-slate-500 hover:bg-slate-50 transition-all hidden sm:block">
              <Users className="w-5 h-5" />
            </button>
            <Button variant="primary" className="bg-sidebar text-white hover:bg-sidebar/90 rounded-2xl px-4 md:px-6 text-sm whitespace-nowrap">
              <Plus className="w-4 h-4 mr-2 hidden md:inline" /> New
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar bg-neutral-bg">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
