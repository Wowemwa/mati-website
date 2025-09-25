// Data schema definitions for biodiversity content
// These can be extended and eventually backed by a database / API.

export type ConservationStatus = 'DD' | 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX'

export interface Taxonomy {
  kingdom: string
  phylum?: string
  class?: string
  order?: string
  family?: string
  genus?: string
  species?: string
  scientificName: string
  authorship?: string
  synonyms?: string[]
}

export interface DistributionRecord {
  siteId: string
  coordinates?: [number, number]
  elevationM?: number
  habitatType?: string
  observationDate?: string // ISO date
  source?: string
  observer?: string
  abundance?: string
  notes?: string
}

export interface MediaAsset {
  type: 'image' | 'video' | 'model' | 'audio'
  url: string
  credit?: string
  license?: string
  caption?: string
  thumbnail?: string
}

export interface ThreatInfo {
  threats: string[]
  conservationActions?: string[]
  legalProtection?: string[]
  populationTrend?: 'increasing' | 'stable' | 'decreasing' | 'unknown'
}

export interface EcologyInfo {
  habitat: string
  diet?: string
  behavior?: string
  reproduction?: string
  ecosystemServices?: string[]
  phenology?: string
  interactions?: string[]
}

export interface SpeciesRecord {
  id: string
  commonName: string
  taxonomy: Taxonomy
  status: ConservationStatus
  endemic?: boolean
  invasive?: boolean
  description: string
  keyFacts?: string[]
  distribution: DistributionRecord[]
  media: MediaAsset[]
  ecology?: EcologyInfo
  threats?: ThreatInfo
  references?: string[]
  updatedAt?: string
}

export interface SiteRecord {
  id: string
  name: string
  type: 'marine' | 'terrestrial' | 'freshwater' | 'mixed'
  summary: string
  description?: string
  lat: number
  lng: number
  areaHectares?: number
  habitats?: string[]
  protectionStatus?: string
  keySpeciesIds?: string[]
  media?: MediaAsset[]
  references?: string[]
}

export interface FloraRecord extends SpeciesRecord {
  growthForm?: string // tree, shrub, herb, vine, etc
  leafType?: string
  floweringPeriod?: string
  uses?: string[] // ethnobotanical
}

export interface FaunaRecord extends SpeciesRecord {
  mobility?: string
  activityPattern?: string
  size?: string
  weight?: string
  lifespan?: string
}

export interface BiodiversityDataset {
  sites: SiteRecord[]
  flora: FloraRecord[]
  fauna: FaunaRecord[]
  metadata: {
    region: string
    city: string
    lastUpdated: string
    sources: string[]
    notes?: string
  }
}
