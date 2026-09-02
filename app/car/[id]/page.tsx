"use client";

import Link from "next/link";
import { useState } from "react";
import { cars, formatPrice } from "../../../lib/cars";

type Props = {
  params: {
    id: string;
  };
};

export default function CarPage({ params }: Props) {
  const car = cars.find((item) => item.id === params.id);

  const [activeImage, setActiveImage] = useState(0);

  if (!car) {
    return (
      <main className="not-found-page">
        <div className="container">
          <h1>Автомобиль не найден</h1>

          <Link href="/car" className="button button-primary">
            ← Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">
            BLACK AUTO CHINA
          </Link>

          <nav className="nav">
            <Link href="/car">Каталог</Link>
            <Link href="/admin">Админ-панель</Link>
          </nav>
        </div>
      </header>

      <section className="car-page">
        <div className="container">
          <Link href="/car" className="back-link">
            ← Вернуться в каталог
          </Link>

          <div className="car-page-title">
            <div>
              <span className="eyebrow">
                {car.brand.toUpperCase()}
              </span>

              <h1>{car.name}</h1>

              <p>
                {car.year} · {car.mileage}
              </p>
            </div>

            <div className="car-page-price">
              {formatPrice(car.price)}
            </div>
          </div>

          <div className="car-layout">
            <div className="gallery">
              <div className="main-image">
                <img
                  src={car.images[activeImage]}
                  alt={car.name}
                />

                <div className="image-counter">
                  {activeImage + 1} / {car.images.length}
                </div>
              </div>

              <div className="thumbnails">
                {car.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={
                      index === activeImage
                        ? "thumbnail active"
                        : "thumbnail"
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${car.name} фото ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <aside className="order-card">
              <span className="eyebrow">
                АВТОМОБИЛЬ ПОД ЗАКАЗ
              </span>

              <h2>{car.name}</h2>

              <div className="order-price">
                {formatPrice(car.price)}
              </div>

              <p>
                Оставьте заявку, и мы свяжемся
                с вами для уточнения всех деталей.
              </p>

              <Link href="/login" className="button button-primary full-button">
                Оставить заявку
              </Link>
            </aside>
          </div>

          <section className="car-details">
            <div className="description-block">
              <span className="eyebrow">
                ОБ АВТОМОБИЛЕ
              </span>

              <h2>Описание</h2>

              <p>{car.description}</p>
            </div>

            <div className="characteristics-block">
              <span className="eyebrow">
                ТЕХНИЧЕСКИЕ ДАННЫЕ
              </span>

              <h2>Характеристики</h2>

              <div className="characteristics-grid">
                {car.characteristics.map((item) => (
                  <div
                    className="characteristic"
                    key={item.label}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
