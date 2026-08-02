export type NpcRace =
  | 'Altmer'
  | 'Argonian'
  | 'Bosmer'
  | 'Breton'
  | 'Dunmer'
  | 'Imperial'
  | 'Khajiit'
  | 'Nord'
  | 'Orc'
  | 'Redguard'
  | 'Dremora'
  | 'Other';

export const npcRaces: NpcRace[] = [
  'Altmer',
  'Argonian',
  'Bosmer',
  'Breton',
  'Dunmer',
  'Imperial',
  'Khajiit',
  'Nord',
  'Orc',
  'Redguard',
  'Dremora',
  'Other',
];

export type NpcFaction =
  | 'Arena'
  | 'Blades'
  | 'Dark Brotherhood'
  | 'Fighters Guild'
  | 'Imperial Legion'
  | 'Knights of the Nine'
  | 'Mages Guild'
  | 'Mythic Dawn'
  | 'Thieves Guild'
  | 'None';

export const npcFactions: NpcFaction[] = [
  'Arena',
  'Blades',
  'Dark Brotherhood',
  'Fighters Guild',
  'Imperial Legion',
  'Knights of the Nine',
  'Mages Guild',
  'Mythic Dawn',
  'Thieves Guild',
  'None',
];

export const npcFactionColors: Record<NpcFaction, string> = {
  Arena:               '#c2410c',
  Blades:              '#475569',
  'Dark Brotherhood':  '#1e293b',
  'Fighters Guild':    '#b45309',
  'Imperial Legion':   '#1d4ed8',
  'Knights of the Nine': '#f59e0b',
  'Mages Guild':       '#7c3aed',
  'Mythic Dawn':       '#9f1239',
  'Thieves Guild':     '#4d7c0f',
  None:                '#6b7280',
};

export type LocationDLC = 'Base' | 'SI' | 'KotN' | 'Plugins' | 'Remastered';

export const locationDLCs: LocationDLC[] = ['Base', 'SI', 'KotN', 'Plugins', 'Remastered'];

export const locationDLCLabels: Record<LocationDLC, string> = {
  Base: 'Base Game',
  SI: 'Shivering Isles',
  KotN: 'Knights of the Nine',
  Plugins: 'Official Plugins',
  Remastered: 'Oblivion Remastered',
};

export const locationDLCColors: Record<LocationDLC, string> = {
  Base: '#6b7280',
  SI: '#a855f7',
  KotN: '#f59e0b',
  Plugins: '#06b6d4',
  Remastered: '#ef4444',
};

export type NpcCity =
  | 'Anvil'
  | 'Bravil'
  | 'Bruma'
  | 'Cheydinhal'
  | 'Chorrol'
  | 'Imperial City'
  | 'Leyawiin'
  | 'Skingrad';

export const npcCities: NpcCity[] = [
  'Anvil',
  'Bravil',
  'Bruma',
  'Cheydinhal',
  'Chorrol',
  'Imperial City',
  'Leyawiin',
  'Skingrad',
];

/**
 * Derives the city from a primaryLocation string.
 * Returns null if the location is outside the 8 main cities (e.g. wilderness, shrines).
 */
export function getCityFromLocation(primaryLocation: string): NpcCity | null {
  const loc = primaryLocation;
  // Imperial City — matches "Imperial City", "IC " prefix, or "Arcane University"
  if (
    loc.includes('Imperial City') ||
    loc.startsWith('IC ') ||
    loc.includes('Arcane University') ||
    loc.includes('Imperial Palace')
  ) {
    return 'Imperial City';
  }
  // The other 7 cities — name appears in the location string
  for (const city of npcCities) {
    if (city === 'Imperial City') continue;
    if (loc.includes(city)) return city;
  }
  return null;
}

export type QuestReference = {
  name: string;
  levelReq?: number;
  leveled?: number;
  dlc?: LocationDLC;
};

export type UniqueItemReference = {
  name: string;
};

export type ScheduleRow = {
  time: string;      // e.g. "6am–8am", "5–8pm (weekends)"
  location: string;  // e.g. "The Count's Arms"
};

export type TrainerTier = 'Novice' | 'Journeyman' | 'Master';

export type TrainerReference = {
  skill: string;
  tier: TrainerTier;
  maxLevel: number;
};

// Quests whose leveled reward thresholds are corrected by the Unofficial Oblivion Patch.
// The data stores UOP-corrected values; these are the vanilla (unpatched) equivalents.
export const vanillaLeveledOverrides: Record<string, number> = {
  'The Ghost Ship of Anvil':   1,
  'Information Gathering':     5,
  "Mystery at Harlun's Watch": 10,
  'Blood of the Divines':      15,
};

export type NpcDefinition = {
  id: string;
  name: string;
  race: NpcRace;
  gender: 'Male' | 'Female';
  faction?: NpcFaction;
  dlc?: LocationDLC;
  essential?: boolean;
  beggar?: boolean;           // one of the 19 beggars required for Speechcraft master training
  merchant?: boolean;         // actively sells goods or services to the player
  responsibility?: number;    // 0–100 base responsibility
  primaryLocation: string;    // City or place where they primarily reside
  routine?: string | ScheduleRow[];  // Table of time→location rows, or free-text description
  trainer?: TrainerReference; // If they offer training
  quests?: QuestReference[];
  uniqueItems?: UniqueItemReference[];
  notes?: string;
};
