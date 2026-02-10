"use client";

import { useState, useEffect } from "react";

const COOKIE_NAME = "visitor_source";

export function useTracker(): string | null {
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    
    function getCookie(name: string): string | null {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
      return null;
    }

    const currentSource = getCookie(COOKIE_NAME);
    setSource(prev => prev !== currentSource ? currentSource : prev);
  }, []);

  return source;
}