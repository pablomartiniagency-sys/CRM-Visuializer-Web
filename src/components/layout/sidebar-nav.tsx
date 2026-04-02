'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Briefcase, ShoppingCart, MessageSquare, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/accounts', icon: Briefcase, label: 'Cuentas' },
  { href: '/leads', icon: Users, label: 'Leads' },
  { href: '/orders', icon: ShoppingCart, label: 'Pedidos' },
  { href: '/interactions', icon: MessageSquare, label: 'Interacciones' },
  { href: '/tasks', icon: CheckSquare, label: 'Tareas' },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="mt-6 flex flex-col gap-1.5 px-3">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive 
                ? "text-primary bg-primary/5" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {/* The Signature identity indicator (Sunset Gradient) */}
            {isActive && (
              <div className="absolute left-0 top-1/2 h-2/3 w-1 -translate-y-1/2 rounded-r-full brand-gradient" />
            )}
            
            <Icon className={cn(
              "h-4 w-4 transition-colors", 
              isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            )} strokeWidth={isActive ? 2.5 : 2} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
