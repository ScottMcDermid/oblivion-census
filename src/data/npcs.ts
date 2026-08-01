import { NpcDefinition } from '@/utils/npcTypes';

export const npcDefinitions: NpcDefinition[] = [
  // ============================================================
  // MAIN QUEST
  // ============================================================
  {
    id: 'martin-septim',
    name: 'Martin Septim',
    race: 'Imperial',
    gender: 'Male',
    class: 'Priest',
    faction: 'Blades',
    essential: true,
    disposition: 50,
    primaryLocation: 'Cloud Ruler Temple, Bruma',
    routine: 'Found at Kvatch during the main quest; relocates to Cloud Ruler Temple after rescue. Remains there for the bulk of the main quest, then moves to the Imperial City for the finale.',
    quests: [
      { name: 'The Path of Dawn' },
      { name: 'Dagon Shrine' },
      { name: 'Blood of the Divines', leveled: 15 },
      { name: 'Miscarcand' },
      { name: 'Defense of Bruma' },
      { name: 'Great Gate' },
      { name: 'Light the Dragonfires' },
    ],
    uniqueItems: [
      { name: 'Amulet of Kings' },
    ],
    notes: 'Essential flag is removed at the end of the main quest. He cannot be interacted with after "Light the Dragonfires."',
  },
  {
    id: 'baurus',
    name: 'Baurus',
    race: 'Imperial',
    gender: 'Male',
    class: 'Agent',
    faction: 'Blades',
    essential: true,
    disposition: 70,
    primaryLocation: 'Imperial City, Elven Gardens District',
    routine: 'Begins in the Imperial City sewers during the tutorial. After the sewers, he operates undercover in the Imperial City. Relocates to Cloud Ruler Temple later in the main quest.',
    quests: [
      { name: 'Tutorial' },
      { name: 'A Poorly Guarded Secret' },
      { name: 'Dagon Shrine' },
    ],
  },
  {
    id: 'jauffre',
    name: 'Jauffre',
    race: 'Breton',
    gender: 'Male',
    class: 'Crusader',
    faction: 'Blades',
    essential: true,
    disposition: 60,
    primaryLocation: 'Weynon Priory, near Chorrol',
    routine: 'Lives and prays at Weynon Priory until the Mythic Dawn attack. Relocates to Cloud Ruler Temple afterward, where he serves as the Grandmaster of the Blades.',
    quests: [
      { name: 'Deliver the Amulet' },
      { name: 'Find the Heir' },
      { name: 'Weynon Priory' },
      { name: 'The Path of Dawn' },
      { name: 'Defense of Bruma' },
    ],
    notes: 'Essential status is removed after the "Weynon Priory" quest if attacked. Can be killed by Mythic Dawn agents if the player does not intervene quickly enough.',
  },

  // ============================================================
  // DARK BROTHERHOOD
  // ============================================================
  {
    id: 'lucien-lachance',
    name: 'Lucien Lachance',
    race: 'Imperial',
    gender: 'Male',
    class: 'Assassin',
    faction: 'Dark Brotherhood',
    essential: true,
    disposition: 80,
    primaryLocation: 'Fort Farragut, southeast of Cheydinhal',
    routine: 'Lives at Fort Farragut. Appears to the player in Cheydinhal during the night after the first murder. Serves as a Silencer contact for much of the DB questline.',
    quests: [
      { name: 'A Knife in the Dark' },
      { name: 'The Renegade Shadowscale', leveled: 30 },
      { name: "Ahdarji's Heirloom" },
      { name: 'Next of Kin' },
      { name: 'Broken Vows' },
      { name: 'Final Justice' },
      { name: 'A Matter of Honor' },
      { name: 'The Coldest Sleep' },
      { name: 'A Kiss Before Dying' },
      { name: 'Following a Lead' },
      { name: 'Honor Thy Mother' },
    ],
    uniqueItems: [
      { name: 'Shadowhunt' },
      { name: 'Blade of Woe' },
    ],
    notes: 'Essential status is removed partway through the Dark Brotherhood questline. Can be killed by the player during "Honor Thy Mother."',
  },
  {
    id: 'Vicente-valtieri',
    name: 'Vicente Valtieri',
    race: 'Imperial',
    gender: 'Male',
    class: 'Vampire',
    faction: 'Dark Brotherhood',
    essential: false,
    disposition: 70,
    primaryLocation: 'Cheydinhal Sanctuary',
    routine: 'Resides permanently in the Cheydinhal Sanctuary. Sleeps in his coffin during the day; active at night. Gives early Dark Brotherhood contracts and can offer the gift of vampirism.',
    quests: [
      { name: 'A Watery Grave' },
      { name: 'Accidents Happen' },
      { name: 'Scheduled for Execution' },
      { name: 'The Assassinated Man' },
      { name: 'The Lonely Wanderer' },
      { name: "Bad Medicine" },
      { name: 'Whodunit?' },
      { name: 'Permanent Retirement' },
    ],
    notes: 'Can infect the player with Porphyric Hemophilia (vampirism) if disposition is high enough. Is removed from the Sanctuary after a certain point in the questline.',
  },

  // ============================================================
  // DAEDRIC PRINCES / UNIQUE
  // ============================================================
  {
    id: 'sheogorath',
    name: 'Sheogorath',
    race: 'Other',
    gender: 'Male',
    class: 'Daedra Lord',
    essential: true,
    disposition: 50,
    primaryLocation: 'Darkfallow / Ihinipalit (Daedric Shrine), West of Bravil',
    routine: 'Appears at his Daedric Shrine west of Bravil to initiate his quest. Also present throughout the Shivering Isles expansion as the ruling Daedric Prince of Madness.',
    quests: [
      { name: 'Sheogorath', levelReq: 2 },
    ],
    uniqueItems: [
      { name: 'Wabbajack' },
      { name: "Sheogorath's Staff" },
    ],
  },
  {
    id: 'mankar-camoran',
    name: 'Mankar Camoran',
    race: 'Altmer',
    gender: 'Male',
    class: 'Sorcerer',
    faction: 'Mythic Dawn',
    essential: false,
    disposition: 0,
    primaryLocation: 'Carac Agaialor (Paradise)',
    routine: 'Unreachable until the player obtains the Mysterium Xarxes and performs the ritual. Resides in his Paradise realm and must be killed to retrieve the Amulet of Kings.',
    quests: [
      { name: 'Paradise' },
    ],
    uniqueItems: [
      { name: 'Mysterium Xarxes' },
      { name: "Mankar Camoran's Robe" },
      { name: "Mankar Camoran's Staff" },
    ],
  },

  // ============================================================
  // TRAINERS — MASTER LEVEL
  // ============================================================
  {
    id: 'rusia-bradus',
    name: 'Rusia Bradus',
    race: 'Imperial',
    gender: 'Female',
    class: 'Warrior',
    essential: false,
    disposition: 50,
    primaryLocation: 'Anvil',
    routine: 'Lives in Anvil. Works out at the Fighter\'s Guildhall during the day; returns home at night.',
    trainer: { skill: 'Athletics', tier: 'Master', maxLevel: 100 },
    quests: [
      { name: 'Athletics Training' },
    ],
  },
  {
    id: 'andragil',
    name: 'Andragil',
    race: 'Bosmer',
    gender: 'Female',
    class: 'Healer',
    essential: false,
    disposition: 50,
    primaryLocation: 'Bravil',
    routine: 'Wanders the streets of Bravil during the day. Returns to her house at night. Has a drug addiction which plays into her daily routine.',
    trainer: { skill: 'Block', tier: 'Master', maxLevel: 100 },
    quests: [
      { name: 'Block Training' },
    ],
  },
  {
    id: 'oleta',
    name: 'Oleta',
    race: 'Imperial',
    gender: 'Female',
    class: 'Healer',
    essential: false,
    disposition: 50,
    primaryLocation: 'Skingrad, Chapel of Julianos',
    routine: 'Spends most of her time in the Chapel of Julianos in Skingrad. Prays and tends to the chapel during the day; sleeps in the chapel hall at night.',
    trainer: { skill: 'Restoration', tier: 'Master', maxLevel: 100 },
    quests: [
      { name: 'Restoration Training' },
    ],
  },
  {
    id: 'pranal',
    name: 'Pranal',
    race: 'Dunmer',
    gender: 'Male',
    class: 'Warrior',
    essential: false,
    disposition: 50,
    primaryLocation: 'Fieldstead Farm, Gold Coast',
    routine: 'Lives and works at Fieldstead Farm on the Gold Coast. Works the farm during the day and sleeps at night. A remote location — requires travel outside the major cities.',
    trainer: { skill: 'Heavy Armor', tier: 'Master', maxLevel: 100 },
    quests: [
      { name: 'Heavy Armor Training' },
    ],
  },
  {
    id: 'torbern',
    name: 'Torbern',
    race: 'Nord',
    gender: 'Male',
    class: 'Warrior',
    essential: false,
    disposition: 50,
    primaryLocation: 'Tsarmi, Jerall Mountains',
    routine: 'Lives alone in the ruined Ayleid ruin of Tsarmi in the Jerall Mountains. Extremely remote — requires traversing the mountains north of Bruma to reach him.',
    trainer: { skill: 'Acrobatics', tier: 'Master', maxLevel: 100 },
    quests: [
      { name: 'Acrobatics Training' },
    ],
  },
];

npcDefinitions.sort((a, b) => a.name.localeCompare(b.name));

export const npcDefinitionById: Record<string, NpcDefinition> = Object.fromEntries(
  npcDefinitions.map((npc) => [npc.id, npc]),
);
