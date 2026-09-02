import Link from "next/link";
import { cars, formatPrice } from "../../lib/cars";

export default function AdminPage() {
  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            BLACK AUTO CHINA
          </Link>

          <nav className="nav">
            <Link href="/">Главная</Link>
            <Link href="/car">Каталог</Link>
          </nav>
        </div>
      </header>

      <section className="admin-page">
        <div className="container">
          <span className="eyebrow">
            УПРАВЛЕНИЕ КАТАЛОГОМ
          </span>

          <h1>Админ-панель</h1>

          <div className="admin-stats">
            <div className="stat-card">
              <span>Автомобилей</span>
              <strong>{cars.length}</strong>
            </div>

            <div className="stat-card">
              <span>Статус</span>
              <strong>Активен</strong>
            </div>

            <div className="stat-card">
              <span>Каталог</span>
              <strong>Online</strong>
            </div>
          </div>

          <div className="admin-list">
            <h2>Автомобили</h2>

            {cars.map((car) => (
              <div className="admin-car" key={car.id}>
                <div className="admin-car-info">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                  />

                  <div>
                    <h3>{car.name}</h3>

                    <p>
                      {car.year} · {car.mileage}
                    </p>
                  </div>
                </div>

                <strong>
                  {formatPrice(car.price)}
                </strong>

                <Link
                  href={`/car/${car.id}`}
                  className="details-link"
                >
                  Открыть →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
