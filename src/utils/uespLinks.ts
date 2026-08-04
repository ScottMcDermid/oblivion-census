import { LocationDLC, LocationPart } from '@/utils/npcTypes';

export function buildUespUrl(name: string, dlc?: LocationDLC, slug?: string): string {
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = (slug ?? name).replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}

export function buildQuestUrl(name: string, dlc?: LocationDLC, slug?: string): string {
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = (slug ?? name).replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}

// Maps primaryLocation labels that are interior cells, sub-districts, or abstract locations
// to their parent gamemap-resolvable location, or null if no map marker exists.
const centeronOverrides: Record<string, string | null> = {
  // Imperial City sub-districts (interior cells) → Imperial City
  'IC Elven Gardens District':        'Imperial City',
  'IC Green Emperor Way':             'Imperial City',
  'IC Market District':               'Imperial City',
  'IC Talos Plaza District':          'Imperial City',
  'IC Temple District':               'Imperial City',
  'IC Waterfront District':           'Imperial City',
  'Imperial City Arena District':     'Imperial City',
  'Imperial City Prison District':    'Imperial City',
  'Imperial City Sewers':             'Imperial City',
  'Arcane University':                'Imperial City',
  // IC Watch Towers (slug: '' in data, no UESP page) → Imperial City
  'Imperial City NE Watch Tower':     'Imperial City',
  'Imperial City NW Watch Tower':     'Imperial City',
  'Imperial City SE Watch Tower':     'Imperial City',
  'Imperial City South Watch Tower':  'Imperial City',
  // City guild halls, barracks, castle sub-cells → parent city
  'Anvil Castle':                     'Anvil',
  'Anvil City Watch Barracks':        'Anvil',
  'Anvil Fighters Guild':             'Anvil',
  'Anvil Lighthouse Cellar':          'Anvil',
  'Anvil Mages Guild':                'Anvil',
  'Bravil Fighters Guild':            'Bravil',
  'Bravil Mages Guild':               'Bravil',
  'Bruma Fighters Guild':             'Bruma',
  'Bruma Mages Guild':                'Bruma',
  'Castle Bravil Barracks':           'Bravil',
  'Castle Bruma Barracks':            'Bruma',
  'Castle Bruma Dungeon':             'Bruma',
  'Castle Cheydinhal Barracks':       'Cheydinhal',
  'Castle Cheydinhal Guard Barracks': 'Cheydinhal',
  'Castle Chorrol Barracks':          'Chorrol',
  'Castle Skingrad Barracks':         'Skingrad',
  'Cheydinhal Dark Brotherhood Sanctuary': 'Cheydinhal',
  'Cheydinhal Fighters Guild':        'Cheydinhal',
  'Cheydinhal Mages Guild':           'Cheydinhal',
  'Chorrol Fighters Guild':           'Chorrol',
  'Chorrol Mages Guild':              'Chorrol',
  'Leyawiin City Watch Barracks':     'Leyawiin',
  'Leyawiin Fighters Guild':          'Leyawiin',
  'Leyawiin Mages Guild':             'Leyawiin',
  'Skingrad Fighters Guild':          'Skingrad',
  'Skingrad Mages Guild':             'Skingrad',
  'Skingrad Town Guard House':        'Skingrad',
  // Oblivion planes and abstract/scripted locations - no Cyrodiil map marker
  'Cheydinhal Oblivion World':        null,
  'Kvatch Oblivion World':            null,
  'Carac Agaialor':                   null,
  'Internal holding pen':             null,
  'Cyrodiil roads':                   null,
  'Cyrodiil wayshrine circuit':       null,
  'Coastal camp':                     null,
};

export function buildMapUrl(name: string, dlc?: LocationDLC): string | null {
  const resolved = Object.prototype.hasOwnProperty.call(centeronOverrides, name)
    ? centeronOverrides[name]
    : name;
  if (resolved === null) return null;
  const world = dlc === 'SI' ? 'shiveringisles' : 'Oblivion';
  const centeron = resolved.replace(/ /g, '+');
  return `https://gamemap.uesp.net/ob/?world=${world}&centeron=${centeron}`;
}

// Returns null if slug is explicitly empty (no link desired).
export function buildLocationUrl(part: LocationPart, dlc?: LocationDLC): string | null {
  if (part.slug === '') return null;
  const rawName = part.slug ?? part.label;
  // If the slug already includes a namespace prefix (e.g. "Shivering:Split"),
  // use it as the full page path to avoid double-prefixing.
  if (/^(Shivering|Oblivion):/.test(rawName)) {
    return `https://en.uesp.net/wiki/${rawName.replace(/ /g, '_')}`;
  }
  const prefix = dlc === 'SI' ? 'Shivering' : 'Oblivion';
  const pageName = rawName.replace(/ /g, '_');
  return `https://en.uesp.net/wiki/${prefix}:${pageName}`;
}
