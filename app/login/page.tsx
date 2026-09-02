import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <section className="form-page">
        <div className="form-card">
          <Link href="/" className="logo">
            BLACK AUTO CHINA
          </Link>

          <span className="eyebrow">
            ОСТАВИТЬ ЗАЯВКУ
          </span>

          <h1>Мы свяжемся с вами</h1>

          <p>
            Оставьте контакты, и мы расскажем
            подробнее об автомобиле.
          </p>

          <form className="contact-form">
            <input
              type="text"
              placeholder="Ваше имя"
            />

            <input
              type="tel"
              placeholder="Телефон"
            />

            <textarea
              placeholder="Комментарий"
              rows={5}
            />

            <button
              type="submit"
              className="button button-primary full-button"
            >
              Отправить заявку
            </button>
          </form>

          <Link href="/car" className="back-link">
            ← Вернуться в каталог
          </Link>
        </div>
      </section>
    </main>
  );
}
