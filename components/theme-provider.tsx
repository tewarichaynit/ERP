'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider(props: any) {
  const { children, ...rest } = props as any
  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>
}
