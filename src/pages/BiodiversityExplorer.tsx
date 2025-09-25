import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { getUnifiedSpecies, getSites } from '../data/adapters'
import { Link } from 'react-router-dom'
import AnimatedText from '../components/AnimatedText'
import { WaveIcon, MountainIcon, SpeciesIcon } from '../components/Icons'

const STATUS_ORDER = ['CR','EN','VU','NT','LC','DD']

export default function BiodiversityExplorer() {
  const allSpecies = useMemo(()=>getUnifiedSpecies(),[])
  const sites = useMemo(()=>getSites(),[])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<'all'|'flora'|'fauna'>('all')
  const [siteFilter, setSiteFilter] = useState<string>('all')
  const [endemicOnly, setEndemicOnly] = useState(false)

  const fuse = useMemo(()=>new Fuse(allSpecies, { keys: ['commonName','scientificName','description','habitats'], threshold: 0.36 }),[allSpecies])
  const results = useMemo(()=>{
    let base = query.trim() ? fuse.search(query).map(r=>r.item) : allSpecies
    if (statusFilter !== 'all') base = base.filter(s => s.status === statusFilter)
    if (typeFilter !== 'all') base = base.filter(s => s.type === typeFilter)
    if (siteFilter !== 'all') base = base.filter(s => s.siteIds.includes(siteFilter))
    if (endemicOnly) base = base.filter(s => s.endemic)
    return base.sort((a,b)=> STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status))
  },[query,fuse,statusFilter,typeFilter,siteFilter,endemicOnly,allSpecies])

  return (
    <div className="space-y-10">
      <header className="space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <AnimatedText text="Biodiversity Explorer" />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Search, filter, and explore consolidated flora & fauna records for the Mati City region
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
          <div className="flex-1 relative">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search species (common, scientific, habitat)..." className="w-full px-5 py-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500/40" />
            {query && <button onClick={()=>setQuery('')} className="absolute top-1/2 -translate-y-1/2 right-4 text-sm text-gray-500 hover:text-green-600">Clear</button>}
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            {['all','CR','EN','VU','NT','LC','DD'].map(s => (
              <button key={s} onClick={()=>setStatusFilter(s)} className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all ${statusFilter===s? 'bg-gradient-to-r from-green-600 to-blue-600 text-white border-transparent shadow-lg':'bg-white/60 dark:bg-slate-700/50 border-white/40 dark:border-white/10 hover:border-green-400'}`}>{s==='all'?'Status':s}</button>
            ))}
            {['all','flora','fauna'].map(t => (
              <button key={t} onClick={()=>setTypeFilter(t as any)} className={`px-4 py-2 rounded-xl border backdrop-blur-sm transition-all ${typeFilter===t? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-lg':'bg-white/60 dark:bg-slate-700/50 border-white/40 dark:border-white/10 hover:border-purple-400'}`}>{t}</button>
            ))}
            <select value={siteFilter} onChange={e=>setSiteFilter(e.target.value)} className="px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 focus:outline-none">
              <option value="all">All Sites</option>
              {sites.map(s=> <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-white/10 cursor-pointer">
              <input type="checkbox" checked={endemicOnly} onChange={e=>setEndemicOnly(e.target.checked)} /> Endemic
            </label>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>{results.length} result{results.length!==1 && 's'} • {query ? 'Filtered' : 'All'} dataset</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map(s => (
          <div key={s.id} className="group soft-surface overflow-hidden p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors">{s.commonName}</h3>
              <span className="text-xs px-3 py-1 rounded-full font-medium bg-white/60 dark:bg-slate-700/60 border border-white/40 dark:border-white/10">{s.type}</span>
            </div>
            <p className="text-xs font-medium italic text-gray-500 mb-3 truncate">{s.scientificName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{s.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {s.habitats.slice(0,3).map(h => <span key={h} className="text-[10px] px-2 py-1 rounded-full bg-green-50 dark:bg-slate-700/50 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-white/10">{h}</span>)}
              {s.endemic && <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 dark:bg-slate-700/50 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-white/10">Endemic</span>}
            </div>
            <div className="flex items-center justify-between">
              <Link to={`/biodiversity/${s.id}`} className="text-sm font-semibold text-green-700 dark:text-green-300 hover:underline flex items-center gap-1">View <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/></svg></Link>
              <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white shadow">{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
