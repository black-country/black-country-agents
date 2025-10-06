// utils/date.ts
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export const formatRelativeTime = (date: string | Date): string => {
  const rtf = new Intl.RelativeTimeFormat('en-NG', { numeric: 'auto' })
  const now = new Date()
  const targetDate = new Date(date)
  const diffInDays = Math.floor((targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (Math.abs(diffInDays) < 1) return 'Today'
  if (Math.abs(diffInDays) < 7) return rtf.format(diffInDays, 'day')
  if (Math.abs(diffInDays) < 30) return rtf.format(Math.floor(diffInDays / 7), 'week')
  if (Math.abs(diffInDays) < 365) return rtf.format(Math.floor(diffInDays / 30), 'month')
  return rtf.format(Math.floor(diffInDays / 365), 'year')
}