"use client";

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </>
  );
};

export default Providers;