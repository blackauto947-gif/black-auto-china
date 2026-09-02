"use client";

import { useEffect, useState } from "react";

type StoredFile = { name: string; size: number; type: string; addedAt: string };

export default function AdminPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("black-auto-stock-3-files");
    if (raw) setFiles(JSON.parse(raw));
  }, []);

  function upload(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type || "файл",
      addedAt: new Date().toLocaleString("ru-RU")
    }))];
    setFiles(next);
    localStorage.setItem("black-auto-stock-3-files", JSON.stringify(next));
  }

  function remove(index: number) {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    localStorage.setItem("black-auto-stock-3-files", JSON.stringify(next));
  }

  return (
    <main className="section">
      <div className="container">
        <div className="eyebrow">Личный кабинет</div>
        <h1 className="pageTitle">Stock 3</h1>
        <div className="adminGrid">
          <section className="panel">
            <div className="muted">Активная папка</div>
            <div className="stock">STOCK 3</div>
            <p className="muted">Добавляйте документы и фотографии. Список сохраняется в браузере и не пропадает после перезагрузки страницы.</p>
            <label className="button" style={{display:"inline-block", marginTop:12}}>
              Добавить файлы
              <input hidden type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" onChange={e => upload(e.target.files)} />
            </label>
          </section>
          <section className="panel">
            <h2>Долгосрочная загрузка</h2>
            {files.length === 0 ? <p className="muted">Файлы пока не добавлены.</p> : (
              <ul className="uploadList">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`}>
                    <b>{file.name}</b> · {Math.max(1, Math.round(file.size / 1024))} КБ · {file.addedAt}
                    <button onClick={() => remove(index)} style={{marginLeft:10}}>Удалить</button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}