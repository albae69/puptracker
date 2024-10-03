export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface PupHistory {
  id: number
  user_id: string
  created_at: string
  description: string
  latitude: string
  longitude: string
  users?: User
}
