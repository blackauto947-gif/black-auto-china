"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CarPage() {
  const s = supabase();
  const params = useParams();

  const carId = params.id as string;

  const [car, setCar] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      if (!carId) return;

      setLoading(true);

      const [carResult, imagesResult] =
        await Promise.all([
          s
            .from("cars")
            .select("*")
            .eq("id", carId)
            .eq("is_published", true)
            .single(),

          s
            .from("car_images")
            .select("*")
            .eq("car_id", carId)
            .order("position", {
              ascending: true,
            }),
        ]);

      if (!carResult.error) {
        setCar(carResult.data);
      }

      if (!imagesResult.error) {
        setImages(imagesResult.data || []);
      }

      setLoading(false);
    }

    loadCar();
  }, [carId]);

  if (loading) {
    return (
      <main className="carPage">
        <div className="carLoading">
          Загрузка автомобиля...
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="carPage">
        <div className="carNotFound">

          <h1>
            Автомобиль не найден
          </h1>

          <Link
            href="/"
            className="backButton"
          >
            ← Вернуться в каталог
          </Link>

        </div>
      </main>
    );
  }

  const activeImageUrl =
    images[activeImage]?.image_url;

  return (
    <main className="carPage">

      <div className="carContainer">

        <Link
          href="/"
          className="backButton"
        >
          ← Назад в каталог
        </Link>

        <div className="carHeader">

          <div>

            <p className="carBrand">
              {car.brand}
            </p>

            <h1>
              {car.brand} {car.model}
            </h1>

            <p className="carYear">

              {car.year}

              {car.mileage !== null && (
                <>
                  {" • "}
                  {Number(
                    car.mileage
                  ).toLocaleString("ru-RU")} км
                </>
              )}

            </p>

          </div>

          <div className="carPrice">

            {Number(
              car.price_rub || 0
            ).toLocaleString("ru-RU")} ₽

          </div>

        </div>

        {/* ГАЛЕРЕЯ */}

        <section className="gallery">

          <div className="mainImage">

            {activeImageUrl ? (

              <img
                src={activeImageUrl}
                alt={`${car.brand} ${car.model}`}
              />

            ) : (

              <div className="noImage">
                Нет фотографий
              </div>

            )}

          </div>

          {images.length > 1 && (

            <div className="thumbnails">

              {images.map(
                (image, index) => (

                  <button
                    key={image.id}
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
                      src={image.image_url}
                      alt={`Фото ${index + 1}`}
                    />

                  </button>

                )
              )}

            </div>

          )}

        </section>

        {/* ИНФОРМАЦИЯ */}

        <section className="carInfo">

          <div className="infoBlock">

            <h2>
              Характеристики
            </h2>

            <div className="specs">

              <div>
                <span>Год</span>
                <b>{car.year}</b>
              </div>

              <div>
                <span>Пробег</span>
                <b>
                  {Number(
                    car.mileage || 0
                  ).toLocaleString("ru-RU")} км
                </b>
              </div>

              {car.power && (

                <div>
                  <span>Мощность</span>
                  <b>
                    {car.power} л.с.
                  </b>
                </div>

              )}

              {car.engine && (

                <div>
                  <span>Двигатель</span>
                  <b>
                    {car.engine}
                  </b>
                </div>

              )}

              {car.transmission && (

                <div>
                  <span>Коробка</span>
                  <b>
                    {car.transmission}
                  </b>
                </div>

              )}

              {car.drive && (

                <div>
                  <span>Привод</span>
                  <b>
                    {car.drive}
                  </b>
                </div>

              )}

              {car.body_type && (

                <div>
                  <span>Кузов</span>
                  <b>
                    {car.body_type}
                  </b>
                </div>

              )}

              {car.color && (

                <div>
                  <span>Цвет</span>
                  <b>
                    {car.color}
                  </b>
                </div>

              )}

            </div>

          </div>

          <div className="priceBlock">

            <span>
              Цена автомобиля
            </span>

            <strong>
              {Number(
                car.price_rub || 0
              ).toLocaleString("ru-RU")} ₽
            </strong>

            {car.price_cny > 0 && (

              <small>
                Цена в Китае:{" "}

                {Number(
                  car.price_cny
                ).toLocaleString("ru-RU")} CNY

              </small>

            )}

            <button>
              Оставить заявку
            </button>

          </div>

        </section>

        {/* ОПИСАНИЕ */}

        {car.description_ru && (

          <section className="description">

            <h2>
              Описание автомобиля
            </h2>

            <p>
              {car.description_ru}
            </p>

          </section>

        )}

      </div>

    </main>
  );
}
