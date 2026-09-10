'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_STAGGER = 0.09; // seconds per sibling

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Site-wide choreography, re-armed on every route change:
 *  - staggered scroll reveals for the direct children of each <section>
 *  - the scroll progress hairline
 *  - cursor glow, hero-ring parallax, phone tilt, "85" drift
 *  - h2 tracking that eases wider below the viewport centre
 *
 * Reveals are applied here rather than in CSS so that a visitor without JS
 * still gets the whole page. Parallax and tilt are skipped under
 * prefers-reduced-motion; the fades stay.
 */
export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();

    /* ---------- scroll reveals ---------- */
    const targets = [];
    document.querySelectorAll('section').forEach((section) => {
      Array.from(section.children).forEach((el) => {
        const pos = getComputedStyle(el).position;
        if (el.tagName === 'SVG' || pos === 'absolute' || pos === 'sticky' || pos === 'fixed') return;
        targets.push(el);
      });
    });

    const siblingIndex = (el) => {
      const sibs = targets.filter((t) => t.parentNode === el.parentNode);
      return Math.max(0, sibs.indexOf(el));
    };

    const show = (el) => {
      el.style.transitionDelay = `${siblingIndex(el) * REVEAL_STAGGER}s`;
      el.classList.add('reveal-in');
    };

    targets.forEach((el) => el.classList.add('reveal-init'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => io.observe(el));

    // Anything already on screen (or scrolled past) reveals without waiting —
    // covers tall elements that never cross the 12% threshold.
    let pending = targets.slice();
    const sweep = () => {
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 || r.bottom < 0) {
          show(el);
          io.unobserve(el);
          return false;
        }
        return true;
      });
    };
    sweep();

    /* ---------- the mark draws itself ---------- */
    const markSvg = document.getElementById('mark-rings');
    let markFired = false;
    const sweepMark = () => {
      if (markFired || !markSvg) return;
      const r = markSvg.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 || r.bottom < 0) {
        markSvg.querySelectorAll('circle[stroke-dasharray]').forEach((c) => {
          c.style.strokeDashoffset = '0';
        });
        markSvg.querySelectorAll('g circle').forEach((c) => {
          c.style.opacity = '1';
        });
        markFired = true;
      }
    };
    sweepMark();

    /* ---------- pointer ---------- */
    const onMouseMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;

      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }

      if (reduced) return;

      const rings = document.getElementById('hero-rings');
      if (rings) {
        rings.style.transform =
          `translate(${cx * -36}px,${cy * -26 - window.scrollY * 0.12}px) rotate(${cx * 6}deg)`;
      }

      const phone = document.getElementById('phone-mock');
      if (phone) {
        const r = phone.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          const px = (e.clientX - (r.left + r.width / 2)) / r.width;
          const py = (e.clientY - (r.top + r.height / 2)) / r.height;
          const near = Math.abs(px) < 1.6 && Math.abs(py) < 1.2;
          phone.style.transform = near
            ? `rotateY(${px * 10}deg) rotateX(${py * -8}deg)`
            : 'none';
        }
      }
    };

    /* ---------- scroll ---------- */
    const onScroll = () => {
      sweep();
      sweepMark();

      const bar = document.getElementById('scroll-progress');
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      }

      document.querySelectorAll('h2').forEach((h) => {
        const r = h.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          h.style.letterSpacing = `${0.005 + Math.max(0, r.top / window.innerHeight - 0.5) * 0.05}em`;
        }
      });

      if (reduced) return;

      const rings = document.getElementById('hero-rings');
      if (rings && window.scrollY < window.innerHeight * 1.4) {
        rings.style.transform = `translateY(${-window.scrollY * 0.12}px)`;
      }

      const num = document.getElementById('mark-bg-num');
      if (num) {
        const r = num.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) {
          num.style.transform = `translateY(calc(-50% + ${(r.top - window.innerHeight / 2) * 0.14}px))`;
        }
      }
    };
    onScroll();

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      targets.forEach((el) => {
        el.classList.remove('reveal-init', 'reveal-in');
        el.style.transitionDelay = '';
      });
    };
  }, [pathname]);

  return null;
}
