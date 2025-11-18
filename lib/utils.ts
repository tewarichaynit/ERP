import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buildAbsoluteUrl(path = '') {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== 'undefined' && window.location.origin) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  const base = String(site).replace(/\/$/, '')
  const p = String(path || '').replace(/^\//, '')
  return `${base}/${p}`
}
