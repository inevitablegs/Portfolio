// src/components/Certifications.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchWithCache, getCachedData } from "../api/cache";

export default function Certifications() {
  const [items, setItems] = useState(() => getCachedData("/certifications/") || []);
  const [centeredIndex, setCenteredIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardRefs = useRef([]);

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  useEffect(() => {
    fetchWithCache("/certifications/", setItems).catch(() => {});
  }, []);

  // Detect which card is closest to horizontal center
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !cardRefs.current.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setCenteredIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, items]);

  // Mouse wheel → horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [items]);

  // Click-and-drag to slide
  const onMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.pageX - container.offsetLeft;
    dragScrollLeft.current = container.scrollLeft;
    container.style.scrollSnapType = "none";
    container.style.scrollBehavior = "auto";
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(walk) > 5) hasDragged.current = true;
    container.scrollLeft = dragScrollLeft.current - walk;
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const container = scrollRef.current;
    if (!container) return;
    container.style.scrollSnapType = "";
    container.style.scrollBehavior = "";
    container.style.cursor = "";
    container.style.userSelect = "";
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const scrollTo = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = cardRefs.current[0]?.offsetWidth || 320;
    const gap = 24;
    container.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <div className="card relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-accent-500/5 blur-[80px]" />

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="section-title">Credentials</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
            Certifications
          </h2>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("left")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-700 bg-surface-800/50 text-surface-300 transition-all hover:border-accent-500/50 hover:text-accent-400 hover:shadow-glow-sm disabled:opacity-30"
            disabled={centeredIndex === 0}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scrollTo("right")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-700 bg-surface-800/50 text-surface-300 transition-all hover:border-accent-500/50 hover:text-accent-400 hover:shadow-glow-sm disabled:opacity-30"
            disabled={centeredIndex === items.length - 1}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
      >
        {/* Left spacer for centering first card */}
        <div className="shrink-0" style={{ width: "calc(50% - 160px)" }} />

        {items.map((c, index) => (
          <CertCard
            key={c.id}
            cert={c}
            index={index}
            isCentered={index === centeredIndex}
            ref={(el) => (cardRefs.current[index] = el)}
          />
        ))}

        {/* Right spacer for centering last card */}
        <div className="shrink-0" style={{ width: "calc(50% - 160px)" }} />
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const card = cardRefs.current[i];
              if (card) {
                card.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center",
                });
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === centeredIndex
                ? "w-6 bg-accent-400"
                : "w-1.5 bg-surface-600 hover:bg-surface-500"
            }`}
            aria-label={`Go to certificate ${i + 1}`}
          />
        ))}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        div[class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

import { forwardRef } from "react";

const IMG_HEIGHT = 200; // fixed image area height
const MIN_CARD_W = 260;
const MAX_CARD_W = 520;
const DEFAULT_CARD_W = 320;

const CertCard = forwardRef(function CertCard({ cert, index, isCentered }, ref) {
  const [cardWidth, setCardWidth] = useState(DEFAULT_CARD_W);

  // When the image loads, compute width from its natural aspect ratio
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalWidth && naturalHeight) {
      const aspect = naturalWidth / naturalHeight;
      // width = height * aspect, then clamp
      const computed = Math.round(IMG_HEIGHT * aspect);
      setCardWidth(Math.max(MIN_CARD_W, Math.min(MAX_CARD_W, computed)));
    }
  };

  return (
    <div
      ref={ref}
      className={`
        group relative flex-shrink-0 snap-center rounded-2xl border overflow-hidden
        transition-all duration-500 ease-out
        ${
          isCentered
            ? "border-accent-500/60 bg-surface-900/70 shadow-glow-md scale-[1.03]"
            : "border-surface-800/50 bg-surface-900/30 opacity-60 scale-95"
        }
      `}
      style={{
        width: `${cardWidth}px`,
        animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`,
      }}
    >
      {/* Accent top line */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-400 via-accent-500 to-glow-violet transition-opacity duration-500 ${
          isCentered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Certificate Image — Prominent */}
      <div
        className="relative w-full bg-surface-950/40 flex items-center justify-center overflow-hidden"
        style={{ height: `${IMG_HEIGHT}px` }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            onLoad={handleImageLoad}
            className={`max-h-full max-w-full object-contain p-4 transition-transform duration-700 ${
              isCentered ? "scale-100" : "scale-90"
            }`}
          />
        ) : (
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500/15 to-glow-violet/15 text-5xl transition-transform duration-500 ${
              isCentered ? "scale-100" : "scale-90"
            }`}
          >
            🎓
          </div>
        )}
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent" />
      </div>

      {/* Card body */}
      <div className="relative p-5">
        <span className="inline-flex items-center rounded-md border border-accent-500/20 bg-accent-500/5 px-2.5 py-0.5 text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-2">
          {cert.issuer}
        </span>

        <h3
          className={`text-sm font-bold leading-snug line-clamp-2 transition-colors duration-300 ${
            isCentered ? "text-surface-100" : "text-surface-300"
          }`}
        >
          {cert.name}
        </h3>

        {cert.certificate_url && (
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noreferrer"
            className={`mt-3 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
              isCentered
                ? "border-accent-500/30 bg-accent-500/10 text-accent-400 hover:bg-accent-500/20 hover:shadow-glow-sm"
                : "border-surface-700 bg-surface-800/30 text-surface-400 hover:text-accent-400"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <span>🔗</span> Verify Credential
          </a>
        )}
      </div>
    </div>
  );
});