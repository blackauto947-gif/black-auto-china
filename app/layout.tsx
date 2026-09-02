import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Auto China",
  description: "Каталог автомобилей из Китая"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
