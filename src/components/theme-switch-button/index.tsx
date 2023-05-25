import { Icon } from '@tremor/react';
import { useContext } from 'react';
import ThemeContext from '@/context/theme-context';
import { Moon, Sun } from 'lucide-react';

export default function ThemeSwitchButton() {
  const { isDarkTheme, toggleThemeHandler } = useContext(ThemeContext);
  const SwitchThemeIcon = isDarkTheme ? Sun : Moon;

  return (
    <button className="h-7 w-7" onClick={toggleThemeHandler}>
      <Icon
        icon={SwitchThemeIcon}
        className="text-blue-800 hover:text-blue-400 dark:text-gray-50 dark:hover:text-gray-400"
      />
    </button>
  );
}
