import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { getCar, formatPrice } from "@/lib/cars";
import RequestForm from "@/components/RequestForm";

export default function RequestPage({ params }: { params: { id: string } }) {
  const car = getCar(params.id);
  if (!car) notFound();

  return (
    <>
      <Header />
      <main className="page request-page">
        <div className="request-grid">
          <section>
            <p className="eyebrow">ЗАЯВКА НА АВТОМОБИЛЬ</p>
            <h1>Оставить заявку</h1>
            <p className="lead">Оставьте контакты, и мы свяжемся с вами по автомобилю {car.model}.</p>
            <div className="selected-car">
              <img src={car.photos[0]} alt={`${car.model} — двигатель и кузов`} />
              <div><span>{car.brand}</span><h2>{car.model}</h2><b>{formatPrice(car.price)}</b></div>
            </div>
          </section>
          <RequestForm carName={car.model} />
        </div>
      </main>
    </>
  );
}
