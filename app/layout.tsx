import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Black Auto China",
  description: "Каталог автомобилей из Китая"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="siteHeader">
          <div className="container nav">
            <Link href="/" className="brand">BLACK AUTO CHINA</Link>
            <nav>
              <Link href="/catalog">Каталог</Link>
              <Link href="/request">Заявка</Link>
              <Link href="/admin" className="cabinet">Кабинет</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container">© {new Date().getFullYear()} Black Auto China · +7 908 459-02-18</div>
        </footer>
      </body>
    </html>
  );
}