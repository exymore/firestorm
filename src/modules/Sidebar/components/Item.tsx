'use client';

import { RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { SidebarNavItem } from '@/types/sidebar';

type SidebarItemProps = {
  item: SidebarNavItem;
};

function SidebarItem({ item }: SidebarItemProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={item.href}
        className={`dark:bg-slate-800 flex items-center gap-x-2 text-gray-600 p-3 rounded-lg hover:bg-gray-50 hover:dark:bg-gray-800 ${
          pathname === item.href && 'bg-gray-100'
        } duration-150`}
      >
        <RefreshCw className="w-5 h-5 dark:text-slate-200" />
        <span className="dark:text-slate-200">{item.name}</span>
      </Link>
    </li>
  );
}

export default SidebarItem;
