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

export type QuestReference = {
  name: string;
  levelReq?: number;
  leveled?: number;
  dlc?: LocationDLC;
};

export type UniqueItemReference = {
  name: string;
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
  class: string;
  faction?: NpcFaction;
  dlc?: LocationDLC;
  essential?: boolean;
  disposition?: number;       // 0–100 base disposition toward player
  primaryLocation: string;    // City or place where they primarily reside
  routine?: string;           // Optional free-text schedule description
  trainer?: TrainerReference; // If they offer training
  quests?: QuestReference[];
  uniqueItems?: UniqueItemReference[];
  notes?: string;
};
