import { LocationDLC } from '@/utils/npcTypes';

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
