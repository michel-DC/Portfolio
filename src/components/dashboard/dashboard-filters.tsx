"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import Link from "next/link";

interface DashboardFiltersProps {
  sources: string[];
  devices: string[];
  osList: string[];
  initialFilters: {
    source?: string;
    device?: string;
    os?: string;
  };
}

export function DashboardFilters({ 
  sources, 
  devices, 
  osList, 
  initialFilters 
}: DashboardFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const hasFilters = initialFilters.source || initialFilters.device || initialFilters.os;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
        <Filter className="w-3 h-3" /> Filtres :
      </span>
      
      {/* Filtre Source */}
      <select 
        className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
        value={initialFilters.source || ""}
        onChange={(e) => handleFilterChange("source", e.target.value)}
      >
        <option value="">Toutes les sources</option>
        {sources.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Filtre Device */}
      <select 
        className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
        value={initialFilters.device || ""}
        onChange={(e) => handleFilterChange("device", e.target.value)}
      >
        <option value="">Tous les appareils</option>
        {devices.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      {/* Filtre OS */}
      <select 
        className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
        value={initialFilters.os || ""}
        onChange={(e) => handleFilterChange("os", e.target.value)}
      >
        <option value="">Tous les systèmes</option>
        {osList.map(os => <option key={os} value={os}>{os}</option>)}
      </select>

      {hasFilters && (
        <Link href="/dashboard" className="text-[10px] text-red-500 hover:underline font-bold uppercase">
          Effacer
        </Link>
      )}
    </div>
  );
}
