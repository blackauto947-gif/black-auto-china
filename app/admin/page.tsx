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

  const [form, setForm] = useState<any>({ ...emptyCar });
  const [cars, setCars] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(false);

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
        .order("created_at", {
          ascending: false,
        }),

      s
        .from("settings")
        .select("*")
        .eq("id", 1)
        .single(),
    ]);

    if (carsResult.error) {
      setMessage(
        `Ошибка загрузки автомобилей: ${carsResult.error.message}`
      );
    } else {
      setCars(carsResult.data || []);
    }

    if (settingsResult.error) {
      setMessage(
        `Ошибка загрузки настроек: ${settingsResult.error.message}`
      );
    } else {
      setSettings(settingsResult.data || null);
    }
  }

  useEffect(() => {
    async function checkAdmin() {
      const { data, error } =
        await s.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      const adminResult = await s
        .from("admin_users")
        .select("user_id")
        .eq("user_id", data.user.id)
        .maybeSingle();

      if (
        adminResult.error ||
        !adminResult.data
      ) {
        router.push("/");
        return;
      }

      await loadData();
    }

    checkAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    Создаём SHA-256 хэш файла.

    Одинаковые файлы будут иметь
    одинаковый хэш.
  */
  async function getFileHash(file: File) {
    const buffer =
      await file.arrayBuffer();

    const hashBuffer =
      await crypto.subtle.digest(
        "SHA-256",
        buffer
      );

    const hashArray = Array.from(
      new Uint8Array(hashBuffer)
    );

    return hashArray
      .map((byte) =>
        byte
          .toString(16)
          .padStart(2, "0")
      )
      .join("");
  }

  /*
    Убираем дубликаты файлов.

    Если два файла имеют одинаковое
    содержимое — останется только один.
  */
  async function removeDuplicateFiles(
    imageFiles: File[]
  ) {
    const uniqueFiles: File[] = [];

    const hashes =
      new Set<string>();

    for (const file of imageFiles) {
      try {
        const hash =
          await getFileHash(file);

        if (hashes.has(hash)) {
          continue;
        }

        hashes.add(hash);

        uniqueFiles.push(file);
      } catch (error) {
        console.error(
          "Ошибка проверки файла:",
          file.name,
          error
        );

        /*
          Если хэш не удалось получить,
          всё равно оставляем файл,
          чтобы не потерять фотографию.
        */
        uniqueFiles.push(file);
      }
    }

    return uniqueFiles;
  }

  /*
    Загружаем фотографии автомобиля.

    Перед загрузкой удаляем дубликаты.
  */
  async function uploadCarImages(
    carId: string,
    imageFiles: File[]
  ) {
    const uniqueFiles =
      await removeDuplicateFiles(
        imageFiles
      );

    let uploadedCount = 0;

    const skippedCount =
      imageFiles.length -
      uniqueFiles.length;

    /*
      Получаем уже существующие фото,
      чтобы правильно продолжить position.
    */
    const existingResult = await s
      .from("car_images")
      .select("position")
      .eq("car_id", carId)
      .order("position", {
        ascending: false,
      })
      .limit(1);

    if (existingResult.error) {
      throw new Error(
        `Ошибка проверки существующих фотографий: ${existingResult.error.message}`
      );
    }

    const lastPosition =
      existingResult.data &&
      existingResult.data.length > 0
        ? Number(
            existingResult.data[0].position
          )
        : -1;

    for (
      let i = 0;
      i < uniqueFiles.length;
      i++
    ) {
      const file =
        uniqueFiles[i];

      const safeName = file.name.replace(
        /[^a-zA-Z0-9._-]/g,
        "_"
      );

      /*
        Добавляем timestamp + index,
        чтобы имя файла в Storage
        всегда было уникальным.
      */
      const uniqueName =
        `${Date.now()}-${i}-${safeName}`;

      const path =
        `${carId}/${uniqueName}`;

      const uploadResult =
        await s.storage
          .from("car-images")
          .upload(path, file, {
            upsert: false,
          });

      if (uploadResult.error) {
        throw new Error(
          `Ошибка загрузки "${file.name}": ${uploadResult.error.message}`
        );
      }

      const publicUrlResult =
        s.storage
          .from("car-images")
          .getPublicUrl(path);

      const publicUrl =
        publicUrlResult.data.publicUrl;

      if (!publicUrl) {
        /*
          Удаляем файл из Storage,
          если URL не получен.
        */
        await s.storage
          .from("car-images")
          .remove([path]);

        throw new Error(
          `Не удалось получить ссылку для "${file.name}"`
        );
      }

      const position =
        lastPosition + 1 + i;

      const imageResult =
        await s
          .from("car_images")
          .insert({
            car_id: carId,
            image_url: publicUrl,
            position,
          });

      if (imageResult.error) {
        /*
          Если запись в БД не удалась,
          удаляем уже загруженный файл.
        */
        await s.storage
          .from("car-images")
          .remove([path]);

        throw new Error(
          `Ошибка сохранения "${file.name}": ${imageResult.error.message}`
        );
      }

      uploadedCount++;
    }

    return {
      uploaded: uploadedCount,
      skipped: skippedCount,
    };
  }

  async function saveCar(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!settings) {
      setMessage(
        "Не удалось загрузить настройки"
      );

      return;
    }

    const payload = {
      ...form,

      year: Number(form.year),
      mileage: Number(form.mileage),
      power: Number(form.power),

      price_cny: Number(
        form.price_cny
      ),

      transport_cny: Number(
        settings.transport_cny
      ),

      price_rub: Math.round(
        (
          Number(form.price_cny) +
          Number(
            settings.transport_cny
          )
        ) *
          Number(
            settings.cny_rub_rate
          )
      ),
    };

    let carId = editId;

    try {
      if (editId) {
        const result =
          await s
            .from("cars")
            .update(payload)
            .eq("id", editId);

        if (result.error) {
          throw new Error(
            result.error.message
          );
        }
      } else {
        const result =
          await s
            .from("cars")
            .insert(payload)
            .select()
            .single();

        if (result.error) {
          throw new Error(
            result.error.message
          );
        }

        carId = result.data.id;
      }

      let uploadInfo = null;

      if (
        files &&
        files.length > 0 &&
        carId
      ) {
        uploadInfo =
          await uploadCarImages(
            carId,
            Array.from(files)
          );
      }

      if (uploadInfo) {
        setMessage(
          `Автомобиль сохранён. Загружено фото: ${uploadInfo.uploaded}. Дубликатов пропущено: ${uploadInfo.skipped}.`
        );
      } else {
        setMessage(
          "Автомобиль успешно сохранён"
        );
      }

      setForm({
        ...emptyCar,
      });

      setEditId(null);

      setFiles(null);

      await loadData();
    } catch (error: any) {
      setMessage(
        error?.message ||
          "Ошибка сохранения автомобиля"
      );
    }
  }

  /*
    Получаем марку и модель
    из названия папки.

    Пример:
    106 BMW X1

    Результат:
    brand = BMW
    model = X1
  */
  function getCarNameFromFolder(
    folderName: string
  ) {
    const cleaned =
      folderName
        .replace(
          /^\d+\s*/,
          ""
        )
        .trim();

    const parts =
      cleaned.split(/\s+/);

    const knownBrands = [
      "BMW",
      "Volkswagen",
      "Toyota",
      "Honda",
      "Audi",
      "Mercedes",
      "Hyundai",
      "Kia",
      "Nissan",
      "Mazda",
      "Lexus",
      "Ford",
      "Chevrolet",
      "Chery",
      "Geely",
      "Haval",
      "BYD",
      "Zeekr",
      "Li",
      "Tank",
    ];

    /*
      Проверяем Mercedes-Benz
      отдельно, потому что
      название состоит из
      нескольких частей.
    */
    if (
      cleaned
        .toLowerCase()
        .startsWith(
          "mercedes-benz "
        )
    ) {
      return {
        brand: "Mercedes-Benz",
        model: cleaned
          .substring(
            "Mercedes-Benz".length
          )
          .trim(),
      };
    }

    const firstWord =
      parts[0]?.toLowerCase();

    const brand =
      knownBrands.find(
        (item) =>
          item.toLowerCase() ===
          firstWord
      );

    if (brand) {
      return {
        brand,
        model: parts
          .slice(1)
          .join(" "),
      };
    }

    return {
      brand: "Не указано",
      model:
        cleaned || folderName,
    };
  }

  /*
    Импорт папки.

    Каждая вложенная папка —
    отдельный автомобиль.
  */
  async function importFolder(
    event: React.ChangeEvent<
      HTMLInputElement
    >
  ) {
    const selectedFiles =
      event.target.files;

    if (
      !selectedFiles ||
      selectedFiles.length === 0
    ) {
      return;
    }

    if (!settings) {
      setMessage(
        "Сначала дождитесь загрузки настроек"
      );

      event.target.value = "";

      return;
    }

    setImporting(true);

    try {
      const filesArray =
        Array.from(
          selectedFiles
        );

      /*
        Берём только изображения.
      */
      const imageFiles =
        filesArray.filter(
          (file) =>
            file.type.startsWith(
              "image/"
            )
        );

      if (
        imageFiles.length === 0
      ) {
        throw new Error(
          "В выбранной папке не найдено фотографий"
        );
      }

      /*
        Группируем фотографии
        по папкам автомобилей.
      */
      const folders =
        new Map<
          string,
          File[]
        >();

      for (
        const file of imageFiles
      ) {
        const path =
          file.webkitRelativePath ||
          file.name;

        const pathParts =
          path.split("/");

        /*
          Ожидаем:
          Сток 3 / BMW X1 / photo.jpg
        */
        if (
          pathParts.length < 3
        ) {
          continue;
        }

        const carFolder =
          pathParts[
            pathParts.length - 2
          ];

        if (
          !folders.has(
            carFolder
          )
        ) {
          folders.set(
            carFolder,
            []
          );
        }

        folders
          .get(carFolder)!
          .push(file);
      }

      if (
        folders.size === 0
      ) {
        throw new Error(
          "Не удалось найти папки автомобилей. Выберите главную папку «Сток 3»."
        );
      }

      let importedCount = 0;

      let totalUploaded = 0;

      let totalSkipped = 0;

      for (
        const [
          folderName,
          carImages,
        ] of folders.entries()
      ) {
        setMessage(
          `Импорт: ${folderName} (${importedCount + 1}/${folders.size})`
        );

        /*
          Сначала убираем дубликаты.
        */
        const uniqueImages =
          await removeDuplicateFiles(
            carImages
          );

        /*
          Если после проверки
          фотографий не осталось —
          пропускаем автомобиль.
        */
        if (
          uniqueImages.length === 0
        ) {
          continue;
        }

        const carName =
          getCarNameFromFolder(
            folderName
          );

        const payload = {
          ...emptyCar,

          brand:
            carName.brand,

          model:
            carName.model,

          year:
            new Date()
              .getFullYear(),

          transport_cny:
            Number(
              settings.transport_cny
            ),

          price_rub:
            Math.round(
              Number(
                settings.transport_cny
              ) *
                Number(
                  settings.cny_rub_rate
                )
            ),
        };

        const insertResult =
          await s
            .from("cars")
            .insert(payload)
            .select()
            .single();

        if (
          insertResult.error
        ) {
          throw new Error(
            `Ошибка создания ${folderName}: ${insertResult.error.message}`
          );
        }

        const carId =
          insertResult.data.id;

        /*
          Загружаем уже проверенные
          уникальные фотографии.
        */
        const uploadInfo =
          await uploadCarImages(
            carId,
            uniqueImages
          );

        importedCount++;

        totalUploaded +=
          uploadInfo.uploaded;

        /*
          Считаем дубликаты
          из исходной папки.
        */
        totalSkipped +=
          carImages.length -
          uniqueImages.length;
      }

      setMessage(
        `Готово! Автомобилей: ${importedCount}. Фотографий загружено: ${totalUploaded}. Дубликатов пропущено: ${totalSkipped}.`
      );

      await loadData();
    } catch (error: any) {
      console.error(
        "Ошибка импорта:",
        error
      );

      setMessage(
        error?.message ||
          "Ошибка импорта"
      );
    } finally {
      setImporting(false);

      /*
        Позволяет выбрать
        ту же папку повторно.
      */
      event.target.value = "";
    }
  }

  async function saveSettings() {
    if (!settings) {
      return;
    }

    const result =
      await s
        .from("settings")
        .update({
          cny_rub_rate: Number(
            settings.cny_rub_rate
          ),

          transport_cny: Number(
            settings.transport_cny
          ),
        })
        .eq("id", 1);

    if (result.error) {
      setMessage(
        result.error.message
      );

      return;
    }

    setMessage(
      "Настройки успешно сохранены"
    );
  }

  async function deleteCar(
    id: string
  ) {
    const confirmed =
      window.confirm(
        "Удалить этот автомобиль?"
      );

    if (!confirmed) {
      return;
    }

    const result =
      await s
        .from("cars")
        .delete()
        .eq("id", id);

    if (result.error) {
      setMessage(
        result.error.message
      );

      return;
    }

    setMessage(
      "Автомобиль удалён"
    );

    await loadData();
  }

  function startEditing(
    car: any
  ) {
    setEditId(car.id);

    setForm({
      ...emptyCar,
      ...car,
    });

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
          <p>
            УПРАВЛЕНИЕ КАТАЛОГОМ
          </p>

          <h1>
            Админ-панель
          </h1>
        </div>

        <button
          onClick={logout}
        >
          Выйти
        </button>

      </div>

      <section className="panel">

        <h2>
          Импорт автомобилей
        </h2>

        <p>
          Выберите главную папку
          «Сток 3». Каждая
          вложенная папка будет
          создана как отдельный
          автомобиль.
        </p>

        <p>
          Одинаковые фотографии
          внутри одной папки
          автоматически
          пропускаются.
        </p>

        <label
          className="importButton"
        >
          {importing
            ? "Импортируем..."
            : "📁 Выбрать папку с автомобилями"}

          <input
            type="file"
            multiple
            // @ts-ignore
            webkitdirectory=""
            directory=""
            onChange={
              importFolder
            }
            disabled={
              importing
            }
          />

        </label>

      </section>

      <section className="panel">

        <h2>
          Курс и доставка
        </h2>

        <input
          value={
            settings?.cny_rub_rate ??
            ""
          }
          onChange={(event) =>
            setSettings({
              ...settings,
              cny_rub_rate:
                event.target.value,
            })
          }
          placeholder="Курс CNY / RUB"
        />

        <input
          value={
            settings?.transport_cny ??
            ""
          }
          onChange={(event) =>
            setSettings({
              ...settings,
              transport_cny:
                event.target.value,
            })
          }
          placeholder="Доставка CNY"
        />

        <button
          onClick={
            saveSettings
          }
        >
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

          {fields.map(
            (field) => (

              <label
                key={field}
              >

                {field}

                <input
                  value={
                    form[field] ??
                    ""
                  }
                  onChange={(
                    event
                  ) =>
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
                  ].includes(
                    field
                  )}
                />

              </label>

            )
          )}

          <label className="wide">

            Описание на русском языке

            <textarea
              value={
                form.description_ru ??
                ""
              }
              onChange={(
                event
              ) =>
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
              onChange={(
                event
              ) =>
                setFiles(
                  event.target.files
                )
              }
            />

          </label>

          <label className="wide">

            <input
              type="checkbox"
              checked={
                Boolean(
                  form.is_published
                )
              }
              onChange={(
                event
              ) =>
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

        <h2>
          Автомобили
        </h2>

        {cars.length === 0 && (

          <p>
            Автомобили пока
            не добавлены.
          </p>

        )}

        {cars.map((car) => (

          <div
            className="row"
            key={car.id}
          >

            <div>

              <b>
                {car.brand}{" "}
                {car.model}
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
                  startEditing(
                    car
                  )
                }
              >
                Редактировать
              </button>

              <button
                onClick={() =>
                  deleteCar(
                    car.id
                  )
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
