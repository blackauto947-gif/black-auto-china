import Link from "next/link";
import type { Car } from "@/lib/cars";
import { formatPrice } from "@/lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <article className="car-card">
      <Link href={`/car/${car.id}`} className="photo-wrap">
        <img src={car.photos[0]} alt={`${car.model} — фото двигателя и кузова`} />
        <span>{car.photos.length} фото</span>
      </Link>
      <div className="car-info">
        <h2>{car.model}</h2>
        <p>{car.year} · {car.mileage}</p>
        <strong>{formatPrice(car.price)}</strong>
        <Link href={`/car/${car.id}`}>Подробнее →</Link>
      </div>
    </article>
  );
}
