"use client"

import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  DragStartEvent, 
  DragEndEvent 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { updateLeadStatus } from '@/lib/actions/leads';

const COLUMNS = [
  { id: 'new', title: 'Nuevos' },
  { id: 'contacted', title: 'Contactados' },
  { id: 'qualified', title: 'Cualificados' },
  { id: 'won', title: 'Ganados' },
  { id: 'lost', title: 'Perdidos' },
];

function SortableItem({ lead }: { lead: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.lead_id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card p-3 rounded-lg border border-border/50 shadow-sm mb-3 cursor-grab hover:border-primary/50 transition-colors"
    >
      <div className="font-medium text-sm mb-1 truncate">{lead.accounts?.legal_name || 'Desconocido'}</div>
      <div className="text-xs text-muted-foreground line-clamp-2 mb-2">{lead.message_summary}</div>
      <div className="flex justify-between items-center mt-2">
        <Badge variant="outline" className="text-[10px] uppercase bg-muted/50">{lead.source_channel}</Badge>
        <span className="text-[10px] text-muted-foreground">{lead.intent}</span>
      </div>
    </div>
  );
}

function Column({ col, items }: { col: typeof COLUMNS[0], items: any[] }) {
  return (
    <div className="flex flex-col bg-muted/30 rounded-xl border border-border/40 p-3 min-w-[280px] w-[280px]">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-semibold text-sm">{col.title}</h3>
        <Badge variant="secondary" className="px-1.5 py-0" style={{ fontSize: '10px' }}>{items.length}</Badge>
      </div>
      <SortableContext id={col.id} items={items.map(i => i.lead_id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 min-h-[150px]">
          {items.map(item => (
            <SortableItem key={item.lead_id} lead={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export function LeadsKanban({ initialLeads }: { initialLeads: any[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeId = active.id;
    const overId = over.id; // Could be a column id (new, contacted) or another lead id.

    // Determine target column
    let targetStatus = overId as string;
    const isOverAColumn = COLUMNS.some(c => c.id === overId);
    if (!isOverAColumn) {
      // over a lead item, find its status
      const overLead = leads.find(l => l.lead_id === overId);
      if (overLead) targetStatus = overLead.status;
    }

    const activeLead = leads.find(l => l.lead_id === activeId);
    if (activeLead && activeLead.status !== targetStatus) {
      // Update UI optimistically
      setLeads(prev => prev.map(l => l.lead_id === activeId ? { ...l, status: targetStatus } : l));
      
      // Update DB
      try {
        await updateLeadStatus(activeId as string, targetStatus);
      } catch (e) {
        // revert on error
        setLeads(initialLeads);
      }
    }
  };

  const activeLead = leads.find(l => l.lead_id === activeId);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2 -mx-2 px-2 snap-x">
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {COLUMNS.map(col => (
          <Column key={col.id} col={col} items={leads.filter(l => l.status === col.id)} />
        ))}
        <DragOverlay>
          {activeId && activeLead ? (
            <div className="bg-card p-3 rounded-lg border border-primary shadow-lg cursor-grabbing opacity-90 scale-105">
              <div className="font-medium text-sm mb-1 truncate">{activeLead.accounts?.legal_name || 'Desconocido'}</div>
              <div className="text-xs text-muted-foreground line-clamp-2 mb-2">{activeLead.message_summary}</div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
