import React from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import {
  LocationDLC,
  NpcFaction,
  NpcRace,
  locationDLCColors,
  locationDLCLabels,
  locationDLCs,
  npcFactionColors,
  npcFactions,
  npcRaces,
} from '@/utils/npcTypes';

export default function NpcFilters({
  activeRaceFilters,
  onToggleRaceFilter,
  activeFactionFilters,
  onToggleFactionFilter,
  activeDLCFilters,
  onToggleDLCFilter,
  beggarFilter,
  onToggleBeggarFilter,
  merchantFilter,
  onToggleMerchantFilter,
}: {
  activeRaceFilters: Set<NpcRace>;
  onToggleRaceFilter: (race: NpcRace) => void;
  activeFactionFilters: Set<NpcFaction>;
  onToggleFactionFilter: (faction: NpcFaction) => void;
  activeDLCFilters: Set<LocationDLC>;
  onToggleDLCFilter: (dlc: LocationDLC) => void;
  beggarFilter: boolean;
  onToggleBeggarFilter: () => void;
  merchantFilter: boolean;
  onToggleMerchantFilter: () => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* Race filter */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 0.5,
            display: 'block',
          }}
        >
          Race
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {npcRaces.map((race) => {
            const active = activeRaceFilters.has(race);
            return (
              <Chip
                key={race}
                label={race}
                size="small"
                variant={active ? 'filled' : 'outlined'}
                onClick={() => onToggleRaceFilter(race)}
                sx={{
                  borderColor: active ? 'secondary.main' : 'divider',
                  color: active ? '#1e1e1e' : 'text.primary',
                  backgroundColor: active ? 'secondary.main' : 'transparent',
                  '&:hover': {
                    backgroundColor: active ? 'secondary.dark' : 'action.hover',
                  },
                  fontSize: '0.7rem',
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Faction filter */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 0.5,
            display: 'block',
          }}
        >
          Faction
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {npcFactions.filter((f) => f !== 'None').map((faction) => {
            const active = activeFactionFilters.has(faction);
            const color = npcFactionColors[faction];
            return (
              <Chip
                key={faction}
                label={faction}
                size="small"
                variant={active ? 'filled' : 'outlined'}
                onClick={() => onToggleFactionFilter(faction)}
                sx={{
                  borderColor: active ? color : 'divider',
                  color: active ? '#fff' : 'text.primary',
                  backgroundColor: active ? color : 'transparent',
                  '&:hover': {
                    backgroundColor: active ? color : 'action.hover',
                  },
                  fontSize: '0.7rem',
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* DLC filter */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 0.5,
            display: 'block',
          }}
        >
          DLC
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {locationDLCs.map((dlc) => {
            const active = activeDLCFilters.has(dlc);
            const color = locationDLCColors[dlc];
            return (
              <Chip
                key={dlc}
                label={locationDLCLabels[dlc]}
                size="small"
                variant={active ? 'filled' : 'outlined'}
                onClick={() => onToggleDLCFilter(dlc)}
                sx={{
                  borderColor: active ? color : 'divider',
                  color: active ? '#fff' : 'text.primary',
                  backgroundColor: active ? color : 'transparent',
                  '&:hover': {
                    backgroundColor: active ? color : 'action.hover',
                  },
                  fontSize: '0.7rem',
                }}
              />
            );
          })}
        </Stack>
      </Box>

      {/* Role filter */}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            mb: 0.5,
            display: 'block',
          }}
        >
          Role
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          <Chip
            label="Merchant"
            size="small"
            variant={merchantFilter ? 'filled' : 'outlined'}
            onClick={onToggleMerchantFilter}
            sx={{
              borderColor: merchantFilter ? '#0f766e' : 'divider',
              color: merchantFilter ? '#fff' : 'text.primary',
              backgroundColor: merchantFilter ? '#0f766e' : 'transparent',
              '&:hover': {
                backgroundColor: merchantFilter ? '#0d6b63' : 'action.hover',
              },
              fontSize: '0.7rem',
            }}
          />
          <Chip
            label="Beggar"
            size="small"
            variant={beggarFilter ? 'filled' : 'outlined'}
            onClick={onToggleBeggarFilter}
            sx={{
              borderColor: beggarFilter ? '#92400e' : 'divider',
              color: beggarFilter ? '#fff' : 'text.primary',
              backgroundColor: beggarFilter ? '#92400e' : 'transparent',
              '&:hover': {
                backgroundColor: beggarFilter ? '#78350f' : 'action.hover',
              },
              fontSize: '0.7rem',
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
