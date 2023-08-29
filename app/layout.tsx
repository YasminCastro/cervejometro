import Footer from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cervejometro",
  description: "Calcule o valor da conta da cerveja no bar!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
