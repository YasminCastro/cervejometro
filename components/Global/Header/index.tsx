"use client";

import { PiBeerBottleDuotone } from "react-icons/pi";

export default function Header() {
  return (
    <header className="w-full p-7">
      <div className="flex items-center gap-2">
        <PiBeerBottleDuotone size={30} className="text-amber-500" />
        <span className="text-xl font-semibold whitespace-nowrap">
          Cervejometro
        </span>
      </div>
    </header>
  );
}

