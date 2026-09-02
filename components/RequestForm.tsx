"use client";

import { useState } from "react";

export default function RequestForm({ carName }: { carName: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const request = {
      car: carName,
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      comment: String(form.get("comment") || ""),
      createdAt: new Date().toISOString()
    };

    if (!request.name || !request.phone) {
      setError("Заполните имя и телефон.");
      return;
    }

    const key = "black-auto-china-requests";
    const old = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([request, ...old]));
    setDone(true);
    setError("");
  }

  if (done) return <div className="success-box"><h2>Заявка отправлена</h2><p>Мы получили вашу заявку и свяжемся с вами по телефону.</p><a href="tel:89084590218">Позвонить: 8 908 459-02-18</a></div>;

  return (
    <form className="request-form" onSubmit={submit}>
      <label>Ваше имя<input name="name" placeholder="Иван" /></label>
      <label>Телефон<input name="phone" placeholder="+7 900 000-00-00" /></label>
      <label>Комментарий<textarea name="comment" rows={5} placeholder="Напишите удобное время для связи" /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="gold-button" type="submit">Отправить заявку</button>
      <small>Телефон для связи: 8 908 459-02-18</small>
    </form>
  );
}
