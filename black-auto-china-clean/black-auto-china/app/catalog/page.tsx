import Link from "next/link";
import { cars } from "@/lib/cars";
import CarCard from "@/components/CarCard";

export default function CatalogPage() {
  return (
    <main className="catalog-page">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="eyebrow">В НАЛИЧИИ И ПОД ЗАКАЗ</p>
            <h1>Каталог автомобилей</h1>
          </div>
          <Link href="/" className="back-link">← На главную</Link>
        </div>

        <div className="car-grid">
          {cars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </div>
    </main>
  );
}