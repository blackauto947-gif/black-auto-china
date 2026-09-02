import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function formatPrice(price: number | null) {
  if (!price) return "Цена по запросу";

  return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
}

export default async function HomePage() {
  const s = supabase();

  const { data: cars, error } = await s
    .from("cars")
    .select(`
      *,
      car_images (
        id,
        image_url,
        position
      )
    `)
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
  }

  const carList = cars || [];

  return (
    <main className="home">
      {/* HERO */}

      <section className="hero">
        <div className="container heroContent">
          <div className="heroText">
            <p className="eyebrow">
              PREMIUM AUTO CATALOG
            </p>

            <h1>
              Автомобили из Китая
              <br />
              без лишних границ
            </h1>

            <p className="heroDescription">
              Подбираем автомобили из Китая.
              Новые автомобили в наличии
              и под заказ с доставкой.
            </p>

            <div className="heroButtons">
              <a
                href="#catalog"
                className="button buttonPrimary"
              >
                Смотреть каталог
              </a>

              <Link
                href="/admin"
                className="button buttonSecondary"
              >
                Админ-панель
              </Link>
            </div>
          </div>

          <div className="heroStats">
            <div className="statCard">
              <strong>
                {carList.length}+
              </strong>

              <span>
                автомобилей
              </span>
            </div>

            <div className="statCard">
              <strong>
                2026
              </strong>

              <span>
                актуальные модели
              </span>
            </div>

            <div className="statCard">
              <strong>
                CNY
              </strong>

              <span>
                прямой расчет стоимости
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}

      <section
        id="catalog"
        className="catalogSection"
      >
        <div className="container">
          <div className="sectionHeader">
            <div>
              <p className="eyebrow">
                В НАЛИЧИИ И ПОД ЗАКАЗ
              </p>

              <h2>
                Каталог автомобилей
              </h2>
            </div>

            <span className="carsCount">
              {carList.length} автомобилей
            </span>
          </div>

          {carList.length === 0 && (
            <div className="emptyState">
              <h3>
                Автомобили пока не добавлены
              </h3>

              <p>
                Добавьте автомобили
                через админ-панель.
              </p>
            </div>
          )}

          {carList.length > 0 && (
            <div className="carsGrid">
              {carList.map((car: any) => {
                const images = Array.isArray(
                  car.car_images
                )
                  ? [...car.car_images].sort(
                      (a: any, b: any) =>
                        (a.position ?? 0) -
                        (b.position ?? 0)
                    )
                  : [];

                const firstImage =
                  images[0]?.image_url;

                return (
                  <Link
                    key={car.id}
                    href={`/car/${car.id}`}
                    className="carCard"
                  >
                    <div className="carImageWrapper">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={`${car.brand} ${car.model}`}
                          className="carImage"
                        />
                      ) : (
                        <div className="noImage">
                          Нет фотографии
                        </div>
                      )}

                      <div className="imageGradient" />

                      <div className="imageBadge">
                        {images.length > 0
                          ? `${images.length} фото`
                          : "Без фото"}
                      </div>
                    </div>

                    <div className="carInfo">
                      <h3>
                        {car.brand || "Не указано"}{" "}
                        {car.model || ""}
                      </h3>

                      <div className="carMeta">
                        <span>
                          {car.year || "—"}
                        </span>

                        <span>•</span>

                        <span>
                          {new Intl.NumberFormat(
                            "ru-RU"
                          ).format(
                            Number(car.mileage) || 0
                          )}{" "}
                          км
                        </span>
                      </div>

                      <div className="carBottom">
                        <div>
                          <p className="priceLabel">
                            Стоимость
                          </p>

                          <strong className="carPrice">
                            {formatPrice(
                              car.price_rub
                            )}
                          </strong>
                        </div>

                        <div className="arrowButton">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ADVANTAGES */}

      <section className="advantagesSection">
        <div className="container">
          <div className="advantagesGrid">
            <div className="advantage">
              <span className="advantageNumber">
                01
              </span>

              <h3>
                Автомобили из Китая
              </h3>

              <p>
                Подбор новых автомобилей
                напрямую с китайского рынка.
              </p>
            </div>

            <div className="advantage">
              <span className="advantageNumber">
                02
              </span>

              <h3>
                Прозрачная стоимость
              </h3>

              <p>
                Цена рассчитывается с учетом
                доставки и актуального курса.
              </p>
            </div>

            <div className="advantage">
              <span className="advantageNumber">
                03
              </span>

              <h3>
                Полное сопровождение
              </h3>

              <p>
                Помогаем на всех этапах
                покупки и доставки автомобиля.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
