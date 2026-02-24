import { create } from 'zustand';

export type ESGScore = {
  overall: number;
  environmental: number;
  social: number;
  governance: number;
  trend: number;
  confidence: number;
};

export type Metric = {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'on-track' | 'at-risk' | 'critical';
  trend: 'up' | 'down' | 'stable';
  category: string;
};

export type Branch = {
  id: string;
  name: string;
  location: string;
  submissionStatus: 'submitted' | 'pending' | 'in-progress';
  score: number;
};

export type ReportingPeriod = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'open' | 'review' | 'locked';
  completion: number;
};

export type UserRole = 'admin' | 'manager' | 'auditor';

interface AppState {
  tenantName: string;
  currentPeriodId: string;
  userRole: UserRole | null;
  setTenantName: (name: string) => void;
  setCurrentPeriod: (id: string) => void;
  setUserRole: (role: UserRole | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tenantName: 'Global Corp Industries',
  currentPeriodId: '2025-q1',
  userRole: null,
  setTenantName: (name) => set({ tenantName: name }),
  setCurrentPeriod: (id) => set({ currentPeriodId: id }),
  setUserRole: (role) => set({ userRole: role }),
}));

export const mockESGData = {
  score: {
    overall: 78.4,
    environmental: 82,
    social: 74,
    governance: 79,
    trend: 2.4,
    confidence: 94,
  },
  kpis: {
    branchesSubmitted: 85,
    deadlineDays: 12,
    evidenceCoverage: 91,
    openReviews: 8,
  },
  trends: [
    { period: '2024 Q1', score: 72 },
    { period: '2024 Q2', score: 74.5 },
    { period: '2024 Q3', score: 75.8 },
    { period: '2024 Q4', score: 78.4 },
  ],
  pillarComparison: [
    { name: 'Environmental', current: 82, target: 85 },
    { name: 'Social', current: 74, target: 80 },
    { name: 'Governance', current: 79, target: 85 },
  ],
  environmentalMetrics: [
    { id: '1', name: 'Scope 1 Emissions', value: 1250, unit: 'tCO2e', target: 1100, status: 'at-risk', trend: 'down', category: 'Emissions' },
    { id: '2', name: 'Energy Intensity', value: 45.2, unit: 'kWh/m2', target: 48, status: 'on-track', trend: 'down', category: 'Energy' },
    { id: '3', name: 'Water Consumption', value: 8400, unit: 'm3', target: 8000, status: 'at-risk', trend: 'up', category: 'Water' },
    { id: '4', name: 'Waste Diversion', value: 68, unit: '%', target: 75, status: 'critical', trend: 'stable', category: 'Waste' },
  ],
  socialMetrics: [
    { id: 's1', name: 'Employee Turnover', value: 12.4, unit: '%', target: 10, status: 'at-risk', trend: 'up', category: 'Workforce' },
    { id: 's2', name: 'Training Hours', value: 32, unit: 'hrs/ee', target: 30, status: 'on-track', trend: 'up', category: 'Development' },
    { id: 's3', name: 'Gender Diversity (Mgmt)', value: 38, unit: '%', target: 45, status: 'at-risk', trend: 'up', category: 'Diversity' },
  ],
  governanceMetrics: [
    { id: 'g1', name: 'Board Independence', value: 75, unit: '%', target: 70, status: 'on-track', trend: 'stable', category: 'Board' },
    { id: 'g2', name: 'Ethics Training Completion', value: 98, unit: '%', target: 100, status: 'on-track', trend: 'up', category: 'Ethics' },
  ],
  branches: [
    { id: 'b1', name: 'London HQ', location: 'UK', submissionStatus: 'submitted', score: 88 },
    { id: 'b2', name: 'New York Office', location: 'USA', submissionStatus: 'submitted', score: 82 },
    { id: 'b3', name: 'Singapore Hub', location: 'Singapore', submissionStatus: 'in-progress', score: 76 },
    { id: 'b4', name: 'Berlin Factory', location: 'Germany', submissionStatus: 'pending', score: 64 },
    { id: 'b5', name: 'Sydney Branch', location: 'Australia', submissionStatus: 'submitted', score: 79 },
  ],
  periods: [
    { id: '2025-q1', name: '2025 Q1 Reporting', startDate: '2025-01-01', endDate: '2025-03-31', status: 'open', completion: 65 },
    { id: '2024-q4', name: '2024 Q4 Annual', startDate: '2024-10-01', endDate: '2024-12-31', status: 'review', completion: 100 },
    { id: '2024-q3', name: '2024 Q3 Quarterly', startDate: '2024-07-01', endDate: '2024-09-30', status: 'locked', completion: 100 },
  ]
};
