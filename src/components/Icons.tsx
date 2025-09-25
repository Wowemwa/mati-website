import React from 'react'

export const WaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M0 16c6 0 6-8 12-8s6 8 12 8 6-8 12-8 6 8 12 8 6-8 12-8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const MountainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M4 44 26 8l8 14 6-8 20 30H4Z" strokeLinejoin="round" />
    <path d="m26 8 4 10 4-6" strokeLinecap="round" />
  </svg>
)

export const LeafIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M34 6S12 4 6 22c0 0-.5 8 6 12s16 2 20-10C36 14 34 6 34 6Z" />
    <path d="M14 26c4-2 7-5 10-9" strokeLinecap="round" />
  </svg>
)

export const InfoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx={12} cy={12} r={9} />
    <path d="M12 8h.01M11 11h2v6h-2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const SpeciesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M14 34c6 2 14 2 20 0M10 14c4-4 24-4 28 0M6 24c8 4 28 4 36 0" strokeLinecap="round" />
    <circle cx={24} cy={24} r={6} />
  </svg>
)

export const ARIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <rect x={6} y={10} width={36} height={24} rx={4} />
    <path d="M18 34v4m12-4v4M18 20l6 4 6-4-6-4-6 4Z" strokeLinejoin="round" />
  </svg>
)

export const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M4 12 16 8l16 4 12-4v28l-12 4-16-4-12 4V12Z" strokeLinejoin="round" />
    <path d="M16 8v28M32 12v28" />
  </svg>
)

export const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <rect x={6} y={14} width={36} height={24} rx={4} />
    <path d="M18 14h12l2 4h10" strokeLinecap="round" />
    <circle cx={24} cy={26} r={7} />
  </svg>
)

export const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx={24} cy={24} r={14} />
    <circle cx={24} cy={24} r={8} />
    <circle cx={24} cy={24} r={3} />
    <path d="M24 6v6M24 36v6M6 24h6M36 24h6" strokeLinecap="round" />
  </svg>
)

export const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="m24 6 6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 20l14-2 6-12Z" strokeLinejoin="round" />
  </svg>
)

export const MissionIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M10 8h28v32H10Z" />
    <path d="M18 16h12M18 24h12M18 32h8" strokeLinecap="round" />
  </svg>
)

export const EducationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M4 16 24 6l20 10-20 10L4 16Z" strokeLinejoin="round" />
    <path d="M10 26v8l14 8 14-8v-8" />
  </svg>
)

export const TechIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <rect x={8} y={12} width={32} height={24} rx={4} />
    <path d="M16 36v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    <path d="M16 18h16v12H16Z" />
  </svg>
)

export const ConservationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M24 42s14-8 14-20a8 8 0 0 0-14-5.5A8 8 0 0 0 10 22c0 12 14 20 14 20Z" strokeLinejoin="round" />
  </svg>
)
