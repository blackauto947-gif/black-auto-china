"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RequestPage() {
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    // Имитация отправки формы
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <main className="request-page">
        <div className="request-container">
          <Link href="/" className="back-link">
            ← На главную
          </Link>

          <div className="success-card">
            <div className="success-icon">✓</div>

            <p className="eyebrow">ЗАЯВКА ОТПРАВЛЕНА</p>

            <h1>Спасибо за заявку!</h1>

            <p className="success-text">
              Мы получили вашу заявку. Наш менеджер свяжется с вами в ближайшее
              время.
            </p>

            <div className="success-buttons">
              <Link href="/catalog" className="primary-button">
                Вернуться в каталог
              </Link>

              <Link href="/" className="secondary-button">
                На главную
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="request-page">
      <div className="request-container">
        <Link href="/catalog" className="back-link">
          ← Вернуться в каталог
        </Link>

        <div className="request-header">
          <p className="eyebrow">ПОМОЖЕМ С ПОКУПКОЙ</p>

          <h1>Оставить заявку</h1>

          <p>
            Оставьте свои контакты, и мы поможем подобрать автомобиль,
            рассчитаем стоимость и расскажем о доставке.
          </p>
        </div>

        <div className="request-layout">
          <section className="form-card">
            <h2>Ваши контакты</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ваше имя</label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="car">Интересующий автомобиль</label>

                <select id="car" name="car" defaultValue="">
                  <option value="" disabled>
                    Выберите автомобиль
                  </option>

                  <option value="Honda Vezel">Honda Vezel</option>
                  <option value="Audi Q3">Audi Q3</option>
                  <option value="Audi Q5">Audi Q5</option>
                  <option value="Другое">Другой автомобиль</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Комментарий</label>

                <textarea
                  id="message"
                  name="message"
                  placeholder="Например: хочу узнать стоимость доставки"
                  rows={5}
                />
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
              </button>

              <p className="form-note">
                Нажимая кнопку, вы соглашаетесь на обработку персональных
                данных.
              </p>
            </form>
          </section>

          <aside className="info-card">
            <p className="eyebrow">КАК ЭТО РАБОТАЕТ</p>

            <h2>После отправки заявки</h2>

            <div className="steps">
              <div className="step">
                <span>01</span>

                <div>
                  <h3>Получаем заявку</h3>

                  <p>
                    Наш менеджер получает информацию о вашем запросе.
                  </p>
                </div>
              </div>

              <div className="step">
                <span>02</span>

                <div>
                  <h3>Связываемся с вами</h3>

                  <p>
                    Уточняем пожелания и отвечаем на ваши вопросы.
                  </p>
                </div>
              </div>

              <div className="step">
                <span>03</span>

                <div>
                  <h3>Подбираем автомобиль</h3>

                  <p>
                    Предлагаем подходящие варианты и рассчитываем стоимость.
                  </p>
                </div>
              </div>
            </div>

            <div className="info-contact">
              <p>Нужна консультация?</p>

              <a href="tel:+79084590218">
                +7 (908) 459-02-18
              </a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
