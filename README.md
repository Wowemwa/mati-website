# Mati ARBio (MVP)

A colorful React + Vite + TypeScript app with Leaflet maps, species pages, and an AR demo scaffold (MindAR + A‑Frame).

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