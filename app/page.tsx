import Link from "next/link";

const cars = [
  {
    id: "honda-vezel",
    name: "Honda Vezel",
    year: "2026",
    mileage: "0 км",
    price: "330 000",
    image:
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
    photos: 16,
  },
  {
    id: "audi-q3",
    name: "Audi Q3",
    year: "2026",
    mileage: "0 км",
    price: "4 150 000",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    photos: 22,
  },
  {
    id: "audi-q5",
    name: "Audi Q5",
    year: "2026",
    mileage: "0 км",
    price: "5 200 000",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
    photos: 21,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-left">
              <p className="eyebrow">PREMIUM AUTO CATALOG</p>

              <h1>
                Автомобили из Китая
                <br />
                без лишних границ
              </h1>

              <p className="hero-text">
                Подбираем автомобили из Китая. Новые автомобили в наличии
                и под заказ с доставкой.
              </p>

              <div className="hero-buttons">
                <a href="#catalog" className="btn btn-gold">
                  Смотреть каталог
                </a>

                <Link href="/admin" className="btn btn-dark">
                  Админ-панель
                </Link>
              </div>
            </div>

            <div className="hero-card">
              <div className="hero-card-label">BLACK AUTO CHINA</div>

              <div className="hero-card-number">CNY</div>

              <div className="hero-card-text">
                прямой расчет стоимости
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="catalog">
        <div className="container">
          <div className="section-top">
            <div>
              <p className="eyebrow gold">В НАЛИЧИИ И ПОД ЗАКАЗ</p>
              <h2>Каталог автомобилей</h2>
            </div>

            <div className="cars-count">
              {cars.length + 196} автомобилей
            </div>
          </div>

          <div className="cars-grid">
            {cars.map((car) => (
              <Link
                href={`/car/${car.id}`}
                className="car-card"
                key={car.id}
              >
                <div className="car-image-wrap">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="car-image"
                  />

                  <div className="photo-count">
                    {car.photos} фото
                  </div>
                </div>

                <div className="car-info">
                  <h3>{car.name}</h3>

                  <div className="car-meta">
                    {car.year} · {car.mileage}
                  </div>

                  <div className="car-price">
                    {car.price} ₽
                  </div>

                  <div className="car-link">
                    Подробнее →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
