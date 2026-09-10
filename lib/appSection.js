export const APP_SECTION_ID = 'app-section';
export const NAV_OFFSET = 90;

/**
 * "Get the app" always lands on the Home app section, offset clear of the
 * fixed nav. When we are already on Home we scroll ourselves; otherwise we
 * let Next route and the hash handler on Home finishes the job.
 */
export function scrollToAppSection(event) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== '/') return;

  const el = document.getElementById(APP_SECTION_ID);
  if (!el) return;

  if (event?.preventDefault) event.preventDefault();
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
    behavior: 'smooth',
  });
}
