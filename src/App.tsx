import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import useTheme from './useTheme'
import { Card, SoftCard, Badge, Button, SectionTitle, MediaThumb } from './components/UI'
import AnimatedText from './components/AnimatedText'
import { WaveIcon, MountainIcon, SpeciesIcon, ARIcon, InfoIcon, MapIcon, CameraIcon, TargetIcon, StarIcon, MissionIcon, EducationIcon, TechIcon, ConservationIcon, LeafIcon } from './components/Icons'
import BiodiversityExplorer from './pages/BiodiversityExplorer'
import SpeciesDetail from './pages/SpeciesDetail'
import useScrollPosition from './hooks/useScrollPosition'
import { HOTSPOTS, SPECIES } from './data/hotspots'

const SITES = HOTSPOTS

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="group relative inline-flex items-center justify-center w-12 h-12 rounded-2xl border-2 border-white/40 dark:border-white/20 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl hover:scale-105 transition-all duration-300 ease-out shadow-lg hover:shadow-xl overflow-hidden"
      aria-label="Toggle dark mode"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-blue-600/20 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
      <div className="relative z-10 transition-transform duration-300 ease-out group-hover:scale-105">
        <div
          className={`text-2xl transition-transform duration-500 ease-out ${
            theme === 'dark'
              ? 'rotate-0 opacity-100'
              : '-rotate-180 opacity-100'
          }`}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </div>
      </div>
  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none whitespace-nowrap">
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
    { to: '/explore', label: 'Explore', badge: '🗺️' },
    { to: '/biodiversity', label: 'Biodiversity', badge: '🌿' },
    { to: '/ar', label: 'AR Demo', badge: '✨' },
    { to: '/about', label: 'About', badge: '💡' },
  ]
  const marineCount = useMemo(() => SITES.filter((site) => site.type === 'marine').length, [])
  const terrestrialCount = useMemo(() => SITES.filter((site) => site.type === 'terrestrial').length, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`relative border-b transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 border-white/40 dark:border-white/15 shadow-xl backdrop-blur'
            : 'bg-white/70 dark:bg-slate-900/70 border-transparent'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-500/15 via-blue-500/10 to-purple-500/15" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60 dark:via-white/10" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="group relative flex items-center gap-3 font-black text-2xl lg:text-3xl tracking-tight transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setOpen(false)}
            >
              <div className="relative">
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mati
                </span>
                <span className="ml-1 bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  AR
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Bio
                </span>
                <div className="absolute -top-1 -right-2 h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500 opacity-70 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="hidden sm:flex flex-col leading-tight text-left text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Biodiversity Explorer</span>
                <span className="text-[11px] uppercase tracking-wide text-gray-400 dark:text-gray-500">MindAR • Leaflet • Eco-tourism</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 px-3 py-1 backdrop-blur dark:border-white/15 dark:bg-slate-800/60">
                  <WaveIcon className="h-4 w-4 text-blue-500" />
                  {marineCount} marine
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 px-3 py-1 backdrop-blur dark:border-white/15 dark:bg-slate-800/60">
                  <MountainIcon className="h-4 w-4 text-emerald-500" />
                  {terrestrialCount} terrestrial
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/50 bg-white/60 px-3 py-1 backdrop-blur dark:border-white/15 dark:bg-slate-800/60">
                  <SpeciesIcon className="h-4 w-4 text-purple-500" />
                  {SPECIES.length}+ species
                </span>
              </div>
              <ThemeToggle />
              <Link
                to="/ar"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ARIcon className="h-4 w-4" />
                  <span>Launch AR</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
              </Link>
            </div>

            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-colors duration-300 ease-out ${
                open
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 border-transparent text-white shadow-lg'
                  : 'border-white/60 text-gray-700 hover:bg-white/70 dark:border-white/20 dark:text-gray-200 dark:hover:bg-slate-800/70'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-200 ease-out ${open ? 'rotate-45' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <span className="rounded-full border border-emerald-500/40 bg-emerald-100/60 px-3 py-1 uppercase tracking-wide text-emerald-700 dark:border-emerald-300/40 dark:bg-emerald-900/30 dark:text-emerald-200">
                Live beta
              </span>
            </div>
            <div className="relative flex items-center gap-3 rounded-full border border-white/50 bg-white/75 px-3 py-2 shadow-lg shadow-emerald-500/10 backdrop-blur-xl dark:border-white/15 dark:bg-slate-800/70 dark:shadow-black/30 overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10" />
              <div className="pointer-events-none absolute inset-0 border border-white/40 rounded-full mix-blend-soft-light dark:border-white/10" />
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.to)
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`group relative z-10 inline-flex items-center gap-4 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 ease-out ${
                      isActive
                        ? 'text-white drop-shadow-lg'
                        : 'text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-300'
                    }`}
                  >
                    <span className={`relative flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform duration-300 ease-out ${
                      isActive
                        ? 'bg-gradient-to-br from-emerald-400 via-teal-400 to-blue-500 text-white shadow-[0_16px_34px_-18px_rgba(37,99,235,0.55)]'
                        : 'border border-white/60 bg-white/75 text-slate-600 shadow-[0_10px_30px_-24px_rgba(15,118,110,0.45)] group-hover:border-emerald-200 group-hover:bg-white'
                    }`}
                    >
                      <span className="relative z-10">{item.badge}</span>
                      <span className={`pointer-events-none absolute inset-0 rounded-full border ${
                        isActive ? 'border-white/60 opacity-70' : 'border-white/70 opacity-50'
                      }`} />
                      {!isActive && (
                        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 via-teal-400/5 to-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span>{item.label}</span>
                      <span className={`mt-1 h-[2px] w-full rounded-full transition-colors duration-300 ease-out ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500'
                          : 'bg-emerald-400/0 group-hover:bg-emerald-400/60'
                      }`} />
                    </span>
                    <span className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
                      <span className={`absolute inset-[1px] rounded-full transition-opacity duration-300 ease-out ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-400/90 via-teal-400/80 to-blue-500/90 opacity-90'
                          : 'bg-white/40 opacity-70 group-hover:bg-white/70 group-hover:opacity-100'
                      }`} />
                      <span className="absolute inset-0 rounded-full border border-white/45 mix-blend-soft-light" />
                    </span>
                    <span className={`pointer-events-none absolute -inset-[7px] -z-20 rounded-full blur-2xl transition-opacity duration-500 ease-out ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-300/40 via-teal-300/35 to-blue-400/40 opacity-90'
                        : 'bg-gradient-to-r from-emerald-300/20 via-teal-200/15 to-blue-300/20 opacity-0 group-hover:opacity-70'
                    }`} />
                  </NavLink>
                )
              })}
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              <MapIcon className="h-4 w-4 text-blue-500" />
              Mati, Davao Oriental
            </div>
          </div>

          <div className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-3 rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-white/15 dark:bg-slate-900/90">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ease-out ${
                    isActive
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white hover:shadow-md dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xl">{item.badge}</span>
                    {item.label}
                  </span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </NavLink>
              ))}

              <div className="flex items-center gap-3 border-t border-white/50 pt-3 dark:border-white/15">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 rounded-xl border border-white/60 bg-white/85 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 dark:border-white/15 dark:bg-slate-800/80"
                />
                <ThemeToggle />
              </div>

              <Link
                to="/ar"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <ARIcon className="h-4 w-4" /> Try AR Demo
              </Link>
            </div>
          </div>
        </div>
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

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const marineSites = useMemo(() => SITES.filter((site) => site.type === 'marine').length, [])
  const terrestrialSites = useMemo(() => SITES.filter((site) => site.type === 'terrestrial').length, [])
  const discoveryGoal = 60
  const discoveryProgress = Math.min(100, Math.round((SPECIES.length / discoveryGoal) * 100))

  const heroHighlights = [
    {
      title: 'Marine + terrestrial sync',
      description: `${marineSites} marine / ${terrestrialSites} terrestrial locations keep the navbar counters alive.`,
      icon: <WaveIcon className="h-5 w-5 text-sky-500" />,
    },
    {
      title: 'Species ledger in the header',
      description: `${SPECIES.length}+ species totals surface in the sticky header and throughout the home layout.`,
      icon: <SpeciesIcon className="h-5 w-5 text-purple-500" />,
    },
    {
      title: 'Unified AR actions',
      description: 'Hero CTAs mirror the Launch AR button in the navbar so journeys feel continuous.',
      icon: <ARIcon className="h-5 w-5 text-teal-500" />,
    },
  ]

  const heroMetrics = [
    {
      label: 'Marine coverage',
      value: `${marineSites} sites`,
      gradient: 'from-cyan-500 to-sky-500',
    },
    {
      label: 'Terrestrial coverage',
      value: `${terrestrialSites} sites`,
      gradient: 'from-emerald-500 to-lime-500',
    },
    {
      label: 'Species logged',
      value: `${SPECIES.length}+`,
      gradient: 'from-purple-500 to-fuchsia-500',
    },
  ]

  const featureCards = [
    {
      icon: '🧭',
      title: 'Navigation-first flow',
      description: 'Navbar stats repeat at each section so orientation stays intact from header to hero to map.',
    },
    {
      icon: '🪟',
      title: 'Glassmorphic surface',
      description: 'Cards, filters, and CTAs borrow the header’s frosted gradients for a cohesive visual language.',
    },
    {
      icon: '🧠',
      title: 'Contextual CTAs',
      description: 'Primary actions match the sticky Launch AR button, promoting a predictable, guided journey.',
    },
  ]

  const missionPillars = [
    {
      title: 'Habitat guardianship',
      description: 'Celebrate blue carbon mangroves, coral gardens, and upland forests through guided storytelling.',
      icon: <LeafIcon className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: 'Education-first journeys',
      description: 'Teachers and learners get aligned cues—from nav counters to species cards—when exploring.',
      icon: <EducationIcon className="h-6 w-6 text-sky-400" />,
    },
    {
      title: 'Lightweight AR technology',
      description: 'MindAR-powered demos and the sticky Launch AR CTA keep immersive tools just one tap away.',
      icon: <TechIcon className="h-6 w-6 text-teal-400" />,
    },
    {
      title: 'Conservation outcomes',
      description: 'Data cards spotlight protected areas so responsible travel choices are obvious and actionable.',
      icon: <ConservationIcon className="h-6 w-6 text-purple-400" />,
    },
  ]

  const typeMeta = {
    marine: {
      label: 'Marine site',
      gradient: 'from-cyan-500 via-sky-500 to-blue-500',
      chip: 'bg-sky-500/15 text-sky-700 dark:text-sky-200',
      iconBg: 'bg-sky-500/20',
      icon: <WaveIcon className="h-5 w-5 text-sky-100" />,
    },
    terrestrial: {
      label: 'Terrestrial site',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      chip: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200',
      iconBg: 'bg-emerald-500/20',
      icon: <MountainIcon className="h-5 w-5 text-emerald-100" />,
    },
  } as const

  return (
    <div className="space-y-16 min-h-screen">
      <section className={`relative overflow-hidden rounded-[36px] border border-white/40 bg-white/80 shadow-2xl transition-all duration-700 dark:border-white/10 dark:bg-slate-900/70 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="relative grid gap-12 p-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-16">
          <div className="space-y-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm dark:bg-slate-800/70 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
              Live beta experience
            </span>
            <div className="space-y-6">
              <AnimatedText as="h1" className="!text-5xl lg:!text-7xl font-black tracking-tight text-slate-900 dark:text-white" text="Mati ARBio" />
              <AnimatedText as="div" className="!text-xl lg:!text-2xl !font-medium text-slate-600 dark:text-slate-200" text="Discover Mati's biodiversity with a navigation system that reflects the ecosystems it protects." />
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                The redesigned interface takes cues from the navbar—glass surfaces, live counters, and AR-forward cues—to guide every visitor from orientation to action.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="primary"
                onClick={() => navigate('/explore')}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">🌊</span>
                <span>Explore the map</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
              <Link to="/ar">
                <Button variant="secondary" className="flex items-center gap-3">
                  <ARIcon className="h-5 w-5" />
                  <span>Launch AR demo</span>
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {heroHighlights.map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/15 dark:bg-slate-900/60">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/15 to-blue-500/25 text-lg">
                    {item.icon}
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/75 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-blue-500/15 to-purple-500/20" />
            <div className="relative z-10 space-y-6 p-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Navbar data stream</p>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Stats mirrored in navigation</h3>
                <p className="text-sm text-slate-500 dark:text-slate-300">The header, hero, and map filters now share the same counters, so you never lose context as you explore.</p>
              </div>
              <div className="space-y-3">
                {heroMetrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">{metric.label}</p>
                      <p className="text-lg font-semibold text-slate-800 dark:text-white">{metric.value}</p>
                    </div>
                    <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${metric.gradient} opacity-80 shadow-inner`} />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600 dark:text-slate-200">
                  <span>Discovery roadmap</span>
                  <span>{discoveryProgress}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/50 dark:bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500" style={{ width: `${discoveryProgress}%` }} />
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-300">
                  Catalogued {SPECIES.length} of {discoveryGoal}+ priority species for Year&nbsp;1 AR experiences.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <SectionTitle icon="🧭">Navigation-aligned experience</SectionTitle>
        <p className="mt-3 max-w-3xl text-sm text-slate-500 dark:text-slate-300">
          Every surface references the navbar: same gradients, counters, and action hierarchy. Cards reinforce the story so visitors know where to go next.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featureCards.map((card) => (
            <div key={card.title} className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-1 dark:border-white/15 dark:bg-slate-900/70">
              <div className="absolute inset-x-4 top-0 h-1 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="text-3xl">{card.icon}</div>
              <h4 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">{card.title}</h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <SectionTitle icon="📍">Featured biodiversity sites</SectionTitle>
        <p className="mt-3 max-w-3xl text-sm text-slate-500 dark:text-slate-300">
          These signatures appear in both the navbar counters and the map module. Cards inherit the same frosted gradients so the information feels connected.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {SITES.map((site, index) => {
            const meta = typeMeta[site.type]
            return (
              <Card
                key={site.id}
                className={`group relative overflow-hidden border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`absolute inset-x-6 top-0 h-1 rounded-full bg-gradient-to-r ${meta.gradient}`} />
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div className="space-y-3">
                    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${meta.chip}`}>
                      <span className={`flex h-6 w-6 items-center justify-center rounded-full ${meta.iconBg}`}>{meta.icon}</span>
                      {meta.label}
                    </span>
                    <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-300">
                      {site.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{site.summary}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right text-xs text-slate-400 dark:text-slate-500">
                    <span>{site.lat.toFixed(3)}°</span>
                    <span>{site.lng.toFixed(3)}°</span>
                  </div>
                </div>
                {site.image && (
                  <MediaThumb src={site.image} alt={`${site.name} photo`} className="my-6 h-44 rounded-3xl" />
                )}
                <div className="flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors duration-200 dark:bg-slate-700 dark:text-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/40 pt-4 dark:border-white/10">
                  <Link
                    to={`/site/${site.id}`}
                    className="group/link inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:gap-3 hover:shadow-xl"
                  >
                    Explore site
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link to="/explore" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300">
                    Map view
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section className={`transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <div className="rounded-[32px] border border-white/40 bg-white/80 p-10 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-4">
              <SectionTitle icon="🌿">Mission pillars</SectionTitle>
              <p className="text-sm text-slate-500 dark:text-slate-300">
                The navbar, hero, and content decks all ladder up to the same conservation story—blending tourism, education, and tech for Mati’s ecosystems.
              </p>
            </div>
            <Link to="/about" className="inline-flex items-center gap-3 rounded-2xl border border-white/50 bg-white/70 px-6 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:border-white/80 hover:bg-white/90 dark:border-white/10 dark:bg-slate-800/60 dark:text-emerald-300 dark:hover:bg-slate-800/80">
              <InfoIcon className="h-4 w-4" />
              Learn about the project
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {missionPillars.map((pillar) => (
              <div key={pillar.title} className="flex gap-4 rounded-2xl border border-white/40 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/15 to-blue-500/20">
                  {pillar.icon}
                </span>
                <div className="space-y-1.5">
                  <h4 className="text-base font-semibold text-slate-800 dark:text-white">{pillar.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
        <div className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 p-8 text-white shadow-2xl sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-bold">Stay oriented with Mati ARBio</h3>
            <p className="text-sm text-white/80">
              The navbar is your compass—jump into the AR demo or continue exploring data-driven stories of Mati City’s biodiversity.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/ar" className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              <ARIcon className="h-4 w-4" />
              Launch AR
            </Link>
            <Link to="/biodiversity" className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              <SpeciesIcon className="h-4 w-4" />
              Browse species
            </Link>
          </div>
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
                  
                  <p className="text-sm text-gray-600 leading-relaxed break-words">{s.summary}</p>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {s.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors duration-200 break-words">
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

  if (!site) return <p>Site not found.</p>

  const highlightSpecies = SPECIES.filter((sp) => site.highlightSpeciesIds.includes(sp.id))
  const flora = SPECIES.filter((sp) => site.floraIds.includes(sp.id))
  const fauna = SPECIES.filter((sp) => site.faunaIds.includes(sp.id))
  const associatedSpecies = SPECIES.filter((sp) => sp.siteIds.includes(site.id) && !site.highlightSpeciesIds.includes(sp.id) && !site.floraIds.includes(sp.id) && !site.faunaIds.includes(sp.id))

  const locationText = [site.barangay, site.city, site.province].filter(Boolean).join(', ')

  const formatCoordinate = (value: number, axis: 'lat' | 'lng') => {
    const cardinal = axis === 'lat' ? (value >= 0 ? 'N' : 'S') : value >= 0 ? 'E' : 'W'
    return `${Math.abs(value).toFixed(3)}°${cardinal}`
  }

  const statusMeta: Record<string, { label: string; classes: string }> = {
    CR: { label: 'Critically Endangered', classes: 'bg-gradient-to-r from-red-200 to-rose-100 text-red-800 border border-red-200/60' },
    EN: { label: 'Endangered', classes: 'bg-gradient-to-r from-amber-200 to-orange-100 text-orange-800 border border-orange-200/60' },
    VU: { label: 'Vulnerable', classes: 'bg-gradient-to-r from-yellow-100 to-lime-100 text-lime-800 border border-lime-200/60' },
    NT: { label: 'Near Threatened', classes: 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200/60' },
    LC: { label: 'Least Concern', classes: 'bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200/60' },
    DD: { label: 'Data Deficient', classes: 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200/60' },
  }

  const typeBadge = site.type === 'marine'
    ? 'bg-gradient-to-r from-sky-500/90 to-blue-600/90 text-white shadow-lg shadow-blue-900/30'
    : 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 text-white shadow-lg shadow-emerald-900/30'

  const infoCards = [
    {
      title: 'Location',
      value: locationText || 'Mati City, Davao Oriental',
      sub: `Coordinates · ${formatCoordinate(site.lat, 'lat')} · ${formatCoordinate(site.lng, 'lng')}`,
      icon: site.type === 'marine' ? '🌊' : '⛰️',
    },
    {
      title: 'Protection Status',
      value: site.designation,
      sub: site.areaHectares ? `≈ ${site.areaHectares.toLocaleString()} ha protected landscape` : undefined,
      icon: '🛡️',
    },
    {
      title: 'Ecological Highlights',
      value: `${site.features.length} signature features`,
      sub: `${highlightSpecies.length} flagship species`,
      icon: '✨',
    },
    {
      title: 'Visitor Notes',
      value: site.visitorNotes || 'Coordinate with local guides for responsible visits.',
      sub: 'Respect carrying capacity and wildlife guidelines.',
      icon: '🧭',
    },
  ]

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-slate-900 text-white shadow-2xl">
        {site.image && (
          <img
            src={site.image}
            alt={`${site.name} landscape`}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/75 to-slate-900/90" />
        <div className="relative space-y-6 p-8 sm:p-12">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wide ${typeBadge}`}>
            {site.type === 'marine' ? 'Marine Protected Area' : 'Terrestrial Wildlife Sanctuary'}
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-black sm:text-5xl">{site.name}</h1>
            <p className="text-lg text-slate-200 sm:max-w-3xl break-words">{site.summary}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300/80">{site.designation}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {site.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {infoCards.map((card) => (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-white/30 bg-white/70 p-6 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
          >
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-white/40 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-70" />
            <div className="relative space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                <span className="text-lg">{card.icon}</span>
                {card.title}
              </span>
              <p className="text-lg font-bold text-slate-800 dark:text-slate-100 break-words">{card.value}</p>
              {card.sub && <p className="text-sm text-slate-500 dark:text-slate-300/80 break-words">{card.sub}</p>}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Why it matters</h2>
  <p className="text-slate-600 dark:text-slate-300/90 break-words">{site.description}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {site.features.map((feature) => (
            <div
              key={feature}
              className="flex gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 text-slate-700 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
            >
              <span className="mt-1 text-xl">🌿</span>
              <p className="text-sm leading-relaxed break-words">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {highlightSpecies.length > 0 && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Flagship species</h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
              {highlightSpecies.length} highlighted
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {highlightSpecies.map((sp) => {
              const status = statusMeta[sp.status] ?? statusMeta.LC
              const heroImage = sp.images?.[0]
              return (
                <Link
                  key={sp.id}
                  to={`/species/${sp.id}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/70"
                >
                  {heroImage && (
                    <img
                      src={heroImage}
                      alt={`${sp.commonName} in habitat`}
                      className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/80 to-white/40 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-slate-900/40" />
                  <div className="relative space-y-3 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">{sp.category === 'flora' ? 'Flora' : 'Fauna'}</span>
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${status.classes}`}>
                        <span>{sp.status}</span>
                        <span className="hidden sm:inline">{status.label}</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{sp.commonName}</p>
                      <p className="text-sm italic text-slate-500 dark:text-slate-300">{sp.scientificName}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/90 break-words">{sp.blurb}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors group-hover:text-emerald-700 dark:text-emerald-300 dark:group-hover:text-emerald-200">
                      <span>Read species profile</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {(flora.length > 0 || fauna.length > 0) && (
        <section className="grid gap-6 md:grid-cols-2">
          {[
            { title: 'Key flora assemblage', data: flora },
            { title: 'Key fauna assemblage', data: fauna },
          ].map((bucket) => (
            <div
              key={bucket.title}
              className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60"
            >
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{bucket.title}</h3>
              <div className="flex flex-wrap gap-2">
                {bucket.data.map((species) => (
                  <Link
                    to={`/species/${species.id}`}
                    key={species.id}
                    className="inline-flex flex-col rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-left text-xs font-semibold text-slate-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 break-words"
                  >
                    <span>{species.commonName}</span>
                    <span className="text-[10px] font-normal italic text-slate-500 dark:text-slate-400">{species.scientificName}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {associatedSpecies.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Other species recorded here</h3>
          <div className="flex flex-wrap gap-2">
            {associatedSpecies.map((species) => (
              <Link
                to={`/species/${species.id}`}
                key={species.id}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-left text-xs font-semibold text-slate-600 hover:border-emerald-200 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 break-words"
              >
                <span>{species.commonName}</span>
                <span className="text-[10px] italic text-slate-500 dark:text-slate-400">{species.scientificName}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Stewardship and management</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/90 break-words">{site.stewardship}</p>
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Responsible visitation</h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300/90 break-words">
            {site.visitorNotes || 'Coordinate with the local tourism office for accredited guides, observe leave-no-trace ethics, and respect wildlife distances during your visit.'}
          </p>
        </div>
      </section>
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
        
  <div className="relative rounded-3xl p-12 bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-2 border-white/30 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="text-6xl animate-pulse mb-6"><CameraIcon className="w-16 h-16" /></div>
            
            <h3 className="text-2xl font-bold text-gray-800">Immersive AR Demo</h3>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Experience Mati's biodiversity like never before! Our augmented reality demo uses cutting-edge 
              MindAR + A-Frame technology to bring species to life in your environment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30 overflow-hidden">
                <div className="text-3xl mb-3"><CameraIcon className="w-8 h-8" /></div>
                <h4 className="font-bold mb-2">Camera Access</h4>
                <p className="text-sm text-gray-600">Allow camera permission for the best AR experience</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30 overflow-hidden">
                <div className="text-3xl mb-3"><TargetIcon className="w-8 h-8" /></div>
                <h4 className="font-bold mb-2">Target Recognition</h4>
                <p className="text-sm text-gray-600">Point your camera at target images to see AR content</p>
              </div>
              <div className="bg-white/60 rounded-2xl p-6 backdrop-blur-sm border border-white/30 overflow-hidden">
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
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-green-100/50 to-blue-100/50 border-2 border-white/30 backdrop-blur-sm overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><MissionIcon className="w-6 h-6" /> Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Mati ARBio is an innovative web-based educational and eco-tourism platform designed to showcase 
                the incredible biodiversity of Mati City. We combine cutting-edge augmented reality technology 
                with comprehensive species databases to create immersive learning experiences.
              </p>
            </div>
            
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-2 border-white/30 backdrop-blur-sm overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ConservationIcon className="w-6 h-6" /> Conservation Impact</h3>
              <p className="text-gray-700 leading-relaxed">
                Through interactive maps, detailed species profiles, and immersive AR experiences, we aim to 
                raise awareness about environmental conservation while promoting sustainable eco-tourism in the region.
              </p>
            </div>
          </div>
          
          <div className={`space-y-6 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="text-3xl mb-2"><MapIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Interactive Maps</h4>
                <p className="text-sm text-gray-600">Explore biodiversity hotspots</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="text-3xl mb-2"><SpeciesIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Species Database</h4>
                <p className="text-sm text-gray-600">Comprehensive species profiles</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="text-3xl mb-2"><TechIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">AR Technology</h4>
                <p className="text-sm text-gray-600">Immersive 3D experiences</p>
              </div>
              
              <div className="bg-white/60 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/30 hover:scale-105 transition-transform duration-300 overflow-hidden">
                <div className="text-3xl mb-2"><EducationIcon className="w-8 h-8" /></div>
                <h4 className="font-bold text-lg mb-1">Education</h4>
                <p className="text-sm text-gray-600">Learn about conservation</p>
              </div>
            </div>
            
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-purple-100/50 to-pink-100/50 border-2 border-white/30 backdrop-blur-sm overflow-hidden">
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
          <div className="relative rounded-3xl p-12 bg-gradient-to-br from-green-400/20 via-blue-400/20 to-purple-400/20 border-2 border-white/30 backdrop-blur-sm overflow-hidden">
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
          <main id="main" className="pt-12 lg:pt-16">
            <div className="w-full px-4 pb-16 sm:px-6 lg:px-12 xl:px-16">
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
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}
