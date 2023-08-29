"use client";

import useLocalStorage from "use-local-storage";
import { useEffect, useState } from "react";
import CountBeers from "@/components/CountBeers";
import { Spinner } from "flowbite-react";
import CalculateBeers from "@/components/CalculateBeers";

export default function Home() {
  const [beer, setBeer] = useLocalStorage("beerTotal", 0);
  const [beerPrice, setBeerPrice] = useLocalStorage("beerPrice", 0);
  const [people, setPeople] = useLocalStorage("people", 1);
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
          <CountBeers />
          <CalculateBeers beer={beer} />
        </>
      )}
    </div>
  );
}
