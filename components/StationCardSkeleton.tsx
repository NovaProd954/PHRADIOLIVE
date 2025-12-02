import React from 'react';

const StationCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      <div className="relative aspect-square w-full bg-slate-100 animate-pulse"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse"></div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-50 mt-2">
            <div className="h-5 w-8 bg-slate-100 rounded animate-pulse"></div>
            <div className="h-3 w-10 bg-slate-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default StationCardSkeleton;