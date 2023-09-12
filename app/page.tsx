"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import AddBeers from "@/components/AddBeers";
import { Button, Spinner } from "flowbite-react";
import EqualBill from "@/components/Global/Header/EqualBill";
import ProportionalBill from "@/components/Global/Header/ProportionalBill";

export default function Home() {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, settotalPeople] = useLocalStorage("totalPeople", 1);
  const [loading, setLoading] = useState(true);

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
            <h2>Dividir</h2>
            <div className="flex">
              <EqualBill />
              <ProportionalBill />
            </div>
          </div>
          <AddBeers />
        </div>
      )}
    </div>
  );
}
