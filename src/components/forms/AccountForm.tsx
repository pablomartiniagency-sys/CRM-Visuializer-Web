'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { createAccount, updateAccount } from '@/lib/actions/accounts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const accountSchema = z.object({
  nif: z.string().min(1, 'El NIF/CIF es obligatorio'),
  legal_name: z.string().min(1, 'La Razón Social es obligatoria'),
  trade_name: z.string().optional(),
  client_type: z.string().optional(),
  agent: z.string().optional(),
  status: z.string().optional().default('active'),
  source_codes: z.string().optional(),
  notes: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

export function AccountForm({ initialData, onSuccess }: { initialData?: any, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      nif: initialData?.nif || '',
      legal_name: initialData?.legal_name || '',
      trade_name: initialData?.trade_name || '',
      client_type: initialData?.client_type || '',
      agent: initialData?.agent || '',
      status: initialData?.status || 'active',
      source_codes: initialData?.source_codes || '',
      notes: initialData?.notes || '',
    },
  });

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      if (initialData?.account_id) {
        const res = await updateAccount(initialData.account_id, data);
        if (!res.success) throw new Error(res.error);
        toast.success('Cuenta actualizada correctamente');
      } else {
        const res = await createAccount(data);
        if (!res.success) throw new Error(res.error);
        toast.success('Cuenta creada correctamente');
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Error guardando cuenta');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>NIF/CIF</Label>
          <Input placeholder="Ej. B12345678" {...form.register('nif')} />
          {form.formState.errors.nif && <p className="text-xs text-destructive">{form.formState.errors.nif.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label>Estado</Label>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="prospect">Prospecto</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.status && <p className="text-xs text-destructive">{form.formState.errors.status.message as string}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Razón Social</Label>
        <Input placeholder="Nombre o Razón social..." {...form.register('legal_name')} />
        {form.formState.errors.legal_name && <p className="text-xs text-destructive">{form.formState.errors.legal_name.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label>Notas</Label>
        <Input placeholder="Observaciones..." {...form.register('notes')} />
        {form.formState.errors.notes && <p className="text-xs text-destructive">{form.formState.errors.notes.message as string}</p>}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cuenta'}
        </Button>
      </div>
    </form>
  );
}
