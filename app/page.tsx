import Header from "@/components/Header";
import CarCard from "@/components/CarCard";
import { cars } from "@/lib/cars";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <p className="eyebrow">PREMIUM AUTO CATALOG</p>
          <h1>Автомобили из Китая<br />без лишних границ</h1>
          <p>Подбираем автомобили из Китая.<br />Новые автомобили в наличии и под заказ с доставкой.</p>
          <a className="text-link" href="#catalog">Смотреть каталог автомобилей →</a>
        </section>
        <section id="catalog" className="catalog-section">
          <p className="eyebrow">В НАЛИЧИИ И ПОД ЗАКАЗ</p>
          <div className="section-title">
            <h2>Каталог автомобилей</h2>
            <span>{cars.length} автомобиля</span>
          </div>
          <div className="cards">
            {cars.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </section>
      </main>
    </>
  );
}
