// Minimal module shims for third-party packages that may not have
// type declarations available in the environment where this repo is
// being typechecked. These are intentionally permissive to allow the
// project to compile in editors/CI even when node_modules aren't
// installed. If you install the packages, prefer to remove these
// shims so the real types are used.

declare module 'next' {
  const anything: any
  export = anything
}

declare module 'next/font/google' {
  export function Geist(opts?: any): any
  export function Geist_Mono(opts?: any): any
  const _default: any
  export default _default
}

declare module '@vercel/analytics/next' {
  import type React from 'react'
  export const Analytics: React.ComponentType<any>
  export default Analytics
}

// Fallback for react types in case @types/react is missing in the environment.
declare module 'react' {
  // Provide permissive named exports commonly used in the app so import
  // statements like `import { useState, useEffect } from 'react'` succeed.
  export function useState<T = any>(initial?: T | (() => T)):
    [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export function useRef<T = any>(initial?: T): { current: T }
  export function useMemo<T = any>(fn: () => T, deps?: any[]): T
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps?: any[]): T
  export function useId(): string
  export function forwardRef<T = any, P = any>(render: (props: P, ref: any) => any): any
  export function createContext<T = any>(defaultValue?: T | null): { Provider: any; Consumer: any }
  export function useContext<T = any>(context: any): T
  export const Fragment: any
  export const Children: any

  export type KeyboardEvent<T = Element> = any

  export type ReactNode = any
  export type ComponentType<P = any> = any
  // Export ComponentProps so `React.ComponentProps<typeof Foo>` works in the codebase
  export type ComponentProps<T> = any
  export type ComponentPropsWithoutRef<T> = any
  export type ComponentPropsWithRef<T> = any
  export type ElementRef<T> = any
  export type ReactElement<P = any, T extends any = any> = any
  // Minimal CSS properties type used when casting styles in components
  export type CSSProperties = any
  export type MouseEvent<T = Element> = any
  export type KeyboardEvent<T = Element> = any

  const _default: any
  export default _default
}

// Provide minimal React namespace/types so `React.ReactNode` and similar
// references compile even when full `@types/react` isn't installed.
declare namespace React {
  type ReactNode = any
  type PropsWithChildren<T> = T & { children?: ReactNode }
  type ComponentType<P = any> = any
  // ComponentProps utility similar to React's built-in one
  type ComponentProps<T> = T extends ComponentType<infer P> ? P : any
  // Event types
  interface FormEvent<T = Element> {
    preventDefault(): void
    stopPropagation(): void
    target: EventTarget & { value?: any }
    currentTarget: EventTarget & { value?: any }
  }

  interface ChangeEvent<T = Element> extends FormEvent<T> {
    target: EventTarget & { value: any }
  }

  interface KeyboardEvent<T = Element> extends FormEvent<T> {
    key: string
    preventDefault(): void
  }

  // Minimal CSS properties type used when casting styles in components
  type CSSProperties = any
}

// Minimal JSX namespace so TS JSX expressions typecheck when @types/react
// isn't available. These are intentionally permissive and should be removed
// when proper @types/react is installed.
declare namespace JSX {
  type Element = any
  interface ElementClass {}
  interface ElementAttributesProperty {
    props: any
  }
  interface ElementChildrenAttribute {
    children: any
  }
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

declare module 'lucide-react' {
  import type React from 'react'
  export const AlertCircle: React.ComponentType<any>
  export const CheckCircle: React.ComponentType<any>
  export const CreditCard: React.ComponentType<any>
  export const LogOut: React.ComponentType<any>
  export const Users: React.ComponentType<any>
  export const BookOpen: React.ComponentType<any>
  export const Home: React.ComponentType<any>
  export const DollarSign: React.ComponentType<any>
  export const Calendar: React.ComponentType<any>
  export const BarChart3: React.ComponentType<any>
  export const Plus: React.ComponentType<any>
  export const User: React.ComponentType<any>
  export const FileText: React.ComponentType<any>
  export const Award: React.ComponentType<any>
  export const TrendingUp: React.ComponentType<any>
  export const Edit: React.ComponentType<any>
  export const Trash2: React.ComponentType<any>
  export const Search: React.ComponentType<any>
  export const SearchIcon: React.ComponentType<any>
  export const CheckIcon: React.ComponentType<any>
  export const MapPin: React.ComponentType<any>
  export const Clock: React.ComponentType<any>
  export const DoorOpen: React.ComponentType<any>
  export const Mail: React.ComponentType<any>
  export const Phone: React.ComponentType<any>
  export const ChevronDownIcon: React.ComponentType<any>
  export const ChevronLeftIcon: React.ComponentType<any>
  export const ChevronRightIcon: React.ComponentType<any>
  export const ChevronRight: React.ComponentType<any>
  export const MoreHorizontal: React.ComponentType<any>
  export const ArrowLeft: React.ComponentType<any>
  export const ArrowRight: React.ComponentType<any>
  export const Share2: React.ComponentType<any>
  export const MoreHorizontalIcon: React.ComponentType<any>
  export const ChevronUpIcon: React.ComponentType<any>
  export const CircleIcon: React.ComponentType<any>
  export const XIcon: React.ComponentType<any>
  export const X: React.ComponentType<any>
  export const MinusIcon: React.ComponentType<any>
  export const GripVerticalIcon: React.ComponentType<any>
  export const Loader2Icon: React.ComponentType<any>
  export const PanelLeftIcon: React.ComponentType<any>
  const _default: any
  export default _default
}

// Minimal shim for clsx used in the project
declare module 'clsx' {
  export type ClassValue = any
  export function clsx(...inputs: any[]): string
  export default clsx
}

// Minimal shim for tailwind-merge used in the project
declare module 'tailwind-merge' {
  export function twMerge(...classes: any[]): string
  export default twMerge
}

// Minimal global process.env declaration so server-side env access typechecks
declare global {
  var process: {
    env: {
      NEXT_PUBLIC_SITE_URL?: string | undefined
      VERCEL_URL?: string | undefined
      [key: string]: string | undefined
    }
  }
}

declare module 'embla-carousel-react' {
  import type React from 'react'

  // Very small permissive shim for embla-carousel-react used in the project.
  // The real package exports a default hook `useEmblaCarousel` and a UseEmblaCarouselType.
  export default function useEmblaCarousel(options?: any, plugins?: any): [ (el: any) => void, any ]
  export type UseEmblaCarouselType = [ (el: any) => void, any ]
}

declare module 'react-day-picker' {
  import type React from 'react'
  export const DayPicker: React.ComponentType<any>
  export const DayButton: React.ComponentType<any>
  export function getDefaultClassNames(): Record<string, string>
  const _default: any
  export default _default
}

declare module '@radix-ui/react-accordion' {
  import type React from 'react'
  export const Root: React.ComponentType<any>
  export const Item: React.ComponentType<any>
  export const Header: React.ComponentType<any>
  export const Trigger: React.ComponentType<any>
  export const Content: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module '@radix-ui/react-alert-dialog' {
  import type React from 'react'
  export const Root: React.ComponentType<any>
  export const Trigger: React.ComponentType<any>
  export const Portal: React.ComponentType<any>
  export const Overlay: React.ComponentType<any>
  export const Content: React.ComponentType<any>
  export const Title: React.ComponentType<any>
  export const Description: React.ComponentType<any>
  export const Action: React.ComponentType<any>
  export const Cancel: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module '@radix-ui/react-aspect-ratio' {
  import type React from 'react'
  export const Root: React.ComponentType<any>
  export const Item: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module '@radix-ui/react-avatar' {
  import type React from 'react'
  export const Root: React.ComponentType<any>
  export const Image: React.ComponentType<any>
  export const Fallback: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module '@radix-ui/react-slot' {
  import type React from 'react'
  // Minimal shim for Radix Slot. It's a simple passthrough component.
  export const Slot: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module 'recharts' {
  import type React from 'react'
  export const BarChart: React.ComponentType<any>
  export const Bar: React.ComponentType<any>
  export const XAxis: React.ComponentType<any>
  export const YAxis: React.ComponentType<any>
  export const CartesianGrid: React.ComponentType<any>
  export interface TooltipProps {
    active?: boolean
    payload?: any[]
    label?: any
    formatter?: any
  }
  export const Tooltip: React.ComponentType<TooltipProps>
  export const ResponsiveContainer: React.ComponentType<{ children?: React.ReactNode; width?: string | number; height?: string | number }>
  export interface LegendProps {
    payload?: any[]
    verticalAlign?: 'top' | 'bottom' | 'middle'
  }
  export const Legend: React.ComponentType<LegendProps>
  export const PieChart: React.ComponentType<any>
  export const Pie: React.ComponentType<any>
  export const Cell: React.ComponentType<any>
  const _default: any
  export default _default
}

declare module 'class-variance-authority' {
  // Very small shim for cva and VariantProps used in the UI components.
  export function cva(base?: string, options?: any): (...args: any[]) => string
  // permissive VariantProps to avoid strict mapping issues in absence of real types
  export type VariantProps<T = any> = { [key: string]: any }
}
