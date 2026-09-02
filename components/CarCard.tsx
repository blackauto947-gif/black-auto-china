import Link from "next/link";
import { Car } from "../lib/cars";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link href={`/car/${car.id}`} className="card">
      <img className="photo" src={car.photos[0]} alt={car.model} />
      <div className="cardBody">
        <span className="badge">{car.photos.length} фото</span>
        <h2>{car.model}</h2>
        <div className="muted">{car.year} · {car.mileage}</div>
        <div className="price">{car.price}</div>
        <b>Подробнее →</b>
      </div>
    </Link>
  );
}