import Header from "@/components/Header";
import CarCard from "@/components/CarCard";
import { cars } from "@/lib/cars";

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="page">
        <p className="eyebrow">В НАЛИЧИИ И ПОД ЗАКАЗ</p>
        <h1>Каталог автомобилей</h1>
        <div className="cards">{cars.map((car) => <CarCard key={car.id} car={car} />)}</div>
      </main>
    </>
  );
}
