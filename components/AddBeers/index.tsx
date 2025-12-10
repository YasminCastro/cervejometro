"use client";

import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useLocalStorageValues } from "@/lib/localStorageValues";

export default function AddBeers() {
  const { beer, setBeer } = useLocalStorageValues();

  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <p className="text-4xl font-bold">{beer}</p>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            setBeer(beer - 1);
          }}
        >
          <FaMinus />
        </Button>
        <Button
          onClick={() => {
            setBeer(beer + 1);
          }}
        >
          <FaPlus />
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => {
          setBeer(0);
        }}
      >
        Resetar
      </Button>
    </div>
  );
}
