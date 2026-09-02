export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: number;
  body: string;
  color: string;
  power: string;
  engine: string;
  transmission: string;
  drive: string;
  photos: string[];
};

export const cars: Car[] = [
  {
    id: "honda-vezel",
    brand: "HONDA",
    model: "Honda Vezel",
    year: 2026,
    mileage: "0 км",
    price: 3300000,
    body: "Кроссовер",
    color: "Чёрный",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "audi-q3",
    brand: "AUDI",
    model: "Audi Q3",
    year: 2026,
    mileage: "0 км",
    price: 4150000,
    body: "Кроссовер",
    color: "Чёрный",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "audi-q5",
    brand: "AUDI",
    model: "Audi Q5",
    year: 2026,
    mileage: "0 км",
    price: 5200000,
    body: "Кроссовер",
    color: "Чёрный",
    power: "Не указано",
    engine: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=85"
    ]
  }
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export const getCar = (id: string) => cars.find((car) => car.id === id);
