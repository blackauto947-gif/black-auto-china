"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  power: number;
  engine: string;
  transmission: string;
  drive: string;
  body_type: string;
  color: string;
  price_cny: number;
  price_rub: number;
  description_ru: string;
};

type CarImage = {
  id: string;
  image_url: string;
  position: number;
};

export default function CarPage({
  params,
}: {
  params: { id: string };
}) {
  const s = supabase();

  const [car, setCar] = useState<Car | null>(null);
  const [images, setImages] = useState<CarImage[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      setLoading(true);

      const carResult = await s
        .from("cars")
        .select("*")
        .eq("id", params.id)
        .single();

      if (carResult.error || !carResult.data) {
        setCar(null);
        setLoading(false);
        return;
      }

      setCar(carResult.data);

      const imagesResult = await s
        .from("car_images")
        .select("*")
        .eq("car_id", params.id)
        .order("position", {
          ascending: true,
        });

      setImages(imagesResult.data || []);

      setLoading(false);
    }

    loadCar();
  }, [params.id]);

  if (loading) {
    return (
      <main className="wrap car-page">
        <p>Загрузка автомобиля...</p>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="wrap car-page">
        <h1>Автомобиль не найден</h1>

        <Link
          href="/"
          className="back-link"
        >
          ← Вернуться в каталог
        </Link>
      </main>
    );
  }

  const specs = [
    {
      label: "Год выпуска",
      value: car.year || "Не указано",
    },
    {
      label: "Пробег",
      value: car.mileage
        ? `${car.mileage.toLocaleString()} км`
        : "Не указано",
    },
    {
      label: "Мощность",
      value: car.power
        ? `${car.power} л.с.`
        : "Не указано",
    },
    {
      label: "Двигатель",
      value: car.engine || "Не указано",
    },
    {
      label: "Коробка передач",
      value:
        car.transmission ||
        "Не указано",
    },
    {
      label: "Привод",
      value: car.drive || "Не указано",
    },
    {
      label: "Тип кузова",
      value:
        car.body_type ||
        "Не указано",
    },
    {
      label: "Цвет",
      value: car.color || "Не указано",
    },
  ];

  return (
    <main className="wrap car-page">

      <Link
        href="/"
        className="back-link"
      >
        ← Назад в каталог
      </Link>

      <h1 className="car-title">
        {car.brand} {car.model}
      </h1>

      <p className="car-subtitle">
        {car.year} •{" "}
        {car.mileage
          ? `${car.mileage.toLocaleString()} км`
          : "Пробег не указан"}
      </p>

      <section className="car-gallery">

        <div className="main-image">

          {images.length > 0 ? (

            <img
              src={
                images[
                  activeImage
                ]?.image_url
              }
              alt={`${car.brand} ${car.model}`}
            />

          ) : (

            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              Фотографии отсутствуют
            </div>

          )}

        </div>

        {images.length > 1 && (

          <div className="thumbnails">

            {images.map(
              (image, index) => (

                <button
                  key={image.id}
                  type="button"
                  className={
                    index === activeImage
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() =>
                    setActiveImage(index)
                  }
                >

                  <img
                    src={
                      image.image_url
                    }
                    alt={`${car.brand} ${index + 1}`}
                  />

                </button>

              )
            )}

          </div>

        )}

      </section>

      <section className="car-info-grid">

        <div>

          <div className="car-details">

            <h2>
              Характеристики
            </h2>

            <div className="specs">

              {specs.map((spec) => (

                <div
                  className="spec"
                  key={spec.label}
                >

                  <div className="spec-label">
                    {spec.label}
                  </div>

                  <div className="spec-value">
                    {spec.value}
                  </div>

                </div>

              ))}

            </div>

          </div>

          {car.description_ru && (

            <div className="car-details description">

              <h2>
                Описание
              </h2>

              <p>
                {car.description_ru}
              </p>

            </div>

          )}

        </div>

        <aside className="price-card">

          <div className="price-label">
            Цена автомобиля
          </div>

          <div className="price">

            {Number(
              car.price_rub
            ).toLocaleString("ru-RU")} ₽

          </div>

          {car.price_cny > 0 && (

            <p
              style={{
                color: "#999",
                marginBottom: "25px",
              }}
            >

              Цена в Китае:{" "}

              {Number(
                car.price_cny
              ).toLocaleString(
                "ru-RU"
              )} ¥

            </p>

          )}

          <button
            className="buy-button"
            type="button"
            onClick={() => {
              alert(
                "Оставьте заявку, и мы свяжемся с вами."
              );
            }}
          >
            Оставить заявку
          </button>

        </aside>

      </section>

    </main>
  );
}
