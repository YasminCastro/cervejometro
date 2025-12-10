"use client";

import AddBeers from "@/components/AddBeers";
import ProportionalBill from "@/components/ProportionalBill";

export default function Home() {
  return (
    <div className="w-full min-h-screen p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Cervejômetro</h1>
          <p className="text-muted-foreground">
            Dividir conta proporcionalmente
          </p>
        </div>

        <AddBeers />
        <ProportionalBill />
      </div>
    </div>
  );
}
