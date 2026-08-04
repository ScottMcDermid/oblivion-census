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

export type LocationPart = {
  label: string;     // display text, e.g. "Chapel of Dibella"
  slug?: string;     // UESP page name override (spaces become _); empty string = no link
  context?: string;  // parenthetical annotation shown as plain text, not part of URL
};

// Outer array = stages/alternatives (rendered joined by '; ')
// Inner array = breadcrumb parts (rendered joined by ' > ')
// Most NPCs: single outer element with 1-2 inner parts
export type NpcLocation = LocationPart[][];

/**
 * Derives the city from a primaryLocation NpcLocation.
 * Returns null if the location is outside the 8 main cities (e.g. wilderness, shrines).
 */
export function getCityFromLocation(location: NpcLocation): NpcCity | null {
  const labels = location.flat().map(p => p.label).join(' ');
  // Imperial City - matches "Imperial City", "IC " prefix, or "Arcane University"
  if (
    labels.includes('Imperial City') ||
    labels.includes('IC ') ||
    labels.includes('Arcane University') ||
    labels.includes('Imperial Palace')
  ) {
    return 'Imperial City';
  }
  // The other 7 cities - name appears in the location labels
  for (const city of npcCities) {
    if (city === 'Imperial City') continue;
    if (labels.includes(city)) return city;
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
  time: string;      // e.g. "6am-8am", "5-8pm (weekends)"
  location: string;  // e.g. "The Count's Arms"
};

export type TrainerTier = 'Novice' | 'Journeyman' | 'Master';

export type TrainerReference = {
  skill: string;
  tier: TrainerTier;
  maxLevel: number;
};

export type NpcStatus = 'unacquainted' | 'met' | 'dead';

export const npcStatuses: NpcStatus[] = ['unacquainted', 'met', 'dead'];

export const npcStatusColors: Record<NpcStatus, string> = {
  unacquainted: '#6b7280',
  met:          '#3b82f6',
  dead:         '#ef4444',
};

export const npcStatusLabels: Record<NpcStatus, string> = {
  unacquainted: 'Unacquainted',
  met:          'Met',
  dead:         'Dead',
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
  ambient?: boolean;          // no discernible purpose; background/ambient character with no quests, training, or unique items
  responsibility?: number;    // 0-100 base responsibility
  aggression?: number;        // 0-100 base aggression (explicit override; use getDefaultAggression() when absent)
  primaryLocation: NpcLocation;  // Breadcrumb location array; outer = stages, inner = region→building
  routine?: string | ScheduleRow[];  // Table of time→location rows, or free-text description
  trainerAvailability?: string;   // Hours when they can be trained with, e.g. "8am–8pm", "24 hours"
  merchantAvailability?: string;  // Hours when they can be traded with, e.g. "8am–8pm", "24 hours"
  merchantInventory?: string;     // Description of goods/services sold, e.g. "Potions, Ingredients, Spell Tomes"
  merchantGold?: number;          // Base barter gold available, e.g. 800
  trainer?: TrainerReference; // If they offer training
  quests?: QuestReference[];
  uniqueItems?: UniqueItemReference[];
  notes?: string;
};

/**
 * Returns the effective aggression (0–100) for an NPC.
 * Uses the explicit `aggression` field if present; otherwise derives a
 * reasonable default from faction and responsibility, mirroring the in-game
 * AI values:
 *
 *  - Mythic Dawn (active, resp=0): 80  — hostile cultists / leadership
 *  - Mythic Dawn (sleeper, resp>0): 5  — living a civilian cover identity
 *  - Dark Brotherhood:              70  — professional killers
 *  - Thieves Guild:                 10  — avoid violence where possible
 *  - Fighters Guild (hostile, r=0): 80  — Blackwood Company / enemy faction
 *  - Fighters Guild:                30  — disciplined mercenaries
 *  - Imperial Legion:               20  — soldiers who follow rules of engagement
 *  - Blades:                        20  — loyal guardians, rarely aggressive
 *  - Knights of the Nine:           20  — holy warriors, defend don't attack
 *  - Mages Guild:                   10  — scholars; fight only when cornered
 *  - Arena:                         30  — fighters by trade, controlled setting
 *  - No faction, resp=0:            70  — criminals / outcasts / addicts
 *  - No faction, resp≤10:           50  — very low-law characters
 *  - No faction, resp≤25:           30  — shady or lawless types
 *  - No faction, resp≤50:           10  — ordinary citizens
 *  - No faction, resp>50:            5  — law-abiding / civic-minded NPCs
 */
export function getDefaultAggression(npc: NpcDefinition): number {
  if (npc.aggression !== undefined) return npc.aggression;

  const resp = npc.responsibility ?? 50;

  switch (npc.faction) {
    case 'Mythic Dawn':
      return resp === 0 ? 80 : 5;
    case 'Dark Brotherhood':
      return 70;
    case 'Thieves Guild':
      return 10;
    case 'Fighters Guild':
      return resp === 0 ? 80 : 30;
    case 'Imperial Legion':
      return 20;
    case 'Blades':
      return 20;
    case 'Knights of the Nine':
      return 20;
    case 'Mages Guild':
      return 10;
    case 'Arena':
      return 30;
  }

  // No faction — derive from responsibility
  if (resp === 0)  return 70;
  if (resp <= 10)  return 50;
  if (resp <= 25)  return 30;
  if (resp <= 50)  return 10;
  return 5;
}
