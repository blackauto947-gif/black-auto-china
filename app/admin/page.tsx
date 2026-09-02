"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type Upload = { name: string; size: number; type: string; addedAt: string };

export default function AdminPage() {
  const [files, setFiles] = useState<Upload[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFiles(JSON.parse(localStorage.getItem("black-auto-china-stock-3") || "[]"));
  }, []);

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const next = [...files, ...Array.from(list).map((f) => ({
      name: f.name, size: f.size, type: f.type, addedAt: new Date().toLocaleString("ru-RU")
    }))];
    setFiles(next);
    localStorage.setItem("black-auto-china-stock-3", JSON.stringify(next));
    setMessage(`Добавлено файлов: ${list.length}. Папка STOCK 3 сохранена в браузере.`);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    localStorage.setItem("black-auto-china-stock-3", JSON.stringify(next));
  }

  return (
    <>
      <Header />
      <main className="page admin-page">
        <p className="eyebrow">ЛИЧНЫЙ КАБИНЕТ</p>
        <h1>Управление автомобилями</h1>
        <div className="admin-nav">
          <Link href="/admin" className="active">📁 STOCK 3</Link>
          <Link href="/catalog">Открыть каталог</Link>
        </div>

        <section className="upload-panel">
          <h2>Папка STOCK 3</h2>
          <p>Выберите файлы для добавления. Список загрузок сохраняется между перезапусками страницы.</p>
          <label className="upload-button">
            Выбрать и добавить файлы
            <input type="file" multiple accept="image/*,.pdf,.doc,.docx,.xlsx,.csv" onChange={(e) => addFiles(e.target.files)} />
          </label>
          {message && <p className="upload-message">{message}</p>}
          <div className="file-list">
            {files.length === 0 ? <p>Папка STOCK 3 пока пустая.</p> : files.map((file, i) => (
              <div className="file-row" key={`${file.name}-${i}`}>
                <div><b>{file.name}</b><span>{file.addedAt} · {Math.ceil(file.size / 1024)} КБ</span></div>
                <button onClick={() => removeFile(i)}>Удалить</button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-tip">
          <h2>Важно</h2>
          <p>В этом готовом варианте список загрузок хранится локально в браузере, поэтому проект собирается без ошибок и без обязательных ключей. Для настоящего постоянного хранения файлов на сервере позже можно подключить Supabase Storage.</p>
        </section>
      </main>
    </>
  );
}
