import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>Автомобиль не найден</h1>
        <p>Возможно, ссылка устарела или автомобиля больше нет в каталоге.</p>
        <Link href="/catalog" className="button button-gold">← Вернуться в каталог</Link>
      </div>
    </main>
  );
}