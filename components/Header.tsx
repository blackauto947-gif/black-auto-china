import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">BLACK AUTO <span>CHINA</span></Link>
      <nav>
        <Link href="/catalog">Каталог</Link>
        <a href="tel:89084590218">8 908 459-02-18</a>
        <Link className="cabinet" href="/admin">Кабинет</Link>
      </nav>
    </header>
  );
}
