import Link from "next/link";
import { cars, formatPrice } from "../../lib/cars";

export default function CatalogPage() {
  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            BLACK AUTO CHINA
          </Link>

          <nav className="nav">
            <Link href="/">Главная</Link>
            <Link href="/admin">Админ-панель</Link>
          </nav>
        </div>
      </header>

      <section className="catalog-page">
        <div className="container">
          <Link href="/" className="back-link">
            ← Вернуться на главную
          </Link>

          <div className="section-top">
            <div>
              <span className="eyebrow">
                В НАЛИЧИИ И ПОД ЗАКАЗ
              </span>

              <h1>Каталог автомобилей</h1>
            </div>

            <div className="count-badge">
              199 автомобилей
            </div>
          </div>

          <div className="cars-grid">
            {cars.map((car) => (
              <article className="car-card" key={car.id}>
                <Link
                  href={`/car/${car.id}`}
                  className="car-card-image"
                >
                  <img
                    src={car.images[0]}
                    alt={car.name}
                  />

                  <span className="photos-badge">
                    {car.images.length} фото
                  </span>
                </Link>

                <div className="car-card-content">
                  <h2>{car.name}</h2>

                  <p className="car-meta">
                    {car.year} · {car.mileage}
                  </p>

                  <div className="car-price">
                    {formatPrice(car.price)}
                  </div>

                  <Link
                    href={`/car/${car.id}`}
                    className="details-link"
                  >
                    Подробнее →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
