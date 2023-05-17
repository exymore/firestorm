'use client';
import { usePathname } from 'next/navigation';
import { Icon } from '@tremor/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useContext } from 'react';
import ThemeContext from '@/src/context/theme-context';

export default function Sidebar() {
  const pathname = usePathname();
  const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext);
  const SwitchThemeIcon = isDarkTheme ? SunIcon : MoonIcon;

  const navigation = [
    {
      name: 'Конвертер валют',
      href: '/',
    },
  ];

  return (
    <>
      <nav className='dark:bg-slate-900 fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80'>
        <div className='flex flex-col h-full'>
          <div className='h-20 flex justify-between items-center px-6'>
            <h1 className='dark:text-slate-200 text-3xl font-bold'>
              Firestorm
            </h1>
            <button
              className='h-7 w-7 cursor-pointer'
              onClick={toggleThemeHandler}
            >
              <Icon
                icon={SwitchThemeIcon}
                className='text-blue-800 hover:text-blue-400 dark:text-gray-50 dark:hover:text-gray-400'
              />
            </button>
          </div>

          <div className='flex-1 flex flex-col h-full overflow-auto'>
            <ul className='px-4 text-sm font-medium flex-1'>
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`dark:bg-slate-700 flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 hover:dark:bg-gray-800 ${
                      pathname === item.href && 'bg-gray-100'
                    } duration-150`}
                  >
                    <span className='dark:text-slate-200'>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
