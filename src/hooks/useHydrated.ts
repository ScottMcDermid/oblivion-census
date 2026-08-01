'use client';

import { useEffect, useState } from 'react';
import { useNpcStore } from '@/data/npcStore';

export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useNpcStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }
    const unsub = useNpcStore.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  return hydrated;
}
