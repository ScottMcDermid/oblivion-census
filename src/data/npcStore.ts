import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocationDLC, NpcFaction, NpcRace } from '@/utils/npcTypes';

type State = {
  completedQuests: Record<string, boolean>;  // keyed by quest name
  acquiredItems: Record<string, boolean>;    // keyed by "npcId:itemName"
  raceFilters: NpcRace[];
  factionFilters: NpcFaction[];
  dlcFilters: LocationDLC[];
  version: number;
};

type Actions = {
  toggleQuestCompleted: (questName: string) => void;
  toggleItemAcquired: (npcId: string, itemName: string) => void;
  toggleRaceFilter: (race: NpcRace) => void;
  toggleFactionFilter: (faction: NpcFaction) => void;
  toggleDLCFilter: (dlc: LocationDLC) => void;
  clearFilters: () => void;
  resetToDefaults: () => void;
};

type NpcStore = State & { actions: Actions };

export const useNpcStore = create<NpcStore>()(
  persist(
    (set) => ({
      completedQuests: {},
      acquiredItems: {},
      raceFilters: [],
      factionFilters: [],
      dlcFilters: [],
      version: 1,
      actions: {
        toggleQuestCompleted: (questName) =>
          set((state) => {
            const { [questName]: current, ...rest } = state.completedQuests;
            return { completedQuests: current ? rest : { ...state.completedQuests, [questName]: true } };
          }),
        toggleItemAcquired: (npcId, itemName) =>
          set((state) => {
            const key = `${npcId}:${itemName}`;
            const { [key]: current, ...rest } = state.acquiredItems;
            return { acquiredItems: current ? rest : { ...state.acquiredItems, [key]: true } };
          }),
        toggleRaceFilter: (race) =>
          set((state) => ({
            raceFilters: state.raceFilters.includes(race)
              ? state.raceFilters.filter((r) => r !== race)
              : [...state.raceFilters, race],
          })),
        toggleFactionFilter: (faction) =>
          set((state) => ({
            factionFilters: state.factionFilters.includes(faction)
              ? state.factionFilters.filter((f) => f !== faction)
              : [...state.factionFilters, faction],
          })),
        toggleDLCFilter: (dlc) =>
          set((state) => ({
            dlcFilters: state.dlcFilters.includes(dlc)
              ? state.dlcFilters.filter((d) => d !== dlc)
              : [...state.dlcFilters, dlc],
          })),
        clearFilters: () =>
          set({ raceFilters: [], factionFilters: [], dlcFilters: [] }),
        resetToDefaults: () =>
          set({ completedQuests: {}, acquiredItems: {} }),
      },
    }),
    {
      name: 'oblivion-census',
      version: 1,
      partialize: (state) => ({
        completedQuests: state.completedQuests,
        acquiredItems: state.acquiredItems,
        raceFilters: state.raceFilters,
        factionFilters: state.factionFilters,
        dlcFilters: state.dlcFilters,
        version: state.version,
      }),
    },
  ),
);
