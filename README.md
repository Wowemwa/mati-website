# Mati City Biodiversity Explorer 🌿

[![Version](https://img.shields.io/badge## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18+ (tested on Node 20)
- **npm**: Version 9+
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Ins#### **Technical Components**
- **MindAR**: Advanced computer vision for image tracking and marker recognition
- **A-Frame**: WebXR framework for cross-platform AR experiences
- **WebRTC**: Real-time camera access and processing
- **WebGL**: Hardware-accelerated 3D rendering

#### **Getting Started with AR**

1. **Access the Demo**
   ```
   Navigate to: /ar-demo/ or click "AR Demo" in navigation
   ```

2. **Camera Setup**
   - Allow camera permissions when prompted
   - Ensure good lighting conditions
   - Point camera at the target image

3. **Target Resources**
   - **Demo Target**: [Download Image](https://raw.githubusercontent.com/MindAR-js/aframe-examples/master/image-tracking/assets/card-example/card.png)
   - **Target Data**: Pre-configured recognition file

#### **Custom AR Target Development**

```bash
# Generate custom target from your image
npm run ar:compile

# Development workflow:
# 1. Place image: public/ar-demo/images/your-image.jpg
# 2. Run compilation to generate targets.mind
# 3. Test with: /ar-demo/?local=1
```

#### **AR Features**
- Real-time 3D model overlay on tracked images
- Interactive species information panels
- Environmental context visualization
- Cross-platform mobile compatibility

The AR system provides an innovative approach to biodiversity education, allowing users to visualize species and habitats through their mobile devices.evelopment

```bash
# Clone the repository
git clone https://github.com/Wowemwa/mati-website.git
cd mati-website

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will launch at `http://localhost:5173` (or next available port).

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🏗️ Architecture & Technology Stack

### **Core Technologies**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.5.2 | Type Safety & Developer Experience |
| Vite | 5.4.1 | Build Tool & Dev Server |
| Tailwind CSS | 3.4.10 | Utility-First Styling |
| Leaflet.js | 1.9.4 | Interactive Mapping & GIS |

### **Key Libraries**
- **React Router**: Client-side routing and navigation
- **Lucide React**: Modern icon system
- **MindAR**: AR image tracking and 3D experiences
- **A-Frame**: WebXR framework for immersive experiences

### **Performance Features**
- Code splitting with dynamic imports
- Lazy loading with React Suspense
- Progressive image loading
- Bundle optimization and tree shaking
- Service worker ready architecture5.0-brightgreen.svg)](https://github.com/Wowemwa/mati-website)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> **An Interactive Biodiversity Explorer Platform Using Augmented Reality and Web-Based Mapping for Environmental Education and Eco-Tourism in Mati City, Philippines**

A modern, comprehensive web application showcasing Mati City's rich biodiversity through interactive GIS mapping, species exploration, and cutting-edge AR technology. Built with React, TypeScript, and advanced glassmorphism design principles.

## 🌟 Key Features

### 🗺️ **Interactive GIS Mapping**
- Real-time biodiversity hotspot visualization using Leaflet.js
- Multi-layer ecosystem mapping (Marine & Terrestrial)
- Geospatial data integration with WGS84 coordinate system
- Mobile-optimized touch controls and responsive cartography

### � **Species Explorer**
- Comprehensive database of 20+ scientifically documented species
- Advanced search and filtering capabilities
- Detailed species profiles with ecology, distribution, and conservation data
- High-quality imagery and taxonomic information

### ✨ **Augmented Reality Demo**
- MindAR-powered image tracking with A-Frame integration
- Interactive 3D species models and environmental overlays
- Educational AR experiences for immersive learning

### 🎨 **Modern UI/UX Design**
- Glassmorphism design system with animated backdrops
- High-contrast navigation with dynamic gradient animations
- Responsive design optimized for all device sizes
- Dark/light theme support with smooth transitions

---

## 📋 Release Notes

### **Version 0.5.0** - Latest (September 26, 2025)

#### 🎨 **Navigation & UI Enhancements**
- **Enhanced Navigation Header**: Redesigned with high-contrast animated backdrop featuring dynamic gradient animations
- **Improved Glassmorphism Effects**: Upgraded backdrop blur, enhanced shadows, and refined transparency layers
- **Mobile Navigation Overhaul**: Modern card-based design with enhanced SOON badges and smooth animations
- **Visual Polish**: Added rotation animations, multi-stage opacity transitions, and inner glow effects

#### � **Performance Optimizations**
- Implemented lazy loading for major components with Suspense boundaries
- Advanced code splitting and bundle optimization with Terser minification
- Progressive image loading with intersection observer API
- Enhanced HTML meta tags with preconnect and DNS prefetch optimizations

#### 🔧 **Technical Improvements**
- Centralized data management with `DataContext` and unified API helpers
- Admin preview system with password-gated access and persistent authentication
- Memoized expensive computations for improved render performance
- Enhanced TypeScript interfaces and data validation

### **Previous Versions**
<details>
<summary>View version history</summary>

#### **Version 0.4.0** - Performance & Layout
- Layout optimizations for better screen utilization
- Typography enhancements and color scheme improvements
- Responsive design refinements and spacing optimizations

#### **Version 0.3.0** - Data Architecture
- Introduced centralized data context system
- Added admin preview functionality
- Enhanced navbar with consistent pill design
- Integrated live data counts throughout the application

</details>

## Release snapshot

- **Version:** v0.3.0
- **Updated:** 2025-09-26 02:50 (UTC)

### What changed in this drop

- Introduced `DataContext` to centralize hotspot and species data with a unified helper API, replacing page-level static imports.
- Added `AdminContext` with password-gated preview mode, persistent login, and a dedicated `/admin/preview` route.
- Created a reusable `ComingSoon` component and wired AR/Virtual Tour navigation flows to show coming-soon messaging for non-admins.
- Refined the desktop navbar: consistent pill spacing, enhanced active-state glow, and compact “Soon” badges for unreleased features.
- Updated hero and stats sections to surface live counts from context data, aligning with the sticky header counters.

---

## 📁 Project Structure

```
mati-website/
├── 📂 src/
│   ├── 📂 components/          # Reusable UI components
│   │   ├── AnimatedLogo.tsx    # Animated branding elements
│   │   ├── AnimatedText.tsx    # Text animation utilities
│   │   ├── Atmosphere.tsx      # Background effects
│   │   ├── ComingSoon.tsx      # Feature preview component
│   │   ├── Icons.tsx           # Icon system
│   │   ├── ShowcaseNavbar.tsx  # Navigation components
│   │   └── UI.tsx              # Core UI primitives
│   ├── 📂 context/             # State management
│   │   ├── AdminContext.tsx    # Admin authentication
│   │   └── DataContext.tsx     # Centralized data management
│   ├── 📂 data/                # Data layer
│   │   ├── adapters.ts         # Data transformation utilities
│   │   ├── hotspots.ts         # Biodiversity location data
│   │   ├── sample.ts           # Sample/mock data
│   │   └── schema.ts           # TypeScript interfaces
│   ├── 📂 hooks/               # Custom React hooks
│   │   └── useScrollPosition.ts # Scroll behavior utilities
│   ├── 📂 pages/               # Route components
│   │   ├── BiodiversityExplorer.tsx # Species discovery interface
│   │   └── SpeciesDetail.tsx        # Individual species pages
│   ├── 📂 types/               # TypeScript definitions
│   │   └── firebase.d.ts       # Firebase type extensions
│   ├── App.tsx                 # Main application component
│   ├── firebase.ts             # Firebase configuration
│   ├── main.tsx                # Application entry point
│   ├── styles.css              # Global styles & animations
│   └── useTheme.ts             # Theme management
├── 📂 public/
│   └── 📂 ar-demo/             # Static AR demonstration
└── 📄 Configuration files      # Vite, Tailwind, TypeScript configs
```

---

## 🗺️ GIS Integration & Mapping Technology

### **Advanced Geographic Information System**

The platform leverages enterprise-grade GIS technology for precise biodiversity mapping and spatial analysis:

#### **Core GIS Capabilities**
- **Interactive Cartography**: Leaflet.js-powered maps with advanced zoom, pan, and layer management
- **Spatial Data Visualization**: High-precision biodiversity hotspot positioning with coordinate accuracy
- **Multi-layer Ecosystem Mapping**: Separate marine and terrestrial layer systems with custom styling
- **Geospatial Analysis**: Location-based filtering, species distribution mapping, and habitat correlation
- **Responsive Mobile Cartography**: Touch-optimized controls with gesture support

#### **Technical Implementation**
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Mapping Engine** | Leaflet.js 1.9.4 | Lightweight, mobile-optimized GIS library |
| **Coordinate System** | WGS84 (EPSG:4326) | Global compatibility and precision |
| **Data Format** | GeoJSON + Custom Schema | Structured geographic data representation |
| **Base Maps** | OpenStreetMap | High-quality tile layer services |
| **Custom Overlays** | Species markers & habitat zones | Interactive biodiversity visualization |

#### **Data Architecture**
```typescript
// Biodiversity Hotspot Schema
interface BiodiversityHotspot {
  id: string;
  name: string;
  coordinates: [latitude: number, longitude: number];
  type: 'marine' | 'terrestrial';
  species: Species[];
  description: string;
  ecosystem: EcosystemType;
  conservationStatus: ConservationLevel;
  accessibility: AccessibilityInfo;
}

// Species Distribution Mapping
interface SpeciesLocation {
  speciesId: string;
  coordinates: [number, number];
  abundance: 'common' | 'uncommon' | 'rare';
  observationDate: Date;
  habitat: HabitatType;
}
```

The GIS system provides scientifically accurate geographic referencing of Mati City's biodiversity, enabling precise location-based education and research applications.

---

## 🔮 Augmented Reality Experience

### **Immersive AR Technology Stack**

The AR demo showcases cutting-edge web-based augmented reality for biodiversity education:

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

---

## 🛠️ Development & Deployment

### **Environment Setup**
```bash
# Recommended Node.js version
nvm use 20

# Clean installation (if needed)
rm -rf node_modules package-lock.json
npm install
```

### **Available Scripts**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run ar:compile` | Generate AR target recognition data |

### **Troubleshooting**

#### **Common Issues**
- **Port Conflicts**: Vite auto-selects ports (5173 → 5174 → 5175 → 5176)
- **CSS Warnings**: `@tailwind` directives may show warnings in some editors (normal behavior)
- **Node Version**: Ensure Node 18+ for ESM compatibility
- **AR Camera**: Allow camera permissions and ensure HTTPS for production

#### **Performance Optimization**
- Enable browser hardware acceleration for AR features
- Use Chrome DevTools Performance tab for bundle analysis
- Monitor memory usage during extended AR sessions

---

## 🚀 Roadmap & Future Development

### **Phase 1: Content Expansion** *(Current)*
- [ ] Additional biodiversity hotspot mapping
- [ ] Enhanced species database with multimedia content
- [ ] Community contribution system for species observations

### **Phase 2: Backend Integration**
- [ ] Firebase Authentication & Firestore integration
- [ ] Admin content management system
- [ ] Real-time species observation tracking
- [ ] User-generated content moderation

### **Phase 3: Advanced AR Features**
- [ ] Custom species-specific AR markers
- [ ] 3D habitat reconstruction
- [ ] Multi-marker environmental scenes
- [ ] Educational AR guided tours

### **Phase 4: Community & Analytics**
- [ ] User progress tracking and gamification
- [ ] Social sharing and community features
- [ ] Advanced analytics and conservation metrics
- [ ] Integration with scientific research databases

---

## 📄 License & Contributing

This project is licensed under the MIT License. Contributions are welcome through pull requests and issue reporting.

### **Contributing Guidelines**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact & Support

**Project Maintainer**: Wowemwa  
**Repository**: [github.com/Wowemwa/mati-website](https://github.com/Wowemwa/mati-website)  
**Issues**: [Report bugs or request features](https://github.com/Wowemwa/mati-website/issues)

---

<div align="center">

**Built with ❤️ for biodiversity conservation and environmental education**

*Mati City Biodiversity Explorer - Connecting people with nature through technology*

</div>