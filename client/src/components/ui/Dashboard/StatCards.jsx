import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-400">{stat.title}</span>
              <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                {stat.trend && <ArrowUpRight size={12} />}
                <span>{stat.sub}</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
}