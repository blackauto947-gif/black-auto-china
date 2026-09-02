export type Car = {
  id: string
  slug?: string
  brand: string
  model: string
  name: string
  year: number
  mileage: string
  price: number
  currency: string
  photos: string[]
  image: string
  description?: string
  status?: string
  specs: {
    year: string
    mileage: string
    engine: string
    transmission: string
    drive: string
    bodyType: string
    color: string
  }
}

export const cars: Car[] = [
  {
    id: "1",
    slug: "honda-vezel",
    brand: "Honda",
    model: "Vezel",
    name: "Honda Vezel",
    year: 2026,
    mileage: "0 км",
    price: 3300000,
    currency: "₽",
    photos: ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description: "Новый автомобиль из Китая. В наличии и под заказ.",
    status: "В наличии",
    specs: {
      year: "2026",
      mileage: "0 км",
      engine: "Не указано",
      transmission: "Не указано",
      drive: "Не указано",
      bodyType: "Кроссовер",
      color: "Не указано",
    },
  },
  {
    id: "2",
    slug: "audi-q3",
    brand: "Audi",
    model: "Q3",
    name: "Audi Q3",
    year: 2026,
    mileage: "0 км",
    price: 4150000,
    currency: "₽",
    photos: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"],
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    description: "Новый автомобиль из Китая. В наличии и под заказ.",
    status: "Под заказ",
    specs: {
      year: "2026",
      mileage: "0 км",
      engine: "Не указано",
      transmission: "Не указано",
      drive: "Не указано",
      bodyType: "Кроссовер",
      color: "Не указано",
    },
  },
  {
    id: "3",
    slug: "audi-q5",
    brand: "Audi",
    model: "Q5",
    name: "Audi Q5",
    year: 2026,
    mileage: "0 км",
    price: 5200000,
    currency: "₽",
    photos: ["https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80"],
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    description: "Новый автомобиль из Китая. В наличии и под заказ.",
    status: "В наличии",
    specs: {
      year: "2026",
      mileage: "0 км",
      engine: "Не указано",
      transmission: "Не указано",
      drive: "Не указано",
      bodyType: "Кроссовер",
      color: "Не указано",
    },
  },
]

export const getCarById = (id: string) =>
  cars.find((car) => car.id === id || car.slug === id)

export const getCarBySlug = (slug: string) =>
  cars.find((car) => car.slug === slug)

export const getCar = getCarById

export default cars
