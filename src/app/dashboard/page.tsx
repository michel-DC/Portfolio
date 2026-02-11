import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Globe, 
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Target,
  Share2,
  Code2,
  Linkedin,
  Search
} from "lucide-react";
import { VisitLog } from "@/components/dashboard/visit-log";

export const dynamic = "force-dynamic";

const ALL_SOURCES = ["LinkedIn", "GitHub", "Indeed", "Share", "CV", "Google/Direct"];
const DEVICES = ["Desktop", "Mobile"];
const OS_LIST = ["Windows", "macOS", "Android", "iOS", "Linux"];

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  "LinkedIn": <Linkedin className="w-5 h-5" />,
  "GitHub": <Code2 className="w-5 h-5" />,
  "Indeed": <Target className="w-5 h-5" />,
  "Share": <Share2 className="w-5 h-5" />,
  "CV": <ArrowUpRight className="w-5 h-5" />,
  "Google/Direct": <Search className="w-5 h-5" />,
};

export default async function DashboardPage() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);

  // Stats
  const todayVisits = await prisma.visit.count({ where: { createdAt: { gte: today } } });
  const weekVisits = await prisma.visit.count({ where: { createdAt: { gte: lastWeek } } });
  const yesterdayVisits = await prisma.visit.count({ where: { createdAt: { gte: yesterday, lt: today } } });
  const evolution = yesterdayVisits === 0 ? (todayVisits > 0 ? 100 : 0) : Math.round(((todayVisits - yesterdayVisits) / yesterdayVisits) * 100);

  const statsBySourceRaw = await prisma.visit.groupBy({
    by: ['source'],
    _count: { source: true },
    where: { createdAt: { gte: lastWeek } }
  });

  const statsBySource = ALL_SOURCES.map(sourceName => {
    const found = statsBySourceRaw.find(s => s.source === sourceName);
    return { source: sourceName, count: found?._count.source || 0 };
  }).sort((a, b) => b.count - a.count);

  const topSource = statsBySource[0]?.count > 0 ? statsBySource[0].source : "N/A";

  // Graph Data
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
      fullDate: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    };
  });

  const chartData = days.map(day => {
    const dayData: any = { ...day };
    ALL_SOURCES.forEach(source => {
      dayData[source] = chartDataRaw.filter(v => {
        const vd = v.createdAt;
        return v.source === source && `${vd.getFullYear()}-${String(vd.getMonth() + 1).padStart(2, '0')}-${String(vd.getDate()).padStart(2, '0')}` === day.dateStr;
      }).length;
    });
    return dayData;
  });

  const maxVisitsInDay = Math.max(...chartData.map(d => ALL_SOURCES.reduce((acc, s) => acc + (d[s] as number), 0)), 1);
  const allVisits = await prisma.visit.findMany({ orderBy: { createdAt: "desc" }, take: 1000 });

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black p-6 md:p-10 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Header Moderne */}
        <div className="flex justify-between items-center pb-6 border-b border-zinc-200">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard Analytics</h1>
            <p className="text-sm text-zinc-500 font-medium">Vue d'ensemble • Portfolio Michel DJOUMESSI</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" /> Live Tracking
          </div>
        </div>

        {/* Ligne 1 : KPI Majeurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Aujourd'hui" value={todayVisits} icon={<Calendar className="w-5 h-5" />} description="Visites depuis 00h" />
          <StatCard title="Cette semaine" value={weekVisits} icon={<Users className="w-5 h-5" />} description="Total 7 derniers jours" />
          <StatCard title="Évolution" value={`${evolution > 0 ? '+' : ''}${evolution}%`} icon={evolution >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />} description="Vs hier" />
          <StatCard title="Source Top" value={topSource} icon={<ArrowUpRight className="w-5 h-5" />} description="Provenance majeure" />
        </div>

        {/* Ligne 2 : Détails par Source */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Trafic par Source</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {statsBySource.map((s) => (
              <StatCard 
                key={s.source}
                title={s.source}
                value={s.count}
                icon={SOURCE_ICONS[s.source] || <Globe className="w-5 h-5" />}
                description={`${Math.round((s.count / (weekVisits || 1)) * 100)}% du total`}
              />
            ))}
          </div>
        </div>

        {/* Ligne 3 : Graphique */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Activité sur 7 jours</h2>
            <div className="hidden md:flex gap-4">
              {ALL_SOURCES.map((source, i) => (
                <div key={source} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: `rgb(${i * 45}, ${i * 45}, ${i * 45})` }} />
                  <span className="text-[10px] text-zinc-500 font-bold uppercase">{source}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-2 border-b border-zinc-100 pb-4">
            {chartData.map((day) => {
              const totalDay = ALL_SOURCES.reduce((acc, s) => acc + (day[s] as number), 0);
              const height = (totalDay / maxVisitsInDay) * 100;
              return (
                <div key={day.dateStr} className="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end">
                  <div className="w-full max-w-[34px] flex flex-col-reverse bg-zinc-50 rounded-t-xl overflow-hidden shadow-inner" style={{ height: `${height}%` }}>
                    {ALL_SOURCES.map((source, i) => {
                      const val = day[source] as number;
                      if (val === 0) return null;
                      return <div key={source} className="w-full transition-all group-hover:brightness-110" style={{ height: `${(val / (totalDay || 1)) * 100}%`, backgroundColor: `rgb(${i * 45}, ${i * 45}, ${i * 45})` }} />;
                    })}
                  </div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase">{day.label}</span>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 bg-black text-white text-[11px] p-4 rounded-2xl shadow-2xl pointer-events-none z-10 transition-all border border-zinc-800">
                    <div className="font-bold mb-2 border-b border-zinc-800 pb-2">{day.fullDate}</div>
                    {ALL_SOURCES.map(s => day[s] > 0 && <div key={s} className="flex justify-between gap-6 py-0.5"><span className="text-zinc-400">{s}</span><span className="font-bold">{day[s]}</span></div>)}
                    <div className="mt-2 pt-2 border-t border-zinc-800 font-bold flex justify-between"><span>Total</span><span>{totalDay}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <VisitLog initialVisits={allVisits.map(v => ({ ...v, createdAt: v.createdAt.toISOString() }))} sources={ALL_SOURCES} devices={DEVICES} osList={OS_LIST} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string, value: string | number, icon: React.ReactNode, description: string }) {
  return (
    <div className="bg-white border border-zinc-200 p-6 rounded-3xl shadow-sm transition-all group">
      <div className="flex justify-between items-start mb-6 text-zinc-400 transition-colors group-hover:text-black">{icon}</div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{title}</p>
        <p className="text-3xl font-bold tracking-tighter text-black">{value}</p>
        <p className="text-[11px] text-zinc-500 font-medium">{description}</p>
      </div>
    </div>
  );
}