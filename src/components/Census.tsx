'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, StyledEngineProvider, useTheme } from '@mui/material/styles';
import { ArrowBack, Close } from '@mui/icons-material';
import Image from 'next/image';
import theme from '@/app/theme';
import { useNpcStore } from '@/data/npcStore';
import { useHydrated } from '@/hooks/useHydrated';
import { npcDefinitions, npcDefinitionById } from '@/data/npcs';
import { LocationDLC, NpcCity, NpcDefinition, NpcFaction, NpcRace, NpcStatus, getCityFromLocation } from '@/utils/npcTypes';
import NpcList from '@/components/NpcList';
import NpcDetail from '@/components/NpcDetail';
import NpcFilters from '@/components/NpcFilters';
import ConfirmDialog from '@/components/ConfirmDialog';

function CensusContent({ npcId }: { npcId?: string }) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const hydrated = useHydrated();

  const completedQuests = useNpcStore((s) => s.completedQuests);
  const acquiredItems = useNpcStore((s) => s.acquiredItems);
  const npcStatuses = useNpcStore((s) => s.npcStatuses);
  const statusFilters = useNpcStore((s) => s.statusFilters);
  const raceFilters = useNpcStore((s) => s.raceFilters);
  const genderFilters = useNpcStore((s) => s.genderFilters);
  const factionFilters = useNpcStore((s) => s.factionFilters);
  const dlcFilters = useNpcStore((s) => s.dlcFilters);
  const beggarFilter = useNpcStore((s) => s.beggarFilter);
  const merchantFilter = useNpcStore((s) => s.merchantFilter);
  const ambientFilter = useNpcStore((s) => s.ambientFilter);
  const cityFilters = useNpcStore((s) => s.cityFilters);
  const responsibilityMin = useNpcStore((s) => s.responsibilityMin);
  const responsibilityMax = useNpcStore((s) => s.responsibilityMax);
  const {
    toggleQuestCompleted,
    toggleItemAcquired,
    setNpcStatus,
    toggleStatusFilter,
    toggleRaceFilter,
    toggleGenderFilter,
    toggleFactionFilter,
    toggleDLCFilter,
    toggleCityFilter,
    toggleBeggarFilter,
    toggleMerchantFilter,
    toggleAmbientFilter,
    setResponsibilityRange,
    clearFilters,
    resetToDefaults,
  } = useNpcStore((s) => s.actions);

  const activeStatusFilters = React.useMemo(() => new Set<NpcStatus>(statusFilters), [statusFilters]);
  const activeRaceFilters = React.useMemo(() => new Set<NpcRace>(raceFilters), [raceFilters]);
  const activeGenderFilters = React.useMemo(() => new Set<'Male' | 'Female'>(genderFilters), [genderFilters]);
  const activeFactionFilters = React.useMemo(() => new Set<NpcFaction>(factionFilters), [factionFilters]);
  const activeDLCFilters = React.useMemo(() => new Set<LocationDLC>(dlcFilters), [dlcFilters]);
  const activeCityFilters = React.useMemo(() => new Set<NpcCity>(cityFilters), [cityFilters]);

  const [selectedNpcId, setSelectedNpcId] = useState<string | undefined>(npcId);

  const selectedNpc = React.useMemo(
    () => (selectedNpcId ? npcDefinitionById[selectedNpcId] ?? null : null),
    [selectedNpcId],
  );

  const displayedNpcRef = useRef<NpcDefinition | null>(null);
  if (selectedNpc) displayedNpcRef.current = selectedNpc;
  const displayedNpc = selectedNpc ?? displayedNpcRef.current;

  const navigateTo = useCallback((id?: string) => {
    const path = id ? `/npc/${id}` : '/';
    window.history.pushState(null, '', path);
    setSelectedNpcId(id);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const match = window.location.pathname.match(/^\/npc\/(.+)$/);
      setSelectedNpcId(match ? match[1] : undefined);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [search, setSearch] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const mobileDetailOpen = isMobile && !!selectedNpc;

  const hasActiveFilters =
    activeStatusFilters.size > 0 || activeRaceFilters.size > 0 || activeGenderFilters.size > 0 || activeFactionFilters.size > 0 || activeDLCFilters.size > 0 || activeCityFilters.size > 0 || beggarFilter || merchantFilter || ambientFilter || responsibilityMin > 0 || responsibilityMax < 100;

  const filteredNpcs = React.useMemo(() => {
    return npcDefinitions.filter((npc) => {
      const npcStatus = npcStatuses[npc.id] ?? 'unacquainted';
      const matchesStatus = activeStatusFilters.size === 0 || activeStatusFilters.has(npcStatus);
      const matchesRace = activeRaceFilters.size === 0 || activeRaceFilters.has(npc.race);
      const matchesGender = activeGenderFilters.size === 0 || activeGenderFilters.has(npc.gender);
      const matchesFaction =
        activeFactionFilters.size === 0 ||
        (npc.faction ? activeFactionFilters.has(npc.faction) : false);
      const npcDLC = npc.dlc ?? 'Base';
      const hasMatchingQuestDLC =
        npc.quests?.some((q) => q.dlc && activeDLCFilters.has(q.dlc)) ?? false;
      const matchesDLC =
        activeDLCFilters.size === 0 || activeDLCFilters.has(npcDLC) || hasMatchingQuestDLC;
      const matchesCity =
        activeCityFilters.size === 0 || activeCityFilters.has(getCityFromLocation(npc.primaryLocation) as NpcCity);
      const matchesBeggar = !beggarFilter || npc.beggar === true;
      const matchesMerchant = !merchantFilter || npc.merchant === true;
      const matchesAmbient = !ambientFilter || npc.ambient === true;
      const npcResponsibility = npc.responsibility ?? 50;
      const matchesResponsibility = npcResponsibility >= responsibilityMin && npcResponsibility <= responsibilityMax;
      return matchesStatus && matchesRace && matchesGender && matchesFaction && matchesDLC && matchesCity && matchesBeggar && matchesMerchant && matchesAmbient && matchesResponsibility;
    });
  }, [npcStatuses, activeStatusFilters, activeRaceFilters, activeGenderFilters, activeFactionFilters, activeDLCFilters, activeCityFilters, beggarFilter, merchantFilter, ambientFilter, responsibilityMin, responsibilityMax]);

  const handleSelectNpc = (npc: NpcDefinition) => {
    navigateTo(npc.id);
  };

  const handleResetConfirm = (confirm: boolean) => {
    setIsConfirmingReset(false);
    if (confirm) {
      resetToDefaults();
      navigateTo();
    }
  };

  if (!hydrated) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const detailContent = selectedNpc ? (
    <NpcDetail
      npc={selectedNpc}
      status={npcStatuses[selectedNpc.id] ?? 'unacquainted'}
      onStatusChange={(status) => setNpcStatus(selectedNpc.id, status)}
      completedQuests={completedQuests}
      acquiredItems={acquiredItems}
      onToggleQuest={(name) => toggleQuestCompleted(name)}
      onToggleItem={(name) => toggleItemAcquired(selectedNpc.id, name)}
      activeDLCFilters={activeDLCFilters}
    />
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        color: 'text.secondary',
      }}
    >
      <Typography variant="body2">Select an NPC to view details</Typography>
    </Box>
  );

  const filterPanel = (
    <NpcFilters
      activeStatusFilters={activeStatusFilters}
      onToggleStatusFilter={toggleStatusFilter}
      activeRaceFilters={activeRaceFilters}
      onToggleRaceFilter={toggleRaceFilter}
      activeGenderFilters={activeGenderFilters}
      onToggleGenderFilter={toggleGenderFilter}
      activeFactionFilters={activeFactionFilters}
      onToggleFactionFilter={toggleFactionFilter}
      activeDLCFilters={activeDLCFilters}
      onToggleDLCFilter={toggleDLCFilter}
      activeCityFilters={activeCityFilters}
      onToggleCityFilter={toggleCityFilter}
      beggarFilter={beggarFilter}
      onToggleBeggarFilter={toggleBeggarFilter}
      merchantFilter={merchantFilter}
      onToggleMerchantFilter={toggleMerchantFilter}
      ambientFilter={ambientFilter}
      onToggleAmbientFilter={toggleAmbientFilter}
      responsibilityMin={responsibilityMin}
      responsibilityMax={responsibilityMax}
      onSetResponsibilityRange={setResponsibilityRange}
    />
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: 'background.paper' }} elevation={1}>
        <Toolbar variant="dense" sx={{ gap: 1, overflow: 'hidden' }}>
          <IconButton
            component="a"
            href="https://oblivion.tools"
            size="small"
            aria-label="Oblivion Tools home"
            sx={{ p: 0.5 }}
          >
            <Image
              src="/oblivion-tools-icon.ico"
              alt="Oblivion Tools"
              width={16}
              height={16}
              style={{ display: 'block' }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: '1rem', fontWeight: 'bold', color: 'secondary.main' }}
          >
            Oblivion Census
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button
            size="small"
            onClick={() => setIsConfirmingReset(true)}
            sx={{
              fontSize: '0.7rem',
              textTransform: 'none',
              color: 'text.secondary',
            }}
          >
            Reset
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', height: 'calc(100vh - 48px)', overflow: 'hidden' }}>
        {/* Filter Panel - Desktop */}
        {!isMobile && (
          <Collapse orientation="horizontal" in={filterPanelOpen} timeout={250}>
            <Box
              sx={{
                width: 250,
                minWidth: 250,
                borderRight: '1px solid',
                borderColor: 'divider',
                overflow: 'auto',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1.5,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Filters
                </Typography>
                <IconButton size="small" onClick={() => setFilterPanelOpen(false)}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              {filterPanel}
              {hasActiveFilters && (
                <Button
                  size="small"
                  onClick={clearFilters}
                  sx={{ mt: 1.5, fontSize: '0.7rem', textTransform: 'none', color: 'text.secondary' }}
                >
                  Clear filters
                </Button>
              )}
            </Box>
          </Collapse>
        )}

        {/* NPC List */}
        <Box
          sx={{
            width: isMobile ? '100%' : 380,
            minWidth: isMobile ? '100%' : 380,
            borderRight: isMobile ? 'none' : '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NpcList
            filteredNpcs={filteredNpcs}
            selectedId={selectedNpc?.id ?? null}
            onSelect={handleSelectNpc}
            search={search}
            onSearchChange={setSearch}
            onToggleFilter={() => setFilterPanelOpen((prev) => !prev)}
            hasActiveFilters={hasActiveFilters}
            npcStatuses={npcStatuses}
          />
        </Box>

        {/* Detail Panel - Desktop */}
        {!isMobile && <Box sx={{ flex: 1, overflow: 'auto' }}>{detailContent}</Box>}

        {/* Detail Drawer - Mobile */}
        {isMobile && (
          <Drawer
            anchor="right"
            open={mobileDetailOpen}
            onClose={() => navigateTo()}
            transitionDuration={{ enter: 250, exit: 200 }}
            PaperProps={{
              sx: { width: '100%', backgroundColor: 'background.default' },
            }}
          >
            <Box sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <IconButton onClick={() => navigateTo()} size="small">
                <ArrowBack />
              </IconButton>
            </Box>
            {displayedNpc ? (
              <NpcDetail
                npc={displayedNpc}
                status={npcStatuses[displayedNpc.id] ?? 'unacquainted'}
                onStatusChange={(status) => setNpcStatus(displayedNpc.id, status)}
                completedQuests={completedQuests}
                acquiredItems={acquiredItems}
                onToggleQuest={(name) => toggleQuestCompleted(name)}
                onToggleItem={(name) => toggleItemAcquired(displayedNpc.id, name)}
                activeDLCFilters={activeDLCFilters}
              />
            ) : null}
          </Drawer>
        )}
      </Box>

      {/* Filter Dialog - Mobile */}
      {isMobile && (
        <Dialog
          open={filterPanelOpen}
          onClose={() => setFilterPanelOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 1,
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Filters</span>
            <IconButton size="small" onClick={() => setFilterPanelOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {filterPanel}
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={clearFilters}
                sx={{ mt: 1.5, fontSize: '0.7rem', textTransform: 'none', color: 'text.secondary' }}
              >
                Clear filters
              </Button>
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="mt-16 w-full border-t border-gray-700 bg-neutral-900 px-6 py-8 text-sm text-gray-400">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 text-center sm:text-left">
          <div className="space-y-2">
            <p>Oblivion Tool Suite © 2025 Scott McDermid</p>
            <p>
              Licensed under the{' '}
              <a
                href="https://www.gnu.org/licenses/gpl-3.0.html"
                className="underline hover:text-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                GNU General Public License v3.0
              </a>
              .
            </p>
            <p>
              The Elder Scrolls and Oblivion are trademarks of Bethesda Softworks LLC, a ZeniMax
              Media company.
            </p>
            <p>This site is fan-made and not affiliated with Bethesda.</p>
          </div>
          <div className="flex w-full justify-end">
            <a
              href="https://github.com/ScottMcDermid/oblivion-census"
              className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-1 text-xs font-medium text-gray-400 transition hover:border-gray-600 hover:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
                focusable="false"
              >
                <path d="M12 .297C5.375.297 0 5.67 0 12.297c0 5.302 3.438 9.799 8.205 11.387.6.112.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.746.083-.73.083-.73 1.203.085 1.836 1.236 1.836 1.236 1.07 1.835 2.808 1.305 3.492.998.108-.775.418-1.305.762-1.606-2.665-.303-5.467-1.334-5.467-5.934 0-1.31.469-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.47 11.47 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.292-1.552 3.298-1.23 3.298-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.628-5.48 5.923.43.37.823 1.096.823 2.21 0 1.595-.015 2.882-.015 3.274 0 .32.22.694.825.576C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
              </svg>
              <span className="uppercase tracking-wide">GitHub</span>
            </a>
          </div>
        </div>
      </footer>

      <ConfirmDialog
        open={isConfirmingReset}
        description="This will reset all quest and item tracking. This cannot be undone."
        handleClose={handleResetConfirm}
      />
    </Box>
  );
}

export default function Census({ npcId }: { npcId?: string }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CensusContent npcId={npcId} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
