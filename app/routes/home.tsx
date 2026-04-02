import { useState, useEffect, useCallback } from "react";
import type { Route } from "./+types/home";
import fs from "node:fs";
import path from "node:path";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BIT GALLERY" },
    {
      name: "description",
      content: "Pixel Camera Photo Gallery — PICO-8 Style",
    },
  ];
}

export async function loader() {
  const photosDir = path.join(process.cwd(), "public", "photos");
  try {
    if (!fs.existsSync(photosDir)) {
      fs.mkdirSync(photosDir, { recursive: true });
    }
    const files = fs.readdirSync(photosDir);
    const photos = files
      .filter((f) => /\.(png|jpg|jpeg|bmp|gif)$/i.test(f))
      .sort((a, b) => {
        const aNum = parseInt(a.match(/\d+/)?.[0] ?? "0");
        const bNum = parseInt(b.match(/\d+/)?.[0] ?? "0");
        return bNum - aNum;
      })
      .map((f) => ({ src: `/photos/${encodeURIComponent(f)}`, name: f }));
    return { photos };
  } catch {
    return { photos: [] };
  }
}

type Photo = { src: string; name: string };

// ── Rainbow decoration ────────────────────────────────────────────────────────
function Rainbow({ chars }: { chars: string }) {
  return (
    <div className="pico-rainbow" aria-hidden="true">
      {chars.split("").map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Home({ loaderData }: Route.ComponentProps) {
  const { photos } = loaderData as { photos: Photo[] };

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [blinkOn, setBlinkOn] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setBlinkOn((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // Keyboard navigation in lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        setSelectedIdx((i) =>
          i !== null ? Math.min(i + 1, photos.length - 1) : null,
        );
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        setSelectedIdx((i) => (i !== null ? Math.max(i - 1, 0) : null));
      } else if (e.key === "Escape") {
        setSelectedIdx(null);
      }
    },
    [selectedIdx, photos.length],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const selected = selectedIdx !== null ? photos[selectedIdx] : null;

  return (
    <div className="pico-app">
      {/* ── Title bar ──────────────────────────────────────────────────── */}
      <header className="pico-titlebar">
        <span className="pico-titlebar-logo" aria-hidden="true">
          ▒▓░
        </span>
        <span className="pico-titlebar-title">
          BIT GALLERY
          <span className="pico-cursor" style={{ opacity: blinkOn ? 1 : 0 }}>
            ▌
          </span>
        </span>
      </header>

      {/* ── Toolbar ────────────────────────────────────────────────────── */}
      <div className="pico-toolbar">
        <span className="pico-toolbar-label">
          {photos.length} PHOTO{photos.length !== 1 ? "S" : ""}
        </span>
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <main className="pico-main">
        {photos.length === 0 ? (
          /* Empty state */
          <div className="pico-empty">
            <div className="pico-empty-border">
              <div className="pico-empty-title">NO PHOTOS</div>
              <div className="pico-empty-line">
                DROP YOUR PHOTOS INTO
                <br />
                <span style={{ color: "var(--p8-yellow)" }}>
                  /public/photos/
                </span>
              </div>
              <div className="pico-empty-line">
                COPY PNG FILES FROM THE SD CARD
                <br />
                AND RELOAD THIS PAGE
              </div>
              <Rainbow chars="░▒▓▒░▒▓▒" />
              <div className="pico-empty-hint">SUPPORTS: PNG JPG BMP GIF</div>
            </div>
          </div>
        ) : (
          /* Photo grid */
          <div className="pico-grid">
            {photos.map((photo, idx) => (
              <button
                key={photo.src}
                className="pico-photo-card"
                onClick={() => setSelectedIdx(idx)}
                aria-label={`Open ${photo.name}`}
              >
                <div className="pico-photo-frame">
                  <img
                    src={photo.src}
                    alt={photo.name}
                    loading="lazy"
                    className="pico-photo-img"
                  />
                  <div className="pico-photo-overlay" aria-hidden="true">
                    ▶
                  </div>
                </div>
                <div className="pico-photo-label">
                  {photo.name.replace(/\.[^.]+$/, "").toUpperCase()}
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* ── Status bar ─────────────────────────────────────────────────── */}
      <footer className="pico-statusbar">
        <span className="pico-status-item" style={{ color: "var(--p8-grey)" }}>
          {photos.length} FILE{photos.length !== 1 ? "S" : ""}
        </span>
        <span className="pico-status-item">240×176 PX</span>
        <span className="pico-status-item">4× ZOOM</span>
        <span className="pico-status-item">PNG</span>
        <span className="pico-status-spacer" />
        <span
          className="pico-status-item highlight"
          style={{ opacity: blinkOn ? 1 : 0.4 }}
        >
          ● RDY
        </span>
        <span
          className="pico-status-item"
          style={{ color: "var(--p8-lavender)" }}
        >
          BIT GALLERY V1.0
        </span>
      </footer>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {selected && selectedIdx !== null && (
        <div
          className="pico-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Viewing ${selected.name}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIdx(null);
          }}
        >
          <div className="pico-window">
            {/* Window title bar */}
            <div className="pico-window-titlebar">
              <div className="pico-window-controls">
                <button
                  className="pico-wbtn pico-wbtn-close"
                  onClick={() => setSelectedIdx(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="pico-window-title">
                {selected.name.replace(/\.[^.]+$/, "").toUpperCase()}
              </div>
              <div className="pico-window-counter">
                {selectedIdx + 1} / {photos.length}
              </div>
            </div>

            {/* Photo viewer */}
            <div className="pico-window-body">
              <button
                className="pico-nav-btn"
                onClick={() =>
                  setSelectedIdx((i) =>
                    i !== null ? Math.max(i - 1, 0) : null,
                  )
                }
                disabled={selectedIdx === 0}
                aria-label="Previous photo"
              >
                ◀
              </button>
              <div className="pico-photo-viewer">
                <img
                  src={selected.src}
                  alt={selected.name}
                  className="pico-photo-viewer-img"
                />
              </div>
              <button
                className="pico-nav-btn"
                onClick={() =>
                  setSelectedIdx((i) =>
                    i !== null ? Math.min(i + 1, photos.length - 1) : null,
                  )
                }
                disabled={selectedIdx === photos.length - 1}
                aria-label="Next photo"
              >
                ▶
              </button>
            </div>

            {/* Window footer */}
            <div className="pico-window-footer">
              <span>{selected.name}</span>
              <span className="kbd">ESC:CLOSE ◀▶:NAVIGATE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
