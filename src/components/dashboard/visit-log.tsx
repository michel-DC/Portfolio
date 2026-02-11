"use client";

import { useState, useMemo } from "react";
import { 
  Monitor, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight, 
  Filter 
} from "lucide-react";

interface Visit {
  id: string;
  source: string;
  path: string;
  browser: string;
  os: string;
  device: string;
  createdAt: Date | string;
}

interface VisitLogProps {
  initialVisits: Visit[];
  sources: string[];
  devices: string[];
  osList: string[];
}

const ITEMS_PER_PAGE = 10;

export function VisitLog({ initialVisits, sources, devices, osList }: VisitLogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSource, setFilterSource] = useState("");
  const [filterDevice, setFilterDevice] = useState("");
  const [filterOs, setFilterOs] = useState("");

  // Filtrage local
  const filteredVisits = useMemo(() => {
    return initialVisits.filter((visit) => {
      const matchSource = !filterSource || visit.source === filterSource;
      const matchDevice = !filterDevice || visit.device === filterDevice;
      const matchOs = !filterOs || visit.os === filterOs;
      return matchSource && matchDevice && matchOs;
    });
  }, [initialVisits, filterSource, filterDevice, filterOs]);

  // Pagination locale
  const totalPages = Math.ceil(filteredVisits.length / ITEMS_PER_PAGE);
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVisits.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVisits, currentPage]);

  // Reset page quand on filtre
  const handleFilterChange = (type: string, value: string) => {
    if (type === "source") setFilterSource(value);
    if (type === "device") setFilterDevice(value);
    if (type === "os") setFilterOs(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilterSource("");
    setFilterDevice("");
    setFilterOs("");
    setCurrentPage(1);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Journal des Visites</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filtres :
            </span>
            
            <select 
              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
              value={filterSource}
              onChange={(e) => handleFilterChange("source", e.target.value)}
            >
              <option value="">Toutes les sources</option>
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
              value={filterDevice}
              onChange={(e) => handleFilterChange("device", e.target.value)}
            >
              <option value="">Tous les appareils</option>
              {devices.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select 
              className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none focus:border-black transition-colors"
              value={filterOs}
              onChange={(e) => handleFilterChange("os", e.target.value)}
            >
              <option value="">Tous les systèmes</option>
              {osList.map(os => <option key={os} value={os}>{os}</option>)}
            </select>

            {(filterSource || filterDevice || filterOs) && (
              <button 
                onClick={clearFilters}
                className="text-[10px] text-red-500 hover:underline font-bold uppercase"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-[11px] uppercase tracking-wider font-bold bg-gray-50">
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Appareil</th>
              <th className="px-6 py-4">Système</th>
              <th className="px-6 py-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedVisits.length > 0 ? (
              paginatedVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-black px-2 py-1 bg-gray-100 rounded">
                      {visit.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      {visit.device === "Mobile" ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                      <span className="text-xs font-medium">{visit.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 font-medium">
                      {visit.os} <span className="text-gray-300 mx-1">/</span> {visit.browser}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(visit.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                  Aucune visite ne correspond à vos filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Locale */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
        <p className="text-xs text-gray-500">
          Affichage de <span className="font-bold text-black">{paginatedVisits.length}</span> sur <span className="font-bold text-black">{filteredVisits.length}</span> visites
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
            className={`p-1.5 rounded border border-gray-200 transition-colors ${
              currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white text-black'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-black px-2">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage >= totalPages}
            className={`p-1.5 rounded border border-gray-200 transition-colors ${
              currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white text-black'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
