import { useParams, Link } from 'react-router-dom'
import { findSpeciesById, findSiteById } from '../data/adapters'
import AnimatedText from '../components/AnimatedText'

export default function SpeciesDetail() {
  const { id } = useParams()
  const record = id ? findSpeciesById(id) : undefined
  if (!record) return <p className="text-sm">Species not found.</p>
  const sites = record.distribution.map(d => findSiteById(d.siteId)).filter(Boolean)
  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold gradient-text-brand"><AnimatedText text={record.commonName} /></h1>
        <p className="italic text-gray-600 dark:text-gray-300 font-medium">{record.taxonomy.scientificName}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold">{record.status}</span>
          {record.endemic && <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white font-semibold">Endemic</span>}
        </div>
      </header>

      <section className="soft-surface p-6 space-y-4">
        <h2 className="text-lg font-bold">Overview</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{record.description}</p>
        {record.keyFacts && record.keyFacts.length > 0 && (
          <ul className="flex flex-wrap gap-2 text-xs mt-2">
            {record.keyFacts.map(f => <li key={f} className="px-3 py-1 rounded-full bg-white/60 dark:bg-slate-700/50 border border-white/40 dark:border-white/10">{f}</li>)}
          </ul>
        )}
      </section>

      {record.ecology && (
        <section className="soft-surface p-6 space-y-4">
          <h2 className="text-lg font-bold">Ecology</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Habitat</h3>
              <p>{record.ecology.habitat}</p>
            </div>
            {record.ecology.diet && <div><h3 className="font-semibold mb-1">Diet</h3><p>{record.ecology.diet}</p></div>}
            {record.ecology.behavior && <div><h3 className="font-semibold mb-1">Behavior</h3><p>{record.ecology.behavior}</p></div>}
            {record.ecology.reproduction && <div><h3 className="font-semibold mb-1">Reproduction</h3><p>{record.ecology.reproduction}</p></div>}
            {record.ecology.ecosystemServices && record.ecology.ecosystemServices.length>0 && (
              <div className="sm:col-span-2">
                <h3 className="font-semibold mb-1">Ecosystem Services</h3>
                <ul className="flex flex-wrap gap-2 text-xs">
                  {record.ecology.ecosystemServices.map(s => <li key={s} className="px-3 py-1 rounded-full bg-green-50 dark:bg-slate-700/50 text-green-700 dark:text-green-300 border border-green-200/50 dark:border-white/10">{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {record.threats && (
        <section className="soft-surface p-6 space-y-4">
          <h2 className="text-lg font-bold">Threats & Conservation</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Threats</h3>
              <ul className="list-disc pl-5 space-y-1">
                {record.threats.threats.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
            {record.threats.conservationActions && (
              <div>
                <h3 className="font-semibold mb-1">Conservation Actions</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {record.threats.conservationActions.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            )}
            {record.threats.populationTrend && (
              <div>
                <h3 className="font-semibold mb-1">Population Trend</h3>
                <p className="capitalize">{record.threats.populationTrend}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="soft-surface p-6 space-y-4">
        <h2 className="text-lg font-bold">Distribution</h2>
        <div className="grid sm:grid-cols-2 gap-6 text-sm">
          {record.distribution.map((d,i) => {
            const site = findSiteById(d.siteId)
            return (
              <div key={i} className="p-4 rounded-xl bg-white/60 dark:bg-slate-700/50 border border-white/40 dark:border-white/10">
                <h3 className="font-semibold mb-1">{site ? <Link to={`/site/${site.id}`} className="text-green-700 dark:text-green-300 hover:underline">{site.name}</Link> : d.siteId}</h3>
                <p className="text-xs text-gray-500">{d.habitatType || 'Habitat unspecified'}</p>
                <ul className="mt-2 text-xs space-y-1">
                  {d.elevationM && <li>Elevation: {d.elevationM} m</li>}
                  {d.abundance && <li>Abundance: {d.abundance}</li>}
                  {d.observer && <li>Observer: {d.observer}</li>}
                  {d.notes && <li>Notes: {d.notes}</li>}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {record.references && record.references.length>0 && (
        <section className="soft-surface p-6 space-y-4">
          <h2 className="text-lg font-bold">References</h2>
          <ul className="list-disc pl-6 text-sm space-y-1">
            {record.references.map(r => <li key={r}>{r}</li>)}
          </ul>
        </section>
      )}

      <div className="pt-4">
        <Link to="/biodiversity" className="text-sm font-semibold text-green-700 dark:text-green-300 hover:underline">← Back to Explorer</Link>
      </div>
    </div>
  )
}
