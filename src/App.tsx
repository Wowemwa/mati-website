import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState, useRef } from 'react'
import L from 'leaflet'
import useTheme from './useTheme'
import { Card, SoftCard, Badge, Button, SectionTitle, MediaThumb } from './components/UI'
import AnimatedText from './components/AnimatedText'
import { WaveIcon, MountainIcon, SpeciesIcon, ARIcon, InfoIcon, MapIcon, CameraIcon, TargetIcon, StarIcon, MissionIcon, EducationIcon, TechIcon, ConservationIcon, LeafIcon } from './components/Icons'
import BiodiversityExplorer from './pages/BiodiversityExplorer'
import SpeciesDetail from './pages/SpeciesDetail'
import useScrollPosition from './hooks/useScrollPosition'
import { dataset } from './data/sample'

// Mock data (replace with Firestore later)
const SITES = [
  {
    id: 'pujada',
    name: 'Pujada Bay',
    type: 'marine',
    lat: 6.955,
    lng: 126.234,
    tags: ['bay', 'marine'],
    summary: 'Marine biodiversity hotspot in Mati City.',
    image:
      'https://images.unsplash.com/photo-1505839673365-e3971f8d9184?auto=format&fit=crop&w=1200&q=60',
  },
  {
    id: 'hamiguitan',
    name: 'Mount Hamiguitan',
    type: 'terrestrial',
    lat: 6.814,
    lng: 126.168,
    tags: ['mountain', 'forest'],
    summary: 'UNESCO World Heritage Site with diverse flora and fauna.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=60',
  },
]

const SPECIES = [
  {
    id: 'dugong',
    commonName: 'Dugong',
    scientificName: 'Dugong dugon',
    siteIds: ['pujada'],
    status: 'VU',
    blurb: 'Gentle marine mammal often found in seagrass beds. A flagship species for marine conservation.',
    images: [
      'https://images.unsplash.com/photo-1558980664-10ab6cc18c79?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: 'pitcher',
    commonName: 'Pitcher Plant',
    scientificName: 'Nepenthes hamiguitanensis',
    siteIds: ['hamiguitan'],
    status: 'EN',
    blurb: 'Endemic carnivorous plant of Mt. Hamiguitan.',
    images: [
      'https://images.unsplash.com/photo-1604395131153-fc0f5a2c46e2?auto=format&fit=crop&w=800&q=60'
    ]
  },
]

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/10 backdrop-blur-sm text-sm font-medium hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md"
      aria-label="Toggle dark mode"
    >
      <span className="text-lg transition-transform group-hover:rotate-12">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
      <span className="hidden sm:inline text-gray-700 dark:text-gray-200">
        {theme === 'dark' ? 'Dark' : 'Light'}
      </span>
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-green-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-green-600/10 group-hover:via-blue-600/10 group-hover:to-purple-600/10 transition-all" />
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollPosition(8)
  const location = useLocation()
  const navItems = [
    { to: '/explore', label: 'Explore', icon: <WaveIcon className="w-5 h-5" /> },
    { to: '/biodiversity', label: 'Biodiversity', icon: <SpeciesIcon className="w-5 h-5" /> },
    { to: '/ar', label: 'AR Demo', icon: <ARIcon className="w-5 h-5" /> },
    { to: '/about', label: 'About', icon: <InfoIcon className="w-5 h-5" /> },
  ]
  const pillRefs = useRef<HTMLDivElement[]>([])
  const [pillStyle, setPillStyle] = useState<{width:number; left:number}>({width:0,left:0})
  useEffect(() => {
    const idx = navItems.findIndex(i => location.pathname.startsWith(i.to))
    const target = pillRefs.current[idx >= 0 ? idx : 0]
    if (target) setPillStyle({ width: target.offsetWidth, left: target.offsetLeft })
  }, [location.pathname, open])
  const progress = typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0
  return (
    <nav className={`site-header py-4 sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-md bg-white/75 dark:bg-slate-900/80 shadow-lg shadow-black/5' : 'bg-transparent'}`}>
      <div className="flex items-center justify-between gap-6">
        <Link to="/" className="font-extrabold text-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:scale-105 transition-transform" onClick={()=>setOpen(false)}>Mati <span className="text-green-600">AR</span>Bio</Link>
        <button aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)} className={`sm:hidden inline-flex items-center justify-center p-3 rounded-xl border-2 text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 transform hover:scale-105 ${open ? 'rotate-180 bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-700 dark:to-slate-600' : ''}`}> <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} /></svg></button>
        <div className="hidden sm:flex items-center gap-6">
          <div className="nav-links px-2 py-1" aria-label="Primary navigation">
            <div className="nav-active-pill" style={{ width: pillStyle.width, left: pillStyle.left }} />
            {navItems.map((item, i) => (
              <div key={item.to} ref={el => { if (el) pillRefs.current[i] = el }}>
                <NavLink to={item.to} onClick={()=>setOpen(false)} className={()=>'nav-link-item text-gray-700 dark:text-slate-200'}>
                  <span aria-hidden className="text-gray-600 dark:text-slate-300">{item.icon}</span>{item.label}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="nav-search hidden lg:block">
            <span className="icon">🔍</span>
            <input placeholder="Search" aria-label="Search (placeholder)" className="pl-7 pr-3 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-white/50 dark:border-white/10 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500/50" />
          </div>
          <ThemeToggle />
        </div>
      </div>
      <div className={`${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} sm:hidden mt-4 border-2 rounded-2xl p-4 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-slate-800/90 dark:to-slate-700/90 backdrop-blur-lg space-y-3 text-sm font-medium transition-all duration-300 transform`}>
        {navItems.map(n => (
          <NavLink key={n.to} to={n.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-slate-600/60 transition-all duration-200 transform hover:scale-105" onClick={()=>setOpen(false)}>
            <span className="text-gray-600 dark:text-slate-300">{n.icon}</span>{n.label}
          </NavLink>
        ))}
        <div className="pt-3 flex items-center gap-3">
          <input placeholder="Search" className="flex-1 px-3 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm" />
          <ThemeToggle />
        </div>
      </div>
      <div className="scroll-progress" style={{ width: `${Math.min(100, progress)}%` }} />
    </nav>
  )
}

function Footer() {
  return (
    <footer className="relative mt-16 py-12 bg-gradient-to-br from-green-50/50 to-blue-50/50 backdrop-blur-sm border-t border-white/20">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="animate-pulse text-2xl">🌊</div>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Mati ARBio
          </div>
          <div className="animate-pulse text-2xl">🦋</div>
        </div>
        
        <p className="text-gray-700 font-medium">
          © {new Date().getFullYear()} Mati ARBio • Web-based educational & eco-tourism platform
        </p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <span className="flex items-center gap-2 hover:text-green-600 transition-colors duration-300">
            🌱 Protecting Biodiversity
          </span>
          <span className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
            🔬 Education & Research
          </span>
          <span className="flex items-center gap-2 hover:text-purple-600 transition-colors duration-300">
            🚀 AR Technology
          </span>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          Made with ❤️ for environmental conservation and education
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-green-300/20 to-blue-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
    </footer>
  )
}

function Home() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  // Example: dataset metadata available for future UI integration
  useEffect(() => {
    // This is only a development aid; remove or replace with proper state usage later
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[Biodiversity dataset]', dataset.metadata, `Flora: ${dataset.flora.length}`, `Fauna: ${dataset.fauna.length}`)
    }
  }, [])
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="space-y-12 min-h-screen">
      {/* Hero Section with enhanced animations */}
      <section className={`glass-hero glass-base transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="hero-layout relative z-10">
          <div className="space-y-4">
            <div className="hero-icon-cluster">
              <div className="hero-icon-pill pill-marine"><WaveIcon className="w-4 h-4" /> Marine</div>
              <div className="hero-icon-pill pill-terrestrial"><MountainIcon className="w-4 h-4" /> Terrestrial</div>
              <div className="hero-icon-pill pill-ar"><ARIcon className="w-4 h-4" /> AR Mapping</div>
              <div className="hero-icon-pill pill-species"><SpeciesIcon className="w-4 h-4" /> Species Data</div>
            </div>
            <AnimatedText as="h1" className="display-title" text="Mati ARBio" />
            <AnimatedText as="div" className="display-subtitle" text="An Augmented Reality Guide to Coastal and Terrestrial Ecosystems." />
            <p className="display-subtitle !mt-4 text-base md:text-lg !font-normal opacity-90">
              Explore immersive maps, species narratives, and interactive 3D experiences that inspire local conservation and ecological awareness.
            </p>
            <div className="hero-actions">
              <button 
                className="group relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white px-7 py-4 rounded-2xl font-semibold text-base shadow-xl hover:shadow-green-500/30 transform hover:scale-[1.04] transition-all duration-300"
                onClick={() => navigate('/explore')}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">🚀</span> Start Exploring
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </span>
              </button>
              <Link 
                to="/about" 
                className="group px-7 py-4 rounded-2xl border-2 border-white/60 dark:border-white/15 hover:border-green-500 font-semibold text-base bg-white/55 dark:bg-slate-800/40 backdrop-blur-xl hover:bg-white/75 dark:hover:bg-slate-700/60 transition-all duration-300 transform hover:scale-[1.04]"
              >
                <span className="flex items-center gap-2 text-gray-700 dark:text-slate-200 group-hover:text-green-700 dark:group-hover:text-green-300">
                  <InfoIcon className="w-5 h-5" /> Learn More
                </span>
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <h4>Sites</h4>
                <div className="value">{SITES.length}</div>
                <small>Mapped Areas</small>
              </div>
              <div className="hero-stat">
                <h4>Species</h4>
                <div className="value">{SPECIES.length}</div>
                <small>Catalogued</small>
              </div>
              <div className="hero-stat">
                <h4>Experiences</h4>
                <div className="value">AR</div>
                <small>Interactive</small>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-inner">
              <div className="hero-orb hero-orb--1" />
              <div className="hero-orb hero-orb--2" />
              <div className="hero-orb hero-orb--3" />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-52 h-52 rounded-[2.25rem] bg-gradient-to-br from-green-400/40 via-blue-500/35 to-purple-500/35 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-2xl flex items-center justify-center">
                  <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-white/80 to-white/40 dark:from-slate-700/60 dark:to-slate-600/40 backdrop-blur-xl border border-white/50 dark:border-white/10 flex items-center justify-center">
                    <SpeciesIcon className="w-20 h-20 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="px-4 py-2 rounded-xl text-xs font-medium tracking-wide bg-white/60 dark:bg-slate-700/50 border border-white/40 dark:border-white/10 backdrop-blur-xl flex items-center gap-2"><MapIcon className="w-4 h-4" /> Dynamic Mapping</div>
                  <div className="px-4 py-2 rounded-xl text-xs font-medium tracking-wide bg-white/60 dark:bg-slate-700/50 border border-white/40 dark:border-white/10 backdrop-blur-xl flex items-center gap-2"><ConservationIcon className="w-4 h-4" /> Sustainability</div>
                </div>
              </div>
              <div className="scroll-hint">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>SCROLL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-divider-fade" />
      </section>

      {/* Enhanced Featured Sites */}
      <section className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <SectionTitle icon="📍">Featured Sites</SectionTitle>
        
        <div className="grid sm:grid-cols-2 gap-8">
          {SITES.map((s, index) => {
            const shadowClass = s.type === 'marine' ? 'hover:shadow-blue-500/20' : 'hover:shadow-green-500/20'
            return (
            <SoftCard
              key={s.id}
              className={`group relative p-6 overflow-hidden ${shadowClass} transform hover:scale-[1.02] hover:-rotate-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${(index + 1) * 160}ms` }}
            >
              <div className="absolute -top-4 -right-4 icon-badge">
                {s.type === 'marine' ? <WaveIcon /> : <MountainIcon />}
              </div>
              
              {s.image && (
                <MediaThumb src={s.image} alt={`${s.name} photo`} className="mb-6" />
              )}
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">{s.name}</h3>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${s.type === 'marine' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700'} group-hover:animate-pulse`}>
                  {s.type}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">{s.summary}</p>
              
              <div className="flex items-center justify-between">
                <Link 
                  to={`/site/${s.id}`} 
                  className="group/link flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300"
                >
                  View details
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <div className="flex gap-1">
                  {s.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </SoftCard>
            )})}
        </div>
      </section>
    </div>
  )
}

function Explore() {
  const [filter, setFilter] = useState<'all'|'marine'|'terrestrial'>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      const map = L.map('map').setView([6.93, 126.2], 10)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
        maxZoom: 19, 
        attribution: '&copy; OpenStreetMap contributors' 
      }).addTo(map)
      
      SITES.forEach((s) => {
        const icon = L.divIcon({
          html: `<div class="animate-bounce">${s.type === 'marine' ? '🌊' : '🏔️'}</div>`,
          className: 'custom-marker',
          iconSize: [30, 30]
        })
        L.marker([s.lat, s.lng], { icon }).addTo(map)
          .bindPopup(`<div class="p-2"><b class="text-green-700">${s.name}</b><br/><span class="text-sm">${s.summary}</span></div>`)
      })
      
      setIsLoading(false)
      return () => { map.remove() }
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])
  
  const filtered = useMemo(() => SITES.filter(s => filter === 'all' ? true : s.type === filter), [filter])
  
  return (
    <div className="space-y-8">
      {/* Header with animated filters */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            <AnimatedText text="Explore Map" />
          </h2>
        </div>
        
        <div className="flex gap-3 text-sm font-medium">
          {[
            { key: 'all', label: 'All Sites', icon: '🌐', count: SITES.length },
            { key: 'marine', label: 'Marine', icon: '🌊', count: SITES.filter(s => s.type === 'marine').length },
            { key: 'terrestrial', label: 'Terrestrial', icon: '🏔️', count: SITES.filter(s => s.type === 'terrestrial').length }
          ].map((item) => (
            <button 
              key={item.key}
              className={`group px-5 py-3 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                filter === item.key
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white border-transparent shadow-lg' 
                  : 'hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 border-gray-200 hover:border-green-300'
              }`} 
              onClick={() => setFilter(item.key as any)}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                {item.label}
                <span className={`px-2 py-0.5 rounded-full text-xs ${filter === item.key ? 'bg-white/20' : 'bg-gray-100 text-gray-600'}`}>
                  {item.count}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Enhanced Map Container */}
      <div className={`relative rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-50/90 to-blue-50/90 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin text-5xl mb-4 text-green-600">⟳</div>
              <p className="text-xl font-semibold text-gray-700">Loading interactive map...</p>
            </div>
          </div>
        )}
        <div id="map" style={{ height: '70vh', width: '100%' }} className="rounded-3xl" />
        
        {/* Floating stats */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
          <div className="text-sm font-semibold text-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <span className="animate-pulse text-green-600">•</span>
              Showing {filtered.length} sites
            </div>
            <div className="text-xs text-gray-500">Click markers for details</div>
          </div>
        </div>
      </div>

      {/* Enhanced Site List */}
      <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
          <span>Featured Locations</span>
          <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-slate-700 dark:text-slate-200">{filtered.length}</span>
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, index) => (
            <div 
              key={s.id} 
              className="group relative border-2 border-white/30 rounded-3xl p-6 bg-gradient-to-br from-white/80 to-gray-50/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Floating type indicator */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:animate-bounce">
                {s.type === 'marine' ? <WaveIcon className="w-7 h-7" /> : <MountainIcon className="w-7 h-7" />}
              </div>
              
              <div className="flex items-start gap-4">
                {s.image && (
                  <div className="relative overflow-hidden rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={s.image}
                      alt={`${s.name} thumbnail`}
                      className="w-24 h-20 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <Link 
                      to={`/site/${s.id}`} 
                      className="font-bold text-lg text-gray-800 hover:text-green-700 transition-colors duration-300 group-hover:scale-105 transform inline-block"
                    >
                      {s.name}
                    </Link>
                  </div>
                  
                  <span className={`inline-block text-sm px-3 py-1 rounded-full font-medium mb-3 ${s.type === 'marine' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' : 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700'}`}>
                    {s.type}
                  </span>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">{s.summary}</p>
                  
                  <div className="flex gap-1 mt-3">
                    {s.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors duration-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SitePage() {
  const { id } = useParams()
  const site = SITES.find((s) => s.id === id)
  const siteSpecies = SPECIES.filter((sp) => sp.siteIds.includes(id || ''))
  if (!site) return <p>Site not found.</p>
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">{site.name}</h2>
      <p>{site.summary}</p>
      <h3 className="text-xl font-semibold mt-4">Species here</h3>
      <ul className="list-disc pl-6">
        {siteSpecies.map((sp) => (
          <li key={sp.id}><Link to={`/species/${sp.id}`}>{sp.commonName}</Link> <span className="text-gray-600">({sp.scientificName})</span></li>
        ))}
      </ul>
    </div>
  )
}

function SpeciesList() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VU': return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-orange-200'
      case 'EN': return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200'
      case 'CR': return 'bg-gradient-to-r from-red-200 to-red-100 text-red-800 border-red-300'
      default: return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200'
    }
  }
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'VU': return 'Vulnerable'
      case 'EN': return 'Endangered'
      case 'CR': return 'Critically Endangered'
      default: return status
    }
  }
  
  return (
    <div className="space-y-8 min-h-screen">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <SectionTitle icon="🌿">🦋 Species Gallery</SectionTitle>
      </div>
      
      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {SPECIES.map((sp, index) => (
          <SoftCard
            key={sp.id}
            className="group relative p-6 hover:-rotate-1 transform hover:scale-[1.02]"
            style={{ animationDelay: `${index * 140}ms` }}
          >
            {/* Floating status indicator */}
            <div className="absolute -top-3 -right-3 icon-badge w-12 h-12">
              <span className="text-sm font-semibold tracking-wide">{sp.status}</span>
            </div>
            
            {/* Species images */}
            {sp.images && sp.images.length > 0 && (
              <div className="mb-6 relative">
                <MediaThumb src={sp.images[0]} alt={sp.commonName} className="h-48" />
                {sp.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/55 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">+{sp.images.length - 1} more</div>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Link 
                  to={`/species/${sp.id}`} 
                  className="group/link text-xl font-bold text-gray-800 hover:text-green-700 transition-colors duration-300"
                >
                  <span className="group-hover/link:scale-105 transform inline-block transition-transform duration-300">
                    {sp.commonName}
                  </span>
                </Link>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(sp.status)} group-hover:animate-pulse`}>
                  {getStatusText(sp.status)}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 italic font-medium bg-gray-50 p-2 rounded-lg">
                {sp.scientificName}
              </p>
              
              <p className="text-sm text-gray-700 leading-relaxed">
                {sp.blurb}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Link 
                  to={`/species/${sp.id}`}
                  className="group/btn flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 transition-colors duration-300"
                >
                  Learn more
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <div className="flex gap-1">
                  {sp.siteIds.map((siteId, i) => {
                    const site = SITES.find(s => s.id === siteId)
                    return site ? (
                      <span key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200">
                        {site.type === 'marine' ? <WaveIcon className="w-4 h-4" /> : <MountainIcon className="w-4 h-4" />}
                      </span>
                    ) : null
                  })}
                </div>
              </div>
            </div>
          </SoftCard>
        ))}
      </div>
    </div>
  )
}

function SpeciesPage() {
  const { id } = useParams()
  const sp = SPECIES.find((x) => x.id === id)
  if (!sp) return <p>Species not found.</p>
  const where = SITES.filter((s) => sp.siteIds.includes(s.id))
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold">{sp.commonName}</h2>
      <p className="text-gray-700 italic">{sp.scientificName}</p>
      <p>Status: {sp.status}</p>
      <p>{sp.blurb}</p>
      {sp.images && sp.images.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {sp.images.map((url, i) => (
            <img key={i} src={url} alt={`${sp.commonName} ${i+1}`} className="w-full h-48 object-cover rounded" />
          ))}
        </div>
      )}
      <h3 className="text-xl font-semibold mt-4">Where to see</h3>
      <ul className="list-disc pl-6">
        {where.map((s) => (
          <li key={s.id}><Link to={`/site/${s.id}`}>{s.name}</Link></li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/ar" className="text-green-700 underline">Try AR demo</Link>
      </div>
    </div>
  )
}

function ARDemo() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="space-y-8 min-h-screen">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-4xl font-bold gradient-text-brand flex items-center gap-3"><ARIcon className="w-8 h-8" /> AR Experience</h2>
            <div className="animate-bounce text-3xl"><StarIcon className="w-8 h-8" /></div>
          </div>
          
          <div className="relative rounded-3xl p-12 bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-2 border-white/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="text-6xl animate-pulse mb-6"><CameraIcon className="w-16 h-16" /></div>
              
              <h3 className="text-2xl font-bold text-gray-800">Immersive AR Demo</h3>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Experience Mati's biodiversity like never before! Our augmented reality demo uses cutting-edge 
                MindAR + A-Frame technology to bring species to life in your environment.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3"><CameraIcon className="w-8 h-8" /></div>
                  <h4 className="font-bold mb-2">Camera Access</h4>
                  <p className="text-sm text-gray-600">Allow camera permission for the best AR experience</p>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3"><TargetIcon className="w-8 h-8" /></div>
                  <h4 className="font-bold mb-2">Target Recognition</h4>
                  <p className="text-sm text-gray-600">Point your camera at target images to see AR content</p>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
                  <div className="text-3xl mb-3"><StarIcon className="w-8 h-8" /></div>
                  <h4 className="font-bold mb-4">Interactive 3D</h4>
                  <p className="text-sm text-gray-600">Interact with 3D models of Mati's amazing species</p>
                </div>
              </div>
              
              <a 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 hover:rotate-1" 
                href="/ar-demo/" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="text-2xl group-hover:animate-bounce"><ARIcon className="w-6 h-6" /></span>
                Launch AR Demo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function About() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="space-y-12 min-h-screen">
      <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-8">
            <h2 className="text-4xl font-bold gradient-text-brand flex items-center gap-3"><InfoIcon className="w-8 h-8" /> About Mati ARBio</h2>
            <div className="animate-pulse text-3xl"><LeafIcon className="w-8 h-8" /></div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-green-100/50 to-blue-100/50 border-2 border-white/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><MissionIcon className="w-6 h-6" /> Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Mati ARBio is an innovative web-based educational and eco-tourism platform designed to showcase 
                the incredible biodiversity of Mati City. We combine cutting-edge augmented reality technology 
                with comprehensive species databases to create immersive learning experiences.
              </p>
            </div>
            
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-2 border-white/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ConservationIcon className="w-6 h-6" /> Conservation Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Through interactive maps, detailed species profiles, and immersive AR experiences, we aim to 
                raise awareness about environmental conservation while promoting sustainable eco-tourism in the region.
              </p>
            </div>
          </div>
          
          <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2"><MapIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Interactive Maps</h4>
                <p className="text-sm text-gray-600">Explore biodiversity hotspots</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2"><SpeciesIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Species Database</h4>
                <p className="text-sm text-gray-600">Comprehensive species profiles</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2"><TechIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">AR Technology</h4>
                <p className="text-sm text-gray-600">Immersive 3D experiences</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl mb-2"><EducationIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Education</h4>
                <p className="text-sm text-gray-600">Learn about conservation</p>
              </div>
            </div>
            
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-2 border-white/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><TechIcon className="w-6 h-6" /> Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Leaflet Maps', 'MindAR', 'A-Frame'].map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-white/60 rounded-full text-sm font-medium text-gray-700 border border-white/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={`text-center transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="relative rounded-3xl p-12 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 border-2 border-white/30 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Join Our Conservation Mission
            </h3>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Together, we can protect and preserve Mati's unique biodiversity for future generations. 
              Start exploring today and become part of the conservation community!
            </p>
            <Link 
              to="/explore" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl group-hover:animate-bounce">🌟</span>
              Start Exploring
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  // ensure hook initialized so initial theme applied early
  useTheme()
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-green-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-purple-200/10 to-green-200/10 rounded-full blur-2xl animate-bounce"></div>
        </div>
        
        <div className="app relative z-10">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-glow-green">Skip to content</a>
          <Navbar />
          <main id="main" className="mt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/site/:id" element={<SitePage />} />
              <Route path="/species" element={<SpeciesList />} />
              <Route path="/species/:id" element={<SpeciesPage />} />
              <Route path="/biodiversity" element={<BiodiversityExplorer />} />
              <Route path="/biodiversity/:id" element={<SpeciesDetail />} />
              <Route path="/ar" element={<ARDemo />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h2 className="text-2xl font-bold text-gray-700 mb-2">Page not found</h2>
                  <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                  <Link to="/" className="btn-primary inline-block">
                    🏠 Go Home
                  </Link>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
