export interface Product {
  id: number
  name: string
  category: 'woman' | 'man' | 'accessories'
  price: number
  originalPrice: number | null
  image: string
  images?: string[]
  badge: 'new' | 'sale' | null
  new: boolean
  description?: string
  sizes?: string[]
  colors?: { name: string; hex: string }[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Collection {
  id: string
  title: string
  image: string
  link: string
}
