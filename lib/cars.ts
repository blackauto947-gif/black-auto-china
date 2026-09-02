export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: string;
  price: string;
  photos: string[];
  body: string;
  color: string;
  engine: string;
  power: string;
  transmission: string;
  drive: string;
};

export const cars: Car[] = [
  {
    id: "honda-vezel",
    brand: "HONDA",
    model: "Honda Vezel",
    year: 2026,
    mileage: "0 км",
    price: "3 300 000 ₽",
    body: "Кроссовер",
    color: "Черный",
    engine: "Не указано",
    power: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "audi-q3",
    brand: "AUDI",
    model: "Audi Q3",
    year: 2026,
    mileage: "0 км",
    price: "4 150 000 ₽",
    body: "Кроссовер",
    color: "Черный",
    engine: "Не указано",
    power: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=85"
    ]
  },
  {
    id: "audi-q5",
    brand: "AUDI",
    model: "Audi Q5",
    year: 2026,
    mileage: "0 км",
    price: "5 200 000 ₽",
    body: "Кроссовер",
    color: "Черный",
    engine: "Не указано",
    power: "Не указано",
    transmission: "Не указано",
    drive: "Не указано",
    photos: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85"
    ]
  }
];