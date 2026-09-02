import Link from "next/link";
import { notFound } from "next/navigation";
import { cars } from "../../../lib/cars";

export function generateStaticParams() {
  return cars.map(car => ({ id: car.id }));
}

export default function CarPage({ params }: { params: { id: string } }) {
  const car = cars.find(item => item.id === params.id);
  if (!car) notFound();

  const specs = [
    ["Год выпуска", String(car.year)],
    ["Пробег", car.mileage],
    ["Мощность", car.power],
    ["Двигатель", car.engine],
    ["Коробка передач", car.transmission],
    ["Привод", car.drive],
    ["Тип кузова", car.body],
    ["Цвет", car.color]
  ];

  return (
    <main className="container detail">
      <section>
        <Link href="/catalog" className="muted">← Вернуться в каталог</Link>
        <img className="detailImage" src={car.photos[0]} alt={car.model} />
      </section>
      <section>
        <div className="eyebrow">{car.brand}</div>
        <h1 className="pageTitle">{car.model}</h1>
        <div className="price">{car.price}</div>
        <div className="specs">{specs.map(([k,v]) => <div className="spec" key={k}><span className="muted">{k}</span><b>{v}</b></div>)}</div>
        <Link href={`/request?car=${encodeURIComponent(car.model)}`} className="button">Оставить заявку</Link>
      </section>
    </main>
  );
}