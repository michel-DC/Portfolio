"use client";

import { useState, useMemo } from "react";
import { 
  Monitor, 
  Smartphone, 
  ChevronLeft, 
  ChevronRight
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

  const filteredVisits = useMemo(() => {
    return initialVisits.filter((visit) => {
      const matchSource = !filterSource || visit.source === filterSource;
      const matchDevice = !filterDevice || visit.device === filterDevice;
      const matchOs = !filterOs || visit.os === filterOs;
      return matchSource && matchDevice && matchOs;
    });
  }, [initialVisits, filterSource, filterDevice, filterOs]);

  const totalPages = Math.ceil(filteredVisits.length / ITEMS_PER_PAGE);
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVisits.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVisits, currentPage]);

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-zinc-200 bg-zinc-50/30 flex flex-col lg:flex-row justify-between items-center gap-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Journal des Visites</h2>
        <div className="flex flex-wrap gap-2">
          <select className="text-[11px] font-bold uppercase bg-white border border-zinc-200 rounded-xl px-3 py-1.5 outline-none focus:border-black shadow-sm" value={filterSource} onChange={(e) => { setFilterSource(e.target.value); setCurrentPage(1); }}>
            <option value="">Toutes les sources</option>
            {sources.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="text-[11px] font-bold uppercase bg-white border border-zinc-200 rounded-xl px-3 py-1.5 outline-none focus:border-black shadow-sm" value={filterDevice} onChange={(e) => { setFilterDevice(e.target.value); setCurrentPage(1); }}>
            <option value="">Tous les appareils</option>
            {devices.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="text-[11px] font-bold uppercase bg-white border border-zinc-200 rounded-xl px-3 py-1.5 outline-none focus:border-black shadow-sm" value={filterOs} onChange={(e) => { setFilterOs(e.target.value); setCurrentPage(1); }}>
            <option value="">Tous les systèmes</option>
            {osList.map(os => <option key={os} value={os}>{os}</option>)}
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold border-b border-zinc-100 bg-zinc-50/20">
              <th className="px-8 py-5">Source</th>
              <th className="px-8 py-5">Appareil</th>
              <th className="px-8 py-5">Système / Browser</th>
              <th className="px-8 py-5 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {paginatedVisits.map((visit) => (
              <tr key={visit.id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="px-8 py-6 text-sm font-bold text-black">{visit.source}</td>
                <td className="px-8 py-6 flex items-center gap-3 text-sm font-medium text-zinc-600">
                  {visit.device === "Mobile" ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  {visit.device}
                </td>
                <td className="px-8 py-6 text-sm text-zinc-500 font-medium">{visit.os} <span className="text-zinc-300 mx-1">|</span> {visit.browser}</td>
                <td className="px-8 py-6 text-right text-sm text-zinc-400 font-medium">
                  {new Date(visit.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-zinc-100 flex justify-between items-center bg-zinc-50/30">
        <span className="text-[11px] font-bold text-zinc-400 uppercase">{filteredVisits.length} Entrées</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage <= 1} className="p-2 border border-zinc-200 rounded-xl bg-white transition-colors disabled:opacity-20"><ChevronLeft className="w-4 h-4 text-black" /></button>
          <span className="text-[11px] font-bold text-black">{currentPage} / {totalPages || 1}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage >= totalPages} className="p-2 border border-zinc-200 rounded-xl bg-white transition-colors disabled:opacity-20"><ChevronRight className="w-4 h-4 text-black" /></button>
        </div>
      </div>
    </div>
  );
}