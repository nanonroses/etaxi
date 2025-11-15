import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ETAXI - Taxis Regulados en Chile",
  description: "Viaja con seguridad, transparencia y cumplimiento. ETAXI, la app chilena de taxis regulados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
