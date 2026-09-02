import Link from "next/link";
import type { Car } from "@/lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <article className="car-card">
      <Link href={`/car/${car.id}`} className="card-image">
        <img src={car.image} alt={car.name} />
        <span className="photo-badge">{car.photos} фото</span>
      </Link>

      <div className="card-body">
        <h3>{car.name}</h3>
        <p className="car-meta">{car.year} · {car.mileage}</p>
        <p className="card-price">{car.price.toLocaleString("ru-RU")} ₽</p>
        <Link href={`/car/${car.id}`} className="details-link">Подробнее →</Link>
      </div>
    </article>
  );
}