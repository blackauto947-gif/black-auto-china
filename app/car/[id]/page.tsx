import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { cars, formatPrice, getCar } from "@/lib/cars";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default function CarPage({ params }: { params: { id: string } }) {
  const car = getCar(params.id);
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
    <>
      <Header />
      <main className="page car-page">
        <Link className="back" href="/catalog">← Вернуться в каталог</Link>
        <div className="car-detail">
          <div className="gallery">
            <img className="main-photo" src={car.photos[0]} alt={`${car.model} — двигатель и кузов`} />
            <div className="thumbs">
              {car.photos.map((photo, i) => <img key={photo} src={photo} alt={`${car.model} фото ${i + 1}`} />)}
            </div>
          </div>
          <section className="detail-info">
            <p className="eyebrow">{car.brand}</p>
            <h1>{car.model}</h1>
            <div className="price">{formatPrice(car.price)}</div>
            <div className="specs">
              {specs.map(([label, value]) => (
                <div className="spec" key={label}><span>{label}</span><b>{value}</b></div>
              ))}
            </div>
            <Link href={`/car/${car.id}/request`} className="gold-button">Оставить заявку</Link>
          </section>
        </div>
      </main>
    </>
  );
}
