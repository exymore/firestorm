'use client';
import React, { createContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  isDarkTheme: false,
  toggleThemeHandler: () => {},
});

export const ThemeContextProvider = (props: React.PropsWithChildren) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem('isDarkTheme');
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem('isDarkTheme', `true`);
      document.querySelector('body')?.classList?.add('dark');
      setIsDarkTheme(true);
    } else {
      const isDarkTheme: boolean = JSON.parse(
        localStorage.getItem('isDarkTheme')!,
      );
      isDarkTheme && document.querySelector('body')?.classList?.add('dark');
      setIsDarkTheme(() => {
        return isDarkTheme;
      });
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem('isDarkTheme')!,
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  }

  function toggleDarkClassToBody(): void {
    document.querySelector('body')?.classList?.toggle('dark');
  }

  function setValueToLocalStorage(): void {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  }

  return (
    <ThemeContext.Provider
      value={{ isDarkTheme: isDarkTheme, toggleThemeHandler }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
