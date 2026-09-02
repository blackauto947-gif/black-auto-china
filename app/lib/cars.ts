export type Car = {
  id: string;
  name: string;
  year: number;
  mileage: string;
  price: number;
  brand: string;
  description: string;
  images: string[];
  characteristics: {
    label: string;
    value: string;
  }[];
};

export const cars: Car[] = [
  {
    id: "honda-vezel",
    name: "Honda Vezel",
    brand: "Honda",
    year: 2026,
    mileage: "0 км",
    price: 3300000,
    description:
      "Новый Honda Vezel из Китая. Автомобиль в наличии и доступен под заказ с доставкой.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=90",
    ],
    characteristics: [
      { label: "Год выпуска", value: "2026" },
      { label: "Пробег", value: "0 км" },
      { label: "Мощность", value: "Не указано" },
      { label: "Двигатель", value: "Не указано" },
      { label: "Коробка передач", value: "Не указано" },
      { label: "Привод", value: "Не указано" },
      { label: "Тип кузова", value: "Кроссовер" },
      { label: "Цвет", value: "Не указано" },
    ],
  },

  {
    id: "audi-q3",
    name: "Audi Q3",
    brand: "Audi",
    year: 2026,
    mileage: "0 км",
    price: 4150000,
    description:
      "Новый Audi Q3. Автомобиль доступен для заказа и поставки из Китая.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=90",
    ],
    characteristics: [
      { label: "Год выпуска", value: "2026" },
      { label: "Пробег", value: "0 км" },
      { label: "Мощность", value: "Не указано" },
      { label: "Двигатель", value: "Бензин" },
      { label: "Коробка передач", value: "Автомат" },
      { label: "Привод", value: "Полный" },
      { label: "Тип кузова", value: "Кроссовер" },
      { label: "Цвет", value: "Черный" },
    ],
  },

  {
    id: "audi-q5",
    name: "Audi Q5",
    brand: "Audi",
    year: 2026,
    mileage: "0 км",
    price: 5200000,
    description:
      "Новый Audi Q5 с современным оснащением. Поставка автомобиля из Китая.",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=90",
    ],
    characteristics: [
      { label: "Год выпуска", value: "2026" },
      { label: "Пробег", value: "0 км" },
      { label: "Мощность", value: "Не указано" },
      { label: "Двигатель", value: "Бензин" },
      { label: "Коробка передач", value: "Автомат" },
      { label: "Привод", value: "Полный" },
      { label: "Тип кузова", value: "Кроссовер" },
      { label: "Цвет", value: "Серый" },
    ],
  },
];

export function getCarById(id: string) {
  return cars.find((car) => car.id === id);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}
