import { useEffect, useRef, useState, type ReactNode } from "react";

export function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }); },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px", ...opts },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, inView };
}

export function Reveal({ children, className, delay = 0, y = 20, x = 0, duration = 650 }: {
  children: ReactNode; className?: string; delay?: number; y?: number; x?: number; duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : `translate3d(${x}px,${y}px,0)`,
        transition: `opacity ${duration}ms cubic-bezier(.2,.9,.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(.2,.9,.3,1) ${delay}ms`,
      }}
    >{children}</div>
  );
}

export function CountUp({ to, duration = 1500, decimals = 0, prefix = "", suffix = "", className }: {
  to: number; duration?: number; decimals?: number; prefix?: string; suffix?: string; className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}{value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
}
