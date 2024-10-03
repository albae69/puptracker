import { PupHistory } from 'types'

export type Type = 'day' | 'week' | 'month' | 'year'

export default function filterByDate(data: PupHistory[], type: Type) {
  const now = new Date()
  const oneWeekAgo = new Date()

  return data.filter((item) => {
    const createdAt = new Date(item.created_at)

    switch (type) {
      case 'day':
        return createdAt.toDateString() === now.toDateString()

      case 'week':
        oneWeekAgo.setDate(now.getDate() - 7)
        return createdAt >= oneWeekAgo && createdAt <= now

      case 'month':
        return (
          createdAt.getMonth() === now.getMonth() &&
          createdAt.getFullYear() === now.getFullYear()
        )

      case 'year':
        return createdAt.getFullYear() === now.getFullYear()

      default:
        return false
    }
  })
}
