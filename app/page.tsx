import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
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
        <div className="container hero-content">
          <div className="hero-text">
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

          <div className="hero-card">
            <div className="hero-card-value">CNY</div>
            <div className="hero-card-text">
              прямой расчет стоимости
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-preview">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                В НАЛИЧИИ И ПОД ЗАКАЗ
              </span>

              <h2>Каталог автомобилей</h2>
            </div>

            <div className="cars-count">
              199 автомобилей
            </div>
          </div>

          <Link href="/car" className="catalog-link">
            Перейти в каталог →
          </Link>
        </div>
      </section>
    </main>
  );
}
