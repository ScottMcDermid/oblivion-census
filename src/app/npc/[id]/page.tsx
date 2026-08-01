'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Census from '@/components/Wayshrine';

export default function NpcPage() {
  const { id } = useParams<{ id: string }>();
  return <Census npcId={id} />;
}
