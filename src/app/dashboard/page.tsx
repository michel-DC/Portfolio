import { prisma } from "@/lib/prisma";
import { 
  Users, 
  Monitor, 
  Smartphone, 
  Globe, 
  Calendar
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const statsBySource = await prisma.visit.groupBy({
    by: ['source'],
    _count: { source: true },
    orderBy: { _count: { source: 'desc' } }
  });

  const totalVisits = await prisma.visit.count();
  
  const uniqueVisitors = await prisma.visit.groupBy({
    by: ['ip'],
    _count: { ip: true }
  }).then(res => res.length);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayVisits = await prisma.visit.count({
    where: {
      createdAt: {
        gte: today
      }
    }
  });

  const topSource = statsBySource[0]?.source || "N/A";

  // Groupement par device
  const statsByDevice = await prisma.visit.groupBy({
    by: ['device'],
    _count: { device: true }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
            <p className="text-zinc-500 mt-1">Suivi des performances de votre portfolio</p>
          </div>
          <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Tracking Enabled
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Visites" 
            value={totalVisits} 
            icon={<Users className="w-5 h-5" />} 
          />
          <StatCard 
            title="Visiteurs Uniques" 
            value={uniqueVisitors} 
            icon={<Users className="w-5 h-5" />} 
          />
          <StatCard 
            title={`Top Source: ${topSource}`} 
            value={statsBySource[0]?._count.source || 0} 
            icon={<Globe className="w-5 h-5" />} 
          />
          <StatCard 
            title="Visites du jour" 
            value={todayVisits} 
            icon={<Calendar className="w-5 h-5" />} 
            trend={todayVisits > 0 ? "Active" : undefined}
          />
        </div>

        {/* Sources Detail Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-zinc-500" />
            Détails par Source
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsBySource.map((s) => (
              <StatCard 
                key={s.source}
                title={s.source} 
                value={s._count.source} 
                icon={<Globe className="w-5 h-5" />} 
                trend={`${Math.round((s._count.source / totalVisits) * 100)}%`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Table Visites Récentes */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Dernières Visites</h2>
              <button className="text-sm text-zinc-500 hover:text-white transition-colors">Voir tout</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500 text-sm border-b border-white/5">
                    <th className="px-6 py-4 font-medium">Source</th>
                    <th className="px-6 py-4 font-medium">Appareil</th>
                    <th className="px-6 py-4 font-medium">OS / Browser</th>
                    <th className="px-6 py-4 font-medium text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {visits.map((visit) => (
                    <tr key={visit.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10">
                          {visit.source}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {visit.device === "Mobile" ? <Smartphone className="w-4 h-4 text-zinc-500" /> : <Monitor className="w-4 h-4 text-zinc-500" />}
                          <span className="text-sm">{visit.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <span className="text-zinc-100">{visit.os}</span>
                          <span className="text-zinc-500 mx-2">/</span>
                          <span className="text-zinc-400">{visit.browser}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm text-zinc-500">
                          {new Date(visit.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Répartition Appareils</h3>
              <div className="space-y-4">
                {statsByDevice.map((d) => (
                  <div key={d.device} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">{d.device}</span>
                      <span className="text-zinc-100 font-medium">{d._count.device}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${(d._count.device / totalVisits) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-6">Répartition Sources</h3>
              <div className="space-y-4">
                {statsBySource.map((s) => (
                  <div key={s.source} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">{s.source}</span>
                      <span className="text-zinc-100 font-medium">{s._count.source}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${(s._count.source / totalVisits) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Calendar className="w-24 h-24" />
               </div>
               <h3 className="text-lg font-semibold mb-2">Période</h3>
               <p className="text-zinc-500 text-sm mb-4">Statistiques calculées sur les 30 derniers jours.</p>
               <button className="w-full bg-white text-black text-sm font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors">
                  Exporter CSV
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: number, icon: React.ReactNode, trend?: string }) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl backdrop-blur-sm hover:border-white/10 transition-all">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-white/5 rounded-xl border border-white/5 text-zinc-400">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
