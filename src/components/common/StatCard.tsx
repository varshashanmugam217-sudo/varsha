import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
  progressPercent?: number;
  progressBarColor?: 'indigo' | 'purple' | 'emerald' | 'amber' | 'rose';
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendPositive = true,
  progressPercent,
  progressBarColor = 'indigo',
  icon,
  onClick
}) => {
  const getBarBg = () => {
    switch (progressBarColor) {
      case 'purple': return 'bg-purple-500';
      case 'emerald': return 'bg-emerald-500';
      case 'amber': return 'bg-amber-500';
      case 'rose': return 'bg-rose-500';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-[#141414] border border-[#222] hover:border-[#333] p-4 rounded-xl transition-all duration-200 shadow-sm ${
        onClick ? 'cursor-pointer hover:bg-[#181818]' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        {trend && (
          <div className={`text-[10px] font-semibold ${trendPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend}
          </div>
        )}
      </div>

      {progressPercent !== undefined && (
        <div className="mt-2.5 h-1.5 w-full bg-[#222] rounded-full overflow-hidden">
          <div 
            className={`h-full ${getBarBg()} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}

      {subtitle && (
        <p className="text-[10px] text-gray-400 mt-2 truncate font-medium">{subtitle}</p>
      )}
    </div>
  );
};
