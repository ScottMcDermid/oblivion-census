import { LocationDLC, LocationPart } from '@/utils/npcTypes';

export function buildUespUrl(name: string, dlc?: LocationDLC): string {
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = name.replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}

export function buildQuestUrl(name: string, dlc?: LocationDLC): string {
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = name.replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}

// Returns null if slug is explicitly empty (no link desired).
export function buildLocationUrl(part: LocationPart, dlc?: LocationDLC): string | null {
  if (part.slug === '') return null;
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = (part.slug ?? part.label).replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}
