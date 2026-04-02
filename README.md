# BIT GALLERY

Retro pixel photo gallery built with React Router 7.

BIT GALLERY turns your folder of camera exports into a PICO-8 inspired gallery UI with a sharp grid, CRT-like status bars, and a keyboard-friendly lightbox.

## Camera Used For These Photos

Most sample photos in this gallery were captured with this project:

- https://github.com/raulzanardo/lilygo-pixel-camera

Camera project highlights:

- Hardware: LilyGo T-Display S3 Pro (ESP32-S3)
- Sensor: OV3660 camera module
- Capture pipeline tuned for pixel-art style output
- Live preview at 240x176 (HQVGA)
- Photos saved as PNG files to microSD (with 2x upscale in camera firmware)
- Real-time filters, palettes, and dithering effects

If you want the same look, export images from that camera project into this repo under public/photos and list them in public/photos/photos.json.

## Why It Is Cool

- Pixel-art inspired interface with game-console energy
- Auto-discovers images from `public/photos`
- Sorts files by number in filename (newest-style names first)
- Lightbox with keyboard controls:
- `A` / `Left Arrow` for previous
- `D` / `Right Arrow` for next
- `Esc` to close
- Mobile swipe support in lightbox navigation
- Docker-ready for easy deployment

## Tech Stack

- React 19
- React Router 7 (framework mode)
- TypeScript
- Vite
- Node.js

## Quick Start

### 1. Install

```bash
npm install
```

### 2. Add Your Photos

Drop your image files into:

```text
public/photos/
```

List visible files in:

```text
public/photos/photos.json
```

Supported formats:

- `.png`
- `.jpg` / `.jpeg`
- `.bmp`
- `.gif`

### 3. Run Dev Server

```bash
npm run dev
```

Open `http://localhost:5173`.

If your local config uses a base path, open `http://localhost:5173/bit-gallery/`.

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Run built server from build/server/index.js
npm run typecheck # Generate types + TypeScript check
```

## Project Structure

```text
app/
	routes/
		home.tsx      # Gallery page + file loader + lightbox
public/
	photos/         # Put your images here
build/
	client/         # Static build output
	server/         # Server build output
```

## Docker

Build and run:

```bash
docker build -t bit-gallery .
docker run --rm -p 3000:3000 bit-gallery
```

Then open `http://localhost:3000`.

## Deploy To GitHub Pages

This project is configured to deploy automatically on push to `master` using GitHub Actions.

One-time setup with GitHub CLI:

```bash
gh auth login
gh repo edit --enable-pages
```

Then in GitHub:

- Go to **Settings → Pages**
- Set **Source** to **GitHub Actions**

Deployment URL pattern:

```text
https://<your-username>.github.io/bit-gallery/
```

Workflow file:

```text
.github/workflows/deploy-pages.yml
```

## Notes

- If `public/photos` does not exist, the app creates it automatically.
- If no files are found, you will get a themed empty-state screen with upload instructions.

## Future Ideas

- Drag-and-drop upload flow
- EXIF date sorting toggle
- Favorite/star photos
- Slideshow mode
- Optional image optimization pipeline

---

Built for pixels, nostalgia, and camera roll archaeology.
