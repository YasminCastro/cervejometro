"use client";

import ProportionalBill from "@/components/ProportionalBill";
import { PiBeerBottleDuotone } from "react-icons/pi";

export default function Home() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <PiBeerBottleDuotone size={50} className="text-amber-500" />{" "}
          <h1 className="text-2xl font-bold">Cervejômetro</h1>
          <p className="text-muted-foreground">
            Divida sua conta proporcionalmente
          </p>
        </div>

        <ProportionalBill />
      </div>
    </div>
  );
}
