import Link from "next/link";
import { cars } from "@/lib/cars";
import CarCard from "@/components/CarCard";

export default function HomePage() {
  const featured = cars.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">PREMIUM AUTO CATALOG</p>
          <h1>Автомобили из Китая<br />без лишних границ</h1>
          <p className="hero-text">
            Подбираем автомобили из Китая.<br />
            Новые автомобили в наличии и<br />
            под заказ с доставкой.
          </p>
          <div className="hero-actions">
            <Link href="/catalog" className="button button-gold">Смотреть каталог</Link>
            <Link href="/admin" className="button button-dark">Админ-панель</Link>
          </div>
        </div>
      </section>

      <section className="catalog-preview">
        <div className="container">
          <div className="section-top">
            <div>
              <p className="eyebrow">В НАЛИЧИИ И ПОД ЗАКАЗ</p>
              <h2>Каталог автомобилей</h2>
            </div>
            <div className="count-pill">{cars.length} автомобилей</div>
          </div>

          <div className="car-grid">
            {featured.map((car) => <CarCard key={car.id} car={car} />)}
          </div>

          <div className="center-action">
            <Link href="/catalog" className="button button-gold">Перейти в каталог →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}