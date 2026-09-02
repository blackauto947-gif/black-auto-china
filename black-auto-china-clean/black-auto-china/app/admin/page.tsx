import Link from "next/link";
import { cars } from "@/lib/cars";

export default function AdminPage() {
  return (
    <main className="admin-page">
      <div className="container">
        <div className="admin-top">
          <div>
            <p className="eyebrow">ADMIN PANEL</p>
            <h1>Управление каталогом</h1>
          </div>
          <Link href="/" className="button button-dark">← На главную</Link>
        </div>

        <div className="admin-card">
          <h2>Автомобили</h2>
          <p className="muted">Сейчас в демонстрационном каталоге: {cars.length}</p>

          <div className="admin-list">
            {cars.map((car) => (
              <div className="admin-row" key={car.id}>
                <img src={car.image} alt={car.name} />
                <div>
                  <strong>{car.name}</strong>
                  <span>{car.year} · {car.mileage}</span>
                </div>
                <b>{car.price.toLocaleString("ru-RU")} ₽</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}