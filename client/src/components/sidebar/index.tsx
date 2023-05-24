'use client';

import { usePathname } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Currency converter',
      href: '/',
    },
  ];

  return (
    <nav className="border-r dark:border-slate-800">
      <div className="flex flex-col h-full">
        <div className="h-20 flex justify-between items-center px-6">
          <h1 className="dark:text-slate-200 text-3xl font-bold">Firestorm</h1>

          {/* Disabled until Tremor implements dark mode */}
          {/* <ThemeSwitchButton /> */}
        </div>

        <div className="flex-1 flex flex-col h-full overflow-auto">
          <ul className="px-4 text-sm font-medium flex-1">
            {navigation.map((item) => (
              <li key={item.name}>
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
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}