export const CINEMA_NAVIGATION_EVENT = "cinema-navigation-start";

export function signalCinemaNavigation(href: string): void {
  const destination = new URL(href, window.location.href);
  if (destination.origin === window.location.origin && destination.pathname !== window.location.pathname) {
    window.dispatchEvent(new Event(CINEMA_NAVIGATION_EVENT));
  }
}
