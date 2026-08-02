import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LocationDLC, NpcCity, NpcFaction, NpcRace } from '@/utils/npcTypes';

type State = {
  completedQuests: Record<string, boolean>;  // keyed by quest name
  acquiredItems: Record<string, boolean>;    // keyed by "npcId:itemName"
  raceFilters: NpcRace[];
  factionFilters: NpcFaction[];
  dlcFilters: LocationDLC[];
  cityFilters: NpcCity[];
  beggarFilter: boolean;
  merchantFilter: boolean;
  responsibilityMin: number;
  responsibilityMax: number;
  version: number;
};

type Actions = {
  toggleQuestCompleted: (questName: string) => void;
  toggleItemAcquired: (npcId: string, itemName: string) => void;
  toggleRaceFilter: (race: NpcRace) => void;
  toggleFactionFilter: (faction: NpcFaction) => void;
  toggleDLCFilter: (dlc: LocationDLC) => void;
  toggleCityFilter: (city: NpcCity) => void;
  toggleBeggarFilter: () => void;
  toggleMerchantFilter: () => void;
  setResponsibilityRange: (min: number, max: number) => void;
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
      cityFilters: [],
      beggarFilter: false,
      merchantFilter: false,
      responsibilityMin: 0,
      responsibilityMax: 100,
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
        toggleCityFilter: (city) =>
          set((state) => ({
            cityFilters: state.cityFilters.includes(city)
              ? state.cityFilters.filter((c) => c !== city)
              : [...state.cityFilters, city],
          })),
        toggleBeggarFilter: () =>
          set((state) => ({ beggarFilter: !state.beggarFilter })),
        toggleMerchantFilter: () =>
          set((state) => ({ merchantFilter: !state.merchantFilter })),
        setResponsibilityRange: (min, max) =>
          set({ responsibilityMin: min, responsibilityMax: max }),
        clearFilters: () =>
          set({ raceFilters: [], factionFilters: [], dlcFilters: [], cityFilters: [], beggarFilter: false, merchantFilter: false, responsibilityMin: 0, responsibilityMax: 100 }),
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
        cityFilters: state.cityFilters,
        beggarFilter: state.beggarFilter,
        merchantFilter: state.merchantFilter,
        responsibilityMin: state.responsibilityMin,
        responsibilityMax: state.responsibilityMax,
        version: state.version,
      }),
    },
  ),
);
