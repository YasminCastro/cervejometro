"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import AddBeers from "@/components/AddBeers";
import { Spinner } from "flowbite-react";
import TotalValue from "@/components/TotalValue";

export default function Home() {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [totalPeople, settotalPeople] = useLocalStorage("totalPeople", 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [beer]);

  return (
    <div>
      {loading ? (
        <Spinner aria-label="Warning spinner example" color="warning" />
      ) : (
        <>
          <AddBeers />
          <TotalValue />
        </>
      )}
    </div>
  );
}
