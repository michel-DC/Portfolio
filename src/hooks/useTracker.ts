"use client";

import { useSyncExternalStore } from "react";

const COOKIE_NAME = "visitor_source";

function getVisitorSource(): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${COOKIE_NAME}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function getServerSource(): null {
  return null;
}

function subscribeToSource(): () => void {
  return (): void => {};
}

export function useTracker(): string | null {
  return useSyncExternalStore(subscribeToSource, getVisitorSource, getServerSource);
}
