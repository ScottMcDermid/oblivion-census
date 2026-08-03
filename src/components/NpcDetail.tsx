import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Map, RadioButtonUnchecked, Shield, Visibility, Warning } from '@mui/icons-material';
import { GiSkullCrossedBones } from 'react-icons/gi';
import {
  LocationDLC,
  LocationPart,
  NpcDefinition,
  NpcStatus,
  locationDLCColors,
  locationDLCLabels,
  npcFactionColors,
  npcStatusColors,
  npcStatusLabels,
  vanillaLeveledOverrides,
} from '@/utils/npcTypes';
import SkillIcon from '@/components/SkillIcon';
import { buildUespUrl, buildQuestUrl, buildLocationUrl, buildMapUrl } from '@/utils/uespLinks';

function UespLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
      sx={{
        color: 'inherit',
        textDecoration: 'inherit',
        '&:hover': { textDecoration: 'underline' },
      }}
    >
      {children}
    </Box>
  );
}

const tierColors = {
  Master: '#ef4444',
  Journeyman: '#3b82f6',
  Novice: '#22c55e',
};

const statusCycle: Record<NpcStatus, NpcStatus> = {
  unacquainted: 'met',
  met: 'dead',
  dead: 'unacquainted',
};

export default function NpcDetail({
  npc,
  status,
  onStatusChange,
  completedQuests,
  acquiredItems,
  onToggleQuest,
  onToggleItem,
  activeDLCFilters,
}: {
  npc: NpcDefinition;
  status: NpcStatus;
  onStatusChange: (status: NpcStatus) => void;
  completedQuests: Record<string, boolean>;
  acquiredItems: Record<string, boolean>;
  onToggleQuest: (questName: string) => void;
  onToggleItem: (itemName: string) => void;
  activeDLCFilters?: Set<LocationDLC>;
}) {
  const npcDLC = npc.dlc ?? 'Base';
  const mapUrl = buildMapUrl(npc.primaryLocation[0][0].label, npc.dlc);

  const filteredQuests = npc.quests?.filter((q) => {
    const questDLC = q.dlc ?? npcDLC;
    return !activeDLCFilters || activeDLCFilters.size === 0 || activeDLCFilters.has(questDLC);
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          component="a"
          href={buildUespUrl(npc.name, npc.dlc)}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            fontWeight: 'bold',
            color: 'text.primary',
            mb: 0.5,
            display: 'block',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {npc.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', flexWrap: 'wrap', mb: 1 }}>
          {/* Race */}
          <Chip label={npc.race} size="small" sx={{ fontSize: '0.7rem' }} />

          {/* Gender */}
          <Chip label={npc.gender} size="small" sx={{ fontSize: '0.7rem' }} />

          {/* Faction */}
          {npc.faction && npc.faction !== 'None' && (
            <Chip
              label={npc.faction}
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: npcFactionColors[npc.faction],
                height: 20,
              }}
            />
          )}

          {/* DLC */}
          {npc.dlc && (
            <Chip
              label={locationDLCLabels[npc.dlc]}
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: locationDLCColors[npc.dlc],
                height: 20,
              }}
            />
          )}

          {/* Essential */}
          {npc.essential && (
            <Chip
              icon={<Shield sx={{ fontSize: '0.8rem !important' }} />}
              label="Essential"
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: '#1e1e1e',
                backgroundColor: '#f59e0b',
                height: 20,
                '& .MuiChip-icon': { color: '#1e1e1e', ml: 0.5 },
              }}
            />
          )}

          {/* Merchant */}
          {npc.merchant && (
            <Chip
              label="Merchant"
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#0f766e',
                height: 20,
              }}
            />
          )}

          {/* Beggar */}
          {npc.beggar && (
            <Chip
              label="Beggar"
              size="small"
              sx={{
                fontSize: '0.65rem',
                fontWeight: 'bold',
                color: '#fff',
                backgroundColor: '#92400e',
                height: 20,
              }}
            />
          )}

          {/* Map link */}
          {mapUrl && (
            <Box
              component="a"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              title="View on map"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.secondary',
                '&:hover': { color: 'text.primary' },
                ml: 'auto',
              }}
            >
              <Map sx={{ fontSize: 16 }} />
            </Box>
          )}
        </Box>

        {/* Status toggle */}
        <Box sx={{ mb: 2 }}>
          <Button
            size="small"
            fullWidth
            variant={status === 'unacquainted' ? 'outlined' : 'contained'}
            onClick={() => onStatusChange(statusCycle[status])}
            startIcon={
              status === 'unacquainted' ? (
                <RadioButtonUnchecked fontSize="small" />
              ) : status === 'met' ? (
                <Visibility fontSize="small" />
              ) : (
                <GiSkullCrossedBones />
              )
            }
            sx={{
              backgroundColor:
                status === 'dead' ? npcStatusColors.dead :
                status === 'met' ? npcStatusColors.met :
                'transparent',
              borderColor:
                status === 'dead' ? npcStatusColors.dead :
                status === 'met' ? npcStatusColors.met :
                'grey.500',
              color: status === 'unacquainted' ? 'grey.500' : '#fff',
              '&:hover': {
                backgroundColor:
                  status === 'dead' ? npcStatusColors.dead :
                  status === 'met' ? npcStatusColors.met :
                  'rgba(255,255,255,0.05)',
                borderColor:
                  status === 'dead' ? npcStatusColors.dead :
                  status === 'met' ? npcStatusColors.met :
                  'grey.500',
              },
              fontSize: '0.7rem',
              textTransform: 'none',
            }}
          >
            {npcStatusLabels[status]}
          </Button>
        </Box>
      </Box>

      {/* Responsibility */}
      {npc.responsibility !== undefined && (
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              display: 'block',
              mb: 0.5,
            }}
          >
            Base Responsibility
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
              {npc.responsibility}
            </Typography>
            <Box
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                backgroundColor: 'action.hover',
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  width: `${npc.responsibility}%`,
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor:
                    npc.responsibility >= 70
                      ? '#22c55e'
                      : npc.responsibility >= 40
                      ? '#f59e0b'
                      : '#ef4444',
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Primary Location */}
      <Box sx={{ mb: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            display: 'block',
            mb: 0.25,
          }}
        >
          Location
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          {npc.primaryLocation.map((stage, si) => (
            <React.Fragment key={si}>
              {si > 0 && <span>; </span>}
              {stage.map((part: LocationPart, pi: number) => {
                const href = buildLocationUrl(part, npc.dlc);
                return (
                  <React.Fragment key={pi}>
                    {pi > 0 && <span> &gt; </span>}
                    {href ? (
                      <UespLink href={href}>{part.label}</UespLink>
                    ) : (
                      <span>{part.label}</span>
                    )}
                    {part.context && (
                      <Box component="span" sx={{ color: 'text.secondary' }}>
                        {' '}({part.context})
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </Typography>
      </Box>

      {/* Routine */}
      {npc.routine && (
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              display: 'block',
              mb: 0.25,
            }}
          >
            Routine
          </Typography>
          {Array.isArray(npc.routine) ? (
            <Table size="small" sx={{ tableLayout: 'fixed' }}>
              <TableBody>
                {npc.routine.map((row) => (
                  <TableRow key={row.time} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell
                      sx={{
                        width: '38%',
                        fontSize: '0.72rem',
                        color: 'text.secondary',
                        py: 0.2,
                        px: 0,
                        borderColor: 'divider',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.time}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: '0.72rem',
                        py: 0.2,
                        px: 1,
                        borderColor: 'divider',
                      }}
                    >
                      {row.location}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
              {npc.routine}
            </Typography>
          )}
        </Box>
      )}

      {/* Trainer */}
      {npc.trainer && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Trainer
          </Typography>
          <List dense disablePadding>
            <ListItem disableGutters sx={{ py: 0.25 }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: tierColors[npc.trainer.tier],
                    ml: 0.75,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Typography sx={{ fontSize: '0.8rem' }}>
                      {npc.trainer.tier} Trainer
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    <SkillIcon skill={npc.trainer.skill} size={12} />
                    {`${npc.trainer.skill} - ${npc.trainer.tier} (up to ${npc.trainer.maxLevel})`}
                  </Box>
                }
                primaryTypographyProps={{ fontSize: '0.8rem', component: 'div' }}
                secondaryTypographyProps={{
                  fontSize: '0.7rem',
                  component: 'div',
                  sx: { color: tierColors[npc.trainer.tier] },
                }}
              />
            </ListItem>
          </List>
        </>
      )}

      {/* Quests */}
      {filteredQuests && filteredQuests.length > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Quests
          </Typography>
          <List dense disablePadding>
            {filteredQuests.map((q) => {
              const checked = !!completedQuests[q.name];
              const effectiveQuestDLC = q.dlc ?? npcDLC;
              const questDLCBadge = effectiveQuestDLC !== 'Base' ? effectiveQuestDLC : undefined;
              const secondaryParts: string[] = [];
              if (q.levelReq) secondaryParts.push(`Requires level ${q.levelReq}`);
              if (q.leveled) {
                const effectiveLevel = vanillaLeveledOverrides[q.name] !== undefined
                  ? vanillaLeveledOverrides[q.name]
                  : q.leveled;
                secondaryParts.push(`Leveled reward (level ${effectiveLevel}+)`);
              }
              return (
                <ListItem
                  key={q.name}
                  disableGutters
                  sx={{ py: 0.25, cursor: 'pointer' }}
                  onClick={() => onToggleQuest(q.name)}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <Checkbox
                      size="small"
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      sx={{ p: 0, color: '#a78bfa', '&.Mui-checked': { color: '#a78bfa' } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <UespLink href={buildQuestUrl(q.name, q.dlc ?? npc.dlc)}>
                          {q.name}
                        </UespLink>
                        {questDLCBadge && (
                          <Typography
                            component="span"
                            sx={{
                              fontSize: '0.55rem',
                              fontWeight: 'bold',
                              color: locationDLCColors[questDLCBadge],
                              lineHeight: 1,
                            }}
                          >
                            {questDLCBadge}
                          </Typography>
                        )}
                      </Box>
                    }
                    secondary={secondaryParts.length > 0 ? secondaryParts.join(' · ') : undefined}
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      component: 'div',
                      sx: checked ? { textDecoration: 'line-through', color: 'text.secondary' } : undefined,
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.7rem',
                      sx: checked
                        ? { textDecoration: 'line-through', color: 'text.disabled' }
                        : { color: '#fb923c' },
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}

      {/* Unique Items */}
      {npc.uniqueItems && npc.uniqueItems.length > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            Unique Items
          </Typography>
          <List dense disablePadding>
            {npc.uniqueItems.map((item) => {
              const checked = !!acquiredItems[`${npc.id}:${item.name}`];
              return (
                <ListItem
                  key={item.name}
                  disableGutters
                  sx={{ py: 0.25, cursor: 'pointer' }}
                  onClick={() => onToggleItem(item.name)}
                >
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <Checkbox
                      size="small"
                      checked={checked}
                      tabIndex={-1}
                      disableRipple
                      sx={{ p: 0, color: '#f59e0b', '&.Mui-checked': { color: '#f59e0b' } }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <UespLink href={buildUespUrl(item.name, npc.dlc)}>
                        {item.name}
                      </UespLink>
                    }
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      component: 'div',
                      sx: checked ? { textDecoration: 'line-through', color: 'text.secondary' } : undefined,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}

      {/* Notes */}
      {npc.notes && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              backgroundColor: '#78350f33',
              border: '1px solid #b45309',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <Warning sx={{ fontSize: 16, color: '#fbbf24' }} />
              <Typography variant="caption" sx={{ color: '#fbbf24', fontWeight: 'bold' }}>
                Note
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#fde68a', fontSize: '0.8rem' }}>
              {npc.notes}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}
