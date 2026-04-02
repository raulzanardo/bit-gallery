# BIT GALLERY

Retro pixel photo gallery built with React Router 7.

BIT GALLERY turns your folder of camera exports into a PICO-8 inspired gallery UI with a sharp grid, CRT-like status bars, and a keyboard-friendly lightbox.

## Why It Is Cool

- Pixel-art inspired interface with game-console energy
- Auto-discovers images from `public/photos`
- Sorts files by number in filename (newest-style names first)
- Lightbox with keyboard controls:
- `A` / `Left Arrow` for previous
- `D` / `Right Arrow` for next
- `Esc` to close
- Server-side loader reads files directly from disk
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
