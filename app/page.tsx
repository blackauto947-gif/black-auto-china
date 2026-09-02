import Link from "next/link";
import { cars, formatPrice } from "../lib/cars";

export default function HomePage() {
  const featuredCars = cars.slice(0, 3);

  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            BLACK AUTO CHINA
          </Link>

          <nav className="nav">
            <Link href="/car">Каталог</Link>
            <Link href="/admin">Админ-панель</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">
              PREMIUM AUTO CATALOG
            </span>

            <h1>
              Автомобили из Китая
              <br />
              без лишних границ
            </h1>

            <p>
              Подбираем автомобили из Китая.
              <br />
              Новые автомобили в наличии и
              <br />
              под заказ с доставкой.
            </p>

            <div className="hero-buttons">
              <Link href="/car" className="button button-primary">
                Смотреть каталог
              </Link>

              <Link href="/admin" className="button button-secondary">
                Админ-панель
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-preview">
        <div className="container">
          <div className="section-top">
            <div>
              <span className="eyebrow">
                В НАЛИЧИИ И ПОД ЗАКАЗ
              </span>

              <h2>Каталог автомобилей</h2>
            </div>

            <div className="count-badge">
              199 автомобилей
            </div>
          </div>

          <div className="cars-grid">
            {featuredCars.map((car) => (
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
                  <h3>{car.name}</h3>

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

          <Link
            href="/car"
            className="button button-primary catalog-button"
          >
            Перейти в каталог →
          </Link>
        </div>
      </section>
    </main>
  );
}
