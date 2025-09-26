import { MATI_HOTSPOTS, MATI_SPECIES } from './mati-hotspots'
import type { SpeciesRecord, SiteRecord, BiodiversityDataset } from './schema'

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

// Convert Mati hotspots to SiteRecord format
export function getSites(): SiteRecord[] { 
  return MATI_HOTSPOTS.map(hotspot => ({
    id: hotspot.id,
    name: hotspot.name,
    type: hotspot.type as any,
    summary: hotspot.summary,
    lat: hotspot.lat,
    lng: hotspot.lng,
    coordinates: { lat: hotspot.lat, lng: hotspot.lng },
    description: hotspot.summary,
    conservation: {
      status: hotspot.designation,
      area: hotspot.areaHectares || 0,
      stewardship: hotspot.stewardship
    }
  }))
}

// Convert to legacy format for compatibility  
export function getDataset(): BiodiversityDataset { 
  return {
    metadata: {
      region: "Davao Oriental",
      city: "Mati City", 
      lastUpdated: new Date().toISOString(),
      sources: ["DENR-BMB", "UNESCO", "Local Research"],
      notes: "Comprehensive biodiversity data for Mati City conservation areas"
    },
    sites: getSites(),
    flora: [],
    fauna: []
  }
}

// Convert Mati species to UnifiedSpecies format
export function getUnifiedSpecies(): UnifiedSpecies[] {
  return MATI_SPECIES.map(species => ({
    id: species.id,
    commonName: species.commonName,
    scientificName: species.scientificName,
    status: species.status,
    endemic: species.commonName.includes('Hamiguitan') || species.scientificName.includes('hamiguitanensis'),
    type: species.category,
    taxonomy: {
      kingdom: species.category === 'flora' ? 'Plantae' : 'Animalia',
      phylum: species.category === 'flora' ? 'Tracheophyta' : 'Chordata',
      class: species.category === 'flora' ? 'Magnoliopsida' : 'Aves',
      order: 'Unknown',
      family: 'Unknown',
      genus: species.scientificName.split(' ')[0],
      species: species.scientificName.split(' ')[1] || '',
      scientificName: species.scientificName
    },
    description: species.blurb,
    habitats: [species.habitat],
    siteIds: species.siteIds
  }))
}

export function findSpeciesById(id: string): any {
  return MATI_SPECIES.find(s => s.id === id)
}

export function findSiteById(id: string): SiteRecord | undefined {
  return getSites().find(s => s.id === id)
}