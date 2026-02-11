import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Globe, 
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight
} from "lucide-react";
import { VisitLog } from "@/components/dashboard/visit-log";

export const dynamic = "force-dynamic";

const ALL_SOURCES = ["LinkedIn", "GitHub", "Indeed", "Share", "CV", "Google/Direct"];
const DEVICES = ["Desktop", "Mobile"];
const OS_LIST = ["Windows", "macOS", "Android", "iOS", "Linux"];

export default async function DashboardPage() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);

  // 1. Stats Globales
  const todayVisits = await prisma.visit.count({ where: { createdAt: { gte: today } } });
  const weekVisits = await prisma.visit.count({ where: { createdAt: { gte: lastWeek } } });
  
  const yesterdayVisits = await prisma.visit.count({ 
    where: { createdAt: { gte: yesterday, lt: today } } 
  });
  
  const evolution = yesterdayVisits === 0 
    ? (todayVisits > 0 ? 100 : 0) 
    : Math.round(((todayVisits - yesterdayVisits) / yesterdayVisits) * 100);

  // Stats par Source (pour Top Source et répartition)
  const statsBySourceRaw = await prisma.visit.groupBy({
    by: ['source'],
    _count: { source: true },
    where: { createdAt: { gte: lastWeek } }
  });

  const statsBySource = ALL_SOURCES.map(sourceName => {
    const found = statsBySourceRaw.find(s => s.source === sourceName);
    return {
      source: sourceName,
      count: found?._count.source || 0
    };
  }).sort((a, b) => b.count - a.count);

  const topSource = statsBySource[0]?.count > 0 ? statsBySource[0].source : "N/A";

  // 2. Données Graphique
  const chartDataRaw = await prisma.visit.findMany({
    where: { createdAt: { gte: lastWeek } },
    select: { createdAt: true, source: true }
  });

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lastWeek);
    d.setDate(lastWeek.getDate() + i);
    return {
      dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
      label: d.toLocaleDateString('fr-FR', { weekday: 'short' }),
      fullDate: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
    };
  });

  const chartData = days.map(day => {
    const dayData: any = { ...day };
    ALL_SOURCES.forEach(source => {
      dayData[source] = chartDataRaw.filter(v => {
        const vd = v.createdAt;
        const vDateStr = `${vd.getFullYear()}-${String(vd.getMonth() + 1).padStart(2, '0')}-${String(vd.getDate()).padStart(2, '0')}`;
        return v.source === source && vDateStr === day.dateStr;
      }).length;
    });
    return dayData;
  });

  const maxVisitsInDay = Math.max(...chartData.map(d => 
    ALL_SOURCES.reduce((acc, s) => acc + (d[s] as number), 0)
  ), 1);

  // 3. Toutes les visites pour le journal (local filtering)
  const allVisits = await prisma.visit.findMany({
    orderBy: { createdAt: "desc" },
    take: 1000, // On limite aux 1000 dernières pour la performance
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">Analytics</h1>
            <p className="text-gray-500 mt-1">Tableau de bord de suivi du portfolio</p>
          </div>
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600">Live</span>
          </div>
        </div>

        {/* Ligne 1 : Stats Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Aujourd'hui" 
            value={todayVisits} 
            icon={<Calendar className="w-5 h-5" />} 
            description="Visites depuis minuit"
          />
          <StatCard 
            title="Cette semaine" 
            value={weekVisits} 
            icon={<Users className="w-5 h-5" />} 
            description="Total 7 derniers jours"
          />
          <StatCard 
            title="Évolution" 
            value={`${evolution > 0 ? '+' : ''}${evolution}%`} 
            icon={evolution >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />} 
            description="Comparé à hier"
            trend={evolution >= 0 ? 'up' : 'down'}
          />
          <StatCard 
            title="Top Source" 
            value={topSource} 
            icon={<ArrowUpRight className="w-5 h-5" />} 
            description="Canal principal"
          />
        </div>

        {/* Ligne 2 : Détails par Source */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Répartition par Source</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {statsBySource.map((s) => (
              <div key={s.source} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
                <p className="text-xs font-medium text-gray-500 mb-1">{s.source}</p>
                <p className="text-2xl font-bold text-black">{s.count}</p>
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="bg-black h-full transition-all duration-500" 
                    style={{ width: `${Math.round((s.count / (weekVisits || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ligne 3 : Graphique */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-8">Évolution Hebdomadaire (7j)</h2>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-gray-100 pb-2">
            {chartData.map((day) => {
              const totalDay = ALL_SOURCES.reduce((acc, s) => acc + (day[s] as number), 0);
              const height = (totalDay / maxVisitsInDay) * 100;
              
              return (
                <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                  <div className="w-full max-w-[32px] flex flex-col-reverse rounded-t bg-gray-100 overflow-hidden" style={{ height: `${height}%` }}>
                    {ALL_SOURCES.map((source, i) => {
                      const val = day[source] as number;
                      if (val === 0) return null;
                      return (
                        <div 
                          key={source} 
                          className="w-full hover:opacity-80 transition-all"
                          style={{ 
                            height: `${(val / (totalDay || 1)) * 100}%`,
                            backgroundColor: `hsl(${i * 45}, 10%, ${20 + (i * 10)}%)`
                          }}
                          title={`${source}: ${val}`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium uppercase">
                    {day.label}
                  </span>
                  
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] p-2 rounded shadow-xl pointer-events-none z-10 transition-opacity">
                    <div className="font-bold mb-1 border-b border-gray-800 pb-1">{day.fullDate}</div>
                    {ALL_SOURCES.map(s => {
                      const val = day[s] as number;
                      if (val === 0) return null;
                      return (
                        <div key={s} className="flex justify-between gap-4 py-0.5">
                          <span>{s}</span>
                          <span>{val}</span>
                        </div>
                      );
                    })}
                    <div className="mt-1 pt-1 border-t border-gray-800 font-bold">Total: {totalDay}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journal des Visites (Client Side Logic) */}
        <VisitLog 
          initialVisits={allVisits.map(v => ({
            ...v,
            createdAt: v.createdAt.toISOString()
          }))}
          sources={ALL_SOURCES}
          devices={DEVICES}
          osList={OS_LIST}
        />

      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend 
}: { 
  title: string, 
  value: string | number, 
  icon: React.ReactNode, 
  description: string,
  trend?: 'up' | 'down'
}) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-1 rounded ${
            trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
          }`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-black mt-1">{value}</p>
        <p className="text-[10px] text-gray-400 mt-2 font-medium">{description}</p>
      </div>
    </div>
  );
}