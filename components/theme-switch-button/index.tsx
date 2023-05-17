import { Icon } from '@tremor/react';
import { useContext } from 'react';
import ThemeContext from '@/src/context/theme-context';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeSwitchButton() {
  const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext);
  const SwitchThemeIcon = isDarkTheme ? SunIcon : MoonIcon;

  return (
    <button className='h-7 w-7 cursor-pointer' onClick={toggleThemeHandler}>
      <Icon
        icon={SwitchThemeIcon}
        className='text-blue-800 hover:text-blue-400 dark:text-gray-50 dark:hover:text-gray-400'
      />
    </button>
  );
}
