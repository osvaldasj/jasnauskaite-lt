/**
 * Ad-blocker resistant analytics tracker.
 * First-party, same-domain, lightweight (<3KB minified).
 * GDPR friendly: anonymous visitor IDs only, no personal data.
 */

// Types
interface AnalyticsEvent {
  type: 'pageview' | 'form_start' | 'form_step' | 'form_complete' | 'form_abandon' | 'click' | 'scroll_depth';
  page_url?: string;
  referrer?: string;
  user_agent?: string;
  screen_width?: number;
  screen_height?: number;
  element_id?: string;
  form_name?: string;
  step_number?: number;
  scroll_depth?: number;
  extra_data?: string;
  timestamp?: string;
}

interface TrackingPayload {
  visitor_id: string;
  events: AnalyticsEvent[];
}

// Config
const ENDPOINT = '/api/track.php';
const FLUSH_INTERVAL = 5000;
const DNT_KEY = 'navigator';

// State
let queue: AnalyticsEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let visitorId: string = '';
let initialized = false;
let scrollMilestones: Set<number> = new Set();
let currentPage = '';

/**
 * Generate a random anonymous visitor ID.
 */
function generateId(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Get or create visitor ID from localStorage (fallback from cookie).
 */
function getVisitorId(): string {
  if (visitorId) return visitorId;
  try {
    const stored = localStorage.getItem('_vid');
    if (stored && stored.length === 32) {
      visitorId = stored;
    } else {
      visitorId = generateId();
      localStorage.setItem('_vid', visitorId);
    }
  } catch {
    visitorId = generateId();
  }
  return visitorId;
}

/**
 * Check if Do Not Track is enabled.
 */
function isDNT(): boolean {
  try {
    const nav = globalThis[DNT_KEY as keyof typeof globalThis] as Navigator | undefined;
    return nav?.doNotTrack === '1';
  } catch {
    return false;
  }
}

/**
 * Send events to the tracking endpoint.
 */
function send(events: AnalyticsEvent[]): void {
  if (!events.length) return;

  const payload: TrackingPayload = {
    visitor_id: getVisitorId(),
    events,
  };

  const body = JSON.stringify(payload);

  // Prefer sendBeacon for reliability on page unload
  if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    const sent = navigator.sendBeacon(ENDPOINT, blob);
    if (sent) return;
  }

  // Fallback to fetch
  try {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => {});
  } catch {
    // Silently fail
  }
}

/**
 * Flush the event queue.
 */
function flush(): void {
  if (!queue.length) return;
  const batch = queue.splice(0, queue.length);
  send(batch);
}

/**
 * Add an event to the queue.
 */
function enqueue(event: AnalyticsEvent): void {
  if (isDNT()) return;
  if (!initialized) init();

  event.timestamp = new Date().toISOString();
  queue.push(event);

  // Reset flush timer
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, FLUSH_INTERVAL);
}

/**
 * Initialize the tracker.
 */
function init(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  initialized = true;

  getVisitorId();

  // Flush on page unload
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush();
  });
  window.addEventListener('pagehide', flush);
}

// --- Public API ---

export function trackPageView(url?: string): void {
  const pageUrl = url || (typeof window !== 'undefined' ? window.location.pathname : '/');
  currentPage = pageUrl;
  scrollMilestones = new Set();

  enqueue({
    type: 'pageview',
    page_url: pageUrl,
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    screen_width: typeof screen !== 'undefined' ? screen.width : 0,
    screen_height: typeof screen !== 'undefined' ? screen.height : 0,
  });
}

export function trackFormStart(formName: string): void {
  enqueue({
    type: 'form_start',
    form_name: formName,
    page_url: currentPage,
  });
}

export function trackFormStep(formName: string, step: number): void {
  enqueue({
    type: 'form_step',
    form_name: formName,
    step_number: step,
    page_url: currentPage,
  });
}

export function trackFormComplete(formName: string): void {
  enqueue({
    type: 'form_complete',
    form_name: formName,
    page_url: currentPage,
  });
}

export function trackFormAbandon(formName: string, lastStep: number): void {
  enqueue({
    type: 'form_abandon',
    form_name: formName,
    step_number: lastStep,
    page_url: currentPage,
  });
}

export function trackClick(elementId: string): void {
  enqueue({
    type: 'click',
    element_id: elementId,
    page_url: currentPage,
  });
}

export function trackScrollDepth(page?: string): void {
  if (typeof window === 'undefined') return;

  const docHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
  const winHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const scrollPct = Math.round(((scrollTop + winHeight) / docHeight) * 100);

  const milestones = [25, 50, 75, 100];
  for (const m of milestones) {
    if (scrollPct >= m && !scrollMilestones.has(m)) {
      scrollMilestones.add(m);
      enqueue({
        type: 'scroll_depth',
        scroll_depth: m,
        page_url: page || currentPage,
      });
    }
  }
}

/**
 * Setup scroll depth tracking with throttled listener.
 */
export function setupScrollTracking(): () => void {
  if (typeof window === 'undefined') return () => {};

  let ticking = false;
  const handler = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
    }
  };

  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}

/**
 * Force flush all pending events (call on cleanup).
 */
export function flushEvents(): void {
  flush();
}
