import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Car = {
  id: string;
  name: string;
  year: number;
  mileage: string;
  price: number;
  images: string[];
  engine?: string;
  transmission?: string;
  drive?: string;
  body?: string;
  color?: string;
};

const cars: Car[] = [
  {
    id: "honda-vezel",
    name: "Honda Vezel",
    year: 2026,
    mileage: "0 км",
    price: 330000,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    ],
    engine: "1.5 л",
    transmission: "Автомат",
    drive: "Передний",
    body: "Кроссовер",
    color: "Белый",
  },

  {
    id: "audi-q3",
    name: "Audi Q3",
    year: 2026,
    mileage: "0 км",
    price: 4150000,
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1600&q=85",
    ],
    engine: "2.0 л",
    transmission: "Автомат",
    drive: "Полный",
    body: "Кроссовер",
    color: "Черный",
  },

  {
    id: "audi-q5",
    name: "Audi Q5",
    year: 2026,
    mileage: "0 км",
    price: 5200000,
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85",
    ],
    engine: "2.0 л",
    transmission: "Автомат",
    drive: "Полный",
    body: "Кроссовер",
    color: "Серый",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export default async function CarPage({ params }: PageProps) {
  const { id } = await params;

  const car = cars.find((item) => item.id === id);

  if (!car) {
    notFound();
  }

  return (
    <main className="car-page">
      <div className="car-container">
        <Link href="/" className="back-link">
          ← Вернуться в каталог
        </Link>

        <div className="car-header">
          <div>
            <p className="car-label">АВТОМОБИЛЬ В НАЛИЧИИ</p>

            <h1>{car.name}</h1>

            <div className="car-meta">
              {car.year} · {car.mileage}
            </div>
          </div>

          <div className="car-price-box">
            <span>Стоимость</span>

            <strong>
              {formatPrice(car.price)} ₽
            </strong>
          </div>
        </div>

        <section className="car-gallery">
          <div className="main-photo">
            <img
              src={car.images[0]}
              alt={car.name}
            />
          </div>

          <div className="gallery-grid">
            {car.images.slice(1).map((image, index) => (
              <div
                className="gallery-photo"
                key={image}
              >
                <img
                  src={image}
                  alt={`${car.name} фото ${index + 2}`}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="car-content">
          <div className="specifications">
            <h2>Характеристики</h2>

            <div className="spec-grid">
              <div className="spec-item">
                <span>Год выпуска</span>
                <strong>{car.year}</strong>
              </div>

              <div className="spec-item">
                <span>Пробег</span>
                <strong>{car.mileage}</strong>
              </div>

              <div className="spec-item">
                <span>Двигатель</span>
                <strong>{car.engine || "Не указано"}</strong>
              </div>

              <div className="spec-item">
                <span>Коробка передач</span>
                <strong>
                  {car.transmission || "Не указано"}
                </strong>
              </div>

              <div className="spec-item">
                <span>Привод</span>
                <strong>{car.drive || "Не указано"}</strong>
              </div>

              <div className="spec-item">
                <span>Тип кузова</span>
                <strong>{car.body || "Не указано"}</strong>
              </div>

              <div className="spec-item">
                <span>Цвет</span>
                <strong>{car.color || "Не указано"}</strong>
              </div>
            </div>
          </div>

          <aside className="request-card">
            <p>Цена автомобиля</p>

            <h2>
              {formatPrice(car.price)} ₽
            </h2>

            <button>
              Оставить заявку
            </button>

            <span>
              Менеджер свяжется с вами для уточнения деталей
            </span>
          </aside>
        </section>
      </div>
    </main>
  );
}
