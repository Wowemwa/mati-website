import { dataset } from './sample'
import type { SpeciesRecord, SiteRecord, BiodiversityDataset, FloraRecord, FaunaRecord } from './schema'

export interface UnifiedSpecies {
  id: string
  commonName: string
  scientificName: string
  status: string
  endemic?: boolean
  type: 'flora' | 'fauna'
  taxonomy: SpeciesRecord['taxonomy']
  description: string
  habitats: string[]
  siteIds: string[]
}

export function getDataset(): BiodiversityDataset { return dataset }

export function getSites(): SiteRecord[] { return dataset.sites }

export function getUnifiedSpecies(): UnifiedSpecies[] {
  const flora: UnifiedSpecies[] = dataset.flora.map(f => ({
    id: f.id,
    commonName: f.commonName,
    scientificName: f.taxonomy.scientificName,
    status: f.status,
    endemic: f.endemic,
    type: 'flora',
    taxonomy: f.taxonomy,
    description: f.description,
    habitats: Array.from(new Set(f.distribution.map(d => d.habitatType).filter(Boolean) as string[])),
    siteIds: Array.from(new Set(f.distribution.map(d => d.siteId)))
  }))
  const fauna: UnifiedSpecies[] = dataset.fauna.map(f => ({
    id: f.id,
    commonName: f.commonName,
    scientificName: f.taxonomy.scientificName,
    status: f.status,
    endemic: f.endemic,
    type: 'fauna',
    taxonomy: f.taxonomy,
    description: f.description,
    habitats: Array.from(new Set(f.distribution.map(d => d.habitatType).filter(Boolean) as string[])),
    siteIds: Array.from(new Set(f.distribution.map(d => d.siteId)))
  }))
  return [...flora, ...fauna]
}

export function findSpeciesById(id: string): FloraRecord | FaunaRecord | undefined {
  return dataset.flora.find(f => f.id === id) || dataset.fauna.find(f => f.id === id)
}

export function findSiteById(id: string): SiteRecord | undefined {
  return dataset.sites.find(s => s.id === id)
}
