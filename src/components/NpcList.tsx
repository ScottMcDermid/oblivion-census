import React, { useMemo, useCallback, memo, CSSProperties } from 'react';
import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList, Search, Shield, Visibility } from '@mui/icons-material';
import { GiSkullCrossedBones } from 'react-icons/gi';
import { List, RowComponentProps as WindowRowComponentProps } from 'react-window';
import { NpcDefinition, NpcStatus, locationDLCColors, npcFactionColors, npcStatusColors } from '@/utils/npcTypes';
const statusIcon: Partial<Record<NpcStatus, React.ReactNode>> = {
  met:  <Visibility sx={{ fontSize: 12, color: npcStatusColors.met }} />,
  dead: <GiSkullCrossedBones style={{ fontSize: 12, color: npcStatusColors.dead, flexShrink: 0 }} />,
};

const ROW_HEIGHT = 52;

type RowProps = {
  npcs: NpcDefinition[];
  selectedId: string | null;
  onSelect: (npc: NpcDefinition) => void;
  npcStatuses: Record<string, NpcStatus>;
};

type NpcRowComponentProps = {
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
  index: number;
  style: CSSProperties;
} & RowProps;

// Memoized row renderer — react-window v2 calls this with (index, style, rowProps).
const NpcRowComponent = memo(function NpcRowComponent({
  index,
  style,
  npcs,
  selectedId,
  onSelect,
  npcStatuses,
}: NpcRowComponentProps): React.ReactElement {
  const npc = npcs[index];
  const isSelected = selectedId === npc.id;
  const npcStatus = npcStatuses[npc.id] ?? 'unacquainted';

  return (
    <Box
      component="div"
      style={style}
      onClick={() => onSelect(npc)}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        px: 1.5,
        py: 0.5,
        cursor: 'pointer',
        borderLeft: isSelected ? '3px solid' : '3px solid transparent',
        borderLeftColor: isSelected ? 'secondary.main' : 'transparent',
        backgroundColor: isSelected ? 'action.selected' : 'transparent',
        '&:hover': {
          backgroundColor: isSelected ? 'action.selected' : 'action.hover',
        },
        boxSizing: 'border-box',
      }}
    >
      {/* Primary line */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%', minWidth: 0 }}>
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
          noWrap
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
              flexShrink: 0,
            }}
          >
            {npc.dlc}
          </Typography>
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
              flexShrink: 0,
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
              flexShrink: 0,
            }}
          >
            Beggar
          </Typography>
        )}
      </Box>

      {/* Secondary line */}
      <Typography
        component="span"
        variant="caption"
        sx={{
          fontSize: '0.65rem',
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          pl: '18px', // indent to align under name (past status icon width)
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

      </Typography>
    </Box>
  );
});

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
  const searchLower = useMemo(() => search.toLowerCase(), [search]);

  const filtered = useMemo(
    () =>
      search === ''
        ? filteredNpcs
        : filteredNpcs.filter((npc) => npc.name.toLowerCase().includes(searchLower)),
    [filteredNpcs, search, searchLower],
  );

  // Stable rowProps object — react-window v2 re-renders rows only when this changes.
  const rowProps = useMemo<RowProps>(
    () => ({ npcs: filtered, selectedId, onSelect, npcStatuses }),
    [filtered, selectedId, onSelect, npcStatuses],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange],
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search NPCs..."
          value={search}
          onChange={handleSearchChange}
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

      <Box sx={{ flex: 1, minHeight: 0 }}>
        {filtered.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No NPCs found
            </Typography>
          </Box>
        ) : (
          <List
            rowComponent={NpcRowComponent as (props: WindowRowComponentProps<RowProps>) => React.ReactElement}
            rowCount={filtered.length}
            rowHeight={ROW_HEIGHT}
            rowProps={rowProps}
            overscanCount={5}
            style={{ height: '100%' }}
          />
        )}
      </Box>
    </Box>
  );
}
