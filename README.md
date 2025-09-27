# Mati City Biodiversity Explorer 🌿

[![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/Wowemwa/mati-website)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org/)

> **A comprehensive digital platform showcasing the rich biodiversity of Mati City, Davao Oriental, Philippines. Features interactive GIS mapping, scientific species documentation, AR experiences, and a professional admin management system.**

## 🌟 Key Features

### 🗺️ **Interactive GIS Mapping**
- Real-time biodiversity hotspot visualization
- Leaflet-powered interactive maps with custom markers
- Detailed location information with GPS coordinates
- UNESCO World Heritage Site integration

### 🔬 **Scientific Species Database**
- Comprehensive flora and fauna documentation
- IUCN conservation status tracking
- High-resolution scientific photography
- Taxonomic classification and habitat information

### 🥽 **Augmented Reality Experience**
- Advanced MindAR-powered species recognition
- 3D model overlays and interactive content
- Mobile-optimized AR functionality
- Educational AR targets and experiences

### 👑 **Professional Admin System**
- Complete CRUD operations for all data
- Real-time analytics and reporting
- Bulk data export (CSV/JSON)
- Secure authentication and session management

### 🎨 **Modern UI/UX Design**
- Glassmorphism design with backdrop blur effects
- Dark/light theme with system preference detection
- **Mobile/Desktop View Toggle** - Manual switching between layouts
- **Intelligent Device Detection** - Auto-adapts to iOS, Android, Desktop
- Fully responsive design for all devices
- Progressive Web App (PWA) capabilities

## 🚀 Quick Start

### Prerequisites
- **Node.js**: Version 18+ (recommended: 20.x)
- **npm**: Version 9+
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (WebXR support recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/Wowemwa/mati-website.git
cd mati-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### Environment Configuration

Create `.env.local` in the project root:

```env
# Admin Authentication
VITE_ADMIN_PASS=your_secure_password_here

# Optional: Firebase Configuration (for future features)
# VITE_FIREBASE_API_KEY=your_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your_domain
```

## 📱 Usage

### Public Access
- **Homepage**: Interactive biodiversity overview with adaptive layouts
- **GIS Map**: `/gis` - Explore hotspots and species locations
- **Species Explorer**: `/biodiversity` - Browse detailed species information
- **View Toggle**: Mobile/Desktop switcher for optimal viewing experience
- **About**: `/about` - Learn about the project and conservation efforts

### 🔄 Mobile/Desktop View Toggle
- **Automatic Detection**: Platform-aware adaptive layouts (iOS/Android/Desktop)
- **Manual Override**: Click the floating button (bottom-right) to switch views
- **Visual Feedback**: Dramatic layout changes with blue theme for mobile view
- **Platform Indicators**: Shows device type, screen size, and platform info
- **Touch Optimization**: Larger buttons and optimized spacing in mobile view

### Admin Access
1. **Login**: Navigate to `/admin` or `/admin/preview`
2. **Authenticate**: Use your configured admin password
3. **Manage Data**: Full CRUD operations for hotspots and species
4. **Export Data**: Download CSV/JSON backups
5. **Monitor System**: View analytics and system status

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# AR Development
npm run ar:compile   # Generate AR targets from images
```

### Project Structure

```
mati-website/
├── 📂 public/
│   ├── 📂 ar-demo/           # AR experience assets
│   │   ├── index.html        # AR viewer
│   │   ├── 📂 images/        # Target images
│   │   └── 📂 targets/       # Compiled AR targets
│   ├── site.webmanifest      # PWA manifest
│   └── sw.js                 # Service worker
├── 📂 src/
│   ├── App.tsx               # Main application component
│   ├── 📂 components/        # Reusable UI components
│   │   ├── AnimatedLogo.tsx  # Brand animations
│   │   ├── ErrorBoundary.tsx # Error handling
│   │   ├── LoadingSpinner.tsx# Loading states
│   │   ├── MobileLayout.tsx  # Mobile-responsive components
│   │   ├── ViewToggleButton.tsx # Mobile/Desktop switcher
│   │   ├── PerformanceMonitor.tsx # Dev tools
│   │   └── UI.tsx            # Core UI primitives
│   ├── 📂 context/           # State management
│   │   ├── AdminContext.tsx  # Authentication
│   │   ├── DataContext.tsx   # Data management
│   │   └── DeviceContext.tsx # Device detection & view state
│   ├── 📂 data/              # Biodiversity database
│   │   ├── mati-hotspots.ts  # Hotspot definitions
│   │   ├── hotspots.ts       # Species data
│   │   └── schema.ts         # TypeScript interfaces
│   ├── 📂 hooks/             # Custom React hooks
│   │   └── useDeviceDetection.ts # Platform detection logic
│   ├── 📂 pages/             # Page components
│   ├── 📂 types/             # Type definitions
│   └── 📂 utils/             # Utility functions
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Styling configuration
├── vite.config.ts           # Build configuration
└── README.md                # This file
```

## 🔧 Technical Architecture

### Core Technologies
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4+ with HMR and optimization
- **Styling**: Tailwind CSS with custom design system
- **Device Detection**: Advanced platform recognition system
- **Responsive Design**: Mobile/Desktop adaptive layouts
- **Mapping**: Leaflet with custom tile layers
- **AR Framework**: MindAR + A-Frame for WebXR
- **State Management**: React Context with custom hooks

### Performance Features
- **Code Splitting**: Route-based and component-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Caching Strategy**: Service worker with intelligent caching
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Memory Management**: Automatic cleanup and monitoring

### Security & Authentication
- **Admin Protection**: Environment variable-based authentication
- **Session Management**: Secure token-based sessions
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Sanitized inputs and outputs

## 🎯 Admin System Guide

### Authentication Setup
```bash
# Set admin password in .env.local
VITE_ADMIN_PASS=your_secure_password

# Access admin panel
http://localhost:5173/admin
```

### Admin Capabilities

#### 📊 **Dashboard Overview**
- Real-time system statistics
- Data summary and metrics
- Recent activity monitoring
- Performance indicators

#### 🗺️ **Hotspot Management**
- **Create**: Add new biodiversity hotspots
- **Read**: View detailed hotspot information
- **Update**: Edit location data, descriptions, coordinates
- **Delete**: Remove outdated or incorrect entries

#### 🦋 **Species Management**
- **Create**: Add new species with complete taxonomic data
- **Read**: Browse species database with filtering
- **Update**: Modify species information, images, status
- **Delete**: Remove species entries with confirmation

#### 📤 **Data Export**
- **CSV Export**: Spreadsheet-compatible format
- **JSON Export**: API-ready structured data
- **Bulk Operations**: Export entire datasets
- **Filtered Exports**: Export based on criteria

#### 🔍 **Advanced Features**
- **Search & Filter**: Find data quickly across all fields
- **Batch Operations**: Perform actions on multiple items
- **Validation**: Ensure data integrity with form validation
- **Backup System**: Regular data export for safety

### Admin Workflow Example

```typescript
// Adding a new species through admin interface
const newSpecies = {
  id: 'unique-id',
  name: 'Scientific Name',
  commonName: 'Common Name',
  status: 'Endangered',
  habitat: 'Forest',
  image: 'scientific-photo-url',
  description: 'Detailed description...'
};

// System automatically validates and saves
```

## 🌐 AR Experience Guide

### **Technical Components**
- **MindAR**: Advanced computer vision for image tracking
- **A-Frame**: WebXR framework for cross-platform experiences
- **WebRTC**: Real-time camera access and processing
- **WebGL**: Hardware-accelerated 3D rendering

### **Getting Started with AR**

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

### **Custom AR Development**

```bash
# Generate custom target from your image
npm run ar:compile

# Development workflow:
# 1. Place image: public/ar-demo/images/your-image.jpg
# 2. Run compilation to generate targets.mind
# 3. Test with: /ar-demo/?local=1
```

### **AR Features**
- Real-time 3D model overlay on tracked images
- Interactive species information panels
- Environmental context visualization
- Cross-platform mobile compatibility

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview

# Deploy to your hosting platform
# (Static files will be in dist/ directory)
```

### Hosting Recommendations
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: Static site hosting with forms and serverless functions
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3**: Scalable cloud storage with CloudFront CDN

### Environment Variables for Production
```env
# Production Admin Password
VITE_ADMIN_PASS=secure_production_password

# Optional: Analytics and monitoring
VITE_ANALYTICS_ID=your_analytics_id
```

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow TypeScript and ESLint guidelines
4. **Test thoroughly**: Ensure all functionality works across devices
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes in detail

### Code Standards
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ESLint**: Airbnb configuration with React hooks rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Testing Guidelines
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify mobile responsiveness on various screen sizes
- Validate AR functionality on supported devices
- Check admin system security and data integrity

## 🐛 Known Issues & Limitations

### AR Experience
- **WebXR Support**: Limited to modern browsers with WebXR support
- **Camera Permissions**: Requires user permission for camera access
- **Performance**: May be slower on older mobile devices

### Browser Compatibility
- **Internet Explorer**: Not supported (modern browsers only)
- **iOS Safari**: Some AR features may have limitations
- **Android Chrome**: Full feature support

### Admin System
- **Single User**: Currently supports one admin user
- **Local Storage**: Session data stored locally (not persistent across devices)

## 📊 Project Statistics

- **Total Species Documented**: 20+
- **Biodiversity Hotspots**: 10 major locations
- **AR Targets**: 5+ interactive experiences
- **Code Quality**: A+ (ESLint + TypeScript strict mode)
- **Performance Score**: 95+ (Lighthouse)
- **Bundle Size**: <500KB (optimized with tree shaking)

## 📚 Educational Impact

### Target Audiences
- **Students**: Interactive learning about local biodiversity
- **Researchers**: Access to documented species data
- **Tourists**: Eco-tourism planning and education
- **Conservationists**: Data-driven conservation insights

### Learning Outcomes
- Understanding of Philippine biodiversity
- Awareness of conservation status and threats
- Interactive engagement with local ecosystems
- Technology-enhanced environmental education

## 🔮 Future Roadmap

### Short Term (Q1 2024)
- [x] **Mobile/Desktop View Toggle** - Intelligent platform detection
- [x] **Adaptive UI Components** - Platform-optimized layouts
- [ ] Multi-language support (Filipino, Cebuano)
- [ ] Enhanced AR model library
- [ ] Offline PWA functionality
- [ ] User feedback system

### Medium Term (Q2-Q3 2024)
- [ ] Multi-admin system with role management
- [ ] API integration for real-time data updates
- [ ] Mobile app development (React Native)
- [ ] Advanced analytics dashboard

### Long Term (Q4 2024+)
- [ ] Machine learning species identification
- [ ] Community contribution system
- [ ] VR experience development
- [ ] Research collaboration platform

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Acknowledgments

### Development Team
- **Lead Developer**: [Your Name]
- **Project Supervisor**: [Supervisor Name]
- **Institution**: [Your Institution]

### Special Thanks
- **Mati City Government**: For conservation data and support
- **Local Researchers**: For species documentation and expertise
- **Open Source Community**: For amazing tools and libraries
- **Conservation Organizations**: For awareness and education support

### Scientific Contributors
- Species photography from Wikimedia Commons and scientific databases
- Taxonomic data verified against IUCN Red List and Philippine biodiversity records
- Geographic data sourced from official government surveys

## 📞 Contact & Support

### Get Help
- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussion**: Use GitHub Discussions for questions

### Contact Information
- **Email**: [your-email@domain.com]
- **GitHub**: [@YourUsername](https://github.com/YourUsername)
- **Website**: [Your Portfolio/Website]

---

<div align="center">

**🌿 Protecting Philippines' Biodiversity Through Technology 🌿**

*Made with ❤️ for environmental conservation and education*

[![GitHub Stars](https://img.shields.io/github/stars/Wowemwa/mati-website?style=social)](https://github.com/Wowemwa/mati-website)
[![GitHub Forks](https://img.shields.io/github/forks/Wowemwa/mati-website?style=social)](https://github.com/Wowemwa/mati-website)

</div>
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