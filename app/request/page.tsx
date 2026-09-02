"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RequestPage() {
  const searchParams = useSearchParams();
  const car = searchParams.get("car") || "";
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <main className="section">
      <div className="container">
        <div className="eyebrow">Связь с нами</div>
        <h1 className="pageTitle">Оставить заявку</h1>
        <form className="form" onSubmit={submit}>
          <div className="field"><label>Ваше имя</label><input required name="name" placeholder="Имя" /></div>
          <div className="field"><label>Телефон</label><input required name="phone" type="tel" placeholder="+7..." /></div>
          <div className="field"><label>Автомобиль</label><input name="car" defaultValue={car} placeholder="Например, Audi Q3" /></div>
          <div className="field"><label>Комментарий</label><textarea name="comment" rows={5} placeholder="Напишите ваши пожелания" /></div>
          <button className="button" type="submit">Отправить заявку</button>
          {sent && <div className="success">Заявка принята. Мы свяжемся с вами по телефону 89084590218.</div>}
        </form>
      </div>
    </main>
  );
}