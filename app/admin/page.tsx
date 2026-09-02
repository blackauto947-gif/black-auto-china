"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const emptyCar = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  mileage: 0,
  power: 0,
  engine: "",
  transmission: "",
  drive: "",
  body_type: "",
  color: "",
  price_cny: 0,
  status: "available",
  is_published: true,
  description_ru: "",
};

export default function AdminPage() {
  const s = supabase();
  const router = useRouter();

  const [form, setForm] = useState<any>(emptyCar);
  const [cars, setCars] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  function updateField(key: string, value: any) {
    setForm((current: any) => ({
      ...current,
      [key]: value,
    }));
  }

  async function loadData() {
    const [carsResult, settingsResult] = await Promise.all([
      s
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false }),

      s
        .from("settings")
        .select("*")
        .eq("id", 1)
        .single(),
    ]);

    setCars(carsResult.data || []);
    setSettings(settingsResult.data || null);
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data } = await s.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      const adminResult = await s
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (!adminResult.data) {
        router.push("/");
        return;
      }

      await loadData();
    }

    checkAdmin();
  }, []);

  async function saveCar(event: React.FormEvent) {
    event.preventDefault();

    if (!settings) {
      setMessage("Не удалось загрузить настройки");
      return;
    }

    const payload = {
      ...form,
      year: Number(form.year),
      mileage: Number(form.mileage),
      power: Number(form.power),
      price_cny: Number(form.price_cny),

      transport_cny: Number(settings.transport_cny),

      price_rub: Math.round(
        (Number(form.price_cny) + Number(settings.transport_cny)) *
          Number(settings.cny_rub_rate)
      ),
    };

    let carId = editId;

    if (editId) {
      const result = await s
        .from("cars")
        .update(payload)
        .eq("id", editId);

      if (result.error) {
        setMessage(result.error.message);
        return;
      }
    } else {
      const result = await s
        .from("cars")
        .insert(payload)
        .select()
        .single();

      if (result.error) {
        setMessage(result.error.message);
        return;
      }

      carId = result.data.id;
    }

    if (files && carId) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const path =
          `${carId}/${Date.now()}-${i}-${file.name}`;

        const uploadResult = await s.storage
          .from("car-images")
          .upload(path, file);

        if (uploadResult.error) {
          setMessage(uploadResult.error.message);
          return;
        }

        const publicUrl = s.storage
          .from("car-images")
          .getPublicUrl(path)
          .data.publicUrl;

        await s
          .from("car_images")
          .insert({
            car_id: carId,
            image_url: publicUrl,
            position: i,
          });
      }
    }

    setMessage("Автомобиль успешно сохранён");

    setForm(emptyCar);
    setEditId(null);
    setFiles(null);

    await loadData();
  }

  async function saveSettings() {
    if (!settings) return;

    const result = await s
      .from("settings")
      .update({
        cny_rub_rate: Number(settings.cny_rub_rate),
        transport_cny: Number(settings.transport_cny),
      })
      .eq("id", 1);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Настройки успешно сохранены");
  }

  async function deleteCar(id: string) {
    const confirmed = window.confirm(
      "Удалить этот автомобиль?"
    );

    if (!confirmed) return;

    const result = await s
      .from("cars")
      .delete()
      .eq("id", id);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage("Автомобиль удалён");

    await loadData();
  }

  function startEditing(car: any) {
    setEditId(car.id);
    setForm(car);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function logout() {
    await s.auth.signOut();
    router.push("/login");
  }

  const fields = [
    "brand",
    "model",
    "year",
    "mileage",
    "power",
    "engine",
    "transmission",
    "drive",
    "body_type",
    "color",
    "price_cny",
  ];

  return (
    <main className="wrap">

      <div className="top">
        <div>
          <p>УПРАВЛЕНИЕ КАТАЛОГОМ</p>
          <h1>Админ-панель</h1>
        </div>

        <button onClick={logout}>
          Выйти
        </button>
      </div>

      <section className="panel">

        <h2>Курс и доставка</h2>

        <input
          value={settings?.cny_rub_rate || ""}
          onChange={(event) =>
            setSettings({
              ...settings,
              cny_rub_rate: event.target.value,
            })
          }
          placeholder="Курс CNY / RUB"
        />

        <input
          value={settings?.transport_cny || ""}
          onChange={(event) =>
            setSettings({
              ...settings,
              transport_cny: event.target.value,
            })
          }
          placeholder="Доставка CNY"
        />

        <button onClick={saveSettings}>
          Сохранить настройки
        </button>

      </section>

      <section className="panel">

        <h2>
          {editId
            ? "Редактирование автомобиля"
            : "Добавить автомобиль"}
        </h2>

        <form
          onSubmit={saveCar}
          className="form"
        >

          {fields.map((field) => (
            <label key={field}>

              {field}

              <input
                value={form[field] ?? ""}
                onChange={(event) =>
                  updateField(
                    field,
                    event.target.value
                  )
                }
                required={[
                  "brand",
                  "model",
                  "year",
                  "price_cny",
                ].includes(field)}
              />

            </label>
          ))}

          <label className="wide">

            Описание на русском языке

            <textarea
              value={form.description_ru}
              onChange={(event) =>
                updateField(
                  "description_ru",
                  event.target.value
                )
              }
            />

          </label>

          <label className="wide">

            Фотографии автомобиля

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                setFiles(event.target.files)
              }
            />

          </label>

          <label className="wide">

            <input
              type="checkbox"
              checked={form.is_published}
              onChange={(event) =>
                updateField(
                  "is_published",
                  event.target.checked
                )
              }
            />

            {" "}
            Опубликовать автомобиль

          </label>

          <button
            className="wide"
            type="submit"
          >
            Сохранить автомобиль
          </button>

        </form>

      </section>

      <section className="panel">

        <h2>Автомобили</h2>

        {cars.length === 0 && (
          <p>
            Автомобили пока не добавлены.
          </p>
        )}

        {cars.map((car) => (

          <div
            className="row"
            key={car.id}
          >

            <div>

              <b>
                {car.brand} {car.model}
              </b>

              <br />

              <small>
                {car.year}
                {" • "}
                {car.price_rub} ₽
              </small>

            </div>

            <div>

              <button
                onClick={() =>
                  startEditing(car)
                }
              >
                Редактировать
              </button>

              <button
                onClick={() =>
                  deleteCar(car.id)
                }
              >
                Удалить
              </button>

            </div>

          </div>

        ))}

      </section>

      {message && (
        <div className="toast">
          {message}
        </div>
      )}

    </main>
  );
}
