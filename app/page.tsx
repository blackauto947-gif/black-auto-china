import Link from "next/link";
import CarCard from "../components/CarCard";
import { cars } from "../lib/cars";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">Premium Auto Catalog</div>
          <h1>Автомобили из Китая<br />без лишних границ</h1>
          <p>Подберём автомобиль в наличии и под заказ. Прозрачная цена, сопровождение и доставка.</p>
          <div className="heroActions">
            <Link href="/catalog" className="button">Смотреть каталог</Link>
            <Link href="/request" className="button secondary">Оставить заявку</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="eyebrow">В наличии и под заказ</div>
          <h2 className="sectionTitle">Каталог автомобилей</h2>
          <div className="grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div>
        </div>
      </section>
    </main>
  );
}