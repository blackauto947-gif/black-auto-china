import CarCard from "../../components/CarCard";
import { cars } from "../../lib/cars";

export default function CatalogPage() {
  return <main className="section"><div className="container"><div className="eyebrow">В наличии и под заказ</div><h1 className="pageTitle">Каталог автомобилей</h1><div className="grid">{cars.map(car => <CarCard key={car.id} car={car} />)}</div></div></main>;
}