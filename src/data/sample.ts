import { BiodiversityDataset } from './schema'

// NOTE: This is a placeholder scaffold. Accurate, comprehensive biodiversity
// data for Mati City requires consulting primary sources (DENR-BMB, iNaturalist
// GBIF occurrences, local LGU reports, protected area management plans, UNESCO
// Mount Hamiguitan dossiers, peer‑reviewed literature). Manual curation and
// data licensing review are needed before production use.

export const dataset: BiodiversityDataset = {
  metadata: {
    region: 'Davao Oriental',
    city: 'Mati City',
    lastUpdated: new Date().toISOString(),
    sources: [
      'UNESCO Mount Hamiguitan Range Wildlife Sanctuary documentation',
      'DENR-BMB public species lists (where available)',
      'Open biodiversity repositories (e.g., GBIF occurrence metadata)',
      'Secondary academic literature (pending citation extraction)'
    ],
    notes: 'This dataset is an early structural scaffold; values are illustrative only.'
  },
  sites: [
    {
      id: 'mount-hamiguitan',
      name: 'Mount Hamiguitan Range Wildlife Sanctuary',
      type: 'terrestrial',
      summary: 'UNESCO World Heritage Site noted for high endemism and pygmy forest ecosystem.',
      description: 'Characterized by mossy-pygmy forests, dipterocarp stands, montane habitats supporting diverse endemic flora and fauna.',
      lat: 6.814,
      lng: 126.168,
      areaHectares: 6834,
      habitats: ['pygmy forest', 'montane forest', 'dipterocarp forest'],
      protectionStatus: 'Protected Area (RA 9303); UNESCO World Heritage Site',
      keySpeciesIds: ['philippine-eagle', 'pitcher-hamiguitan'],
      references: ['UNESCO Nomination Dossier 2014']
    },
    {
      id: 'pujada-bay',
      name: 'Pujada Bay',
      type: 'marine',
      summary: 'Productive marine bay with coral reefs, seagrass beds, and mangrove stands supporting marine megafauna.',
      lat: 6.955,
      lng: 126.234,
      habitats: ['coral reef', 'seagrass', 'mangrove'],
      protectionStatus: 'Declared protected seascape (local ordinances)',
      keySpeciesIds: ['dugong-dugong', 'green-sea-turtle']
    }
  ],
  flora: [
    {
      id: 'pitcher-hamiguitan',
      commonName: 'Hamiguitan Pitcher Plant',
      taxonomy: {
        kingdom: 'Plantae',
        phylum: 'Tracheophyta',
        class: 'Magnoliopsida',
        order: 'Caryophyllales',
        family: 'Nepenthaceae',
        genus: 'Nepenthes',
        species: 'N. hamiguitanensis',
        scientificName: 'Nepenthes hamiguitanensis'
      },
      status: 'EN',
      endemic: true,
      description: 'Endemic pitcher plant restricted to ultramafic soils of Mt. Hamiguitan pygmy forest, notable for its distinct pitcher morphology.',
      keyFacts: ['Ultramafic specialist', 'Carnivorous pitfall traps', 'High conservation concern'],
      distribution: [
        { siteId: 'mount-hamiguitan', habitatType: 'pygmy forest', elevationM: 1100 }
      ],
      media: [],
      ecology: {
        habitat: 'Ultramafic pygmy forest with stunted vegetation',
        diet: 'Insect prey captured via pitfall mechanism',
        ecosystemServices: ['Microhabitat for invertebrates']
      },
      threats: {
        threats: ['Habitat disturbance', 'Over-collection (potential)'],
        conservationActions: ['Strict protection enforcement', 'Habitat monitoring'],
        populationTrend: 'unknown'
      },
      references: ['Peer-reviewed taxonomic description (2009+)']
    },
    {
      id: 'narra-tree',
      commonName: 'Narra',
      taxonomy: {
        kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Magnoliopsida', order: 'Fabales', family: 'Fabaceae', genus: 'Pterocarpus', species: 'P. indicus', scientificName: 'Pterocarpus indicus'
      },
      status: 'LC',
      description: 'Philippine national tree valued for hardwood and ecological role in lowland forests.',
      keyFacts: ['Nitrogen fixer', 'Culturally significant'],
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'lowland dipterocarp', elevationM: 200 } ],
      media: [],
      ecology: { habitat: 'Lowland to lower montane forest', ecosystemServices: ['Soil enrichment', 'Timber (regulated)'] },
      threats: { threats: ['Selective logging (historical)'], populationTrend: 'unknown' },
      references: ['DENR native tree list']
    },
    {
      id: 'white-lauan',
      commonName: 'White Lauan',
      taxonomy: {
        kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Magnoliopsida', order: 'Malvales', family: 'Dipterocarpaceae', genus: 'Shorea', species: 'S. contorta', scientificName: 'Shorea contorta'
      },
      status: 'VU',
      description: 'Commercial dipterocarp species forming part of mixed dipterocarp stands.',
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'dipterocarp forest', elevationM: 350 } ],
      media: [],
      ecology: { habitat: 'Primary and residual dipterocarp forest', phenology: 'Flowering irregular, mast events', ecosystemServices: ['Carbon storage'] },
      threats: { threats: ['Habitat loss', 'Past logging'], populationTrend: 'decreasing' },
      references: ['IUCN Red List (regional context)']
    },
    {
      id: 'tree-fern',
      commonName: 'Tree Fern',
      taxonomy: { kingdom: 'Plantae', phylum: 'Pteridophyta', class: 'Polypodiopsida', order: 'Cyatheales', family: 'Cyatheaceae', genus: 'Cyathea', scientificName: 'Cyathea sp.' },
      status: 'LC',
      description: 'Arborescent fern common in moist montane and disturbed forest edges.',
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'montane forest', elevationM: 900 } ],
      media: [],
      ecology: { habitat: 'Montane and secondary forest', ecosystemServices: ['Microhabitat structure'] },
      threats: { threats: ['Collection (ornamental)'], populationTrend: 'unknown' },
      references: ['General floristic surveys']
    },
    {
      id: 'epiphytic-orchid',
      commonName: 'Epiphytic Orchid',
      taxonomy: { kingdom: 'Plantae', phylum: 'Tracheophyta', class: 'Liliopsida', order: 'Asparagales', family: 'Orchidaceae', genus: 'Dendrobium', scientificName: 'Dendrobium sp.' },
      status: 'DD',
      description: 'Representative epiphytic orchid occupying mossy branches in humid forest strata.',
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'mossy forest', elevationM: 1000 } ],
      media: [],
      ecology: { habitat: 'Epiphytic niches on mature trees', interactions: ['Pollination by insects'] },
      threats: { threats: ['Over-collection'], populationTrend: 'unknown' },
      references: ['Orchid hobbyist field notes (verification needed)']
    }
  ],
  fauna: [
    {
      id: 'philippine-eagle',
      commonName: 'Philippine Eagle',
      taxonomy: {
        kingdom: 'Animalia',
        phylum: 'Chordata',
        class: 'Aves',
        order: 'Accipitriformes',
        family: 'Accipitridae',
        genus: 'Pithecophaga',
        species: 'P. jefferyi',
        scientificName: 'Pithecophaga jefferyi'
      },
      status: 'CR',
      endemic: true,
      description: 'Critically endangered apex forest raptor endemic to the Philippines; presence indicates high-quality forest habitat.',
      keyFacts: ['National bird', 'Low reproductive rate', 'Forest apex predator'],
      distribution: [
        { siteId: 'mount-hamiguitan', habitatType: 'montane forest', elevationM: 900 }
      ],
      media: [],
      ecology: {
        habitat: 'Primary dipterocarp to montane forest',
        diet: 'Primarily small to medium mammals, birds, reptiles',
        reproduction: 'Single egg clutch; extended parental care',
        ecosystemServices: ['Indicator of forest integrity']
      },
      threats: {
        threats: ['Deforestation', 'Hunting', 'Food scarcity'],
        conservationActions: ['Nest protection', 'Forest conservation programs'],
        populationTrend: 'decreasing'
      },
      references: ['DENR-BMB species profile', 'IUCN Red List']
    },
    {
      id: 'dugong-dugong',
      commonName: 'Dugong',
      taxonomy: {
        kingdom: 'Animalia',
        phylum: 'Chordata',
        class: 'Mammalia',
        order: 'Sirenia',
        family: 'Dugongidae',
        genus: 'Dugong',
        species: 'D. dugon',
        scientificName: 'Dugong dugon'
      },
      status: 'VU',
      description: 'Large herbivorous marine mammal dependent on healthy seagrass meadows for foraging.',
      distribution: [
        { siteId: 'pujada-bay', habitatType: 'seagrass', observer: 'local reports', notes: 'Opportunistic sightings' }
      ],
      media: [],
      ecology: {
        habitat: 'Coastal seagrass meadows',
        diet: 'Seagrass species (e.g., Halophila, Halodule)',
        ecosystemServices: ['Grazing maintains seagrass productivity']
      },
      threats: {
        threats: ['Boat strikes', 'Entanglement', 'Habitat degradation'],
        conservationActions: ['Boat speed regulation', 'Seagrass mapping & protection'],
        populationTrend: 'decreasing'
      },
      references: ['IUCN Red List', 'Regional marine mammal survey notes']
    },
    {
      id: 'green-sea-turtle',
      commonName: 'Green Sea Turtle',
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Testudines', family: 'Cheloniidae', genus: 'Chelonia', species: 'C. mydas', scientificName: 'Chelonia mydas' },
      status: 'EN',
      description: 'Globally endangered marine turtle utilizing seagrass and coral reef habitats for feeding and developmental stages.',
      distribution: [ { siteId: 'pujada-bay', habitatType: 'coral reef', notes: 'Foraging juvenile sightings' } ],
      media: [],
      ecology: { habitat: 'Coral reefs and seagrass beds', diet: 'Algae and seagrass (adults)' },
      threats: { threats: ['Bycatch', 'Habitat degradation', 'Egg poaching'], populationTrend: 'decreasing' },
      references: ['IUCN Red List']
    },
    {
      id: 'hawksbill-turtle',
      commonName: 'Hawksbill Turtle',
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Testudines', family: 'Cheloniidae', genus: 'Eretmochelys', species: 'E. imbricata', scientificName: 'Eretmochelys imbricata' },
      status: 'CR',
      description: 'Critically endangered marine turtle associated with coral reef habitats; important for reef health via spongivory.',
      distribution: [ { siteId: 'pujada-bay', habitatType: 'coral reef', notes: 'Occasional reef patrol reports' } ],
      media: [],
      ecology: { habitat: 'Fringing and patch reefs', diet: 'Sponges and invertebrates' },
      threats: { threats: ['Illegal trade', 'Bycatch', 'Coral reef decline'], populationTrend: 'decreasing' },
      references: ['IUCN Red List']
    },
    {
      id: 'giant-clam',
      commonName: 'Giant Clam',
      taxonomy: { kingdom: 'Animalia', phylum: 'Mollusca', class: 'Bivalvia', order: 'Cardiida', family: 'Cardiidae', genus: 'Tridacna', species: 'T. gigas', scientificName: 'Tridacna gigas' },
      status: 'VU',
      description: 'Large reef-dwelling bivalve contributing to reef structure and water filtration.',
      distribution: [ { siteId: 'pujada-bay', habitatType: 'coral reef', notes: 'Transplanted/restored populations (verification needed)' } ],
      media: [],
      ecology: { habitat: 'Shallow reef flats', ecosystemServices: ['Bio-reef building', 'Water filtration'] },
      threats: { threats: ['Overharvesting', 'Habitat loss'], conservationActions: ['Restocking programs'], populationTrend: 'decreasing' },
      references: ['Regional reef restoration notes']
    },
    {
      id: 'mindanao-hornbill',
      commonName: 'Mindanao Hornbill',
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Aves', order: 'Bucerotiformes', family: 'Bucerotidae', genus: 'Penelopides', species: 'P. affinis', scientificName: 'Penelopides affinis' },
      status: 'NT',
      description: 'Small forest hornbill important seed disperser in lowland to montane forests.',
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'montane forest', elevationM: 750 } ],
      media: [],
      ecology: { habitat: 'Primary and secondary forest', diet: 'Fruits, insects', ecosystemServices: ['Seed dispersal'] },
      threats: { threats: ['Habitat fragmentation', 'Hunting'], populationTrend: 'decreasing' },
      references: ['IUCN Red List']
    },
    {
      id: 'flying-fox',
      commonName: 'Large Flying Fox',
      taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Chiroptera', family: 'Pteropodidae', genus: 'Pteropus', species: 'P. vampyrus', scientificName: 'Pteropus vampyrus' },
      status: 'NT',
      description: 'Large fruit bat contributing to pollination and seed dispersal across forest landscapes.',
      distribution: [ { siteId: 'mount-hamiguitan', habitatType: 'lowland to montane ecotone', elevationM: 400 } ],
      media: [],
      ecology: { habitat: 'Roosts in large emergent trees', diet: 'Fruits and nectar', ecosystemServices: ['Pollination', 'Seed dispersal'] },
      threats: { threats: ['Roost disturbance', 'Hunting'], populationTrend: 'decreasing' },
      references: ['Regional chiropteran survey']
    }
  ]
}
