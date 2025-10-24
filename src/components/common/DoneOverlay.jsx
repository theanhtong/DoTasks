import { useEffect, useRef } from "react";

export default function DoneOverlay() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const parent = overlay.parentElement;
    if (!parent) return;

    const update = () => {
      const { width, height } = parent.getBoundingClientRect();
      // lấy cạnh nhỏ hơn để chữ luôn vừa khung
      const base = Math.min(width, height);

      // 12% kích thước cạnh ngắn nhất, giới hạn 16px-80px
      const fontSize = Math.max(30, Math.min(base * 0.12, 100));

      parent.style.setProperty("--done-font", `${fontSize}px`);
    };

    update();
    const obs = new ResizeObserver(update);
    obs.observe(parent);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <span
        className="inline-block font-semibold tracking-widest uppercase transform -rotate-25 opacity-40"
        style={{
          fontSize: "var(--done-font)",
          lineHeight: 1,
        }}
      >
        Done
      </span>
    </div>
  );
}
