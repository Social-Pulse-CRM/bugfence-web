'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Currency } from '@/content/pricing';

const STORAGE_KEY = 'bugfence_currency';
const CURRENCY_EVENT = 'bugfence_currency_changed';

/**
 * Detects visitor currency preference:
 * 1. Saved localStorage preference
 * 2. IST Timezone (Asia/Kolkata or Asia/Calcutta)
 * 3. Indian locale (en-IN, hi-IN, etc.)
 * 4. Fallback: USD
 */
export function detectDefaultCurrency(): Currency {
  if (typeof window === 'undefined') return 'usd';

  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (saved === 'usd' || saved === 'inr') {
      return saved;
    }

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
      return 'inr';
    }

    const locale = navigator.language || (navigator.languages && navigator.languages[0]) || '';
    if (locale.endsWith('-IN') || locale.toLowerCase().includes('in')) {
      return 'inr';
    }
  } catch {
    // ignore
  }

  return 'usd';
}

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>('usd');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    // Initial detection on client mount
    const detected = detectDefaultCurrency();
    setCurrencyState(detected);

    // Listen to changes dispatched from other components
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'usd' || e.newValue === 'inr')) {
        setCurrencyState(e.newValue);
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<Currency>;
      if (customEvent.detail === 'usd' || customEvent.detail === 'inr') {
        setCurrencyState(customEvent.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(CURRENCY_EVENT, handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(CURRENCY_EVENT, handleCustomEvent);
    };
  }, []);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
      window.dispatchEvent(new CustomEvent(CURRENCY_EVENT, { detail: c }));
    } catch {
      // ignore
    }
  }, []);

  return { currency, setCurrency, mounted };
}
