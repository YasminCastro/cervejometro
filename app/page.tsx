"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import AddBeers from "@/components/AddBeers";
import { Button, Spinner } from "flowbite-react";
import EqualBill from "@/components/EqualBill";
import ProportionalBill from "@/components/ProportionalBill";

export default function Home() {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, settotalPeople] = useLocalStorage("totalPeople", 1);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState<string | undefined>();

  useEffect(() => {
    setLoading(false);
  }, [beer]);

  return (
    <div className="h-[60vh]">
      {loading ? (
        <Spinner aria-label="Warning spinner example" color="warning" />
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Dividir conta</h2>
            <Button.Group outline>
              <Button
                color="warning"
                size="sm"
                onClick={() => setOpenModal("equalBill")}
              >
                Igualmente
              </Button>
              <Button
                color="warning"
                size="sm"
                onClick={() => setOpenModal("proportionalBill")}
              >
                Proporcionalmente
              </Button>
            </Button.Group>
          </div>

          <AddBeers />
          <EqualBill openModal={openModal} setOpenModal={setOpenModal} />
          <ProportionalBill openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      )}
    </div>
  );
}
