import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const ChartContainer = ({ title, children, height = 300 }: { title?: string, children: React.ReactNode, height?: number }) => (
  <div className="w-full">
    {title && <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>}
    <div style={{ height }} className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        {children as any}
      </ResponsiveContainer>
    </div>
  </div>
);

export const ESGLineChart = ({ data }: { data: any[] }) => (
  <ChartContainer>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="period" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 12, fill: '#64748b' }} 
        dy={10}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 12, fill: '#64748b' }} 
        domain={[0, 100]}
      />
      <Tooltip 
        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      />
      <Line 
        type="monotone" 
        dataKey="score" 
        stroke="#0F5132" 
        strokeWidth={3} 
        dot={{ r: 4, fill: '#0F5132', strokeWidth: 2, stroke: '#fff' }}
        activeDot={{ r: 6, strokeWidth: 0 }}
      />
    </LineChart>
  </ChartContainer>
);

export const PillarBarChart = ({ data }: { data: any[] }) => (
  <ChartContainer>
    <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis type="number" hide />
      <YAxis 
        dataKey="name" 
        type="category" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 12, fill: '#64748b' }}
      />
      <Tooltip cursor={{ fill: '#f8fafc' }} />
      <Bar dataKey="current" fill="#0F5132" radius={[0, 4, 4, 0]} barSize={20} />
      <Bar dataKey="target" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
    </BarChart>
  </ChartContainer>
);

export const DiversityDonutChart = ({ data }: { data: any[] }) => (
  <ChartContainer height={250}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ChartContainer>
);

export const RiskRadarChart = ({ data }: { data: any[] }) => (
  <ChartContainer height={300}>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid stroke="#e2e8f0" />
      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
      <Radar
        name="Risk Score"
        dataKey="A"
        stroke="#0F5132"
        fill="#0F5132"
        fillOpacity={0.6}
      />
      <Tooltip />
    </RadarChart>
  </ChartContainer>
);
