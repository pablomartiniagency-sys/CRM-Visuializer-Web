'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AccountForm } from './AccountForm';
import { Plus } from 'lucide-react';

export function AccountDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cuenta
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Cuenta</DialogTitle>
          <DialogDescription>
            Rellena los datos para inicializar una nueva cuenta.
          </DialogDescription>
        </DialogHeader>
        <AccountForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
