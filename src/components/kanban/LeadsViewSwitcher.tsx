"use client"

import React, { useState } from 'react';
import { KanbanSquare, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LeadsKanban } from './LeadsKanban';

export function LeadsViewSwitcher({ 
  initialLeads, 
  TableComponent 
}: { 
  initialLeads: any[], 
  TableComponent: React.ReactNode 
}) {
  const [view, setView] = useState<'table' | 'kanban'>('kanban');

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end mb-2">
        <div className="flex bg-muted/30 p-1 rounded-md border border-border/50">
          <Button 
            variant={view === 'kanban' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-8 shadow-none"
            onClick={() => setView('kanban')}
          >
            <KanbanSquare className="h-4 w-4 mr-2" /> Board
          </Button>
          <Button 
            variant={view === 'table' ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-8 shadow-none"
            onClick={() => setView('table')}
          >
            <List className="h-4 w-4 mr-2" /> List
          </Button>
        </div>
      </div>
      
      {view === 'kanban' ? (
        <LeadsKanban initialLeads={initialLeads} />
      ) : (
        TableComponent
      )}
    </div>
  );
}
