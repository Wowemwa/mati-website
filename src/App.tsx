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
      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-white/40 dark:border-white/20 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden"
      aria-label="Toggle dark mode"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-blue-600/20 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon container */}
      <div className="relative z-10 transition-all duration-500 group-hover:scale-110">
        <div className={`text-2xl transition-all duration-700 ${
          theme === 'dark' 
            ? 'rotate-0 opacity-100' 
            : '-rotate-180 opacity-100'
        }`}>
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-white"></div>
      </div>
    </button>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrollPosition(8)
  const location = useLocation()
  const navItems = [
    { to: '/explore', label: 'Explore', icon: <WaveIcon className="w-5 h-5" />, badge: '🗺️' },
    { to: '/biodiversity', label: 'Biodiversity', icon: <SpeciesIcon className="w-5 h-5" />, badge: '🌿' },
    { to: '/ar', label: 'AR Demo', icon: <ARIcon className="w-5 h-5" />, badge: '✨' },
    { to: '/about', label: 'About', icon: <InfoIcon className="w-5 h-5" />, badge: '💡' },
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-6'}`}>
      {/* Main Navigation Container */}
      <div className={`mx-auto max-w-7xl px-6 transition-all duration-700 ${scrolled ? 'scale-95' : 'scale-100'}`}>
        <nav className={`relative overflow-hidden rounded-2xl backdrop-blur-2xl transition-all duration-700 ${
          scrolled 
            ? 'bg-white/90 dark:bg-slate-900/90 shadow-2xl shadow-black/10 border border-white/20 dark:border-white/10' 
            : 'bg-white/60 dark:bg-slate-900/60 shadow-xl border border-white/30 dark:border-white/15'
        }`}>
          
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
          
          <div className="relative px-8 py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo Section */}
              <Link 
                to="/" 
                className="group relative flex items-center gap-3 font-black text-2xl lg:text-3xl tracking-tight hover:scale-105 transition-all duration-500" 
                onClick={() => setOpen(false)}
              >
                <div className="relative">
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mati
                  </span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent ml-1">
                    AR
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Bio
                  </span>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-1 -right-2 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Tagline */}
                <div className="hidden xl:block text-xs font-medium text-gray-500 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-3 ml-1">
                  Biodiversity Explorer
                </div>
              </Link>
              
              {/* Mobile Menu Button */}
              <button 
                aria-label="Toggle menu" 
                aria-expanded={open} 
                onClick={() => setOpen(!open)} 
                className={`lg:hidden relative p-3 rounded-2xl border-2 transition-all duration-500 hover:scale-110 ${
                  open 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 border-transparent text-white rotate-180 shadow-lg' 
                    : 'border-white/40 dark:border-white/20 text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} 
                  />
                </svg>
              </button>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                
                {/* Navigation Links */}
                <div className="relative flex items-center gap-2 p-2 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/30 dark:border-white/15">
                  {/* Active indicator */}
                  <div 
                    className="absolute top-2 bottom-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl transition-all duration-500 shadow-lg"
                    style={{ 
                      width: pillStyle.width ? `${pillStyle.width}px` : '0px', 
                      left: `${pillStyle.left + 8}px` 
                    }}
                  />
                  
                  {navItems.map((item, i) => (
                    <div key={item.to} ref={el => { if (el) pillRefs.current[i] = el }}>
                      <NavLink 
                        to={item.to} 
                        onClick={() => setOpen(false)}
                        className={({ isActive }) => `
                          relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105
                          ${isActive 
                            ? 'text-white shadow-md' 
                            : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400'
                          }
                        `}
                      >
                        <span className="text-lg">{item.badge}</span>
                        <span>{item.label}</span>
                      </NavLink>
                    </div>
                  ))}
                </div>
                
                {/* Search Bar */}
                <div className="relative hidden xl:block">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search species, sites..."
                    className="w-64 pl-12 pr-4 py-3 bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-white/20 rounded-2xl backdrop-blur-xl text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-700/80"
                  />
                </div>
                
                {/* Theme Toggle */}
                <ThemeToggle />
                
                {/* CTA Button */}
                <Link 
                  to="/ar" 
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-rotate-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ARIcon className="w-4 h-4" />
                    <span>Try AR</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </div>
            </div>
            
            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
              open ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
              <div className="space-y-2 p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-xl border border-white/30 dark:border-white/15">
                {navItems.map(item => (
                  <NavLink 
                    key={item.to} 
                    to={item.to} 
                    className={({ isActive }) => `
                      flex items-center gap-4 p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105
                      ${isActive 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' 
                        : 'hover:bg-white/60 dark:hover:bg-slate-700/60 text-gray-700 dark:text-gray-200'
                      }
                    `}
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-2xl">{item.badge}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                
                {/* Mobile Search & Theme */}
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-white/30 dark:border-white/15">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 px-4 py-3 bg-white/70 dark:bg-slate-800/70 border border-white/40 dark:border-white/20 rounded-xl backdrop-blur-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll Progress Bar */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="relative rounded-t-[3rem] backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 dark:from-slate-900/95 dark:to-slate-800/95 border-t border-white/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-purple-500/10" />
        
        <div className="relative z-10 text-center space-y-8">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="animate-pulse text-3xl">🌊</div>
            <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Mati ARBio
            </div>
            <div className="animate-pulse text-3xl">🦋</div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-200 font-medium mb-6">
              Connecting nature, technology, and conservation for a sustainable future
            </p>
            <p className="text-gray-400">
              © {new Date().getFullYear()} Mati ARBio • Web-based educational & eco-tourism platform
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3 group-hover:animate-bounce">🌱</div>
              <h4 className="font-bold text-green-400 mb-2">Biodiversity Protection</h4>
              <p className="text-sm text-gray-400">Preserving ecosystems for future generations</p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3 group-hover:animate-bounce">🔬</div>
              <h4 className="font-bold text-blue-400 mb-2">Education & Research</h4>
              <p className="text-sm text-gray-400">Learning through interactive experiences</p>
            </div>
            
            <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3 group-hover:animate-bounce">🚀</div>
              <h4 className="font-bold text-purple-400 mb-2">AR Innovation</h4>
              <p className="text-sm text-gray-400">Cutting-edge augmented reality technology</p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>Made with</span>
              <span className="text-red-400 animate-pulse">❤️</span>
              <span>for environmental conservation and education</span>
            </p>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-green-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
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
      <section className={`relative overflow-hidden rounded-[3rem] backdrop-blur-2xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-700/40 border border-white/40 dark:border-white/20 shadow-2xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5" />
        <div className="hero-layout relative z-10 p-12 lg:p-16">
          <div className="space-y-8">
            <div className="hero-icon-cluster">
              <div className="hero-icon-pill pill-marine"><WaveIcon className="w-4 h-4" /> Marine Ecosystems</div>
              <div className="hero-icon-pill pill-terrestrial"><MountainIcon className="w-4 h-4" /> Terrestrial Life</div>
              <div className="hero-icon-pill pill-ar"><ARIcon className="w-4 h-4" /> AR Experience</div>
              <div className="hero-icon-pill pill-species"><SpeciesIcon className="w-4 h-4" /> Species Database</div>
            </div>
            
            <div className="space-y-6">
              <AnimatedText as="h1" className="display-title !text-5xl lg:!text-7xl" text="Mati ARBio" />
              <AnimatedText as="div" className="display-subtitle !text-xl lg:!text-2xl !font-medium" text="Discover Mati's Biodiversity Through Augmented Reality" />
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Immerse yourself in the rich ecosystems of Mati City with interactive maps, detailed species profiles, 
                and cutting-edge AR experiences that bring conservation to life.
              </p>
            </div>
            
            <div className="hero-actions flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary"
                onClick={() => navigate('/explore')}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">🌟</span> 
                <span>Start Your Journey</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              
              <Link to="/about">
                <Button variant="secondary" className="flex items-center gap-3">
                  <InfoIcon className="w-5 h-5" /> 
                  <span>Learn More</span>
                </Button>
              </Link>
            </div>
            
            <div className="hero-stats grid grid-cols-3 gap-6 pt-8 border-t border-white/30 dark:border-white/10">
              <div className="hero-stat text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {SITES.length}
                </div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Biodiversity Sites
                </h4>
              </div>
              <div className="hero-stat text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {SPECIES.length}+
                </div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Species Catalogued
                </h4>
              </div>
              <div className="hero-stat text-center">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-2">
                  AR
                </div>
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Interactive Experience
                </h4>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-visual-inner">
              <div className="hero-orb hero-orb--1" />
              <div className="hero-orb hero-orb--2" />
              <div className="hero-orb hero-orb--3" />
              <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="group w-64 h-64 lg:w-80 lg:h-80 rounded-[3rem] bg-gradient-to-br from-green-400/30 via-blue-500/25 to-purple-500/30 backdrop-blur-3xl border-2 border-white/50 dark:border-white/20 shadow-2xl flex items-center justify-center transition-all duration-700 hover:scale-105 hover:rotate-3">
                  <div className="w-44 h-44 lg:w-56 lg:h-56 rounded-3xl bg-gradient-to-tr from-white/90 to-white/50 dark:from-slate-700/70 dark:to-slate-600/50 backdrop-blur-2xl border-2 border-white/60 dark:border-white/20 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <SpeciesIcon className="w-24 h-24 lg:w-32 lg:h-32 text-green-600 dark:text-green-300 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Badge className="flex items-center gap-2"><MapIcon className="w-4 h-4" /> Interactive Mapping</Badge>
                  <Badge className="flex items-center gap-2"><ConservationIcon className="w-4 h-4" /> Conservation Focus</Badge>
                </div>
              </div>
              <div className="scroll-hint">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                  <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Discover More</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Sites */}
      <section className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <SectionTitle icon="📍">Featured Biodiversity Sites</SectionTitle>
        
        <div className="grid sm:grid-cols-2 gap-10">
          {SITES.map((s, index) => {
            const shadowClass = s.type === 'marine' ? 'hover:shadow-blue-500/25' : 'hover:shadow-green-500/25'
            return (
            <Card
              key={s.id}
              className={`group relative p-8 ${shadowClass} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="absolute top-6 right-6 p-3 rounded-2xl bg-white/30 dark:bg-slate-700/50 backdrop-blur-md border border-white/40 dark:border-white/20">
                {s.type === 'marine' ? <WaveIcon className="w-6 h-6 text-blue-600" /> : <MountainIcon className="w-6 h-6 text-green-600" />}
              </div>
              
              {s.image && (
                <MediaThumb src={s.image} alt={`${s.name} photo`} className="mb-8" />
              )}
              
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300 mb-2">
                      {s.name}
                    </h3>
                    <Badge tone={s.type === 'marine' ? 'marine' : 'terrestrial'} className="mb-3">
                      {s.type === 'marine' ? '🌊 Marine Ecosystem' : '🏔️ Terrestrial Ecosystem'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {s.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {s.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-slate-600/50 dark:to-slate-500/50 text-gray-700 dark:text-gray-200 rounded-full font-medium border border-gray-200/50 dark:border-slate-400/30">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-slate-600/50">
                  <Link 
                    to={`/site/${s.id}`} 
                    className="group/link flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span>Explore Site</span>
                    <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapIcon className="w-4 h-4" />
                    <span>{s.lat.toFixed(3)}°, {s.lng.toFixed(3)}°</span>
                  </div>
                </div>
              </div>
            </Card>
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
      {/* Header with enhanced filters */}
      <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <AnimatedText text="Explore Interactive Map" />
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover Mati's biodiversity hotspots through our interactive mapping experience
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 p-2 rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/30 dark:border-white/15 shadow-lg">
            {[
              { key: 'all', label: 'All Sites', icon: '🌐', count: SITES.length },
              { key: 'marine', label: 'Marine', icon: '🌊', count: SITES.filter(s => s.type === 'marine').length },
              { key: 'terrestrial', label: 'Terrestrial', icon: '🏔️', count: SITES.filter(s => s.type === 'terrestrial').length }
            ].map((item) => (
              <button 
                key={item.key}
                className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                  filter === item.key
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-slate-700/40'
                }`} 
                onClick={() => setFilter(item.key as any)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl group-hover:animate-bounce">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    filter === item.key 
                      ? 'bg-white/25 text-white' 
                      : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {item.count}
                  </span>
                </span>
                {filter === item.key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl blur animate-pulse" />
                )}
              </button>
            ))}
          </div>
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
      <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <AnimatedText text="AR Experience" />
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience Mati's biodiversity through cutting-edge augmented reality technology
          </p>
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
  )
}

function About() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  return (
    <div className="space-y-12 min-h-screen">
      <div className={`space-y-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            <AnimatedText text="About Mati ARBio" />
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our mission to preserve biodiversity through innovative technology and education
          </p>
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
          <main id="main" className="pt-24 lg:pt-32">
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
