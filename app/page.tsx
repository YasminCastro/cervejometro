"use client";

import { useEffect, useState } from "react";
import AddBeers from "@/components/AddBeers";
import { Button } from "@/components/ui/button";
import EqualBill from "@/components/EqualBill";
import ProportionalBill from "@/components/ProportionalBill";
import { useLocalStorageValues } from "@/lib/localStorageValues";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { beer } = useLocalStorageValues();

  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<string | undefined>();

  useEffect(() => {
    setLoading(false);
  }, [beer]);

  return (
    <div className="h-[50vh] w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-bold">Dividir conta</h2>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setOpenModal("equalBill")}>
                Igualmente
              </Button>
              <Button
                size="sm"
                onClick={() => setOpenModal("proportionalBill")}
              >
                Proporcionalmente
              </Button>
            </div>
          </div>

          <AddBeers />
          <EqualBill openModal={openModal} setOpenModal={setOpenModal} />
          <ProportionalBill openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
}
