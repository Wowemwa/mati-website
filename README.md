# Mati## Release snapshot

- **Version:** v0.4.0
- **Updated:** 2025-09-26 18:36 (UTC)

### What changed in this drop (September 26, 2025 - 6:36 PM)

#### 🚀 Performance Optimizations
- Implemented lazy loading for `BiodiversityExplorer` and `SpeciesDetail` components with Suspense boundaries
- Added code splitting and manual chunk configuration for better bundle management
- Optimized Vite build configuration with Terser minification and performance settings
- Added bundle analyzer and performance monitoring tools
- Enhanced HTML meta tags with preconnect, DNS prefetch, and resource hints
- Created `LazyImage` component for progressive image loading with intersection observer

#### 🎨 UI/UX Improvements  
- **Tagline Updates**: Changed from "Discover Mati's biodiversity..." to "Explore biodiversity through maps, data, and AR experiences."
- **Typography Optimization**: Adjusted font sizes and weights for better readability and contrast
- **Layout Enhancements**: Reduced padding/margins throughout to maximize screen utilization
- **Responsive Design**: Optimized navbar and main content for better full-screen usage
- **Visual Polish**: Added pulse animation to biodiversity badge, removed notification banner
- **Color Improvements**: Enhanced light/dark mode color schemes for better visibility

#### 🔧 Technical Improvements
- Memoized navigation items and expensive computations for better performance  
- Optimized spacing: reduced section gaps from `space-y-16` to `space-y-8`
- Enhanced container layouts: improved grid spacing and responsive breakpoints
- Updated build process with performance-focused configurations
- Added development tools for bundle analysis and optimization monitoring

#### 📱 Screen Utilization
- Reduced main container padding for edge-to-edge design
- Optimized navbar spacing and made it more compact
- Improved content positioning to utilize full viewport height
- Enhanced responsive typography scaling across device sizes

### Previous Release (v0.3.0 - 2025-09-26 02:50 UTC)

- Introduced `DataContext` to centralize hotspot and species data with a unified helper API, replacing page-level static imports.
- Added `AdminContext` with password-gated preview mode, persistent login, and a dedicated `/admin/preview` route.
- Created a reusable `ComingSoon` component and wired AR/Virtual Tour navigation flows to show coming-soon messaging for non-admins.
- Refined the desktop navbar: consistent pill spacing, enhanced active-state glow, and compact "Soon" badges for unreleased features.
- Updated hero and stats sections to surface live counts from context data, aligning with the sticky header counters.

> **📝 Note:** This project title is subject to change for the final capstone submission. Current working title: "Mati ARBio: An Interactive Biodiversity Explorer Platform Using Augmented Reality and Web-Based Mapping for Environmental Education and Eco-Tourism"

A colorful React + Vite + TypeScript app with Leaflet maps, species pages, and an AR demo scaffold (MindAR + A‑Frame).

## Release snapshot

- **Version:** v0.3.0
- **Updated:** 2025-09-26 02:50 (UTC)

### What changed in this drop

- Introduced `DataContext` to centralize hotspot and species data with a unified helper API, replacing page-level static imports.
- Added `AdminContext` with password-gated preview mode, persistent login, and a dedicated `/admin/preview` route.
- Created a reusable `ComingSoon` component and wired AR/Virtual Tour navigation flows to show coming-soon messaging for non-admins.
- Refined the desktop navbar: consistent pill spacing, enhanced active-state glow, and compact “Soon” badges for unreleased features.
- Updated hero and stats sections to surface live counts from context data, aligning with the sticky header counters.

## Run locally

Requirements: Node.js 18+ (tested on Node 20), npm 9+.

1. Install dependencies
	- `npm install`
2. Start dev server
	- `npm run dev`
	- App will open at http://localhost:5173/ (or a nearby port if busy). The AR demo is at `/ar` inside the app which links to `/ar-demo/` static page.

Optional: Build for production
- `npm run build` (outputs to `dist/`)
- `npm run preview` to locally preview the production build

## AR Demo

The static AR demo uses MindAR (image tracking) + A‑Frame and is wired to a hosted sample target:

- Targets file: https://raw.githubusercontent.com/MindAR-js/aframe-examples/master/image-tracking/assets/card-example/card.mind
- Target image: https://raw.githubusercontent.com/MindAR-js/aframe-examples/master/image-tracking/assets/card-example/card.png

How to try:
- Open `/ar-demo/` (or click AR Demo from the navbar), allow camera permissions, and point the camera at the target image (link above). You should see a Duck glTF appear on the marker.

Swap to your own target later:
- Generate a `targets.mind` from your image using MindAR’s target compiler, place it under `public/ar-demo/targets.mind`, and change `imageTargetSrc` in `public/ar-demo/index.html` to `./targets.mind`.

Quick compile from pitcher image (CLI):
- Put your image at `public/ar-demo/images/pitcher.jpg` (replace with your own file name if different)
- Run: `npm run ar:compile` (uses mind-ar-tools via npx to output `public/ar-demo/targets.mind`)
- Open `/ar-demo/?local=1` to force using your local target

## Troubleshooting

- Port in use: Vite will try 5173 → 5174 → 5175 → 5176 automatically. Use the shown URL.
- Tailwind CSS warnings in editor: `@tailwind` and `@apply` may show as unknown rules in some editors, but they compile fine with PostCSS at build/runtime.
- Node version: If you see `vite: not found` or ESM errors, ensure Node 18+ and reinstall deps: `rm -rf node_modules package-lock.json && npm install`.

## Next steps

- Add more sites and species content with images
- Wire Firebase (Auth, Firestore, Storage) and admin CRUD
- Replace hosted AR target with your own species/site marker and add an in-app AR viewer

If you want, I can generate a `targets.mind` for your chosen image and wire it in.