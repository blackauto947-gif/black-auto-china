import Link from "next/link";
import { notFound } from "next/navigation";
import { cars } from "@/lib/cars";

type Props = { params: { id: string } };

export default function CarPage({ params }: Props) {
  const car = cars.find((item) => item.id === params.id);
  if (!car) notFound();

  return (
    <main className="car-page">
      <div className="container">
        <Link href="/catalog" className="back-link">← Вернуться в каталог</Link>

        <div className="car-detail">
          <div className="car-gallery">
            <img src={car.image} alt={car.name} />
          </div>

          <div className="car-info">
            <p className="eyebrow">{car.brand}</p>
            <h1>{car.name}</h1>
            <p className="car-price">{car.price.toLocaleString("ru-RU")} ₽</p>

            <div className="specs">
              <Spec label="Год выпуска" value={String(car.year)} />
              <Spec label="Пробег" value={car.mileage} />
              <Spec label="Мощность" value={car.power} />
              <Spec label="Двигатель" value={car.engine} />
              <Spec label="Коробка передач" value={car.transmission} />
              <Spec label="Привод" value={car.drive} />
              <Spec label="Тип кузова" value={car.body} />
              <Spec label="Цвет" value={car.color} />
            </div>

            <button className="button button-gold" type="button">Оставить заявку</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}