import React, { useEffect, useState } from 'react';
import { Box, Chip, Slider, Stack, Typography } from '@mui/material';
import {
  LocationDLC,
  NpcCity,
  NpcFaction,
  NpcRace,
  locationDLCColors,
  locationDLCLabels,
  locationDLCs,
  npcCities,
  npcFactionColors,
  npcFactions,
  npcRaces,
} from '@/utils/npcTypes';

export default function NpcFilters({
  activeRaceFilters,
  onToggleRaceFilter,
  activeGenderFilters,
  onToggleGenderFilter,
  activeFactionFilters,
  onToggleFactionFilter,
  activeDLCFilters,
  onToggleDLCFilter,
  activeCityFilters,
  onToggleCityFilter,
  beggarFilter,
  onToggleBeggarFilter,
  merchantFilter,
  onToggleMerchantFilter,
  responsibilityMin,
  responsibilityMax,
  onSetResponsibilityRange,
}: {
  activeRaceFilters: Set<NpcRace>;
  onToggleRaceFilter: (race: NpcRace) => void;
  activeGenderFilters: Set<'Male' | 'Female'>;
  onToggleGenderFilter: (gender: 'Male' | 'Female') => void;
  activeFactionFilters: Set<NpcFaction>;
  onToggleFactionFilter: (faction: NpcFaction) => void;
  activeDLCFilters: Set<LocationDLC>;
  onToggleDLCFilter: (dlc: LocationDLC) => void;
  activeCityFilters: Set<NpcCity>;
  onToggleCityFilter: (city: NpcCity) => void;
  beggarFilter: boolean;
  onToggleBeggarFilter: () => void;
  merchantFilter: boolean;
  onToggleMerchantFilter: () => void;
  responsibilityMin: number;
  responsibilityMax: number;
  onSetResponsibilityRange: (min: number, max: number) => void;
}) {
  const [localRange, setLocalRange] = useState<[number, number]>([responsibilityMin, responsibilityMax]);

  // Sync local range if the store value changes externally (e.g. "Clear filters")
  useEffect(() => {
    setLocalRange([responsibilityMin, responsibilityMax]);
  }, [responsibilityMin, responsibilityMax]);

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

      {/* Gender filter */}
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
          Gender
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {(['Male', 'Female'] as const).map((gender) => {
            const active = activeGenderFilters.has(gender);
            return (
              <Chip
                key={gender}
                label={gender}
                size="small"
                variant={active ? 'filled' : 'outlined'}
                onClick={() => onToggleGenderFilter(gender)}
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

      {/* City filter */}
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
          City
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          {npcCities.map((city) => {
            const active = activeCityFilters.has(city);
            return (
              <Chip
                key={city}
                label={city}
                size="small"
                variant={active ? 'filled' : 'outlined'}
                onClick={() => onToggleCityFilter(city)}
                sx={{
                  borderColor: active ? '#15803d' : 'divider',
                  color: active ? '#fff' : 'text.primary',
                  backgroundColor: active ? '#15803d' : 'transparent',
                  '&:hover': {
                    backgroundColor: active ? '#166534' : 'action.hover',
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

      {/* Responsibility filter */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 0.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              display: 'block',
            }}
          >
            Responsibility
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {localRange[0]} – {localRange[1]}
          </Typography>
        </Box>
        <Box sx={{ px: 1 }}>
          <Slider
            min={0}
            max={100}
            value={localRange}
            onChange={(_e, value) => {
              const [min, max] = value as number[];
              setLocalRange([min, max]);
            }}
            onChangeCommitted={(_e, value) => {
              const [min, max] = value as number[];
              onSetResponsibilityRange(min, max);
            }}
            valueLabelDisplay="auto"
            size="small"
            sx={{ color: 'primary.main' }}
          />
        </Box>
      </Box>
    </Box>
  );
}
