'use client';

import { useEffect } from 'react';
import { NAV_OFFSET } from '@/lib/appSection';

/**
 * Lands a `/#anchor` arrival (from another page, or a fresh load) clear of the
 * fixed nav. Runs after the reveal pass so the target has its final height.
 */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    const land = () =>
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET });

    const raf = requestAnimationFrame(() => {
      land();
      // Reveal transitions change layout height; settle once more after them.
      setTimeout(land, 260);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
