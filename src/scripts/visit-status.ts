/**
 * visit-status.ts — keeps every live open/closed status on the page current.
 * Fills any [data-visit-status] element's [data-visit-label],
 * [data-visit-detail] and [data-visit-badge] children, and sets data-open.
 * Used by VisitCard, VisitDialog and the hero's Plan your visit link.
 */
import { getVisitStatus } from "@/data/hours";

function render() {
  const s = getVisitStatus();
  document.querySelectorAll<HTMLElement>("[data-visit-status]").forEach((el) => {
    el.dataset.open = String(s.open);
    const set = (sel: string, text: string) => {
      el.querySelectorAll(sel).forEach((node) => (node.textContent = text));
    };
    set("[data-visit-label]", s.label);
    set("[data-visit-detail]", s.detail);
    set("[data-visit-badge]", s.open ? "Open now" : "Closed");
  });
}

let started = false;

/** Render now, then every minute. Safe to call more than once. */
export function startVisitStatus() {
  render();
  if (started) return;
  started = true;
  setInterval(render, 60_000);
  document.addEventListener("astro:page-load", render);
}
