import React from 'react';
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList, Search, Shield, Visibility } from '@mui/icons-material';
import { GiSkullCrossedBones } from 'react-icons/gi';
import { NpcDefinition, NpcStatus, locationDLCColors, npcFactionColors, npcStatusColors } from '@/utils/npcTypes';
import SkillIcon from '@/components/SkillIcon';

const statusIcon: Partial<Record<NpcStatus, React.ReactNode>> = {
  met:  <Visibility sx={{ fontSize: 12, color: npcStatusColors.met }} />,
  dead: <GiSkullCrossedBones style={{ fontSize: 12, color: npcStatusColors.dead, flexShrink: 0 }} />,
};

const tierColors = {
  Master: '#ef4444',
  Journeyman: '#3b82f6',
  Novice: '#22c55e',
};

export default function NpcList({
  filteredNpcs,
  selectedId,
  onSelect,
  search,
  onSearchChange,
  onToggleFilter,
  hasActiveFilters,
  npcStatuses,
}: {
  filteredNpcs: NpcDefinition[];
  selectedId: string | null;
  onSelect: (npc: NpcDefinition) => void;
  search: string;
  onSearchChange: (search: string) => void;
  onToggleFilter: () => void;
  hasActiveFilters: boolean;
  npcStatuses: Record<string, NpcStatus>;
}) {
  const filtered = filteredNpcs.filter(
    (npc) => search === '' || npc.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search NPCs..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 18, color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '0.85rem',
            },
          }}
        />
        <IconButton size="small" onClick={onToggleFilter} sx={{ color: 'text.secondary' }}>
          <Badge variant="dot" color="secondary" invisible={!hasActiveFilters}>
            <FilterList fontSize="small" />
          </Badge>
        </IconButton>
      </Box>

      <Box sx={{ overflow: 'auto', flex: 1 }}>
        <List dense disablePadding>
          {filtered.map((npc) => {
            const isSelected = selectedId === npc.id;
            const hasInfo =
              (npc.quests && npc.quests.length > 0) ||
              (npc.uniqueItems && npc.uniqueItems.length > 0) ||
              !!npc.trainer;
            const npcStatus = npcStatuses[npc.id] ?? 'unacquainted';

            return (
              <ListItemButton
                key={npc.id}
                selected={isSelected}
                onClick={() => onSelect(npc)}
                sx={{
                  py: 0.5,
                  px: 1.5,
                  borderLeft: isSelected ? '3px solid' : '3px solid transparent',
                  borderLeftColor: isSelected ? 'secondary.main' : 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {/* Status icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center', width: 14, flexShrink: 0 }}>
                        {statusIcon[npcStatus] ?? null}
                      </Box>
                      {/* Essential indicator */}
                      {npc.essential && (
                        <Shield sx={{ fontSize: 12, color: '#f59e0b' }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          color: npcStatus === 'unacquainted' ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {npc.name}
                      </Typography>
                      {/* DLC badge */}
                      {npc.dlc && (
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.55rem',
                            fontWeight: 'bold',
                            color: locationDLCColors[npc.dlc],
                            lineHeight: 1,
                          }}
                        >
                          {npc.dlc}
                        </Typography>
                      )}
                      {/* Trainer tier dot */}
                      {npc.trainer && (
                        <Box
                          sx={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            backgroundColor: tierColors[npc.trainer.tier],
                            flexShrink: 0,
                          }}
                        />
                      )}
                      {/* Merchant indicator */}
                      {npc.merchant && (
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.55rem',
                            fontWeight: 'bold',
                            color: '#0f766e',
                            lineHeight: 1,
                          }}
                        >
                          Merchant
                        </Typography>
                      )}
                      {/* Beggar indicator */}
                      {npc.beggar && (
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.55rem',
                            fontWeight: 'bold',
                            color: '#92400e',
                            lineHeight: 1,
                          }}
                        >
                          Beggar
                        </Typography>
                      )}
                      {/* Notes indicator */}
                      {npc.notes && (
                        <Typography sx={{ fontSize: '0.65rem', color: '#fbbf24' }}>!</Typography>
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{
                        fontSize: '0.65rem',
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <span>{npc.race}</span>
                      {npc.faction && npc.faction !== 'None' && (
                        <>
                          <span>·</span>
                          <span style={{ color: npcFactionColors[npc.faction] }}>
                            {npc.faction}
                          </span>
                        </>
                      )}
                      {npc.trainer && (
                        <>
                          <span>·</span>
                          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25 }}>
                            <SkillIcon skill={npc.trainer.skill} size={10} />
                            <span style={{ color: tierColors[npc.trainer.tier] }}>
                              {npc.trainer.skill} ({npc.trainer.tier})
                            </span>
                          </Box>
                        </>
                      )}
                      {hasInfo && !npc.trainer && <><span>·</span><span>Has info</span></>}
                    </Typography>
                  }
                />
              </ListItemButton>
            );
          })}
          {filtered.length === 0 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                No NPCs found
              </Typography>
            </Box>
          )}
        </List>
      </Box>
    </Box>
  );
}
