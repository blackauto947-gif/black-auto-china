export type Car = {
  id: string;
  name: string;
  brand: string;
  year: number;
  mileage: string;
  price: number;
  photos: number;
  image: string;
  power: string;
  engine: string;
  transmission: string;
  drive: string;
  body: string;
  color: string;
};

export const cars: Car[] = [
  {
    id: "honda-vezel",
    name: "Honda Vezel",
    brand: "HONDA",
    year: 2026,
    mileage: "0 км",
    price: 3300000,
    photos: 16,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    body: "Кроссовер",
    color: "Голубой",
  },
  {
    id: "audi-q3",
    name: "Audi Q3",
    brand: "AUDI",
    year: 2026,
    mileage: "0 км",
    price: 4150000,
    photos: 22,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    body: "Кроссовер",
    color: "Черный",
  },
  {
    id: "audi-q5",
    name: "Audi Q5",
    brand: "AUDI",
    year: 2026,
    mileage: "0 км",
    price: 5200000,
    photos: 21,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    body: "Кроссовер",
    color: "Белый",
  },
];